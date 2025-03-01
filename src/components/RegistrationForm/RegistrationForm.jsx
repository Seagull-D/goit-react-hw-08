import s from "./RegistrationForm.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";

import * as Yup from "yup";
import { register } from "../../redux/auth/authOperations";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const onlyLaters = /^[A-Za-zА-Яа-яЇїІіЄєҐґ'’\s]+$/;

  const applySchema = Yup.object().shape({
    name: Yup.string()
      .required("Поле обов'язкове")
      .min(3, "Мінімум 3 символи")
      .max(20, "Максимум 20 символів")
      .matches(onlyLaters, "Введіть літери!"),

    email: Yup.string()
      .email("Невірний формат email")
      .required("Поле обов'язкове"),

    password: Yup.string()
      .min(6, "Мінімум 6 символів")
      .matches(/[0-9]/, "Пароль повинен містити хоча б одну цифру")
      .matches(
        /[a-zA-Z]/,
        "Пароль повинен містити хоча б одну латинську літеру"
      )
      .required("Поле обов'язкове"),
  });

  const handleSubmit = (values, actions) => {
    console.log(values);
    dispatch(register(values))
      .unwrap()
      .then((res) => {
        toast.success(`Вітаю, ${res.user.name}, реєстрація пройшла успішно!`);
        navigate("/login", { replace: true });
      })
      .catch(() =>
        toast.error("Некоректні данні або користувач зареєстрований")
      );

    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={applySchema}
    >
      <Form>
        <h2>Зареєструйся</h2>
        <div className={s.formStyle}>
          <label className={s.labelText}>
            <p>Ім'я</p>
            <Field type="text" name="name" placeholder="Введіть ім'я" />
            <ErrorMessage
              className={s.errorMessage}
              name="name"
              component="p"
            />
          </label>

          <label className={s.labelText}>
            <p>Email</p>
            <Field
              type="text"
              name="email"
              placeholder="Введіть email"
              autoComplete="current-password"
            />
            <ErrorMessage
              className={s.errorMessage}
              name="email"
              component="p"
            />
          </label>

          <label className={s.labelText}>
            <p>Пароль</p>
            <Field
              type="password"
              name="password"
              placeholder="Введіть пароль"
              autoComplete="current-password"
            />
            <ErrorMessage
              className={s.errorMessage}
              name="password"
              component="p"
            />
          </label>

          <button className={s.submitBtn} type="submit">
            Зареєструватись
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default RegistrationForm;
