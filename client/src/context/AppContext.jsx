import { createContext, useContext, useEffect, useState} from 'react'
import Api from '../api/Api'

const AppContext = createContext(undefined);

export function AppContextProvider({ children }) {

    // auth states
    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);

    const checkSession = async () => {
        try {
            const {data} = await Api.get('/api/auth/me');
            // setUser(data.user);
        } catch (error) {
            setUser(null);  
                } finally {
            setLoadingUser(false);
        }
    };


    useEffect(() => {
        checkSession();
    }, [checkSession]);


    return (
        <AppContext.Provider value={{
            user,
            loadingUser
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
