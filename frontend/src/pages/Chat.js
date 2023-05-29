import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import UserModal from '../components/UserModal';
import { Avatar } from '@mui/material';
import ListItems from '../components/listItems';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Chats from '../components/Chats';
import { initializeApp } from "firebase/app";
import { getFirestore, onSnapshot, collection } from 'firebase/firestore'
import data from '../config/ServiceAccount.json'

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const defaultTheme = createTheme();

export default function Dashboard() {
    const [open, setOpen] = React.useState(true);
    const [InputMessage, setInputMessage] = useState('');
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const [user, setUser] = useState('')
    const [email, setEmail] = useState('');
    const [chats, setChats] = useState([])
    const [curUser, setCurUser] = useState();
    const [messages, setMessages] = useState([]);
    const [chatId, setChatId] = useState('');
    const [group, setGroup] = useState(false)
    const [group_users, setgroupUsers] = useState([])
    const [messageFetch, setMessageFetch] = useState(false);
    const [fetchNew, setFetchNew] = useState(false)
    // const [curUserId, setCurUserId] = useState('')
    const firebaseConfig = data;

    initializeApp(firebaseConfig);
    const db = getFirestore();
    const navigate = useNavigate();

    const set_user = (user, id, group_, group_users_) => {
        setCurUser(user);
        setChatId(id)
        setGroup(group_)
        setgroupUsers(group_users_)
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({ chatId: id })
        }
        fetch('http://127.0.0.1:5001/chat-3d05a/us-central1/app/message/get_messages', requestOptions).
            then((response) => response.json()).
            then((data) => {
                if (data) {
                    setMessages(data.messages)
                    setMessageFetch(true);
                }
                else {
                    localStorage.setItem('token', undefined);
                    window.location.reload();
                    alert("Some error occured")
                }
            }).
            catch((error) => {
                console.log("error : ", error.message)
            })
    }

    const send_message = () => {
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({ chatId: chatId, message: InputMessage })
        }
        fetch('http://127.0.0.1:5001/chat-3d05a/us-central1/app/message/create', requestOptions).
            then((response) => response.json()).
            then((data) => {
                if (data) {
                    const new_chat = { "admin": email, "message": InputMessage }
                    const newChats = [...messages, new_chat];
                    setMessages(newChats)
                    setInputMessage('')
                }
                else {
                    localStorage.setItem('token', undefined);
                    window.location.reload();
                    alert("Some error occured")
                }
            }).
            catch((error) => {
                console.log("error : ", error.message)
            })

    }

    const logout_user = async (event) => {
        // event.preventDefault();
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }
        fetch('http://127.0.0.1:5001/chat-3d05a/us-central1/app/user/logout', requestOptions).
            then((response) => response.json()).
            then((data) => {
                if (data) {
                    localStorage.setItem('token', undefined)
                    navigate('/login')
                }
                else {
                    alert("Some error occured")
                }
            }).
            catch((error) => {
                console.log("error : ", error.message)
            })
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token === "undefined" || !token || token === null) {
            navigate('/login')
        }
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }
        fetch('http://127.0.0.1:5001/chat-3d05a/us-central1/app/user/get_user', requestOptions).
            then((response) => response.json()).
            then((data) => {
                if (data) {
                    setUser(data.name)
                    setEmail(data.email)
                }
                else {
                    localStorage.setItem('token', undefined);
                    window.location.reload();
                    alert("Some error occured")
                }
            }).
            catch((error) => {
                console.log("error : ", error.message)
            })
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token === "undefined" || !token || token === null) {
            navigate('/login')
        }
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }
        fetch('http://127.0.0.1:5001/chat-3d05a/us-central1/app/chat/my_chats', requestOptions).
            then((response) => response.json()).
            then((data) => {
                if (data) {
                    setChats(data.chats)
                }
                else {
                    localStorage.setItem('token', undefined);
                    window.location.reload();
                    alert("Some error occured")
                }
            }).
            catch((error) => {
                console.log("error : ", error.message)
            })
    }, [])

    useEffect(() => {
        // if (chatId !== '') {
        // }
        var new_chat;
        const unsubscribe = onSnapshot(collection(db, "messages"), (snapshot) => {
            var newChats = [];
            snapshot.docChanges().forEach((change) => {
                if (change.type === "added") {
                    new_chat = { "admin": change.doc.data().admin, "message": change.doc.data().message }
                    newChats.push(new_chat);
                }
            });
            if(chatId !== ''){
                if(newChats.length === 1){
                    const temp = [...messages, newChats[0]];
                    setMessages(temp);
                    setMessageFetch(!messageFetch)
                }
            }
        });
        // Clean up the listener when the component unmounts
        return () => unsubscribe();

    }, [chatId,messageFetch]);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            {/* <MenuIcon /> */}
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            {curUser}
                        </Typography>
                        {group ? <UserModal user={email} id={chatId} users={group_users} />
                            : ''}
                        <IconButton color="inherit">
                            {/* <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge> */}
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <ListItemButton>
                            <ListItemIcon>
                                <Avatar src="/broken-image.jpg" />
                            </ListItemIcon>
                            <ListItemText primary={user} />
                            <LoginIcon onClick={logout_user} />
                        </ListItemButton>
                        <IconButton onClick={toggleDrawer}>
                            {/* 
                            <ChevronLeftIcon /> */}
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav">
                        <ListItems chats={chats} set_user={set_user} user={email} />
                        {/* {mainListItems} */}
                        <Divider sx={{ my: 1 }} />
                        {/* <secondaryListItems /> */}
                        {/* {secondaryListItems} */}
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '90vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Chats user={email} messages={messages} />
                    </Container>
                    <Container fixed maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3} width={'100%'}>
                            <Grid item xs={12} width={'100%'}>
                                <div style={{ position: 'fixed', bottom: 0, width: '100%', display: 'flex', alignItems: 'center', padding: '8px' }}>
                                    <TextField id="outlined-basic" value={InputMessage} label="Message" variant="outlined" style={{ width: "75%" }} onChange={(e) => { setInputMessage(e.target.value) }} />
                                    <IconButton color="primary">
                                        <SendIcon onClick={send_message} />
                                    </IconButton>
                                </div>
                            </Grid>
                        </Grid>
                        {/* <Copyright sx={{ pt: 4 }} /> */}
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}