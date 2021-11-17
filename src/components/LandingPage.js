import {makeStyles} from "@mui/styles";
import Header from "./Header";
import {CssBaseline} from "@mui/material";
import Action from "./Action";
import Navbar from "./Navbar";
import Footer from "./Footer";

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
        background: `url(${process.env.PUBLIC_URL + '/assets/dogcat11.jpg'})`,
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
        </div>
    )
}

export default LandingPage