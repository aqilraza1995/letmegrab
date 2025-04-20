import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { FormikProvider, useFormik } from "formik";
import { Box, Grid, Paper, Typography } from "@mui/material";
import CustomInput from "../../components/CustomInput";
import CustomSelect from "../../components/CustomSelect";
import CustomButton from "../../components/CustomButton";
import { useEffect } from "react";
import { addProduct, getAllCategories, getProductById, updateProduct } from "../../store/slice/ProductSlice";


const validationSchema = Yup.object({
    title: Yup.string()
        .required("Title is required"),

    price: Yup.string()
        .required("Price is required"),

    description: Yup.string()
        .min(10, "Description must be at least 10 characters")
        .required("Description is required"),

    image: Yup.string()
        .required("Image is required"),

    category: Yup.string()
        .required("Category is required"),
});

const AddEditProduct = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { id } = useParams()

    const formik = useFormik({
        initialValues: {
            title: "",
            price: "",
            description: "",
            image: "",
            category: "",
            isLoading: false,
            categoryOption: []
        },
        validationSchema,

        onSubmit: async (values) => {
            try {
                const { title, price, description, image, category } = values
                const newData = { title, price, description, image, category }
                console.log("This data will insert :", newData)
                const data = await dispatch(id ? updateProduct({ id, data: newData }) : addProduct(newData)).unwrap() 
                // After insert and update, data gets not insert or update in the database even I got 200 API response
                console.log("This deta getting from insert/update API response :", data)

                navigate("/product")
            } catch (error) {
                console.error("Unexpected error during login", error);
            }
        },
    });

    useEffect(() => {
        const getCategories = async () => {
            const list = []
            const catData = await dispatch(getAllCategories()).unwrap()
            catData?.map(item => list.push({ label: item, value: item }))
            formik.setFieldValue("categoryOption", list)
        }
        getCategories()
        if(id){
            const getEditableProduct = async()=>{
                const edit = await dispatch(getProductById(id)).unwrap()
                formik.setFieldValue("title", edit?.title)
                formik.setFieldValue("price", edit?.price)
                formik.setFieldValue("image", edit?.image)
                formik.setFieldValue("description", edit?.description)
                formik.setFieldValue("category", edit?.category)
            }
            getEditableProduct()
        }
    }, [])

    return (
        <Box mt={{ xs: 8 }}>
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
                    <Typography variant="h4">{id ? "Edit Product" : "Add Product"} </Typography>
                </Grid>
                <FormikProvider value={formik}>
                    <form>
                        <Grid display={"flex"} justifyContent={"center"} mb={2}>
                            <CustomInput
                                label="Title"
                                name="title"
                                onChange={formik.handleChange}
                                value={formik.values.title}
                                error={formik.touched.title && Boolean(formik.errors.title)}
                                helperText={formik.touched.title ? formik.errors.title : ""}
                            />
                        </Grid>
                        <Grid display={"flex"} justifyContent={"center"} mb={2}>
                            <CustomInput
                                label="Price"
                                name="price"
                                type={"number"}
                                onChange={formik.handleChange}
                                value={formik.values.price}
                                error={formik.touched.price && Boolean(formik.errors.price)}
                                helperText={formik.touched.price ? formik.errors.price : ""}
                            />
                        </Grid>
                        <Grid display={"flex"} justifyContent={"center"} mb={2}>
                            <CustomInput
                                label="Description"
                                name="description"
                                onChange={formik.handleChange}
                                value={formik.values.description}
                                error={formik.touched.description && Boolean(formik.errors.description)}
                                helperText={formik.touched.description ? formik.errors.description : ""}
                            />
                        </Grid>
                        <Grid display={"flex"} justifyContent={"center"} mb={2}>
                            <CustomInput
                                label="Image"
                                name="image"
                                onChange={formik.handleChange}
                                value={formik.values.image}
                                error={formik.touched.image && Boolean(formik.errors.image)}
                                helperText={formik.touched.image ? formik.errors.image : ""}
                            />
                        </Grid>
                       {formik.values.image && <Grid display={"flex"} justifyContent={"start"} mb={2}>
                            <img src={formik.values.image} style={{height:"100px", width:"100px"}} alt="image"  />
                        </Grid>}
                        <Grid display={"flex"} justifyContent={"center"} mb={2}>
                            <CustomSelect
                                options={formik?.values?.categoryOption}
                                labelKey={"label"}
                                valueKey={"value"}
                                label={"Category"}
                                size="large"
                                name={"category"}
                                value={formik?.values?.category}
                                onChange={(evt) => formik.setFieldValue("category", evt.target.value)}
                                error={formik.touched.category && Boolean(formik.errors.category)}
                                helperText={formik.touched.category ? formik.errors.category : ""}
                            />
                        </Grid>
                    </form>
                </FormikProvider>

                <Grid display={"flex"} justifyContent={"end"} gap={2}>
                    <CustomButton
                        label={id ? "Update" : "Submit"}
                        isLoading={formik.values.isLoading}
                        onClick={formik.handleSubmit}
                        fullWidth={false}
                    />
                    <CustomButton
                        label="Cancel"
                        color="inherit"
                        isLoading={formik.values.isLoading}
                        onClick={() => navigate("/product")}
                        fullWidth={false}
                    />
                </Grid>
            </Paper>

        </Box>
    )
}


export default AddEditProduct