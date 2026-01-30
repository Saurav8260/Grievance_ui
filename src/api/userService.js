const BASE_URL = "https://f1i32xtwg9.execute-api.ap-south-1.amazonaws.com/prod";

// ================= LOGIN =================
export const loginUser = async (payload) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
};



// ================= CREATE USER =================
export const createUser = async (payload) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/users/agent-signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "User creation failed");

  return data;
};


// ================= GET ALL USERS (ADMIN) =================
export const getAllUsers = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/users`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to fetch users");
  }

  const data = await response.json();   
  console.log("USERS DATA:", data);     
  return data;
};
// ================= GET USER BY ID =================

export const getUserById = async (id) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("Response from user id API:", res);

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }

  return res.json();
};

// ================= GET LOGGED-IN USER PROFILE =================
export const getMyProfile = async (token) => {
  const response = await fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch profile");
  }

  return data;
};
// ================= GET DASHBOARD STATS =================
export const getDashboardStats = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/dashboard/admin`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Failed to load stats");
  return await res.json();
};

// ================= GET ALL GRIEVANCES =================

export const  getAllGrievances   = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/dashboard/admin`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Failed to load grievances");
  return await res.json();
};
//===============GET GRIVENCE DATA BY ID===============
export const getGrievanceById = async (id) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/grievances/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch grievance");

  return res.json();
};

// ================= UPDATE GRIEVANCE =================
export const updateGrievance = async (id, payload) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/grievances/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      block: payload.block,
      gp: payload.gp,
      villageSahi: payload.villageSahi,
      address: payload.address,
      wardNo: payload.wardNo,
      name: payload.name,
      fatherSpouseName: payload.fatherSpouseName,
      contact: payload.contact,
      topic1: payload.topic1,
      topic2: payload.topic2,
      topic3: payload.topic3,
      topic4: payload.topic4,
      topic5: payload.topic5,
      grievanceDetails: payload.grievanceDetails,
      agentRemarks: payload.agentRemarks,
      agentName: payload.agentName,
      workGivenTo: payload.workGivenTo,
      status: payload.status,
      adminDate: payload.adminDate,
      adminRemarks: payload.adminRemarks,
      attachments: payload.attachments 

    }),
  });
  

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText);
  }

  return response.json();
};


// ================= PATCH USER STATUS (ACTIVATE/DEACTIVATE) =================
export const patchUserStatus = async (userId, activate) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${BASE_URL}/users/${userId}/status?activate=${activate}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Failed to update user status");
  }

  return response.json();
};

// ================= GET ALL GRIEVANCES =================

export const fetchGrievances = async (page = 0, size = 20) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${BASE_URL}/grievances/all?page=${page}&size=${size}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) throw new Error("Failed to fetch grievances");
  return response.json();
};

// ================= GET GRIEVANCE LIST FOR ADMIN =================
export const getGrievanceFilter = async (query) => {
  const token = localStorage.getItem("token"); // or sessionStorage

  const response = await fetch(`${BASE_URL}/grievances?${query}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,   // THIS WAS MISSING
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Failed to fetch grievances");
  }

  return response.json();
};


// ================= CREATE GRIEVANCE =================
export const createGrievance = async (data) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/grievances`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

