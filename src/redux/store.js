import { configureStore } from "@reduxjs/toolkit";
import visibleReducer from "./visibleSlice";
import { filterReducer } from "./filters/filtersSlice";
import { contactsReducer } from "./contacts/contactsSlice";
import { authReduser } from "./auth/authSlice";

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    visible: visibleReducer,
    filters: filterReducer,
    auth: authReduser,
  },
});
