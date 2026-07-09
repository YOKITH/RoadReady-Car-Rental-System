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

export async function getAllReservations() {
    try {
        const response = await axiosClient.get("/Reservations");
        return response.data;
    } catch (error) {
        throw new Error(
            getErrorMessage(error, "Failed to fetch reservations.")
        );
    }
}

export async function getReservationById(reservationId) {
    try {
        const response = await axiosClient.get(
            `/Reservations/${reservationId}`
        );

        return response.data;
    } catch (error) {
        throw new Error(
            getErrorMessage(error, "Failed to fetch reservation.")
        );
    }
}

export async function getReservationsByUser(userId) {
    try {
        const response = await axiosClient.get(
            `/Reservations/user/${userId}`
        );

        return response.data;
    } catch (error) {
        throw new Error(
            getErrorMessage(
                error,
                "Failed to fetch user reservations."
            )
        );
    }
}

export async function createReservation(reservationData) {
    try {
        const response = await axiosClient.post(
            "/Reservations",
            reservationData
        );

        return response.data;
    } catch (error) {
        throw new Error(
            getErrorMessage(error, "Failed to create reservation.")
        );
    }
}

export async function cancelReservation(reservationId) {
    try {
        const response = await axiosClient.put(
            `/Reservations/cancel/${reservationId}`
        );

        return response.data;
    } catch (error) {
        throw new Error(
            getErrorMessage(error, "Failed to cancel reservation.")
        );
    }
}

export async function getPagedReservations(
    pageNumber = 1,
    pageSize = 10
) {
    try {
        const response = await axiosClient.get(
            "/Reservations/paged",
            {
                params: {
                    pageNumber,
                    pageSize,
                },
            }
        );

        return response.data;
    } catch (error) {
        throw new Error(
            getErrorMessage(
                error,
                "Failed to fetch paged reservations."
            )
        );
    }
}