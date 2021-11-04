import {Route, Switch} from "react-router-dom";
import LandingPage from "./LandingPage";
import RegisterShelter from "./RegisterShelter";
import {createTheme, typographyClasses} from "@mui/material";
import {ThemeProvider} from "@mui/material";
import './index.css'

const theme = createTheme({

})

export default function App() {
    return (
        <div className="App">
                <Switch>
                    <Route exact path="/" component={LandingPage}/>
                    <Route exact path="/register/shelter" component={RegisterShelter}/>
                </Switch>
        </div>

    );
}

