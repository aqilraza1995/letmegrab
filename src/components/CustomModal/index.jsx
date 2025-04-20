import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";

const CustomModal = ({
    open = false,
    title,
    onClick,
    handleClose,
    children,
    fullWidth = true,
    maxWidth = "sm",
    actionButton = false,
    buttonLabel
}) => {
    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                fullWidth={fullWidth}
                maxWidth={maxWidth}
            >
                <DialogTitle id="alert-dialog-title">
                    {title}
                </DialogTitle>

                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={(theme) => ({
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <Close />
                </IconButton>

                <DialogContent>{children}</DialogContent>
                {actionButton && (
                    <DialogActions sx={{ display: "flex", justifyContent: "right" }}>
                        <Button variant="contained" onClick={onClick} type="submit">
                            {buttonLabel}
                        </Button>
                        <Button variant="contained" color="inherit" onClick={handleClose}>
                            Cancel
                        </Button>
                    </DialogActions>
                )}
            </Dialog>
        </>
    );
};

export default CustomModal;
