import { createContext, useContext, useState} from 'react'

const AppContext = createContext(undefined);

export function AppProvider({ children }) {

    // auth states
    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);
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
