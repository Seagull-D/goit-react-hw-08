import { createSelector, createSlice } from "@reduxjs/toolkit";
import { addContact, deleteContact, fetchContacts } from "./contactsOps";
import { selectFilter } from "./filtersSlice";

const initialState = {
  contacts: {
    items: [],
    isLoading: false,
    isError: null,
  },
};

const slice = createSlice({
  name: "contacts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts.items = action.payload;
        state.contacts.isLoading = false;
      })
      .addCase(fetchContacts.pending, (state, action) => {
        state.contacts.isLoading = true;
        state.contacts.isError = null;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.isError = action.payload;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.items.push(action.payload);
        state.contacts.isError = null;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts.items = state.contacts.items.filter(
          (contact) => contact.id !== action.payload
        );
        state.contacts.isError = null;
      });
  },
});

export const contactsReducer = slice.reducer;

export const selectContacts = (state) => state.contacts.contacts.items;
export const selectLoading = (state) => state.contacts.contacts.isLoading;
export const selectError = (state) => state.contacts.contacts.isError;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    if (!filter) return contacts;

    return contacts.filter((contact) =>
      contact.name?.toLowerCase().includes(filter.toLowerCase())
    );
  }
);
