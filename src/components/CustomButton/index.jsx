import { Button, CircularProgress } from "@mui/material"

const CustomButton = ({ onClick, label, variant = "contained", color = "primary", isLoading = false, fullWidth = true }) => {
    return (
        <Button
            variant={variant}
            onClick={onClick}
            color={color}
            startIcon={
                isLoading ? <CircularProgress size={24} color="primary" /> : null
            }
            fullWidth={fullWidth}
        >
            {isLoading ? null : label}
        </Button>
    )
}

export default CustomButton