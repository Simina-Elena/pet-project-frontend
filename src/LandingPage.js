import {makeStyles} from "@mui/styles";
import RegisterShelter from "./RegisterShelter";
import Header from "./components/Header";
import {CssBaseline} from "@mui/material";
import Action from "./components/Action";

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
        backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/dogcat1.jpg'})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    }
}))
const LandingPage = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <CssBaseline />
            <Header/>
            <Action/>
        </div>

    )
}

export default LandingPage