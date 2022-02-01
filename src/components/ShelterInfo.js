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
import {Stack} from "@mui/material";

export default function ShelterInfo(props) {
    const user = props.props
    console.log(user)
    return (
        <Stack spacing={7} direction="row" width="100%">
            <List
                sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: 'background.paper',
                }}
            >
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <BadgeIcon/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Username" secondary={user.username} />
                </ListItem>
                <Divider variant="inset" component="li"/>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <HomeIcon/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Address" secondary=""/>
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
            </List>
            <List>
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
        </Stack>
    );
}