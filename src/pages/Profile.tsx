import { Box, Avatar, Button, Container, Typography, TextField, Grid, Alert } from "@mui/material";
import {Link} from 'react-router-dom';
import TableChartIcon from '@mui/icons-material/TableChart';
import React, {FC, ChangeEvent, useState, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../redux/hook";
import {fetchUpdate} from "../redux/controller/authControlller";
import {ServerError} from "../redux/slices/auth";
import {IRegData} from "./Register";

const Profile: FC = () => {
    const { user } = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()

    const [errors, setErrors] = useState<Array<ServerError>>([])
    const [dataAuth, setDataAuth] = useState<IRegData>({id: 0, email: '', nick: '', secondName: '' });
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        setDataAuth({
            id: user?.id || 0,
            email: user?.email || '',
            nick: user?.nick || '',
            secondName: user?.secondName || '',
        });
    }, [user]);

    const handleText = (e: ChangeEvent<HTMLInputElement>) => {
        setDataAuth({
            ...dataAuth,
            [e.target.id]: e.target.value
        });
    };
    const handleUpdate = () => {
        setErrors([])
        dispatch(fetchUpdate(dataAuth))
            .then(data => {
                setErrors(data.payload.response.data)
            });
        setShowAlert(true)
    };

    const isError = (name: string) => {
        const errorObj = errors.find(e => e.path === name);
        return errorObj ? { error: true, helperText: errorObj?.msg } : { error: false, helperText: "" };
    }

    return (
        <Box>
            <Container maxWidth="lg" sx={{ display: 'flex' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '100px 0', alignItems: 'center', maxWidth: '300px' }}>
                    <Avatar sx={{ width: '150px', height: '150px', mb: '40px', fontSize: '40px' }}></Avatar>
                    <Link to='/'>
                        <Button startIcon={<TableChartIcon />}>
                            Table
                        </Button>
                    </Link>
                </Box>
                <Box sx={{ padding: '100px 100px', width: '100%' }}>
                    <Typography sx={{ mb: '70px', fontSize: '24px', fontWeight: 600 }}>Account Settings</Typography>
                    <Grid container spacing={15}>
                        <Grid item xs={12} md={6}>
                            <TextField id="nick" label="Name" variant="standard" value={dataAuth?.nick || ''}
                                       fullWidth
                                       {...isError('nick')}
                                       onChange={handleText}
                                       sx={{ mb: '20px' }} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField id="secondName" label="Last name" variant="standard" value={dataAuth?.secondName || ''}
                                       fullWidth
                                       {...isError('secondName')}
                                       onChange={handleText}
                                       sx={{ mb: '20px' }} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField id="email" label="Email" variant="standard" value={dataAuth?.email || ''}
                                       fullWidth
                                       {...isError('email')}
                                       onChange={handleText}
                                       sx={{ mb: '20px' }} />
                        </Grid>
                    </Grid>
                    <Button onClick={handleUpdate} variant='contained' sx={{ mt: '80px' }}>Save</Button>
                    {showAlert && <Alert severity={errors.length > 0 ? 'error' : 'success'} sx={{ mt: '30px' }}>Not correct data!</Alert>}
                </Box>
            </Container>
        </Box>
    )
}

export default Profile;
