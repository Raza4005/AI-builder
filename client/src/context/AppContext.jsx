import { createContext, useContext, useEffect, useState, useCallback} from 'react'
import Api from '../api/Api'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const AppContext = createContext(undefined);

export function AppContextProvider({ children }) {

    const navigate = useNavigate();

    // auth states
    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);

    // States
    const [projects, setProjects] = useState([]);
    const [loadingProjects, setLoadingProjects] = useState(true);
    const [activeProject, setActiveProject] = useState(null);
    const [loadingActiveProject, setLoadingActiveProject] = useState(true);
    const [chatLoading, setChatLoading] = useState(false);
    const [generatingProject, setGeneratingProject] = useState(false);
    const [activeFile, setActiveFile] = useState("/App.js");
    const [showCode, setShowCode] = useState(false);


    // auth action
    const checkSession = async () => {
        try {
            const {data} = await Api.get('/api/auth/me');
            setUser(data.user);
        } catch (error) {
            setUser(null);  
                } finally {
            setLoadingUser(false);
        }
    };


    useEffect(() => {
        checkSession();
    }, [checkSession]);

    const login = async (email, password) => {
        try {
            const { data } = await Api.post('/api/auth/login', { email, password });
            setUser(data.user);
            toast.success('Login successful');
            navigate('/');
        } catch (error) {
            setUser(null);
            console.error('Login error:', error);
            const errorMsg = error.response?.data?.message || 'Login failed';
            toast.error(errorMsg);
            throw new Error(errorMsg);
        }
    };

    const Register = async (name, email, password) => {
        try {
            const { data } = await Api.post('/api/auth/register', { name, email, password });
            setUser(data.user);
            toast.success('Registration successful');
            navigate('/');
        } catch (error) {
            setUser(null);
            console.error('Registration error:', error);
            const errorMsg = error.response?.data?.message || 'Registration failed';
            toast.error(errorMsg);
            throw new Error(errorMsg);
        }
    };

    const logout = async ()=>{
        try {
            await Api.post("/api/auth/logout")
            setUser(null)
            setProject([])
            setActiveProjects(null)
            toast.success("Logged out successfully")
            navigate("/login")
        } catch (err) {
            console.error("Logout failed:", err);
            toast.error("Logout failed");
        }
    } 

    // Projects action
    const loadProjects = async () => {
        if(!user) return;
        try {
            const { data } = await Api.get("/api/projects")
            setActiveProjects(data)
        } catch (err) {
            console.error("Failed to list projects:, err");
            toast.error("Failed to list projects list");       
        }finally{
            setLoadingProject(false);
        }
    }

        const loadProject = async (id, silent = false) => {
        if(!user) return;
        if(!silent) setLoadingActiveProject(true)
            try {
            const { data } = await Api.get(`/api/projects/${id}`)
            setActiveProjects(data);
             
            // default file collection
            const files = Object.keys(data.files);
            if(files.length > 0){
                setActiveFile((prev)=> {
                    if(files.includes(prev)) return prev;
                    if(files.includes("/App.js")) return "/App.js";
                    return files[0];
                })
            }
            } catch (err) {
                console.error("FAiled to load projects :, err");
                if(!silent){
                    toast.error("FAiled to load projects detail");
                    navigate("/");
                }
            }finally{
                if(!silent) setLoadingActiveProject(false)
            }

}
                  // Automatically poll active project status if generating or pending
useEffect(()=>{
    if (!activeProject?._id || !user) return;

    const isOngoing = activeProject.status === "generating" || activeProject.status ===
    "pending" || activeProject.status === "revising";

    if(isOngoing){
        setChatLoading(true);
        const interval = setInterval(()=>{
            loadProject(activeProject._id,true)
        },2000);
        return ()=> clearInterval(interval)
    }else{
        setChatLoading(false);
    }

},[activeProject?._id, activeProject?.status, loadProject, user])

const handleGenerate = useCallback(
    async (prompt) => {
        if(!user) return;

        setGeneratingProject(true);
        try {
            const { data } = await Api.post("/api/projects", { prompt });
            toast.success("AI Agent is planning structure...")
            navigate(`/builder/${data._id}`);
        } catch (err) {
            console.error("Failed to generate project:", err);
            toast.error(err?.response?.data?.error || "Failed to generate project");
        }finally{
            setGeneratingProject(false);
        }
    },[navigate, user]
)

const handleDelete = useCallback(
    async (id) => {
        if(!user) return;
        try {
            const { data } = await Api.delete(`/api/projects/${id}`);
            setActiveProjects((prev)=>prev.filter((p)=> p._id ===id))
            toast.success("Project delete successfully")
        } catch (err) {
            console.error("Failed to delete project:", err);
            toast.error("Failed to delete project");
        }
    },[user]
)

    return (
        <AppContext.Provider value={{
            user,
            loadingUser,
            login,
            Register,
            projects,
            loadingProjects,
            activeProject,
            loadingActiveProject,
            chatLoading,
            generatingProject,
            activeFile,
            showCode,
            setActiveFile,
            setShowCode,
            loadProjects,
            loadProject,
            handleGenerate,
            handleDelete
        }}>
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
}
