import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import { toast } from "../../utils/toast";
export const setBooksByFetching = createAsyncThunk(
  "book/setBooksByFetching",
  async ({ page }: { page: number }, thunkapi) => {
    try {
      const res = await api.get(`/?page=${page}`);

      const data = await res.data;

      return thunkapi.fulfillWithValue({
        books: data?.data,
        totalPages :data?.totalPages
      });
    } catch (err: any) {
        toast.error(err?.response?.data?.error || "Something went wrong!!!")
    }
  }
);

export const setBooksByEdit = createAsyncThunk(
  "book/setBooksByEdit",
  async ({ editId ,payload}: { editId: string,payload:any }, thunkapi) => {
    try {
      await api.put(`/${editId}`,payload);
      toast.success("Book Edit Successfully")
    } catch (err: any) {
                toast.error(err?.response?.data?.error || "Something went wrong!!!")

    }
  }
);

export const setBooksByDelete = createAsyncThunk(
  "book/setBooksByDelete",
  async ({ editId }: { editId: string }, thunkapi) => {
    try {
      await api.delete(`/${editId}`);
      toast.success("Book Delted Successfully")
    } catch (err: any) {
                toast.error(err?.response?.data?.error || "Something went wrong!!!")

    }
  }
);
export const createNewBook = createAsyncThunk(
  "book/createNewBook",
  async ({ payload }: { payload: any }, thunkapi) => {
    try {
      await api.post(`/`, 
        payload,
      );
      toast.success("Book Created Successfully")
    } catch (err: any) {
                toast.error(err?.response?.data?.error || "Something went wrong!!!")

    }
  }
);
