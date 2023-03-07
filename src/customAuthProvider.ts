import { AuthProvider } from "react-admin";

const authProvider: AuthProvider = {
  // authentication
  login: async (tempAccessToken: string) => {
    localStorage.setItem("lbtoken", JSON.stringify(tempAccessToken));
    return Promise.resolve();
  },
  checkError: async (error) => {
    const { status } = error;

    if (status === 401 || status === 403) {
      localStorage.removeItem("lbtoken");
      return Promise.reject();
    }

    return Promise.resolve();
  },
  checkAuth: async () => {
    const token = JSON.parse(localStorage.getItem("lbtoken") ?? "");
    if (token) {
      return Promise.resolve();
    } else {
      localStorage.removeItem("lbtoken");
      localStorage.removeItem("role");
      return Promise.reject({ redirectTo: "/login" });
    }
  },
  logout: async () => {
    localStorage.removeItem("lbtoken");
    localStorage.removeItem("role");
  },
  // authorization
  getPermissions: async () => {
    const role = localStorage.getItem('role');
    return role ? Promise.resolve(role) : Promise.reject();
  },
};

export default authProvider;
