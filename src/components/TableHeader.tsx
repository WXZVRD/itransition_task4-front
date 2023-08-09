import { Box, Checkbox, ListItem, Typography } from "@mui/material";
import { useAppDispatch } from "../redux/hook";
import { setSelection } from "../redux/slices/usersSlice";
import { useState } from "react";

const TableHeader = () => {
    const dispatch = useAppDispatch();
    const [id, setId] = useState(0);
    const handleCheck = (userId: number) => {
        dispatch(setSelection(userId));
    };

    const columns = [
        { id: "name", label: "Name", width: "200px", margin: "0 20px" },
        { id: "email", label: "Email", width: "420px", margin: "0 20px" },
        { id: "createdAt", label: "CreatedAt", width: "400px", margin: "0 20px" },
        { id: "lastLogin", label: "Last Login", width: "400px", margin: "0 20px" },
        { id: "uid", label: "UID", width: "100px", margin: "0 20px" },
        { id: "status", label: "Status", width: "90px", margin: "0 20px" },
    ];

    return (
        <ListItem sx={{flexGrow: 1, padding: "15px 0",
                display: "flex",
                alignItems: "center",
                borderBottom: "1px solid #E7EAEE",}}>
            <Checkbox onClick={() => {
                    setId(id === 0 ? -1 : 0);
                    handleCheck(id === 0 ? 0 : -1);
                }}/>
            <Box sx={{ flexGrow: 1, display: "flex" }}>
                {columns.map((column) => (
                    <Typography key={column.id} variant="body1" fontWeight={700}
                            color="#111827"
                            sx={{width:'100%', maxWidth: column.width, margin: column.margin }}>
                            {column.label}
                    </Typography>
                ))}
            </Box>
        </ListItem>
    );
};

export default TableHeader;
