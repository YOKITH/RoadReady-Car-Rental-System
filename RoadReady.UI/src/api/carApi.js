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

export async function getAllCars() {
    try {
        const response = await axiosClient.get("/CarsControllers");
        return response.data;
    } catch (error) {
        throw new Error(getErrorMessage(error, "Failed to fetch cars."));
    }
}

export async function getCarById(carId) {
    try {
        const response = await axiosClient.get(
            `/CarsControllers/${carId}`
        );

        return response.data;
    } catch (error) {
        throw new Error(getErrorMessage(error, "Failed to fetch car."));
    }
}

export async function searchCars(keyword) {
    try {
        const response = await axiosClient.get(
            "/CarsControllers/search",
            {
                params: { keyword },
            }
        );

        return response.data;
    } catch (error) {
        throw new Error(getErrorMessage(error, "Failed to search cars."));
    }
}

export async function addCar(carData) {
    try {
        const response = await axiosClient.post(
            "/CarsControllers",
            carData
        );

        console.log("SUCCESS");
        console.log(response);

        return response.data;
    } catch (error) {
        console.log("FULL ERROR");
        console.log(error);

        console.log("STATUS");
        console.log(error.response?.status);

        console.log("DATA");
        console.log(error.response?.data);

        throw new Error(getErrorMessage(error, "Failed to add car."));
    }
}

export async function updateCar(carId, carData) {
    try {
        const response = await axiosClient.put(
            `/CarsControllers/${carId}`,
            carData
        );

        return response.data;
    } catch (error) {
        throw new Error(getErrorMessage(error, "Failed to update car."));
    }
}

export async function deleteCar(carId) {
    try {
        const response = await axiosClient.delete(
            `/CarsControllers/${carId}`
        );

        return response.data;
    } catch (error) {
        throw new Error(getErrorMessage(error, "Failed to delete car."));
    }
}

export async function getPagedCars(pageNumber = 1, pageSize = 10) {
    try {
        const response = await axiosClient.get(
            "/CarsControllers/paged",
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
            getErrorMessage(error, "Failed to fetch paged cars.")
        );
    }
}