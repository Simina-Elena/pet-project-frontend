import {AppBar, Container, Toolbar, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";

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
    button: {
        fontFamily: 'Nunito'
    }
}))
export default function Footer() {
    const classes = useStyles()

    return (
        <AppBar className={classes.appbar} position="static" color="primary">
            <Container maxWidth="md">
                <Toolbar>
                    <Typography variant="body1" >
                        © 2021 PetHugs Contact 0744551257
                    </Typography>

                </Toolbar>
            </Container>
        </AppBar>
    )
}