import axios from "axios";
import {useEffect, useState} from "react";
import {Box, Card, CardActionArea, CardContent, CardMedia, Container, CssBaseline, Typography} from "@mui/material";
import * as React from "react";
import ArticleIcon from '@mui/icons-material/Article';
import PetsIcon from '@mui/icons-material/Pets';
import EventIcon from '@mui/icons-material/Event';

export default function PetDetails(props) {
    const petId = props.location.state
    const [pet, setPet] = useState({})
    console.log(petId)

    const fetchPet = async () => {
        const data = await axios.get(`http://localhost:8080/api/pet/${petId}`)
        const resp = await data.data
        console.log(resp)
        setPet(resp)
    }

    const petAge = () => {
        if (pet.age < 1) {
            return (pet.age + " months")
        }
        else if (pet.age === 1) {
            return (pet.age + " year")
        } else {
            return (pet.age + " years")
        }
    }

    const petAdopted = () => {
        if(pet.isAdopted === true) {
            return ("yes")
        }
        return ("not yet")
    }

    useEffect(() => {
        fetchPet()

    }, [])

    //tabs variables
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div>
            <Container maxWidth="md">
                <Box sx={{justifyContent: 'center', alignItems: 'center', padding: '10px'}}>
                    <Card sx={{maxWidth: 700}}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image="/assets/cat.jpg"
                                alt="cat"
                            />
                            <CardContent>
                                <Typography padding="5px" gutterBottom variant="h6" component="div">
                                   <img width='30px' src="/assets/footprint.png" align='left'/> Name: {pet.name}
                                </Typography>
                                <Typography padding="5px" variant="h6" color="text.secondary">
                                    <img width='30px' src="/assets/description.png" align='left'/> Description: {pet.description}
                                </Typography>
                                <Typography padding="5px" variant="h6" color="text.secondary">
                                    <img width='30px' src="/assets/date.png" align='left'/> Joined date: {pet.joinedDate}
                                </Typography>
                                <Typography padding="5px" variant="h6" color="text.secondary">
                                    Age: {petAge()}
                                </Typography>
                                <Typography variant="h6" color="text.secondary">
                                    Race: {pet.race}
                                </Typography>
                                <Typography variant="h6" color="text.secondary">
                                    Gender: {pet.gender}
                                </Typography>
                                <Typography variant="h6" color="text.secondary">
                                    Color: {pet.color}
                                </Typography>
                                <Typography variant="h6" color="text.secondary">
                                    Adopted: {petAdopted()}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Box>
            </Container>
        </div>
    )
}