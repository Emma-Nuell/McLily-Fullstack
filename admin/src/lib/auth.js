export const getToken = () => {
  return localStorage.getItem("adminToken"); 
};

export const setToken = (token) => {
  localStorage.setItem("adminToken", token);
};

export const clearToken = () => {
  localStorage.removeItem("adminToken");
};
