import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import HomeIcon from '@mui/icons-material/Home';
import BadgeIcon from '@mui/icons-material/Badge';
import EventIcon from '@mui/icons-material/Event';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import ReviewsIcon from '@mui/icons-material/Reviews';
import Divider from '@mui/material/Divider';
import {Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography} from "@mui/material";
import axios from "axios";
import AuthService from "../../services/auth.service";
import {useEffect, useState} from "react";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import authHeader from "../../services/auth-header";
import {useAtom} from "jotai";
import {nameAtom} from "../../App";
import moment from "moment";
import FetchData from "../fetchDataApi";

export default function ShelterInfo(props) {
    const [user, setUser] = useState(props.user)
    const [usernameAtom, setUsernameAtom] = useAtom(nameAtom)
    const [apiCountries, setApiCountries] = useState([])
    const [apiCities, setApiCities] = useState([])
    const [values, setValues] = useState({
        open: false,
        username: '',
        city: '',
        country: '',
        number: '',
        street: '',
        zip: '',
        email: '',
        phoneNumber: '',
        date: new Date()
    });
    console.log(props)

    useEffect(() => {
        setApiCountries(FetchData.fetchCountries())
    }, [])

    const handleUpdateShelterInfo = async (e) => {
        e.preventDefault()
        console.log(values)
        const username = values.username
        const city = values.city
        const country = values.country
        const number = values.number
        const street = values.street
        const zip = values.zip
        const address = {city: city, country: country, number: number, street: street, zip: zip}
        const email = values.email
        const phoneNumber = values.phoneNumber
        const date = moment(values.date).format('YYYY-MM-DD')
        console.log(date)
        const data = await axios.patch(`http://localhost:8080/api/shelter/profile-update/${AuthService.getCurrentUser().username}`,
            {
                username,
                address,
                email,
                phoneNumber,
                date
            }, {headers: authHeader()})
        const resp = data.data
        AuthService.addUserToLocalStorage(resp)
        setUser(resp)
        setUsernameAtom(resp.username)
        handleClose()
    }

    const handleOpen = () => {
        values.username = user.username
        values.email = user.email
        values.phoneNumber = user.phoneNumber
        if (user.address) {
            values.zip = user.address.zip
            values.street = user.address.street
            values.number = user.address.number
            values.city = user.address.city
            values.country = user.address.country
        }
        setValues({...values, open: true})
    }

    const handleClose = () => {
        setValues({...values, open: false})
    };

    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value});
    };

    let address = ""
    if (user.address)
        address = 'city: ' + user.address.city + ', country: ' + user.address.country +
            ', street: ' + user.address.street + ', number: ' + user.address.number +
            ', zip code: ' + user.address.zip

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        '& .MuiTextField-root': {m: 1, width: '25ch'},
    };

    if (!user)
        return (<div>loading...</div>)
    else
        return (
            <List>
                <Typography marginLeft={3} fontFamily='Lora' fontWeight={600} fontSize='1.2rem'> Shelter info
                    <img className="float-right" onClick={handleOpen} width="50px" src="/assets/icons8-edit (2).svg"/>
                </Typography>
                <Box sx={{padding: '10px'}}>
                    <Modal
                        open={values.open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title-edit"
                        aria-describedby="modal-modal-description-edit"
                    >
                        <Box sx={style}>
                            <img width='30px' align='left' src="/assets/catedit.png" className="mr-2"/>
                            <Typography id="modal-modal-title-edit" variant="h6" component="h2" mb='10px'
                                        fontFamily='Lora' fontWeight='600'>
                                Update shelter info
                            </Typography>
                            <Box onSubmit={handleUpdateShelterInfo} component="form"
                                 sx={{display: 'table', textAlign: 'center'}}>
                                <TextField
                                    label="username"
                                    id="username"
                                    sx={{m: 1, width: '50ch'}}
                                    color="secondary"
                                    size="small"
                                    value={values.username}
                                    onChange={handleChange('username')}
                                />

                                <FormControl>
                                    <InputLabel color="secondary" id="select-country">country</InputLabel>
                                    <Select
                                        color="secondary"
                                        sx={{width: '24ch', m: 1}}
                                        labelId="select-country"
                                        id="country"
                                        value={values.country}
                                        label="country"
                                        onChange={handleChange('country')}>
                                        {apiCountries.map((country) => (
                                            <MenuItem value={country.name}>
                                                {country.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <TextField
                                    label="city"
                                    id="city"
                                    sx={{m: 1, width: '50ch'}}
                                    color="secondary"
                                    size="small"
                                    value={values.city}
                                    onChange={handleChange('city')}
                                />
                                {/*<FormControl>*/}
                                {/*    <InputLabel color="secondary" id="select-city">city</InputLabel>*/}
                                {/*    <Select*/}
                                {/*        color="secondary"*/}
                                {/*        sx={{width: '24ch', m: 1}}*/}
                                {/*        labelId="select-city"*/}
                                {/*        id="city"*/}
                                {/*        value={values.city}*/}
                                {/*        label="city"*/}
                                {/*        onChange={handleChange('city')}>*/}
                                {/*        {apiCities.map((city) => (*/}
                                {/*            <MenuItem value={city.name}>*/}
                                {/*                {city.name}*/}
                                {/*            </MenuItem>*/}
                                {/*        ))}*/}
                                {/*    </Select>*/}
                                {/*</FormControl>*/}
                                <TextField
                                    label="number"
                                    id="number"
                                    sx={{m: 1, width: '50ch'}}
                                    color="secondary"
                                    size="small"
                                    value={values.number}
                                    onChange={handleChange('number')}
                                />
                                <TextField
                                    label="street"
                                    id="street"
                                    sx={{m: 1, width: '50ch'}}
                                    color="secondary"
                                    size="small"
                                    value={values.street}
                                    onChange={handleChange('street')}
                                />
                                <TextField
                                    label="zip"
                                    id="zip"
                                    sx={{m: 1, width: '50ch'}}
                                    color="secondary"
                                    size="small"
                                    value={values.zip}
                                    onChange={handleChange('zip')}
                                />
                                <TextField
                                    label="email"
                                    id="email"
                                    sx={{m: 1, width: '50ch'}}
                                    color="secondary"
                                    size="small"
                                    value={values.email}
                                    onChange={handleChange('email')}
                                />
                                <TextField
                                    label="phone number"
                                    id="phoneNumber"
                                    sx={{m: 1, width: '50ch'}}
                                    color="secondary"
                                    size="small"
                                    value={values.phoneNumber}
                                    onChange={handleChange('phoneNumber')}
                                />
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        views={['day']}
                                        label="joined date"
                                        value={values.date}
                                        onChange={(newValue) => {
                                            setValues({...values, ['date']: newValue});
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                                <Button sx={{
                                    textTransform: 'none',
                                    margin: 'auto', mt: '20px', display: 'table-cell', verticalAlign: 'bottom',
                                    fontFamily: 'Lora', fontWeight: '600'
                                }}
                                        type="submit"
                                        color="secondary" variant="contained"
                                >
                                    Submit
                                </Button>
                            </Box>
                        </Box>
                    </Modal>
                </Box>

                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <BadgeIcon/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Username" secondary={user.username}/>
                </ListItem>
                <Divider variant="inset" component="li"/>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <HomeIcon/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Address" secondary={address}/>
                </ListItem>
                <Divider variant="inset" component="li"/>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <AttachEmailIcon/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Email" secondary={user.email}/>
                </ListItem>
                <Divider variant="inset" component="li"/>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <PhoneAndroidIcon/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Phone number" secondary={user.phoneNumber}/>
                </ListItem>
                <Divider variant="inset" component="li"/>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <ReviewsIcon/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Rating" secondary={user.rating}/>
                </ListItem>
                <Divider variant="inset" component="li"/>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <EventIcon/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Joined date" secondary={user.joinedDate}/>
                </ListItem>
            </List>
        );
}