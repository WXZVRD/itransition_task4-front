import React, { ChangeEvent, useState } from "react";
import { Box, TextField, Typography, Button, Paper } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from "../redux/hook";
import {fetchRegister} from "../redux/controller/authControlller";
import { ServerError } from "../redux/slices/auth";

// @ts-ignore
import logo from '../assets/logo.svg';

export interface IRegData {
    id?: number,
    nick?: string,
    secondName?: string,
    password?: string,
    email?: string,
}

const Register = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch();

    const [dataAuth, setDataAuth] = useState<IRegData>({});
    const [errors, setErrors] = useState<Array<ServerError>>([])

    const handleText = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setDataAuth({
            ...dataAuth,
            [e.target.id]: e.target.value
        });
    };

    const handleRegister = () => {
        try {
            dispatch(fetchRegister(dataAuth))
                .then(data => {
                    const error: any = data.payload;
                    error ? setErrors(error) : navigate('/authorization')
                });
        } catch (error: any) {
            console.log(error);
        }
    };

    const isError = (name: string) => {
        const errorObj = errors.find(e => e.path === name);
        return errorObj ? { error: true, helperText: errorObj?.msg } : { error: false, helperText: "" };
    }

    return (
        <Paper sx={{ position: 'relative', flexGrow: 1, height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Box sx={{ maxWidth: '430px', width: '100%', display: 'flex', textAlign: 'center', flexDirection: 'column' }}>
                <img src={logo} style={{ width: '48px', height: '68px', margin: '0px 43% 0px 42%' }} alt="Logo" />
                <Typography variant='h6' sx={{ mb: '20px', fontWeight: '900', fontSize: '34px' }}>Sign up account</Typography>

                <TextField id="nick" label="Name" variant="outlined"
                           {...isError('nick')}
                           onChange={handleText}
                           sx={{ mb: '20px' }} />
                <TextField id="secondName" label="secondName" variant="outlined"
                           {...isError('secondName')}
                           onChange={handleText}
                           sx={{ mb: '20px' }} />
                <TextField id="email" label="email" variant="outlined"
                           {...isError('email')}
                           onChange={handleText}
                           sx={{ mb: '20px' }} />
                <TextField id="password" label="password" variant="outlined"
                           {...isError('password')}
                           onChange={handleText}
                           sx={{ mb: '20px' }} />

                <Button onClick={handleRegister} variant='contained' sx={{ mb: '24px' }}>SIGN UP</Button>
                <Link to='/authorization'>
                    <Button variant='text'>Already have an account? Sign in</Button>
                </Link>

            </Box>
        </Paper>
    );
};

export default Register;
