import {makeStyles} from "@mui/styles";
import {AppBar, Button, Collapse, IconButton, Stack, Toolbar, Typography} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {useEffect, useState} from "react";
import {green} from "@mui/material/colors";
import {Link} from "react-router-dom";
import {Link as Scroll} from 'react-scroll';
import Action from "./Action";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontFamily: 'Nunito',
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
        color: '#fff',
        fontSize: '4.5rem',
        paddingRight: '30px'
    },
    goDown: {
        color: "#fff",
        fontSize: '4rem',
    },
}))
export default function Header() {
    const classes = useStyles()
    const [checked, setChecked] = useState(false);
    useEffect(() => {
        setChecked(true);
    }, []);
    return (
        <div className={classes.root} id="header">
            <AppBar className={classes.appbar} elevation={0}>
                <Toolbar className={classes.appbarWrapper}>
                    <h1 className="font-semibold text-4xl text-white"><span
                        className={classes.colorText}>Adoption and caring</span> center</h1>
                </Toolbar>

            </AppBar>
            <Collapse in={checked}
                      {...(checked ? {timeout: 1000} : {})}
                      collapsedHeight={50}>
                <div className={classes.container}>
                    <h1 className={classes.title}>Welcome</h1>
                    <Stack direction="row" spacing={2}>
                        <Link to={{pathname: "/register/shelter"}}>
                            <Button color="secondary" variant="contained">Register as shelter</Button>
                        </Link>
                        <Button color="secondary" variant="contained">Register as visitor</Button>
                    </Stack>
                    <Scroll to="action" smooth={true}>
                        <IconButton>
                            <KeyboardArrowDownIcon className={classes.goDown}/>
                        </IconButton>
                    </Scroll>
                </div>
            </Collapse>
        </div>
    )
}