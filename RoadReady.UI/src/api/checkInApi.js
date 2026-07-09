import axios from "axios";

const API_URL = "https://localhost:7021/api/CheckIns";

const getAuthHeader = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});

export const getTodayPickups = async () => {
    const response = await axios.get(
        `${API_URL}/today`,
        getAuthHeader()
    );

    return response.data;
};

export const createCheckIn = async (checkInData) => {
    console.log("Sending CheckIn Data:", checkInData);
    console.log("Token:", localStorage.getItem("token"));

    try {
        const response = await axios.post(
            API_URL,
            checkInData,
            getAuthHeader()
        );

        console.log("Success:", response.data);
        return response.data;
    } catch (error) {
        console.log("Status:", error.response?.status);
        console.log("Data:", error.response?.data);
        console.log("Message:", error.message);

        throw error;
    }
};

export const getCheckInById = async (reservationId) => {
    const response = await axios.get(
        `${API_URL}/${reservationId}`,
        getAuthHeader()
    );

    return response.data;
};

export const getAllCheckIns = async () => {
    const response = await axios.get(
        `${API_URL}/history`,
        getAuthHeader()
    );

    return response.data;
};