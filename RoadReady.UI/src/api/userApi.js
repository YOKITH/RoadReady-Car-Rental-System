import axios from "axios";

const axiosClient = axios.create({
    baseURL: "https://localhost:7021/api",
    headers: {
        "Content-Type": "application/json",
    },
});

axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

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

export async function getAllUsers() {
    try {
        const response = await axiosClient.get("/Users");
        return response.data;
    } catch (error) {
        throw new Error(
            getErrorMessage(error, "Failed to fetch users.")
        );
    }
}

export async function getUserById(userId) {
    try {
        const response = await axiosClient.get(`/Users/${userId}`);
        return response.data;
    } catch (error) {
        throw new Error(
            getErrorMessage(error, "Failed to fetch user.")
        );
    }
}

export async function getUserProfile() {
    try {
        const response = await axiosClient.get("/Users/profile");
        return response.data;
    } catch (error) {
        throw new Error(
            getErrorMessage(error, "Failed to fetch profile.")
        );
    }
}

export async function updateUser(userId, userData) {
    try {
        const response = await axiosClient.put(
            `/Users/${userId}`,
            userData
        );

        return response.data;
    } catch (error) {
        throw new Error(
            getErrorMessage(error, "Failed to update user.")
        );
    }
}

export async function deleteUser(userId) {
    try {
        const response = await axiosClient.delete(`/Users/${userId}`);
        return response.data;
    } catch (error) {
        throw new Error(
            getErrorMessage(error, "Failed to delete user.")
        );
    }
}

export async function getPagedUsers(
    pageNumber = 1,
    pageSize = 10
) {
    try {
        const response = await axiosClient.get("/Users/paged", {
            params: {
                pageNumber,
                pageSize,
            },
        });

        return response.data;
    } catch (error) {
        throw new Error(
            getErrorMessage(error, "Failed to fetch paged users.")
        );
    }
}