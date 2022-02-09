import axios from "axios";
import {useEffect, useState} from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Container,
    createTheme,
    FormControl,
    IconButton, ImageList,
    ImageListItem,
    InputLabel,
    ListItem,
    ListItemAvatar, ListItemIcon, ListItemText,
    MenuItem,
    Modal,
    Select,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import * as React from "react";
import {ThemeProvider} from "@mui/styles";
import ImageGallery from 'react-image-gallery';
import DeleteIcon from '@mui/icons-material/Delete'
import AuthService from "../../services/auth.service";
import authHeader from "../../services/auth-header";
import {Input, List, PhotoCamera} from "@mui/icons-material";
import {styled} from "@mui/material/styles";
import Carousel from "nuka-carousel";
import FolderIcon from '@mui/icons-material/Folder';
import moment from "moment";


const theme = createTheme({
    components: {
        MuiTypography: {
            defaultProps: {
                display: "flex",

            }
        }
    }
})

export default function PetDetails(props) {
    const petId = props.location.state;
    const [pet, setPet] = useState({});
    const [gender, setGender] = useState('');
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [values, setValues] = useState({
        name: '',
        age: '',
        race: '',
        color: '',
        description: '',
        date: new Date()
    });

    const genders = [
        {
            value: 'FEMALE',
            label: 'female',
        },
        {
            value: 'MALE',
            label: 'male',
        },

    ];

    const fetchPet = async () => {
        const data = await axios.get(`http://localhost:8080/api/pet/${petId}`)
        const resp = await data.data
        console.log(resp)
        setPet(resp)
    }

    const handleImage = async (e) => {
        e.preventDefault()
        let formData = new FormData()
        formData.append('file', file)
        formData.append('id', petId)
        await axios.post(`http://localhost:8080/file/upload`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
        setFile('')
        await getImages()
    }

    const getImages = async () => {
        const data = await axios.get(`http://localhost:8080/api/images/for-pet/${petId}`, {
            headers: authHeader(),
            "Content-Type": "multipart/form-data"
        })
        const resp = await data.data
        console.log(data)
        setPhotos(resp)
    }

    useEffect(() => {
        fetchPet()
        getImages()

    }, [])

    const petAge = () => {
        if (pet.age < '1') {
            return (pet.age + " months")
        } else if (pet.age === '1') {
            return (pet.age + " year")
        } else {
            return (pet.age + " years")
        }
    }

    //Edit pet modal
    const handleOpen = () => {
        values.race = pet.race
        values.age = pet.age
        values.name = pet.name
        values.description = pet.description
        values.color = pet.color
        setGender(pet.gender)
        setOpen(true)
    };

    const handleClose = () => {
        setOpen(false)
    };

    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value});
        console.log(values)
    };

    const handleChangeGender = (event) => {
        setGender(event.target.value);
    };

    const handleEditPet = async (e) => {
        e.preventDefault()
        console.log(values)
        const name = values.name
        const age = values.age
        const color = values.color
        const race = values.race
        const description = values.description
        const date = moment(values.date).format('YYYY-MM-DD')
        await axios.patch(`http://localhost:8080/api/pet/edit/${petId}`,
            {
                name,
                gender,
                age,
                color,
                race,
                description,
                date,
            })
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


    const images = [
        {
            original: 'https://picsum.photos/id/1018/1000/600/',
            thumbnail: 'https://picsum.photos/id/1018/250/150/',
        },
        {
            original: 'https://picsum.photos/id/1015/1000/600/',
            thumbnail: 'https://picsum.photos/id/1015/250/150/',
        },
        {
            original: 'https://picsum.photos/id/1019/1000/600/',
            thumbnail: 'https://picsum.photos/id/1019/250/150/',
        },
    ];

    const Input = styled('input')({
        display: 'none',
    });

    const handleDeletePicture = async (item) => {
        console.log(item)
        await axios.delete(`http://localhost:8080/file/delete-for-pet/${item}`)
        await getImages()
    }

    return (
        <div>
            <Container maxWidth="md">
                <Box sx={{justifyContent: 'center', alignItems: 'center', padding: '15px'}}>
                    <Card sx={{maxWidth: 700}}>
                        {photos.length > 0 ? (<Carousel style={{marginBottom: '10px'}}>
                            {photos.map((item) => (
                                <div style={{position: 'relative'}}>
                                    <DeleteIcon style={{position: 'absolute', top: '4px', right: '5px', color: 'red'}}
                                                onClick={() => handleDeletePicture(item.name)}/>
                                    <img src={'https://petprojectpetsimagesstorage.s3.amazonaws.com/' + item.name}
                                         alt={item.name}
                                         loading="lazy"/>
                                </div>
                            ))}
                        </Carousel>) : (<img src="/assets/nopicture.jpg"  alt="no picture"/>)}

                        <label htmlFor="icon-button-file">
                            <Stack direction="row" spacing={2}> <Input accept="image/*" id="icon-button-file"
                                                                       type="file"
                                                                       onChange={(e) => setFile(e.target.files[0])}/>
                                <IconButton color="primary"  component="span">
                                    <PhotoCamera color="secondary"/>
                                </IconButton>
                                <Typography>{file.name}</Typography>
                                <Button sx={{fontFamily: 'Lora', fontWeight: 600}} color='secondary'
                                        onClick={handleImage}>Upload picture</Button>
                            </Stack>
                        </label>
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
                                    /> <span className="mr-10">Breed: {pet.race}</span>
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
                                    /><span className="mr-10">Adopted: not yet</span>
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
                                 sx={{display: 'table', textAlign: 'center'}}>
                                <TextField
                                    label="name"
                                    id="name"
                                    sx={{m: 1, width: '50ch'}}
                                    color="secondary"
                                    size="small"
                                    value={values.name}
                                    onChange={handleChange('name')}
                                />
                                <FormControl>
                                    <InputLabel color="secondary" id="select-gender">gender</InputLabel>
                                    <Select
                                        color="secondary"
                                        sx={{width: '21ch'}}
                                        labelId="select-gender"
                                        id="gender"
                                        value={gender}
                                        label="gender"
                                        onChange={handleChangeGender}>
                                        {genders.map((gender) => (
                                            <MenuItem key={gender.value} value={gender.value}>
                                                {gender.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
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
                                    label="breed"
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
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        views={['day']}
                                        label="Joined date"
                                        value={values.date}
                                        onChange={(newValue) => {
                                            setValues({...values, ['date']: newValue});
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                     />
                                </LocalizationProvider>
                                <Button sx={{
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
            </Container>
        </div>
    )
}