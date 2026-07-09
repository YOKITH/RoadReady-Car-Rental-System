import axios from "axios";

const API_URL = "https://localhost:7021/api/CheckOuts";

const authHeader = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
};

export const getTodayReturns = async () => {
    const response = await axios.get(
        `${API_URL}/today`,
        authHeader
    );

    return response.data;
};

export const createCheckOut = async (checkOutData) => {

    const token = localStorage.getItem("token");

    console.log("========== Create CheckOut ==========");
    console.log("Token:", token);
    console.log("Authorization Header:", {
        Authorization: `Bearer ${token}`,
    });
    console.log("Request Body:", checkOutData);

    const response = await axios.post(
        API_URL,
        checkOutData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    console.log("Response:", response.data);

    return response.data;
};

export const getCheckOutById = async (reservationId) => {
    const response = await axios.get(
        `${API_URL}/${reservationId}`,
        authHeader
    );

    return response.data;
};

export const getAllCheckOuts = async () => {
    console.log("Token:", localStorage.getItem("token"));
console.log("Authorization Header:", authHeader);
    const response = await axios.get(
        `${API_URL}/history`,
        authHeader
    );

    return response.data;
};