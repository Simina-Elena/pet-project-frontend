import axios from "axios";
import AuthService from "../services/auth.service";
import authHeader from "../services/auth-header";

export const fetchShelter = async (username) => {
    return await axios.get(`http://localhost:8080/api/shelter/profile/${AuthService.getCurrentUser().username}`,
        {headers: authHeader()})
}