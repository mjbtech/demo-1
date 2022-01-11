import { useEffect, useContext, useState } from "react";
import { SiteContext } from "../SiteContext";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Input } from "./elements";
import { Prompt } from "./modal";
import s from "./login.module.scss";

export default function Login({}) {
  const { user, setUser } = useContext(SiteContext);
  const [users, setUsers] = useState([]);
  const { handleSubmit, register } = useForm();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");
      return;
    }
    fetch(`${process.env.REACT_APP_HOST}/user`)
      .then((res) => res.json())
      .then((users) => {
        if (users._embedded.user) {
          setUsers(users._embedded.user);
        }
      });
  }, []);
  return (
    <div className={s.login}>
      <img src="/asset/new_login_img.jpg" />
      <div className={s.formWrapper}>
        <img src="/asset/logo.jpg" />
        <form
          onSubmit={handleSubmit((data) => {
            const _user = users.find(
              (u) => u.email === data.email && u.password === data.password
            );
            if (_user) {
              setUser(_user);
              navigate("/");
            } else {
              Prompt({
                type: "error",
                message: "Invalid credentials.",
              });
            }
          })}
        >
          <h1>Sign In</h1>
          <Input
            name="email"
            register={register}
            type="email"
            required={true}
            label="Email"
          />
          <Input
            name="password"
            register={register}
            required={true}
            type="password"
            label="Password"
          />
          <button className="btn w-100">Sign in</button>
        </form>
      </div>
    </div>
  );
}
