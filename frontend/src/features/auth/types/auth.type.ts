export interface AuthCredentials {
    username: string;
    password: string;
}

export interface AuthResponse {
    accessToken: string;
}

export interface SignUpResponse {
    username: string;
}

export interface CheckUsernameRequest {
    username: string;
}