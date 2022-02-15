import {Route, Switch} from "react-router-dom";
import LandingPage from "./containers/LandingPage/LandingPage";
import './index.css'
import Layout from "./components/Layout/Layout";
import ShelterPage from "./containers/ShelterPage/ShelterPage";
import { atom } from "jotai";
import PetDetails from "./containers/PetDetails/PetDetails";
import {AuthService, Register} from "pet-project-frontend-sharedcomponents";
import LoginShelter from "./containers/Login/LoginShelter";

export const userAtom = atom(AuthService.getCurrentUser() !== null);
export const nameAtom = atom(AuthService.getCurrentUser() !== null ? AuthService.getCurrentUser().username : "");

export default function App() {
    return (
        <Layout>
            <Switch>
                <Route exact path="/" component={LandingPage}/>
                <Route exact path="/register/shelter" component={Register}/>
                <Route exact path="/login" component={LoginShelter}/>
                <Route exact path="/dashboard" component={ShelterPage}/>
                <Route exact path="/pet-details" component={PetDetails}/>
            </Switch>
        </Layout>

    );
}

