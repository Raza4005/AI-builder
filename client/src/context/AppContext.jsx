import { createContext, useContext, useEffect, useState} from 'react'
import Api from '../api/Api'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const AppContext = createContext(undefined);

export function AppContextProvider({ children }) {

    const navigate = useNavigate();

    // auth states
    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);

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

    return (
        <AppContext.Provider value={{
            user,
            loadingUser,
            login,
            Register
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
