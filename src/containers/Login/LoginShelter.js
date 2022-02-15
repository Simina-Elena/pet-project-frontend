import {useState} from "react";
import {useHistory} from "react-router-dom";
import {
    Box,
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField
} from "@mui/material";
import AuthService from "../../services/auth.service";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import * as React from "react";
import {useAtom} from "jotai";
import {nameAtom, userAtom} from "../../App";


function Login() {
    let history = useHistory()
    const [userLogged, setUserLogged] = useAtom(userAtom)
    const [usernameAtom, setUsernameAtom] = useAtom(nameAtom)

    const onFinishRegister = async (e) => {
        e.preventDefault()
        console.log(values)
        let username = values.username;
        let password = values.password;
        let user = {username, password};
        await AuthService.login(user)
        setUserLogged(true)
        setUsernameAtom(AuthService.getCurrentUser().username)
        history.push("/dashboard")
    };

    const [values, setValues] = useState({
        username: '',
        password: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value});
        console.log(values)
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
        console.log(values)
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div className="flex items-center p-20 ">
            <div className=" flex-1 h-full max-w-4xl mx-auto  rounded-lg shadow-xl">
                <div className="my-auto flex flex-col md:flex-row ">
                    <div className="invisible md:visible h-32 md:h-auto md:w-1/2">
                        <img
                            className="object-cover w-full h-full"
                            src="https://d3mvlb3hz2g78.cloudfront.net/wp-content/uploads/2020/07/thumb_720_450_dreamstime_m_156181857.jpg"
                            alt="img"
                        />
                    </div>
                    <div className="flex items-center justify-center object-center p-6 sm:p-12 md:w-1/2">
                        <div className="w-full ">
                            <h1 className="mb-4 text-2xl font-bold text-center text-gray-700">
                                Login
                            </h1>
                            <form onSubmit={onFinishRegister}>
                                <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
                                    <TextField
                                        label="Username"
                                        id="username"
                                        sx={{m: 1, width: '50ch'}}
                                        color="secondary"
                                        size="small"
                                        value={values.username}
                                        onChange={handleChange('username')}

                                    />
                                    <FormControl size="small" sx={{m: 1, width: '50ch'}} variant="outlined"
                                                 color="secondary">
                                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-password"
                                            type={values.showPassword ? 'text' : 'password'}
                                            value={values.password}
                                            onChange={handleChange('password')}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {values.showPassword ? <VisibilityOff/> : <Visibility/>}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="Password"
                                        />
                                    </FormControl>

                                    <Button sx={{margin: 'auto', mt: 2, width: 'min-content'}}
                                            type="submit"
                                            color="secondary" variant="contained"
                                    >
                                        Submit
                                    </Button>
                                </Box>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Login;