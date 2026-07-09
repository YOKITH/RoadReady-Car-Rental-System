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

export async function getAllPayments() {
    try {
        const response = await axiosClient.get("/Payments");
        return response.data;
    } catch (error) {
        throw new Error(
            getErrorMessage(error, "Failed to fetch payments.")
        );
    }
}

export async function getPaymentById(paymentId) {
    try {
        const response = await axiosClient.get(
            `/Payments/${paymentId}`
        );

        return response.data;
    } catch (error) {
        throw new Error(
            getErrorMessage(error, "Failed to fetch payment.")
        );
    }
}

export async function getPaymentsByUser(userId) {
    try {
        const response = await axiosClient.get(
            `/Payments/user/${userId}`
        );

        return response.data;
    } catch (error) {
        throw new Error(
            getErrorMessage(error, "Failed to fetch user payments.")
        );
    }
}

export async function createOrder(reservationId) {
    try {
        const response = await axiosClient.post(
            `/Payments/create-order?reservationId=${reservationId}`
        );

        return response.data;
    } catch (error) {
        throw new Error(
            getErrorMessage(error, "Failed to create payment order.")
        );
    }
}

export async function verifyPayment(paymentData) {
    try {
        const response = await axiosClient.post(
            "/Payments/verify",
            paymentData
        );

        return response.data;
    } catch (error) {
        throw new Error(
            getErrorMessage(error, "Payment verification failed.")
        );
    }
}

export async function getPagedPayments(
    pageNumber = 1,
    pageSize = 10
) {
    try {
        const response = await axiosClient.get(
            "/Payments/paged",
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
            getErrorMessage(error, "Failed to fetch paged payments.")
        );
    }
}