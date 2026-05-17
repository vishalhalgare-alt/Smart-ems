// ===================================
// IMPORTS
// ===================================

import axios from "axios";

// ===================================
// BASE URLs
// ===================================

const API_BASE_URL =
  "http://localhost:8081/api";

const AUTH_BASE_URL =
  "http://localhost:8081/auth";

// ===================================
// AUTH HEADERS
// ===================================

const getAuthHeaders = () => {

  const token =
    localStorage.getItem("token");

  return {

    "Content-Type":
      "application/json",

    ...(token && {

      Authorization:
        `Bearer ${token}`,

    }),
  };
};

// ===================================
// AUTH APIs
// ===================================

export const login = async (
  email,
  password
) => {

  const response = await fetch(
    `${AUTH_BASE_URL}/login`,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {

    throw new Error(
      data.message ||
      "Invalid email or password"
    );
  }

  return data;
};

export const register = async (
  email,
  password,
  name
) => {

  const response =
    await fetch(
      `${AUTH_BASE_URL}/register`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          email,
          password,
          name,
        }),
      }
    );

  return await response.json();
};


export const getManagerTasks =
  async (email) => {

    const response =
      await fetch(

        `http://localhost:8081/api/tasks/manager/${email}`

      );

    return response.json();
};
// ===================================
// DASHBOARD APIs
// ===================================

export const getDashboardStats =
  async () => {

    const response =
      await fetch(
        `${API_BASE_URL}/dashboard`,
        {
          headers:
            getAuthHeaders(),
        }
      );

    return await response.json();
  };

// ===================================
// USERS APIs
// ===================================

export const getAllUsers =
  async () => {

    try {

      const response =
        await fetch(
          `${API_BASE_URL}/users`,
          {
            headers:
              getAuthHeaders(),
          }
        );

      return await response.json();

    } catch (error) {

      console.error(error);

      return [];
    }
  };

// ===================================
// EMPLOYEE APIs
// ===================================

export const getAllEmployees =
  async () => {

    try {

      const response =
        await fetch(
          `${API_BASE_URL}/employees`,
          {
            headers:
              getAuthHeaders(),
          }
        );

      return await response.json();

    } catch (error) {

      console.error(error);

      return [];
    }
  };

export const createEmployee =
  async (employeeData) => {

    const response =
      await fetch(
        `${API_BASE_URL}/employees`,
        {
          method: "POST",

          headers:
            getAuthHeaders(),

          body: JSON.stringify(
            employeeData
          ),
        }
      );

    return await response.json();
  };

export const deleteEmployee =
  async (id) => {

    await fetch(
      `${API_BASE_URL}/employees/${id}`,
      {
        method: "DELETE",

        headers:
          getAuthHeaders(),
      }
    );
  };

// ===================================
// TASK APIs
// ===================================

export const getAllTasks =
  async () => {

    try {

      const response =
        await fetch(
          `${API_BASE_URL}/tasks`,
          {
            headers:
              getAuthHeaders(),
          }
        );

      return await response.json();

    } catch (error) {

      console.error(error);

      return [];
    }
  };

export const getTaskById =
  async (id) => {

    const response =
      await fetch(
        `${API_BASE_URL}/tasks/${id}`,
        {
          headers:
            getAuthHeaders(),
        }
      );

    return await response.json();
  };

export const createTask =
  async (taskData) => {

    const response =
      await fetch(
        `${API_BASE_URL}/tasks`,
        {
          method: "POST",

          headers:
            getAuthHeaders(),

          body: JSON.stringify(
            taskData
          ),
        }
      );

    return await response.json();
  };

export const updateTask =
  async (
    id,
    taskData
  ) => {

    const response =
      await fetch(
        `${API_BASE_URL}/tasks/${id}`,
        {
          method: "PUT",

          headers:
            getAuthHeaders(),

          body: JSON.stringify(
            taskData
          ),
        }
      );

    return await response.json();
  };

export const updateTaskStatus =
  async (
    id,
    status
  ) => {

    const response =
      await fetch(
        `${API_BASE_URL}/tasks/${id}/status`,
        {
          method: "PUT",

          headers:
            getAuthHeaders(),

          body: JSON.stringify({
            status,
          }),
        }
      );

    return await response.json();
  };

export const deleteTask =
  async (id) => {

    await fetch(
      `${API_BASE_URL}/tasks/${id}`,
      {
        method: "DELETE",

        headers:
          getAuthHeaders(),
      }
    );
  };

// ===================================
// PROJECT APIs
// ===================================

export const getAllProjects =
  async () => {

    try {

      const response =
        await fetch(
          `${API_BASE_URL}/projects`,
          {
            headers:
              getAuthHeaders(),
          }
        );

      return await response.json();

    } catch (error) {

      console.error(error);

      return [];
    }
  };

export const createProject =
  async (projectData) => {

    const response =
      await fetch(
        `${API_BASE_URL}/projects`,
        {
          method: "POST",

          headers:
            getAuthHeaders(),

          body: JSON.stringify(
            projectData
          ),
        }
      );

    return await response.json();
  };

export const updateProject =
  async (
    id,
    projectData
  ) => {

    const response =
      await fetch(
        `${API_BASE_URL}/projects/${id}`,
        {
          method: "PUT",

          headers:
            getAuthHeaders(),

          body: JSON.stringify(
            projectData
          ),
        }
      );

    return await response.json();
  };

export const deleteProject =
  async (id) => {

    await fetch(
      `${API_BASE_URL}/projects/${id}`,
      {
        method: "DELETE",

        headers:
          getAuthHeaders(),
      }
    );
  };

// ===================================
// LEAVE APIs
// ===================================

export const getAllLeaves =
  async () => {

    try {

      const response =
        await fetch(
          `${API_BASE_URL}/leaves`,
          {
            headers:
              getAuthHeaders(),
          }
        );

      return await response.json();

    } catch (error) {

      console.error(error);

      return [];
    }
  };

export const createLeave =
  async (leaveData) => {

    const response =
      await fetch(
        `${API_BASE_URL}/leaves`,
        {
          method: "POST",

          headers:
            getAuthHeaders(),

          body: JSON.stringify(
            leaveData
          ),
        }
      );

    return await response.json();
  };

export const approveLeave =
  async (id) => {

    const response =
      await fetch(
        `${API_BASE_URL}/leaves/${id}/approve`,
        {
          method: "PUT",

          headers:
            getAuthHeaders(),
        }
      );

    return await response.json();
  };

export const rejectLeave =
  async (id) => {

    const response =
      await fetch(
        `${API_BASE_URL}/leaves/${id}/reject`,
        {
          method: "PUT",

          headers:
            getAuthHeaders(),
        }
      );

    return await response.json();
  };

export const deleteLeave =
  async (id) => {

    await fetch(
      `${API_BASE_URL}/leaves/${id}`,
      {
        method: "DELETE",

        headers:
          getAuthHeaders(),
      }
    );
  };

// ===================================
// REPORT APIs
// ===================================

export const getDashboardReports =
  async () => {

    const response =
      await axios.get(
        `${API_BASE_URL}/admin/reports/dashboard`,
        {
          headers:
            getAuthHeaders(),
        }
      );

    return response.data;
  };

// ===================================
// ANALYTICS APIs
// ===================================

export const getAnalyticsStats =
  async () => {

    const response =
      await axios.get(
        `${API_BASE_URL}/admin/reports/dashboard`,
        {
          headers:
            getAuthHeaders(),
        }
      );

    return response.data;
  };

export const getAnalyticsData =
  async () => {

    const response =
      await axios.get(
        `${API_BASE_URL}/admin/analytics`,
        {
          headers:
            getAuthHeaders(),
        }
      );

    return response.data;
  };
  // ===================================
// MANAGER APIs
// ===================================

export const getManagers =
  async () => {

    try {

      const response =
        await fetch(
          `${API_BASE_URL}/managers`,
          {
            headers:
              getAuthHeaders(),
          }
        );

      if (!response.ok) {

        throw new Error(
          "Failed to fetch managers"
        );
      }

      return await response.json();

    } catch (error) {

      console.error(
        "Error fetching managers:",
        error
      );

      return [];
    }
  };

export const makeManager =
  async (id) => {

    try {

      const response =
        await fetch(
          `${API_BASE_URL}/managers/${id}`,
          {
            method: "PUT",

            headers:
              getAuthHeaders(),
          }
        );

      if (!response.ok) {

        throw new Error(
          "Failed to make manager"
        );
      }

      return await response.json();

    } catch (error) {

      console.error(
        "Error making manager:",
        error
      );

      return null;
    }
  };

  export const exportReports = async () => {

    const token = localStorage.getItem("token");

    const response = await fetch(
        "http://localhost:8081/api/reports/export",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    if (!response.ok) {
        throw new Error("Failed to export reports");
    }

    return response.blob();
};

// ===================================
// NOTIFICATION APIs
// ===================================

export async function getNotifications() {

  const response =
    await fetch(
      `${API_BASE_URL}/notifications`,
      {
        headers:
          getAuthHeaders(),
      }
    );

  if (!response.ok) {

    throw new Error(
      "Failed to fetch notifications"
    );
  }

  return await response.json();
}

export async function getNotificationStats() {

  const response =
    await fetch(
      `${API_BASE_URL}/notifications/stats`,
      {
        headers:
          getAuthHeaders(),
      }
    );

  if (!response.ok) {

    throw new Error(
      "Failed to fetch notification stats"
    );
  }

  return await response.json();
}