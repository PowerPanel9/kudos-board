const TOKEN_KEY = "kudos_auth_token";
const DISPLAY_NAME_KEY = "kudos_display_name";

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(DISPLAY_NAME_KEY);
};

export const getAuthHeaders = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getUsernameFromToken = () => {
  const token = getToken();
  if (!token) return "";

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.username || "";
  } catch (error) {
    return "";
  }
};

export const getNameFromToken = () => {
  const token = getToken();
  if (!token) return "";

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.name || "";
  } catch (error) {
    return "";
  }
};

export const getUserIdFromToken = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.userId ?? null;
  } catch (error) {
    return null;
  }
};

export const setDisplayName = (name) => {
  if (!name) return;
  localStorage.setItem(DISPLAY_NAME_KEY, name);
};

export const getDisplayName = () => {
  return localStorage.getItem(DISPLAY_NAME_KEY) || "";
};

