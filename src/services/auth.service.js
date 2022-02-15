import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

const registerShelter = (user) => {
    return axios.post(API_URL + "register/shelter", user);
};

const registerVisitor = (user) => {
    return axios.post(API_URL + "register/visitor", user);
};

const login = (user) => {
    return axios
        .post(API_URL + "login", user)
        .then((response) => {
            console.log(response.data)
            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data));
                localStorage.setItem("token", JSON.stringify(response.data.token));
            }
            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token")
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const addUserToLocalStorage = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
};

const AuthService = {
    registerShelter,
    registerVisitor,
    login,
    logout,
    getCurrentUser,
    addUserToLocalStorage,
};

export default AuthService;
