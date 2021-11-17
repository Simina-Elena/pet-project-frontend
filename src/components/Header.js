import {makeStyles} from "@mui/styles";
import { Button, Collapse, IconButton, Stack} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Link as Scroll} from 'react-scroll';


const useStyles = makeStyles((theme) => ({
    root: {
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
export default function Header() {
    const classes = useStyles()
    const [checked, setChecked] = useState(false);
    useEffect(() => {
        setChecked(true);
    }, []);
    return (
        <div className={classes.root}>
            <Collapse in={checked}
                      {...(checked ? {timeout: 1000} : {})}
                      collapsedHeight={50}>
                <div className={classes.container}>
                    <h1 className={classes.title}>Welcome</h1>
                    <Stack direction="row" spacing={2}>
                        <Link to={{pathname: "/register/shelter"}}>
                            <Button color='secondary' variant="contained">Register as shelter</Button>
                        </Link>
                        <Button color="secondary" variant="contained">Register as visitor</Button>
                    </Stack>
                    {/*<Scroll to="action" smooth={true}>*/}
                    {/*    <IconButton>*/}
                    {/*        <KeyboardArrowDownIcon className={classes.goDown}/>*/}
                    {/*    </IconButton>*/}
                    {/*</Scroll>*/}
                </div>
            </Collapse>
        </div>
    )
}