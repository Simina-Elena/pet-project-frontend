import {AppBar, Box, Button, IconButton, Toolbar, Typography, Link as link} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {makeStyles} from "@mui/styles";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontFamily: 'Nunito',
    },
    appbar: {
        background: '#E4BAD4 !important',
        boxShadow: 'none'
    },
    appbarWrapper: {
        width: '80%',
        margin: '0 auto',
    },
    appbarTitle: {
        flexGrow: '1',
        color: '#f0e6ef',

    },
    icon: {
        color: '#fff',
        fontSize: '2rem',
    },
    colorText: {
        color: '#9c27b0',
    },
    colorText2: {
        color: '#f0e6ef'
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
    buttonHover: {
        '&:hover': {
            backgroundColor: '#E4BAD4',
            color: '#9c89b8',
        },
        fontFamily: 'Nunito',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 'large'
    },
    hover: {
        '&:hover': {
            backgroundColor: '#E4BAD4',
            color: '#9c89b8',
        },

    }
}))

export default function Navbar() {
    const classes = useStyles()

    return (
        <div>
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static" className={classes.appbar} elevation={0}>
                    <Toolbar className={classes.appbarWrapper}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <MenuIcon/>
                        </IconButton>

                        <Typography fontWeight="bold" fontFamily="Nunito" variant="h4" component="div"
                                    sx={{flexGrow: 1}}>
                            <Link to={{pathname: '/'}} className={classes.hover}>
                                <span className={classes.colorText}> Pet</span>Hugs
                            </Link>
                        </Typography>

                        <Link to={{pathname: '/login'}} className={classes.buttonHover}>Login</Link>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    );
}