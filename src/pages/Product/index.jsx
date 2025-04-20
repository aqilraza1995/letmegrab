import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Box, Grid, IconButton, Typography } from "@mui/material"
import CustomTable from "../../components/CustomTable"
import CustomInput from "../../components/CustomInput"
import CustomButton from "../../components/CustomButton"
import CustomSelect from "../../components/CustomSelect"
import { Delete, Edit, Visibility } from "@mui/icons-material"
import CustomModal from "../../components/CustomModal"
import { deleteProduct, getAllCategories, getAllProducts, getCategoryByProduct } from "../../store/slice/ProductSlice"

const Product = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const product = useSelector(state => state.product)
    const [open, setOpen] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [details, setDetails] = useState(null)
    const [deletableId, setDeletableId] = useState()
    const [refreshData, setRefereshData] = useState(false)
    const [categoryList, setCategoryList] = useState("")
    const [categoryId, setCategoryId] = useState("")
    const [search, setSearch] = useState("")
    const [productList, setProductList] = useState([])

    const option = [
        { label: "demo-1", value: 1 },
        { label: "demo-2", value: 2 },
        { label: "demo-3", value: 3 },
        { label: "demo-4", value: 4 },
    ]

    const columns = [
        {
            id: "title", label: "Title", render: (item) => (
                <Typography
                    sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: 300,
                    }}
                >
                    {item.title}
                </Typography>
            )
        },
        { id: "price", label: "Price" },
        {
            id: "description", label: "Description", render: (item) => (
                <Typography
                    sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: 400,
                    }}
                >
                    {item.description}
                </Typography>
            )
        },
        { id: "category", label: "Category" },
        {
            id: "Action", label: "Action", render: (elm) => (<>
                <IconButton onClick={() => handleViewDetails(elm)}>
                    <Visibility />
                </IconButton>
                <IconButton onClick={() => navigate(`/edit-product/${elm?.id}`)}>
                    <Edit />
                </IconButton>
                <IconButton onClick={() => handOpenDeleteModal(elm?.id)} >
                    <Delete />
                </IconButton>
            </>)
        },
    ]

    const handleViewDetails = (record) => {
        setDetails(record)
        setOpen(true)
    }

    const handOpenDeleteModal = (recordId) => {
        setDeletableId(recordId)
        setOpenDeleteModal(true)
    }

    const handleConfirmDelete = async () => {
        const data = await dispatch(deleteProduct(deletableId)).unwrap()  // Data not delete from database even API response is 200 
        console.log("Deleted Record :", data)
        setRefereshData(!refreshData)
        setOpenDeleteModal(false)
    }

    const handleFilterData = (data, text) => {
        const filteredData = data?.filter(item =>
            item.title?.toString().toLowerCase().includes(text) ||
            item.description?.toString().toLowerCase().includes(text) ||
            item.price?.toString().toLowerCase().includes(text) ||
            item.category?.toString().toLowerCase().includes(text)
        );
        return filteredData
    }

    const handleSearch = (evt) => {
        const text = evt.target.value.toString().toLowerCase();
        setSearch(text)
        const filteredData = handleFilterData(product?.list, text)
        setProductList(filteredData)
    }

    const handleFilterBycategory = async (evt) => {
        setCategoryId(evt.target.value)
        const data = await dispatch(getCategoryByProduct(evt.target.value)).unwrap()
        if (search) {
            const filteredData = handleFilterData(data, search)
            setProductList(filteredData)
        }
        else {
            setProductList(data)
        }
    }

    const handleReset = () => {
        setSearch("")
        setCategoryId("")
        setRefereshData(!refreshData)
    }
    useEffect(() => {
        const getData = async () => {
            const data = await dispatch(getAllProducts()).unwrap()
            setProductList(data)
            if (!product?.categoryList?.length) {
                const list = []
                const catData = await dispatch(getAllCategories()).unwrap()
                catData?.map(item => list.push({ label: item, value: item }))
                setCategoryList(list)
            }
        }
        getData()
    }, [refreshData])

    return (
        <>
            <Grid container spacing={2} mt={6} px={3} item xs={12} alignItems="center" display={"flex"} justifyContent={"space-between"}>

                <Grid size={{ xs: 12, sm: 8, md: 9 }} >
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <CustomInput label="Search..." size={"small"} value={search} onChange={handleSearch} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 5, md: 3 }}>
                            <CustomSelect
                                options={categoryList}
                                labelKey={"label"}
                                valueKey={"value"}
                                label={"Category"}
                                value={categoryId}
                                onChange={handleFilterBycategory}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 1 }}>
                            <CustomButton label={"reset"} onClick={handleReset} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                    <CustomButton label="Add" fullWidth onClick={() => navigate("/add-product")} />
                </Grid>
            </Grid>

            {/* Table */}
            <Grid item xs={12} px={3}>
                <CustomTable columns={columns} rows={productList} loading={product?.loading} />
            </Grid>

            <CustomModal
                title={"Delete Product"}
                open={openDeleteModal}
                handleClose={() => setOpenDeleteModal(false)}
                actionButton
                buttonLabel="Confirm"
                onClick={handleConfirmDelete}
            >
                <Typography>Are you sure you want to delete product?</Typography>
            </CustomModal>

            <CustomModal
                title={"View Details"}
                open={open}
                handleClose={() => setOpen(false)}
            >
                <Grid container spacing={3}>
                    <Grid size={12}>
                        <Box
                            component="img"
                            src={details?.image}
                            alt="Product"
                            sx={{
                                width: '100%',
                                maxHeight: 200,
                                objectFit: 'contain',
                                borderRadius: 2,
                                mb: 2,
                            }}
                        />
                    </Grid>
                    <Grid size={{ md: 4, xs: 12 }}>
                        <Typography fontWeight="bold">Title</Typography>
                    </Grid>
                    <Grid size={{ md: 8, xs: 12 }}>
                        <Typography variant="body2">{details?.title}</Typography>
                    </Grid>

                    <Grid size={{ md: 4, xs: 12 }}>
                        <Typography fontWeight="bold">Price</Typography>
                    </Grid>
                    <Grid size={{ md: 8, xs: 12 }}>
                        <Typography variant="body2">{details?.price}</Typography>
                    </Grid>

                    <Grid size={{ md: 4, xs: 12 }}>
                        <Typography fontWeight="bold">Description</Typography>
                    </Grid>
                    <Grid size={{ md: 8, xs: 12 }}>
                        <Typography variant="body2">{details?.description}</Typography>
                    </Grid>

                    <Grid size={{ md: 4, xs: 12 }}>
                        <Typography fontWeight="bold">Category</Typography>
                    </Grid>
                    <Grid size={{ md: 8, xs: 12 }}>
                        <Typography variant="body2">{details?.category}</Typography>
                    </Grid>
                    <Grid size={{ md: 4, xs: 12 }}>
                        <Typography fontWeight="bold">Rating</Typography>
                    </Grid>
                    <Grid size={{ md: 8, xs: 12 }}>
                        <Typography variant="body2"><span style={{ fontWeight: 700 }}>{details?.rating?.rate}</span> rating of <span style={{ fontWeight: 700 }}>{details?.rating?.count}</span> reviews</Typography>
                    </Grid>
                </Grid>


            </CustomModal>

        </>
    )
}

export default Product