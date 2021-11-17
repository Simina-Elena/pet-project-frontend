import {Route, Switch} from "react-router-dom";
import LandingPage from "./components/LandingPage";
import RegisterShelter from "./components/RegisterShelter";
import './index.css'
import Login from "./components/Login";
import Layout from "./components/Layout";


export default function App() {
    return (
        <Layout>
            <Switch>
                <Route exact path="/" component={LandingPage}/>
                <Route exact path="/register/shelter" component={RegisterShelter}/>
                <Route exact path="/login" component={Login}/>
            </Switch>
        </Layout>

    );
}

