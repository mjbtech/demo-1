import { useEffect, useContext } from "react";
import { SiteContext } from "../SiteContext";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Input } from "./elements";
import s from "./login.module.scss";

export default function Login({}) {
  const { user, setUser } = useContext(SiteContext);
  const { handleSubmit, register } = useForm();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);
  return (
    <div className={s.login}>
      <form
        onSubmit={handleSubmit((data) => {
          setUser({
            _id: Math.random().toString(36).substr(-8),
            email: data.email,
          });
          navigate("/");
        })}
      >
        <h1>Login</h1>
        <Input register={register} required={true} label="Email" />
        <Input
          register={register}
          required={true}
          type="password"
          label="Password"
        />
        <button className="btn w-100">Sign in</button>
      </form>
    </div>
  );
}
