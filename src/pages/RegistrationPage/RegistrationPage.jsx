import s from "./RegistrationPage.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";

import * as Yup from "yup";

const ContactForm = () => {
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

    actions.resetForm(); // Очистити форму після відправки
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

export default ContactForm;
