import {useMutation, useQueryClient} from "@tanstack/react-query";
import {login, signup} from "../api/api.ts";
import {useNavigate} from "react-router-dom";
import type {AuthCredentials} from "../types/auth.type.ts";
import {useAuth as useAuthContext} from "./useAuthContext.ts";

export const useAuth = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const {login: authContextLogin} = useAuthContext();

    const loginMutation = useMutation({
        mutationFn: (credentials: AuthCredentials) => login(credentials),
        onSuccess: (data) => {
            authContextLogin(data.accessToken);
            queryClient.invalidateQueries(); // Invalidate all queries to refetch data with new auth state
            navigate("/");
        },
    });

    const signupMutation = useMutation({
        mutationFn: (credentials: AuthCredentials) => signup(credentials),
        onSuccess: () => {
            authContextLogin('');
            queryClient.invalidateQueries();
            navigate("/");
        },
    });

    return {loginMutation, signupMutation};
};