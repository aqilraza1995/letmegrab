import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";

const CustomSelect = ({
    name,
    value,
    onChange,
    label,
    options = [],
    labelKey,
    valueKey,
    variant = "outlined",
    fullWidth = true,
    size = "small",
    helperText
}) => {
    return (
        <FormControl fullWidth={fullWidth} size={size} sx={{ minWidth: '100%' }}>
            <InputLabel id="demo-simple-select-label">{label}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                label={label}
                onChange={onChange}
                name={name}
                error={helperText ? true : false}
                variant={variant}
                fullWidth={fullWidth}
            >
                {options.length ? (
                    options.map((item, index) => (
                        <MenuItem key={index} value={item[valueKey]}>
                            {item[labelKey]}
                        </MenuItem>
                    ))
                ) : (
                    <MenuItem value="">No record found</MenuItem>
                )}
            </Select>
            {helperText && <FormHelperText sx={{ color: "#D32F2F" }}>{helperText}</FormHelperText>}
        </FormControl>
    );
};

export default CustomSelect;