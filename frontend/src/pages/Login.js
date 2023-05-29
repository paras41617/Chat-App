import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import GoogleAuth from '../components/GoogleAuth';

export default function Login() {
    const [inputValues, setInputValues] = useState({});

    const handleInput = (event) => {
        const { name, value } = event.target;
        setInputValues((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    const navigate = useNavigate();

    const login_user = async (event) => {
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({'email': inputValues.email, 'password': inputValues.password })
        }
        fetch('http://127.0.0.1:5001/chat-3d05a/us-central1/app/user/login', requestOptions).
            then((response) => response.json()).
            then((data) => {
                if (data) {
                    localStorage.setItem('token', data.token)
                    navigate('/')
                }
                else {
                    alert("Some error occured")
                }
            }).
            catch((error) => {
                console.log("error : ", error.message)
            })
    }

    return (
        <CssVarsProvider>
            <main>
                <Sheet
                    sx={{
                        width: 300,
                        mx: 'auto', // margin left & right
                        my: 4, // margin top & bottom
                        py: 3, // padding top & bottom
                        px: 2, // padding left & right
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        borderRadius: 'sm',
                        boxShadow: 'md',
                    }}
                    variant="outlined"
                >
                    <div>
                        <Typography level="h4" component="h1">
                            <b>Welcome!</b>
                        </Typography>
                        <Typography level="body2">Sign in to continue.</Typography>
                    </div>
                    <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input
                            // html input attribute
                            name="email"
                            type="email"
                            placeholder="johndoe@email.com"
                            onChange={handleInput}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Password</FormLabel>
                        <Input
                            // html input attribute
                            name="password"
                            type="password"
                            placeholder="password"
                            onChange={handleInput}
                        />
                    </FormControl>
                    <Button sx={{ mt: 1 /* margin top */ }} onClick={login_user}>Log in</Button>
                    <Typography
                        endDecorator={<Link href="/register">Sign up</Link>}
                        fontSize="sm"
                        sx={{ alignSelf: 'center' }}
                    >
                        Don&apos;t have an account?
                    </Typography>
                </Sheet>
                <GoogleAuth login={true} />
            </main>
        </CssVarsProvider>
    );
}
