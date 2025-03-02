import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, setAuthHeader } from "../auth/authOperations";
import { useNavigate } from "react-router-dom";
export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkApi) => {
    const token = thunkApi.getState().auth.token;
    if (token) {
      setAuthHeader(token);
    } else {
      console.error("Токен відсутній");
      return thunkApi.rejectWithValue("Unauthorized - Token is missing");
    }

    try {
      const { data } = await api.get("/contacts");
      console.log("Отримані контакти:", data);
      return data;
    } catch (error) {
      console.error("Помилка отримання контактів:", error);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, thunkApi) => {
    const token = thunkApi.getState().auth.token;
    if (token) {
      setAuthHeader(token);
    } else {
      console.error("Токен відсутній");
      return thunkApi.rejectWithValue("Unauthorized - Token is missing");
    }

    try {
      await api.delete(`/contacts/${contactId}`);
      console.log(`Контакт з ID ${contactId} видалено`);
      return contactId;
    } catch (error) {
      console.error("Помилка видалення контакту:", error);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (body, thunkApi) => {
    const token = thunkApi.getState().auth.token;
    if (token) {
      setAuthHeader(token);
    } else {
      console.error("Токен відсутній");
      return thunkApi.rejectWithValue("Unauthorized - Token is missing");
    }

    try {
      const { data } = await api.post("/contacts", body);
      console.log("Додано контакт:", data);
      return data;
    } catch (error) {
      console.error("Помилка додавання контакту:", error);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
