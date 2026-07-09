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

export async function getRevenueReport() {
    try {
        const response = await axiosClient.get(
            "/Reports/revenue"
        );

        return response.data;
    } catch (error) {
        throw new Error(
            getErrorMessage(
                error,
                "Failed to load revenue report."
            )
        );
    }
}

export async function getReservationReport() {
    try {
        const response = await axiosClient.get(
            "/Reports/reservations"
        );

        return response.data;
    } catch (error) {
        throw new Error(
            getErrorMessage(
                error,
                "Failed to load reservation report."
            )
        );
    }
}

export async function getTopCarsReport() {
    try {
        const response = await axiosClient.get(
            "/Reports/top-cars"
        );

        return response.data;
    } catch (error) {
        throw new Error(
            getErrorMessage(
                error,
                "Failed to load top booked cars."
            )
        );
    }
}

export async function getMonthlyRevenueReport() {
    try {
        const response = await axiosClient.get(
            "/Reports/monthly-revenue"
        );

        return response.data;
    } catch (error) {
        throw new Error(
            getErrorMessage(
                error,
                "Failed to load monthly revenue."
            )
        );
    }
}