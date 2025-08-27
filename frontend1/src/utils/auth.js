export const getToken = () => {
  try {
    const userData = localStorage.getItem("user");
    if (!userData) return null;

    const user = JSON.parse(userData);
    return user.token || null;
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
};
export const setToken = (token) => {
  localStorage.setItem("userToken", token);
};

export const clearToken = () => {
  localStorage.removeItem("userToken");
};
