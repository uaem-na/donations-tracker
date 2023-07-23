import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";

export const FormInputText = ({ name, control, label, ...rest }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          helperText={error ? error.message : null}
          size="small"
          error={!!error}
          onChange={onChange}
          fullWidth
          label={label}
          {...rest}
        />
      )}
    />
  );
};
