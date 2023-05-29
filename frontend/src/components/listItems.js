import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Avatar } from '@mui/material';
import AddModal from './Modal';

const ListItems = (props) => {
    return (
        <>
            <ListSubheader component="div" inset>
                Groups
            </ListSubheader>
            {props.chats.map((chat) => {
                return chat.isGroup ? (
                    <ListItemButton onClick={() => props.set_user(chat.name, chat.id, chat.isGroup, chat.users)} key={chat.id}>
                        <ListItemIcon>
                            <Avatar src="/broken-image.jpg" />
                        </ListItemIcon>
                        <ListItemText primary={chat.name} />
                    </ListItemButton>
                ) : null;
            })}
            <ListSubheader component="div" inset>
                Chats
            </ListSubheader>
            {props.chats.map((chat) => {
                return !chat.isGroup ? (
                    <ListItemButton onClick={() => props.set_user(chat.users[1] === props.user ? chat.users[0]:chat.users[1], chat.id, chat.isGroup, chat.users)} key={chat.id}>
                        <ListItemIcon>
                            <Avatar src="/broken-image.jpg" />
                        </ListItemIcon>
                        <ListItemText primary={chat.users[1] === props.user ? chat.users[0]:chat.users[1]} />
                    </ListItemButton>
                ) : null;
            })}
            <AddModal />
        </>
    );
};

export default ListItems
