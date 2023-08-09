import {Alert, Snackbar} from "@mui/material";
import {useEffect, useState} from "react";
import {useAppSelector} from "../redux/hook";


const Notify = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { status } = useAppSelector(state => state.users)


    useEffect(() => {
        if (status === "loaded") {
            setIsOpen(true);
        }
    }, [status]);

    return (
        <Snackbar open={isOpen} sx={{ width: '400px' }} autoHideDuration={2000} onClose={() => setIsOpen(false)}>
            <Alert severity="success" sx={{ width: '100%'}}>
                Action completed successfully!
            </Alert>
        </Snackbar>
    )
}


export default Notify