import axios from "axios";
import {useEffect, useState} from "react";
import {
    Box, Button,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Container,
    createTheme,
    CssBaseline, Modal, TextField,
    Typography
} from "@mui/material";
import * as React from "react";
import {ThemeProvider} from "@mui/styles";


const theme = createTheme({
    components: {
        MuiTypography: {
            defaultProps: {
                display: "flex",
                "& .hidden-button": {
                    display: "none"
                },
                "&:hover .hidden-button": {
                    display: "block"
                },

            }
        }
    }
})

export default function PetDetails(props) {
    const petId = props.location.state
    const [pet, setPet] = useState({})
    const joinedDate = pet.joinedDate
    let [gender, setGender] = useState();
    let [adopted, setAdopted] = useState();
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState({
        name: '',
        age: '',
        race: '',
        color: '',
        description: '',
        joinedDate: joinedDate,
        adopted: ''
    });

    const genders = [
        {
            value: 'FEMALE',
            label: 'F',
        },
        {
            value: 'MALE',
            label: 'M',
        },
        {
            value: 'OTHER',
            label: 'OTHER',
        },
    ];

    const adoptedValues = [
        {
            value: 'TRUE',
            label: 'yes'
        },
        {
            value: 'FALSE',
            label: 'not yet'
        }
    ]

    const fetchPet = async () => {
        const data = await axios.get(`http://localhost:8080/api/pet/${petId}`)
        const resp = await data.data
        console.log(resp)
        setPet(resp)
    }


    useEffect(() => {
        fetchPet()

    }, [])

    const petAge = () => {
        if (pet.age < 1) {
            return (pet.age + " months")
        } else if (pet.age === 1) {
            return (pet.age + " year")
        } else {
            return (pet.age + " years")
        }
    }

    const petAdopted = () => {
        if (pet.adopted === false) {
            return ("not yet")
        } else {
            return ("yes")
        }
    }

    //Edit pet modal
    const handleOpen = () => {
        values.adopted = adopted
        values.race = pet.race
        values.age = pet.age
        values.name = pet.name
        values.description = pet.description
        values.color = pet.color
        setOpen(true)
    };

    const handleClose = () => {
        values.race = ''
        values.age = ''
        values.name = ''
        values.description = ''
        values.color = ''
        values.adopted = ''
        setOpen(false)
    };


    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value});
        console.log(values)
    };

    const handleChangeGender = (event) => {
        setGender(event.target.value);
        console.log(gender)
    };

    const handleChangeAdopted = (event) => {
        setAdopted(event.target.value);
        console.log(adopted)
    };

    const handleEditPet = async (e) => {
        e.preventDefault()
        console.log(values)
        let name = values.name
        let age = values.age
        let color = values.color
        let race = values.race
        let description = values.description
        console.log(gender)
        let dataToUpdate = {name, gender, age, color, race, description, adopted, joinedDate}
        await axios.patch(`http://localhost:8080/api/pet/edit/${petId}`, dataToUpdate)
        handleClose()
        await fetchPet()
    }

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

    return (
        <div>
            <Container maxWidth="md">
                <Box sx={{justifyContent: 'center', alignItems: 'center', padding: '15px'}}>
                    <Card sx={{maxWidth: 700}}>
                        <CardMedia
                            component="img"
                            height="140"
                            image="/assets/cat.jpg"
                            alt="cat"
                        />
                        <CardContent>
                            <ThemeProvider theme={theme}>
                                <Typography variant="h6" color="text.secondary">
                                    <img className="margin-flex" width='30px' src="/assets/footprint.png"/>
                                    <span className="mr-10">Name: {pet.name}</span>
                                </Typography>
                                <Typography variant="h6" color="text.secondary">
                                    <img className="margin-flex" width='30px'
                                         src="/assets/description.png"/> <span
                                    className="mr-10">Description: {pet.description}</span>
                                </Typography>
                                <Typography variant="h6" color="text.secondary">
                                    <img className="margin-flex" width='30px' src="/assets/date.png"
                                    /> <span className="mr-10">Joined date: {pet.joinedDate}</span>
                                </Typography>
                                <Typography variant="h6" color="text.secondary">
                                    <img className="margin-flex" width='30px' src="/assets/birthday.png"
                                    /> <span className="mr-10">Age: {petAge()}</span>
                                </Typography>
                                <Typography variant="h6" color="text.secondary">
                                    <img className="margin-flex" width='30px' src="/assets/gender.png"
                                    /> <span className="mr-10">Race: {pet.race}</span>
                                </Typography>
                                <Typography variant="h6" color="text.secondary">
                                    <img className="margin-flex" width='30px' src="/assets/gender1.png"
                                    /><span className="mr-10">Gender: {pet.gender}</span>
                                </Typography>
                                <Typography variant="h6" color="text.secondary">
                                    <img className="margin-flex" width='30px' src="/assets/color.png"
                                    /><span className="mr-10">Color: {pet.color}</span>
                                </Typography>
                                <Typography variant="h6" color="text.secondary">
                                    <img className="margin-flex" width='30px' src="/assets/adopted.svg"
                                    /><span className="mr-10">Adopted: {petAdopted()}</span>
                                </Typography>
                            </ThemeProvider>
                            <div className="float-right">
                                <img onClick={handleOpen} width="60px" src="/assets/icons8-edit (2).svg"/>
                            </div>
                        </CardContent>
                    </Card>
                </Box>
                <Box sx={{padding: '10px'}}>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title-edit"
                        aria-describedby="modal-modal-description-edit"
                    >
                        <Box sx={style}>
                            <img width='30px' align='left' src="/assets/catedit.png" className="mr-2"/>
                            <Typography id="modal-modal-title-edit" variant="h6" component="h2" mb='10px'
                                        fontFamily='Lora' fontWeight='600'>
                                Edit pet details
                            </Typography>
                            <Box onSubmit={handleEditPet} component="form"
                                 sx={{display: 'table', textAlign:'center'}}>
                                <TextField
                                    label="name"
                                    id="name"
                                    sx={{m: 1, width: '50ch'}}
                                    color="secondary"
                                    size="small"
                                    value={values.name}
                                    onChange={handleChange('name')}
                                />
                                <TextField
                                    id="gender"
                                    select
                                    label="gender"
                                    value={gender}
                                    onChange={handleChangeGender}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    color="secondary"
                                >
                                    {genders.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </TextField>
                                <TextField
                                    label="age"
                                    id="age"
                                    sx={{m: 1, width: '50ch'}}
                                    color="secondary"
                                    size="small"
                                    value={values.age}
                                    onChange={handleChange('age')}
                                />
                                <TextField
                                    label="race"
                                    id="race"
                                    sx={{m: 1, width: '50ch'}}
                                    color="secondary"
                                    size="small"
                                    value={values.race}
                                    onChange={handleChange('race')}
                                />
                                <TextField
                                    label="color"
                                    id="color"
                                    sx={{m: 1, width: '50ch'}}
                                    color="secondary"
                                    size="small"
                                    value={values.color}
                                    onChange={handleChange('color')}
                                />
                                <TextField
                                    label="description"
                                    id="description"
                                    sx={{m: 1, width: '50ch'}}
                                    color="secondary"
                                    size="small"
                                    value={values.description}
                                    onChange={handleChange('description')}
                                />
                                <TextField
                                    id="adopted"
                                    select
                                    label="adopted"
                                    value={adopted}
                                    onChange={handleChangeAdopted}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    color="secondary"
                                >
                                    {adoptedValues.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </TextField>
                                <Button sx={{margin: 'auto', mt: '20px',  display: 'table-cell', verticalAlign: 'bottom',
                                    fontFamily: 'Lora', fontWeight: '600'}}
                                        type="submit"
                                        color="secondary" variant="contained"
                                >
                                    Submit
                                </Button>
                            </Box>
                        </Box>
                    </Modal>
                </Box>
            </Container>
        </div>
    )
}