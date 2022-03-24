import {AppBar, Box, Button, IconButton, Toolbar, Typography, Link as link, Stack} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {makeStyles} from "@mui/styles";
import {Link, useHistory} from "react-router-dom";
import AuthService from "../../services/auth.service";
import {useAtom} from "jotai";
import {userAtom} from "../../App";

const useStyles = makeStyles((theme) => ({

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

    colorText: {
        color: '#9c27b0',
    },

    buttonHover: {
        '&:hover': {
            backgroundColor: '#E4BAD4',
            color: '#9c89b8',
        },
        fontFamily: 'Lora',
        color: '#fff',
        fontWeight: '600',
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
    const [user, setUser] = useAtom(userAtom);
    const history = useHistory()


    const handleLogOut = () => {
        AuthService.logout();
        history.push("/login");
        setUser(false)
    };

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

                        <Typography fontWeight="600" fontFamily="Lora" variant="h4" component="div"
                                    sx={{flexGrow: 1}}>
                            <Link to={{pathname: '/'}} className={classes.hover}>
                                <span className={classes.colorText}> Pet</span>Hugs
                            </Link>
                        </Typography>

                            {user ? (
                                <Stack direction="row" spacing={2} padding='10px'>
                                    <Button sx={{'&:hover': {
                                                backgroundColor: '#E4BAD4',
                                                color: '#9c89b8',
                                            }, fontFamily: 'Lora',
                                        color: '#fff',
                                        fontWeight: '600',
                                        fontSize: 'medium'}} onClick={() => history.push('/dashboard')}>
                                        Dashboard
                                    </Button>
                                    <Button sx={{'&:hover': {
                                            backgroundColor: '#E4BAD4',
                                            color: '#9c89b8',
                                        },
                                        fontFamily: 'Lora',
                                        color: '#fff',
                                        fontWeight: '600',
                                        fontSize: 'medium'}} onClick={handleLogOut}>
                                        Log out
                                    </Button>
                                </Stack>

                            ) :
                            ( <Link to={{pathname: '/login'}} className={classes.buttonHover}>Login</Link>)}


                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    );
}