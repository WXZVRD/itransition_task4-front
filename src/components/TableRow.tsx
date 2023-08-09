import {Avatar, Box, Checkbox, ListItem, ListItemAvatar, Typography} from "@mui/material";
import {FC} from "react";
import { formDate } from "../utils/dateFormater";
import UserStatus from "./UserStatus";
import {useAppDispatch} from "../redux/hook";
import { setSelection } from "../redux/slices/usersSlice";
import {IUser} from "./TableList";

interface TableRowProps {
    user: IUser,
}

const TableRow: FC<TableRowProps> = ({ user }) => {
    const dispatch = useAppDispatch();

    const handleCheck = () => {
            dispatch(setSelection(user.id));
    };

    return (
        <ListItem
            id={user.id.toString()}
            sx={{padding: '25px 0', flexGrow: 1,
                display: "flex",
                alignItems: "center",
                borderBottom: "1px solid #E7EAEE",
            }}>
            <Checkbox checked={user.selected || false} onChange={handleCheck}/>

            <Box sx={{flexGrow: 1, display: 'flex', alignItems: 'center'}}>
                <Box sx={{margin: '0 20px', display: 'flex', alignItems: 'center', maxWidth: '200px', width: '100%'}}>
                    <ListItemAvatar>
                        <Avatar>
                            { user.nick.slice(0, 1) }
                        </Avatar>
                    </ListItemAvatar>
                    <Typography variant="body1" fontWeight={400} color="#111827">
                        {user.nick}<br />{user.secondName}
                    </Typography>
                </Box>

                <Typography sx={{margin: '0 20px', fontSize: 14, fontWeight: 500, color: '#111827',maxWidth: '400px', width: '100%'}}>
                    { user.email }
                </Typography>

                <Typography sx={{margin: '0 20px',  maxWidth: '400px', width: '100%' }} variant="body1" fontWeight={400} color="#111827">
                    { formDate(user.created_at) }
                </Typography>

                <Typography sx={{margin: '0 20px',  maxWidth: '400px', width: '100%'}} variant="body1" fontWeight={400} color="#111827">
                    { formDate(user.last_login) }
                </Typography>

                <Typography sx={{margin: '0 20px',  maxWidth: '100px', width: '100%', overflow:'hidden', mr:'20px'}} variant="body1" fontWeight={400} color="#111827">
                    { user.id }
                </Typography>

                <UserStatus status={user.stat} blocked={user.blocked}/>

            </Box>

        </ListItem>
    );
};

export default TableRow;
