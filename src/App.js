import {Route, Switch} from "react-router-dom";
import LandingPage from "./containers/LandingPage/LandingPage";
import './index.css'
import Layout from "./components/Layout/Layout";
import ShelterPage from "./containers/ShelterPage/ShelterPage";
import {atom} from "jotai";
import PetDetails from "./containers/PetDetails/PetDetails";
import {AuthService, Register} from "pet-project-frontend-sharedcomponents";
import LoginShelter from "./containers/Login/LoginShelter";
import RegisterShelter from "./containers/RegisterShelter/RegisterShelter";
import {ToastProvider} from "react-toast-notifications";

export const userAtom = atom(AuthService.getCurrentUser() !== null);
export const nameAtom = atom(AuthService.getCurrentUser() !== null ? AuthService.getCurrentUser().username : "");

export default function App() {
    return (
        <ToastProvider placement={'top-right'}>
            <Layout>
                <Switch>
                    <Route exact path="/" component={LandingPage}/>
                    <Route exact path="/register/shelter" component={RegisterShelter}/>
                    <Route exact path="/login" component={LoginShelter}/>
                    <Route exact path="/dashboard" component={ShelterPage}/>
                    <Route exact path="/pet-details" component={PetDetails}/>
                </Switch>
            </Layout>
        </ToastProvider>
    );
}

