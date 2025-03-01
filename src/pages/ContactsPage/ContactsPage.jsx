import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "../../redux/contacts/contactsOperations";
import { toggleFormVisibility } from "../../redux/visibleSlice";
import { ErrorMessage } from "formik";
import SearchBox from "../../components/SearchBox/SearchBox";
import ContactForm from "../../components/ContactForm/ContactForm";
import Loader from "../../components/Loader/Loader";
import ContactList from "../../components/ContactList/ContactList";
import {
  selectError,
  selectLoading,
} from "../../redux/contacts/contactsSelectors";

const ContactsPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const isFormVisible = useSelector((state) => state.visible.isFormVisible);
  const loader = useSelector(selectLoading);
  const error = useSelector(selectError);
  const toggleForm = () => {
    dispatch(toggleFormVisibility(), [dispatch]);
  };

  return (
    <div className="appStyle">
      <h1>Телефонна книга</h1>
      {error && <ErrorMessage />}
      <SearchBox />
      {isFormVisible ? (
        <ContactForm closeForm={toggleForm} />
      ) : (
        <button className="toggleFormBtn" onClick={toggleForm}>
          Додати контакт
        </button>
      )}
      {loader && <Loader />}
      <ContactList closeForm={toggleForm} />
    </div>
  );
};

export default ContactsPage;
