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

export async function getAllReviews() {
    try {
        const response = await axiosClient.get("/Reviews");
        return response.data;
    } catch (error) {
        throw new Error(
            getErrorMessage(error, "Failed to fetch reviews.")
        );
    }
}

export async function getReviewById(reviewId) {
    try {
        const response = await axiosClient.get(
            `/Reviews/${reviewId}`
        );

        return response.data;
    } catch (error) {
        throw new Error(
            getErrorMessage(error, "Failed to fetch review.")
        );
    }
}

export async function getReviewsByCar(carId) {
    try {
        const response = await axiosClient.get(
            `/Reviews/car/${carId}`
        );

        return response.data;
    } catch (error) {
        throw new Error(
            getErrorMessage(error, "Failed to fetch car reviews.")
        );
    }
}

export async function getReviewsByUser(userId) {
    try {
        const response = await axiosClient.get(
            `/Reviews/user/${userId}`
        );

        return response.data;
    } catch (error) {
        throw new Error(
            getErrorMessage(error, "Failed to fetch user reviews.")
        );
    }
}

export async function addReview(reviewData) {
    try {
        const response = await axiosClient.post(
            "/Reviews",
            reviewData
        );

        return response.data;
    } catch (error) {
        throw new Error(
            getErrorMessage(error, "Failed to add review.")
        );
    }
}

export async function deleteReview(reviewId) {
    try {
        const response = await axiosClient.delete(
            `/Reviews/${reviewId}`
        );

        return response.data;
    } catch (error) {
        throw new Error(
            getErrorMessage(error, "Failed to delete review.")
        );
    }
}

export async function getPagedReviews(
    pageNumber = 1,
    pageSize = 10
) {
    try {
        const response = await axiosClient.get(
            "/Reviews/paged",
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
            getErrorMessage(error, "Failed to fetch paged reviews.")
        );
    }
}