import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../services/interceptor";


export const getAllProducts = createAsyncThunk("product/fetch", async () => {
  try {
    const response = await axiosInstance.get("/products");
    return response.data;
  } catch (error) {
    console.error(error)
  }
});

export const deleteProduct = createAsyncThunk("product/delte", async (id) => {
  try {
    const response = await axiosInstance.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(error)
  }
});

export const getAllCategories = createAsyncThunk("category/fetch", async () => {
  try {
    const response = await axiosInstance.get("/products/categories");
    return response.data;
  } catch (error) {
    console.error(error)
  }
});

export const getCategoryByProduct = createAsyncThunk("category-product/fetch", async (id) => {
  try {
    const response = await axiosInstance.get(`/products/category/${id}`);
    return response.data;
  } catch (error) {
    console.error(error)
  }
});

export const addProduct = createAsyncThunk("create-product", async (data) => {
  try {
    const response = await axiosInstance.post("/products", data);
    return response.data;
  } catch (error) {
    console.error(error)
  }
});

export const updateProduct = createAsyncThunk("update-product", async ({id, data}) => {
  try {
    const response = await axiosInstance.put(`/products/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error)
  }
});

export const getProductById = createAsyncThunk("edit-product", async (id) => {
  try {
    const response = await axiosInstance.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(error)
  }
});

const initialState = {
  loading: false,
  error: null,
  list: null,
  categoryList: null
};

const prosductSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.pending, (state) => {
      state.loading = true;
      state.error = null
    })
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.list = action.payload
      state.loading = false;
    })
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.loading = true;
      state.error = action.payload || "An error occured"
    })
    builder.addCase(deleteProduct.pending, (state) => {
      state.loading = true;
      state.error = null
    })
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.loading = false;
    })
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.loading = true;
      state.error = action.payload || "An error occured"
    })
    builder.addCase(getAllCategories.pending, (state) => {
      state.loading = true;
      state.error = null
    })
    builder.addCase(getAllCategories.fulfilled, (state, action) => {
      state.categoryList = action.payload
      state.loading = false;
    })
    builder.addCase(getAllCategories.rejected, (state, action) => {
      state.loading = true;
      state.error = action.payload || "An error occured"
    })
    builder.addCase(getCategoryByProduct.pending, (state) => {
      state.loading = true;
      state.error = null
    })
    builder.addCase(getCategoryByProduct.fulfilled, (state, action) => {
      state.list = action.payload
      state.loading = false;
    })
    builder.addCase(getCategoryByProduct.rejected, (state, action) => {
      state.loading = true;
      state.error = action.payload || "An error occured"
    })
  }
})


export default prosductSlice.reducer