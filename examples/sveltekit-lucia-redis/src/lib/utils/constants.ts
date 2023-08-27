import { dev } from "$app/environment"

export const defaultAuthFormValues = {
    email: dev ? "hi@test.local" : "",
    password: dev ? "password" : "",
    passwordConfirmation: dev ? "password" : "",
}

export const AUTH_PATH = "/auth" as const;
export const SIGNUP_PATH = `${AUTH_PATH}/signup` as const;
export const SIGNIN_PATH = `${AUTH_PATH}/signin` as const;
export const APP_PATH = "/app" as const;