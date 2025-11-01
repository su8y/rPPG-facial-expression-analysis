import {createContext, useContext} from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (accessToken: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};