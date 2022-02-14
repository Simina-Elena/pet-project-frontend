import {Route, Switch} from "react-router-dom";
import LandingPage from "./containers/LandingPage/LandingPage";
import {Register} from "pet-project-frontend-sharedcomponents";
import './index.css'
import Login from "./containers/Login/Login";
import Layout from "./components/Layout/Layout";
import ShelterPage from "./containers/ShelterPage/ShelterPage";
import { atom } from "jotai";
import PetDetails from "./containers/PetDetails/PetDetails";
import AuthService from "./services/auth.service";

export const userAtom = atom(AuthService.getCurrentUser() !== null);
export const nameAtom = atom(AuthService.getCurrentUser() !== null ? AuthService.getCurrentUser().username : "");

export default function App() {
    return (
        <Layout>
            <Switch>
                <Route exact path="/" component={LandingPage}/>
                <Route exact path="/register/shelter" component={Register}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/dashboard" component={ShelterPage}/>
                <Route exact path="/pet-details" component={PetDetails}/>
            </Switch>
        </Layout>

    );
}

