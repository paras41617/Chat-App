import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import GoogleAuth from '../components/GoogleAuth';

const defaultTheme = createTheme();

export default function Register() {
    const [inputValues, setInputValues] = useState({});

    const navigate = useNavigate();

    const handleInput = (event) => {
        const { name, value } = event.target;
        setInputValues((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const register_user = async (event) => {
        // event.preventDefault();
        var body_ = JSON.stringify({ "name": inputValues.name, 'email': inputValues.email, 'password': inputValues.password});
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: body_
        }
        fetch('http://127.0.0.1:5001/chat-3d05a/us-central1/app/user/register', requestOptions).
            then((response) => response.json()).
            then((data) => {
                if(data.message == "User registered successfully"){
                }
                else{
                    alert("Some error occured")
                }
            }).
            catch((error) => {
                console.log("error : ", error.message)
            })
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    autoFocus
                                    onChange={handleInput}
                                    value={inputValues.name || ''}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={handleInput}
                                    value={inputValues.email || ''}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={handleInput}
                                    value={inputValues.password || ''}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={register_user}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                    <GoogleAuth login={false}/>
                </Box>
            </Container>
        </ThemeProvider>
    );
}