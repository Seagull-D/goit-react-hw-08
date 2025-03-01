import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../auth/authOperations";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkApi) => {
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
    try {
      await api.delete(`/contacts/${contactId}`);
      console.log(`Контакт з ID ${contactId} видалено`);
      return contactId; // Повертаємо ідентифікатор, а не `data.contactId`
    } catch (error) {
      console.error("Помилка видалення контакту:", error);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (body, thunkApi) => {
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
