import axios from "axios";

const axiosClient = axios.create({
    baseURL: "https://localhost:7021/api",
    headers: {
        "Content-Type": "application/json",
    },
});

function getErrorMessage(error, fallbackMessage) {
    if (error.response?.data?.message) {
        return error.response.data.message;
    }

    if (error.response?.data?.title) {
        return error.response.data.title;
    }

    if (typeof error.response?.data === "string") {
        return error.response.data;
    }

    if (error.message) {
        return error.message;
    }

    return fallbackMessage;
}

export async function registerUser(registerData) {
    try {
        const response = await axiosClient.post(
            "/Auth/register",
            registerData
        );

        return response.data;
    } catch (error) {
        throw new Error(
            getErrorMessage(error, "User registration failed.")
        );
    }
}

export async function loginUser(loginData) {
    try {
        const response = await axiosClient.post(
            "/Auth/login",
            loginData
        );

        return response.data;
    } catch (error) {
        throw new Error(
            getErrorMessage(error, "Invalid email or password.")
        );
    }
}

export async function refreshToken(refreshTokenData) {
    try {
        const response = await axiosClient.post(
            "/Auth/refresh-token",
            refreshTokenData
        );

        return response.data;
    } catch (error) {
        throw new Error(
            getErrorMessage(error, "Failed to refresh token.")
        );
    }
}

export async function logoutUser(refreshTokenData) {
    try {
        const response = await axiosClient.post(
            "/Auth/logout",
            refreshTokenData
        );

        return response.data;
    } catch (error) {
        throw new Error(getErrorMessage(error, "Logout failed."));
    }
}