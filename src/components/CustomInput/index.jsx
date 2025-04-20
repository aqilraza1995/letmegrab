import { useState } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const CustomInput = ({
    type,
    name,
    fullWidth = true,
    size,
    value,
    onChange,
    helperText,
    variant,
    error,
    required,
    ...rest
  }) => {
    const [show, setShow] = useState(false);
    return (
      <TextField
        type={type === 'password' && show ? 'text' : type}
        name={name}
        required={required}
        {...rest}
        size={size}
        fullWidth={fullWidth}
        value={value}
        variant={variant}
        onChange={onChange}
        error={helperText? true : false}
        helperText={helperText}
        InputProps={
          type === "password" ?
            {
              endAdornment: (
                <InputAdornment position="end" >
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={() => type === "password" ? setShow(!show) : null}
                  >
                    {show ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }
            : { ...rest.InputProps }
        }
      />
    );
  };

  export default CustomInput