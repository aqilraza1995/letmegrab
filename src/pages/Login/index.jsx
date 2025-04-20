import * as Yup from "yup";
import { FormikProvider, useFormik } from "formik";

import { Box, Grid, Paper, Typography } from "@mui/material"
import CustomInput from "../../components/CustomInput"
import CustomButton from "../../components/CustomButton"
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
    username: Yup.string()
        .required("Username is required"),

    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .matches(/[A-Z]/, "Must include at least one uppercase letter")
        .matches(/[a-z]/, "Must include at least one lowercase letter")
        .matches(/[0-9]/, "Must include at least one number")
        .matches(/[@$!%*?&]/, "Must include at least one special character")
        .required("Password is required"),
});

const Login = () => {

    const navigate = useNavigate()
    const userList = localStorage.getItem("users") !== null ? JSON.parse(localStorage.getItem("users")) : [];

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            isLoading: false,
            loginFailed: ""
        },
        validationSchema,

        onSubmit: async (values) => {
            try {
                formik.setFieldValue("isLoading", true)
                const { username, password } = values
                if (userList?.length) {
                    const existUser = userList.find(item => item?.username === username && item?.password === password)
                    if (existUser) {
                        localStorage.setItem("authUser", JSON.stringify(existUser))
                        navigate("/")
                    }
                    else {
                        formik.setFieldValue("loginFailed", "Username and Password wrong")
                    }
                }
                else {
                    formik.setFieldValue("loginFailed", "User Not Exist")
                }
                formik.setFieldValue("isLoading", false)
            } catch (error) {
                console.error("Unexpected error during login", error);
            }
        },
    });

    return (
        <Box mt={{ xs: 16 }}>
            {formik?.values?.loginFailed &&
                <Box sx={{
                    maxWidth: 400,
                    mx: "auto",
                    mb: 2,
                    background: "red",
                    borderRadius: "4px",
                }}>
                    <Typography mb={2} p={2} variant="body1" color="white">{formik?.values?.loginFailed}</Typography>
                </Box>
            }
            <Paper sx={{
                width: { sx: "85%", md: "50%", lg: "30%" },
                mx: "auto",
                background: "#f0f0f0",
                display: "flex",
                flexDirection: "column",
                gap: 3,
                p: { xs: 3, sm: 4 },
            }} >
                <Grid display={"flex"} justifyContent={"center"}>
                    <Typography variant="h4">Login </Typography>
                </Grid>
                <FormikProvider value={formik}>
                    <form>
                        <Grid display={"flex"} justifyContent={"center"} mb={2}>
                            <CustomInput
                                label="Username"
                                name="username"
                                onChange={formik.handleChange}
                                value={formik.values.username}
                                error={formik.touched.username && Boolean(formik.errors.username)}
                                helperText={formik.touched.username ? formik.errors.username : ""}
                            />
                        </Grid>
                        <Grid display={"flex"} justifyContent={"center"} mb={2}>
                            <CustomInput
                                label="Password"
                                name="password"
                                type={"password"}
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password ? formik.errors.password : ""}
                            />
                        </Grid>
                    </form>
                </FormikProvider>
                <Grid display={"flex"} justifyContent={"center"}>
                    <CustomButton
                        label="Login"
                        isLoading={formik.values.isLoading}
                        onClick={formik.handleSubmit}
                    />
                </Grid>
            </Paper>
        </Box>
    )
}

export default Login