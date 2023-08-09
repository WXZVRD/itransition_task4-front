import {Paper, TextField, Typography, Button, Box, Alert} from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch} from "../redux/hook";
import {fetchAuth} from "../redux/controller/authControlller";

// @ts-ignore
import logo from '../assets/logo.svg';

interface IData {
    email: string;
    password: string;
}

const Auth = () => {
    const [dataAuth, setDataAuth] = useState<IData>({ email: '', password: '' });
    const [errors, setErrors] = useState('')

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleText = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setDataAuth({
            ...dataAuth,
            [e.target.id]: e.target.value
        });
    };

    const handleAuth = () => {
        try {
            dispatch(fetchAuth(dataAuth))
                .then(data => {
                    setErrors('1')
                    const error: any = data.payload.msg;
                    error ? setErrors(error) : navigate('/');
                });
            } catch (error: any) {
                console.log(error)
            }
    };


    return (
        <Paper sx={{flexGrow: 1, height: '100vh', display : 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            <Box sx={{maxWidth: '430px', width: '100%', display : 'flex', textAlign: 'center', flexDirection: 'column'}}>
                <img alt='Logo' src={logo} style={{width: '48px', height: '68px', margin: '0px 43% 0px 42%' }}/>
                <Typography variant='h6' sx={{mb:'10px',fontWeight: '900', fontSize: '34px'}}>
                    Log In to your Account
                </Typography>

                {errors && <Alert severity="error" sx={{ mb: '20px' }}>Not correct data!</Alert>}

                <TextField id="email" label="Email" variant="outlined"
                            onChange={handleText}
                            error={Boolean(errors)}
                            sx={{margin: '30px 0'}}/>

                <TextField id="password" label="Password" variant="outlined"
                           onChange={handleText}
                           error={Boolean(errors)}
                           sx={{mb: '50px'}}/>

                <Button onClick={handleAuth} variant='contained'>LOG IN</Button>
                <Link to='/registration'>
                    <Button variant='text' sx={{mt:'24px'}}>Doesn't have an account?</Button>
                </Link>
            </Box>
        </Paper>
    )
}


export default Auth