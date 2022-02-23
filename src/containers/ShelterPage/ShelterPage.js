import AuthService from "../../services/auth.service";
import {useEffect, useState} from "react";
import axios from "axios";
import {authHeader} from "pet-project-frontend-sharedcomponents";
import {
    alpha,
    Box,
    Button,
    Checkbox,
    Container,
    FormControl,
    FormControlLabel,
    IconButton,
    ImageList,
    ImageListItem, ImageListItemBar,
    InputBase,
    InputLabel,
    MenuItem,
    Modal,
    Paper,
    Select,
    Stack,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    TextField,
    Toolbar,
    Tooltip,
    Typography
} from "@mui/material";
import PropTypes from "prop-types";
import {visuallyHidden} from '@mui/utils';
import DeleteIcon from '@mui/icons-material/Delete';
import * as React from "react";
import {Link, useHistory} from "react-router-dom";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {Input, PhotoCamera} from "@mui/icons-material";
import {styled} from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import ShelterInfo from "../../components/ShelterInfo";
import {useAtom} from "jotai";
import {nameAtom} from "../../App";
import Adoptions from "../../components/Adoptions";
import EnhancedTableHead from "../../components/EnhancedTableHead";
import {EnhancedTableToolbar} from "../../components/EnhancedTableToolbar";
import MyPetsTable from "../../components/MyPetsTable";
import capitalize from "@mui/utils/capitalize";


export default function ShelterPage() {
    const [user, setUser] = useState({})
    const [usernameAtom] = useAtom(nameAtom)
    const [pets, setPets] = useState([])
    const [filteredPets, setFilteredPets] = useState([])
    const [activities, setActivities] = useState([])
    const [openPetModal, setOpenPetModal] = useState(false);
    const [openActivityModal, setOpenActivityModal] = useState(false);
    const [file, setFile] = useState("")
    const [photos, setPhotos] = useState([])
    let [gender, setGender] = useState();
    const [values, setValues] = useState({
        loading: true,
        name: '',
        age: '',
        race: '',
        color: '',
        description: '',
        capacity: '',
        type: ''
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

    const activityTypes = [
        {
            value: 'INDOOR',
            label: 'indoor'
        },
        {
            value: 'OUTDOOR',
            label: 'outdoor'
        }
    ]

    const headCells = [
        {
            id: 'name',
            label: 'Name',
        },
        {
            id: 'gender',
            label: 'Gender',
        },
        {
            id: 'age',
            label: 'Age',
        },
        {
            id: 'race',
            label: 'Breed',
        },
        {
            id: 'color',
            label: 'Color',
        },
    ];


    const getShelter = async () => {
        const data = await axios.get(`http://localhost:8080/api/shelter/profile/${AuthService.getCurrentUser().username}`,
            {headers: authHeader()})
        const resp = await data.data
        console.log(resp)
        setUser(resp)
        setValues({...values, loading: false})
    }

    const getPets = async () => {
        await getShelter()
        const data = await axios.get(`http://localhost:8080/api/pet/list/${AuthService.getCurrentUser().id}`,
            {headers: authHeader()})
        const res = await data.data
        setPets(res)
    }

    const getActivities = async () => {
        const data = await axios.get(`http://localhost:8080/api/activities?shelterId=${AuthService.getCurrentUser().id}`)
        const res = await data.data
        setActivities(res)
    }

    const handleImage = async (e) => {
        e.preventDefault()
        let formData = new FormData()
        formData.append('file', file)
        formData.append('id', AuthService.getCurrentUser().id)
        await axios.post(`http://localhost:8080/file/upload`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
        setFile('')
        await getImages()
    }
    //TODO: verify click add image

    const getImages = async () => {
        const data = await axios.get(`http://localhost:8080/api/images/for-shelter/${AuthService.getCurrentUser().id}`, {
            headers: authHeader(),
            "Content-Type": "multipart/form-data"
        })
        const resp = await data.data
        console.log(data)
        setPhotos(resp)
    }

    useEffect(() => {
        getPets()
        getActivities()
        getImages()
    }, [usernameAtom])


    const handleOpen = () => setOpenPetModal(true);
    const handleOpenActivityModal = () => setOpenActivityModal(true);

    const handleClose = () => {
        gender = ''
        values.race = ''
        values.age = ''
        values.name = ''
        values.description = ''
        values.color = ''
        setOpenPetModal(false)
    };

    const handleCloseActivityModal = () => {
        setOpenActivityModal(false)
    };

    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value});
        console.log(values)
    };

    const handleChangeGender = (event) => {
        setGender(event.target.value);
        console.log(gender)
    };


    const onSubmitAddPet = async (e) => {
        e.preventDefault()
        let name = capitalize(values.name)
        let age = values.age
        let color = values.color
        let race = values.race
        let description = values.description
        await axios.post(`http://localhost:8080/api/pet/add/${AuthService.getCurrentUser().id}`,
            {
                name,
                gender,
                age,
                color,
                race,
                description
            })
        handleClose()
        await getPets()
    }


    const handleSearchPet = (e) => {
        console.log(e.target.value)
        if (e.key === 'Enter')
            setFilteredPets(pets.filter(pet => capitalize(pet.name).includes(e.target.value)))
    }


//AddPet modal style
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
        '& .MuiTextField-root': {m: 1, width: '25ch'}
    };

    const onSubmitAddActivity = async (e) => {
        e.preventDefault()
        let capacity = values.capacity
        let type = values.type
        let shelterId = AuthService.getCurrentUser().id
        await axios.post(`http://localhost:8080/api/activities`,
            {capacity, type, shelterId})
        handleCloseActivityModal()
        await getActivities()
    }
    const [valueTabs, setValueTabs] = useState(0);

    const handleChangeTabs = (event, newValue) => {
        setValueTabs(newValue);
    };

    const handleDeleteActivity = async () => {
        await axios.delete(`http://localhost:8080/api/activities?activityId=${valueTabs}`)
        await getActivities()
    }

    const handleDeletePet = async (selected) => {
        selected.forEach((petId) => axios.delete(`http://localhost:8080/api/pet/delete/${petId}`))
        await getPets()
    }

    const handleDecreaseCapacity = async () => {
        await axios.patch(`http://localhost:8080/api/activities/decrease-capacity?activityId=${valueTabs}`)
        await getActivities()
    }

    const handleIncreaseCapacity = async () => {
        await axios.patch(`http://localhost:8080/api/activities/increase-capacity?activityId=${valueTabs}`)
        await getActivities()
    }

    const Input = styled('input')({
        display: 'none',
    });

    const handleDeletePicture = async (item) => {
        console.log(item)
        await axios.delete(`http://localhost:8080/file/delete-for-shelter/${item}`)
        await getImages()
    }


    if (values.loading)
        return (<div>loading...</div>)
    else
        return (
            <div>
                <Container maxWidth="md">
                    <ImageList sx={{width: 'auto', height: 250, padding: '10px'}} cols={2} rowHeight={350}>
                        {photos.map((item) => (
                            <ImageListItem key={item.name}>
                                <img
                                    src={'https://petprojectimagestorage.s3.amazonaws.com/' + item.name}
                                    alt={item.name}
                                    loading="lazy"
                                />
                                <ImageListItemBar
                                    sx={{
                                        background:
                                            'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                            'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                                    }}
                                    position="top"
                                    actionIcon={
                                        <IconButton
                                            sx={{color: 'white'}}
                                            aria-label={`star ${item.title}`}
                                        >
                                            <DeleteIcon onClick={() => handleDeletePicture(item.name)}/>
                                        </IconButton>
                                    }
                                    actionPosition="left"
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                    <Box sx={{padding: '10px'}}>
                        <Typography variant="h3" align="center"
                                    bgcolor='#F0E6EF' fontFamily='Lora'
                                    fontWeight='400'>{usernameAtom}
                        </Typography>

                        <label htmlFor="icon-button-file">
                            <Stack direction="row" spacing={2}> <Input accept="image/*" id="icon-button-file"
                                                                       type="file"
                                                                       onChange={(e) => setFile(e.target.files[0])}/>
                                <IconButton color="primary" aria-label="upload picture" component="span">
                                    <PhotoCamera color="secondary"/>
                                </IconButton>
                                <Typography>{file.name}</Typography>
                                <Button sx={{fontFamily: 'Lora', fontWeight: 600}} color='secondary'
                                        onClick={handleImage}>Upload
                                    picture</Button></Stack>
                        </label>

                        <Stack direction="row" spacing={2} padding='10px'>
                            <Button color="secondary" variant="contained" sx={{fontFamily: 'Lora', fontWeight: '600'}}
                                    onClick={handleOpen}>Add pet</Button>
                            {/*AddPet modal start*/}
                            <Modal
                                open={openPetModal}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <img width='30px' className="mr-2" src="/assets/gender.png" align='left'/>
                                    <Typography id="modal-modal-title" variant="h6" component="h2" mb='10px'
                                                fontFamily='Lora' fontWeight='600'>
                                        Add pet
                                    </Typography>
                                    <Box onSubmit={onSubmitAddPet} component="form"
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
                                                sx={{width: '24ch'}}
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
                                            id="breed"
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
                            {/*AddPet modal end*/}
                            <Button color="secondary" variant="contained"
                                    sx={{fontFamily: 'Lora', fontWeight: '600'}} onClick={handleOpenActivityModal}>Add
                                activity</Button>

                            {/*Add activity modal start*/}
                            <Modal
                                open={openActivityModal}
                                onClose={handleCloseActivityModal}
                                aria-labelledby="modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <Typography id="modal-title" variant="h6" component="h2" mb='10px'
                                                fontFamily='Lora' fontWeight='600'>
                                        Add activity
                                    </Typography>
                                    <Box onSubmit={onSubmitAddActivity} component="form"
                                         sx={{display: 'table', textAlign: 'center'}}>
                                        <TextField
                                            label="capacity"
                                            id="capacity"
                                            sx={{m: 1, width: '50ch'}}
                                            color="secondary"
                                            size="small"
                                            value={values.capacity}
                                            onChange={handleChange('capacity')}
                                        />
                                        <FormControl>
                                            <InputLabel color="secondary" id="select-type">type</InputLabel>
                                            <Select
                                                color="secondary"
                                                sx={{width: '24ch'}}
                                                labelId="select-type"
                                                id="type"
                                                value={values.type}
                                                label="type"
                                                onChange={handleChange('type')}>
                                                {activityTypes.map((activity) => (
                                                    <MenuItem key={activity.value} value={activity.value}>
                                                        {activity.label}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
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
                            {/*Add activity end modal*/}
                        </Stack>
                        {/*Activity tabs*/}
                        <Box sx={{width: '100%', typography: 'body1'}}>
                            <TabContext value={valueTabs}>
                                <TabList onChange={handleChangeTabs} aria-label="lab API tabs">
                                    {activities.map((activity) =>
                                        <Tab key={activity.id} label={activity.activityType} value={activity.id}/>
                                    )}
                                </TabList>
                                {activities.map((activity) =>
                                    <TabPanel value={activity.id}> Capacity: {activity.capacity} room(s)
                                        <img width='30px' align="right" src="/assets/delete.svg"
                                             onClick={handleDeleteActivity}/>
                                        <img align="right" width="30px" src="/assets/minus.png"
                                             onClick={handleDecreaseCapacity}/>
                                        <img align="right" width="30px" src="/assets/plus.svg"
                                             onClick={handleIncreaseCapacity}/>
                                    </TabPanel>
                                )}

                            </TabContext>
                        </Box>

                        <Paper sx={{mb: 2}}>
                            <ShelterInfo user={user}/>
                        </Paper>
                        {/*pets table*/}
                        <MyPetsTable entity={pets}
                                     handleSearch={handleSearchPet}
                                     handleDelete={handleDeletePet}
                                     setFiltered={setFilteredPets}
                                     filtered={filteredPets}
                                     delete={handleDeletePet}
                                     headCells={headCells}
                        />

                        <Adoptions/>

                    </Box>
                </Container>
            </div>
        )
}