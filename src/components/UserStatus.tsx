import { Chip } from "@mui/material";
import { FC } from "react";

interface IProps {
    status: string;
    blocked: number;
}

const getStatusStyles = (status: string, blocked: number) => {
    let bgcolor = '#DDE4F2';
    let label = status;

    if (status === 'online') {
        bgcolor = '#BBF7D0';
    }
    if (blocked) {
        bgcolor = '#FFAAAA';
        label = 'blocked';
    }

    return { bgcolor, label };
};

const UserStatus: FC<IProps> = ({ status, blocked }) => {
    const { bgcolor, label } = getStatusStyles(status, blocked);

    return (
        <Chip label={label} sx={{fontSize: '12px', fontWeight: 700, maxWidth: '110px',
                width: '100%',
                borderRadius: '5px',
                bgcolor,
            }}/>
    );
};

export default UserStatus;
