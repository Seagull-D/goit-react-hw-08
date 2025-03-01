import { configureStore } from "@reduxjs/toolkit";
import visibleReducer from "./visibleSlice";
import { filterReducer } from "./filters/filtersSlice";
import { contactsReducer } from "./contacts/contactsSlice";

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    visible: visibleReducer,
    filters: filterReducer,
  },
});
