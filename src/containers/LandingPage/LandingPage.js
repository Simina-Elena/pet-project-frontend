import {makeStyles} from "@mui/styles";
import Header from "../Header";
import {Button, Collapse, CssBaseline, Stack} from "@mui/material";
import Action from "../../components/Action";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
        background: `url(${process.env.PUBLIC_URL + '/assets/dogcat11.jpg'})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',

    },
    choices: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Nunito'

    },
    appbar: {
        background: 'transparent !important',
        boxShadow: 'none'
    },
    appbarWrapper: {
        width: '80%',
        margin: '0 auto',
    },
    appbarTitle: {
        flexGrow: '1',
        color: '#fff',

    },
    icon: {
        color: '#fff',
        fontSize: '2rem',
    },
    colorText: {
        color: '#9c27b0',
    },
    container: {
        textAlign: 'center',
    },
    title: {
        color: '#E4BAD4',
        fontSize: '4.5rem',
        paddingRight: '30px'

    },
    goDown: {
        color: "#fff",
        fontSize: '4rem',
    },
}))
const LandingPage = () => {
    const classes = useStyles()
    const [checked, setChecked] = useState(false);
    useEffect(() => {
        setChecked(true);
    }, []);
    return (
        <div className={classes.root}>
            <CssBaseline />
            <div className={classes.choices}>
                <Collapse in={checked}
                          {...(checked ? {timeout: 1000} : {})}
                          collapsedHeight={50}>
                    <div className={classes.container}>
                        <h1 className={classes.title}>Welcome</h1>
                        <Stack direction="row" spacing={2}>
                            <Link to={{pathname: "/register/shelter"}}>
                                <Button color='secondary' variant="contained"
                                        sx={{fontFamily: 'Lora', fontWeight: '600'}}>Register as shelter</Button>
                            </Link>
                            <Button color="secondary" variant="contained"
                                    sx={{fontFamily: 'Lora', fontWeight: '600'}}>Register as visitor</Button>
                        </Stack>
                        {/*<Scroll to="action" smooth={true}>*/}
                        {/*    <IconButton>*/}
                        {/*        <KeyboardArrowDownIcon className={classes.goDown}/>*/}
                        {/*    </IconButton>*/}
                        {/*</Scroll>*/}
                    </div>
                </Collapse>
            </div>
        </div>
    )
}

export default LandingPage