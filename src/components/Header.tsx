import {Box, Typography, Toolbar, AppBar, Avatar, IconButton, Modal, Button} from "@mui/material";
import {Link} from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import {useAppDispatch, useAppSelector} from "../redux/hook";
import {FC, useState} from "react";
import {logout} from "../redux/slices/auth";
import {useNavigate} from "react-router-dom";
import {setOnlineStatus} from "../redux/slices/usersSlice";
import socket from "../socket";

const Header:FC = () => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);
    const user = useAppSelector(state => state.user.user)

    const handleOpen = () => {
        setOpen(!open);
    };

    const handleLogout = () => {
        if (user.email) {
            socket.emit('userDisconnect', user.email);
            dispatch(setOnlineStatus({ email: user.email, status: 'offline' }));
            dispatch(logout());
            navigate('/authorization')
        }
    };

    return (
        <Box sx={{ flexGrow: 1, minWidth:'1200px'}}>
            <AppBar position="static" sx={{ bgcolor: "#fff", boxShadow: "none", alignItems: "flex", pt: "20px" }}>
                <Toolbar sx={{ alignItems: "flex" }}>
                    <Typography variant="h6" fontWeight={500} fontSize={24} noWrap color="#111827"
                                component="div" sx={{ flexGrow: 1, display: {xs: "none", sm: "block"}}}>
                        Users
                    </Typography>
                    <Link to="/profile" style={{ textDecoration: "none" }}>
                        <Avatar sx={{ ml: "40px" }}>{user?.nick?.slice(0, 1)}</Avatar>
                    </Link>
                    <IconButton sx={{ ml: "40px" }} onClick={handleOpen}>
                        <LogoutIcon />
                    </IconButton>

                    <Modal open={open} onClose={handleOpen}>
                        <Box
                            sx={{
                                p: 3,
                                bgcolor: "white",
                                borderRadius: "4px",
                                width: "300px",
                                textAlign: "center",
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                            }}
                        >
                            <Typography sx={{ mb: 2 }}>Are you sure you want to exit?</Typography>
                            <Button variant="contained" color="error" sx={{ mr: 2 }} onClick={handleLogout}>
                                Sure
                            </Button>
                            <Button variant="contained" color="success" onClick={handleOpen}>
                                Back
                            </Button>
                        </Box>
                    </Modal>
                </Toolbar>
            </AppBar>
        </Box>
    );
}


export default Header