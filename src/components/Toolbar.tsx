import {Box, Typography, Button} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../redux/hook";
import {changeStatus, deleteUsers} from "../redux/controller/usersController";
import {FC} from "react";

const Toolbar:FC = ( ) => {

    const dispatch = useAppDispatch();
    const userList = useAppSelector(state => state.users.list);
    const selected = userList.filter(user => user.selected);

    const handleDelete = () => {
        dispatch(deleteUsers(selected));
    };
    const changeStat = () => {
        dispatch(changeStatus(selected));
    };

    return (
        <Box sx={{minWidth:'1200px', overflowX:'auto', flexGrow: 1, height: '80px', backgroundColor: '#EFF6FF', padding: '0 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Typography sx={{ color: '#111827', fontSize: '14px', fontWeight: 400}}>{selected.length} rows selected.</Typography>
            <Box sx={{maxWidth: '300px', width: '100%', display: 'flex', justifyContent: 'space-between',}}>
                <Button variant="contained" sx={{boxShadow: 'none', backgroundColor: '#CFFAFE', border: '1px solid #2563EB', borderRadius: '3px', color: '#1E3A8A', ":hover":{backgroundColor: '#ECFEFF'},}} onClick={handleDelete}>
                    Delete
                </Button>
                <Button disabled={selected.some(el => !el.blocked)} onClick={changeStat} variant="contained" sx={{boxShadow: 'none', backgroundColor: '#DCFCE7', border: '1px solid #2563EB', borderRadius: '3px', color: '#1E3A8A', ":hover":{backgroundColor: '#F0FDF4'},}}>
                    Unblock
                </Button>
                <Button disabled={selected.some(el => el.blocked)}  onClick={changeStat}  variant="contained" sx={{boxShadow: 'none', backgroundColor: '#FEE2E2', border: '1px solid #2563EB', borderRadius: '3px', color: '#1E3A8A', ":hover":{backgroundColor: '#FEF2F2'},}}>
                    Block
                </Button>
            </Box>

        </Box>
    )
}


export default Toolbar