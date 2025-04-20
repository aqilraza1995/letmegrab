import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { FormikProvider, useFormik } from "formik";
import { Box, Grid, Paper, Stack, Typography } from "@mui/material"
import CustomInput from "../../components/CustomInput"
import CustomButton from "../../components/CustomButton"

const validationSchema = Yup.object({
    username: Yup.string()
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username must be less than 20 characters")
        .required("Username is required"),

    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),

    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .matches(/[A-Z]/, "Must include at least one uppercase letter")
        .matches(/[a-z]/, "Must include at least one lowercase letter")
        .matches(/[0-9]/, "Must include at least one number")
        .matches(/[@$!%*?&]/, "Must include at least one special character")
        .required("Password is required"),

    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
});


const Register = () => {


    const navigate = useNavigate()
    const userList = localStorage.getItem("users") !== null ? JSON.parse(localStorage.getItem("users")) : [];

    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            duplicate: false,
            isLoading: false
        },
        validationSchema,

        onSubmit: async (values) => {
            try {
                formik.setFieldValue("isLoading", true)
                const { username, email, password } = values
                const newData = { id: Date.now(), username, email, password }
                if (userList?.length) {
                    const existUser = userList.find(item => item?.email === email)
                    if (!existUser) {
                        userList.push(newData)
                        localStorage.setItem("users", JSON.stringify(userList))
                        navigate("/login")
                    }
                    else {
                        formik.setFieldValue("duplicate", true)
                    }
                }
                else {
                    userList.push(newData)
                    localStorage.setItem("users", JSON.stringify(userList))
                    navigate("/login")
                }
                // localStorage.setItem()
                // const resultAction = await dispatch(login(values));
                // if (login.fulfilled.match(resultAction)) {
                //     navigate("/");
                // }
                formik.setFieldValue("isLoading", false)
            } catch (error) {
                console.error("Unexpected error during login", error);
            }
        },
    });

    return (
        <Box mt={{ xs: 12 }}>
            {formik?.values?.duplicate &&
                <Box sx={{
                    maxWidth: 400,
                    mx: "auto",
                    mb: 2,
                    background: "red",
                    borderRadius: "4px",
                }}>
                    <Typography mb={2} p={2} variant="body1">User already Exist </Typography>
                </Box>
            }
            <Paper sx={{
                width: { sx: "80%", sm:"60%", md: "50%", lg: "30%" },
                mx: "auto",
                background: "#f0f0f0",
                display: "flex",
                flexDirection: "column",
                gap: 3,
                p: { xs: 3, sm: 4 },
            }} >
                <Grid display={"flex"} justifyContent={"center"}>
                    <Typography variant="h4">Register </Typography>
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
                                label="Email"
                                name="email"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email ? formik.errors.email : ""}
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
                        <Grid display={"flex"} justifyContent={"center"} mb={2}>
                            <CustomInput
                                label="Confirm Password"
                                name="confirmPassword"
                                onChange={formik.handleChange}
                                value={formik.values.confirmPassword}
                                error={formik.touched.username && Boolean(formik.errors.confirmPassword)}
                                helperText={formik.touched.confirmPassword ? formik.errors.confirmPassword : ""}
                            />
                        </Grid>
                    </form>
                </FormikProvider>

                <Grid display={"flex"} justifyContent={"center"}>
                    <CustomButton
                        label="Register"
                        isLoading={formik.values.isLoading}
                        onClick={formik.handleSubmit}
                    />
                </Grid>
            </Paper>

        </Box>
    )
}

export default Register