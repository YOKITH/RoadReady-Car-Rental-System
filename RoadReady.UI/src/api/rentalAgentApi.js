import axios from "axios";

const API_URL = "https://localhost:7021/api/RentalAgent";

export const getDashboard = async () => {
    const response = await axios.get(`${API_URL}/dashboard`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

    return response.data;
};

export const getTodayPickups = async () => {
    const response = await axios.get(`${API_URL}/today-pickups`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

    return response.data;
};

export const getTodayReturns = async () => {
    const response = await axios.get(`${API_URL}/today-returns`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

    return response.data;
};