import s from "./LoginPage.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";

import * as Yup from "yup";

const LoginPage = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const applySchema = Yup.object().shape({
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

    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={applySchema}
    >
      <Form>
        <h2>Вхід</h2>
        <div className={s.formStyle}>
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
            Ввійти
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default LoginPage;
