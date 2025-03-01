import s from "./LoginForm.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";

import * as Yup from "yup";
import { login } from "../../redux/auth/authOperations";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    dispatch(login(values))
      .unwrap()
      .then((res) => {
        toast.success(`Вітаю, ${res.user.name}`);
        navigate("/contacts", { replace: true });
      })
      .catch(() => toast.error("Неправельні данні"));
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

export default LoginForm;
