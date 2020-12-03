import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const Toast=({data:{snackbarValue,setSnackbarValue}})=> {
    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarValue(({values})=>({...values, open:false,severity:""}));
    };

    return (
        <Snackbar open={snackbarValue.open} autoHideDuration={1500} onClose={handleClose} inputProps={{ "aria-label": snackbarValue.severity}}>
            <Alert onClose={handleClose} severity={snackbarValue.severity}>
                {snackbarValue.message}
            </Alert>
        </Snackbar>
    );
}

export default Toast