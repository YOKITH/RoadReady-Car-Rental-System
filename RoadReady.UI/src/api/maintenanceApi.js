import axios from "axios";

const API_URL = "https://localhost:7021/api/Maintenance";

// ======================================
// Get All Maintenance Reports
// ======================================

export const getAllMaintenanceReports = async () => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response.data;
};

// ======================================
// Get Pending Maintenance Reports
// ======================================

export const getPendingMaintenanceReports = async () => {
  const response = await axios.get(`${API_URL}/pending`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response.data;
};

// ======================================
// Get Maintenance Report By Id
// ======================================

export const getMaintenanceReportById = async (reportId) => {
  const response = await axios.get(`${API_URL}/${reportId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response.data;
};


// Create Maintenance Report

export const createMaintenanceReport = async (maintenanceData) => {
  const response = await axios.post(API_URL, maintenanceData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response.data;
};


// Complete Maintenance

export const completeMaintenance = async (
  reportId,
  completionData
) => {
  const response = await axios.put(
    `${API_URL}/${reportId}/complete`,
    completionData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  return response.data;
};