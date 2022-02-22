import axios from "axios";
import {AuthService, authHeader} from "pet-project-frontend-sharedcomponents";

export const fetchShelter = async (username) => {
    return await axios.get(`http://localhost:8080/api/shelter/profile/${AuthService.getCurrentUser().username}`,
        {headers: authHeader()})
}