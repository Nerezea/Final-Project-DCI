import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import api from "../../api/api.js";
import { AuthApi } from "../../api/authApi.js";
import { login } from "../../store/slice/auth.slice.js";
import { loginSchema } from "../../validation/auth.validation.jsx";
import style from "./login.module.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  function handleLogin() {
    const { error } = loginSchema.validate({ username: email, password });
    if (error) return toast.warn(error.message);
    AuthApi.login(email, password)
      .then((res) => {
        api.defaults.headers.token = res.data.token
        dispatch(
          login({
            token: res.data.token,
            role: res.data.role,
            fullName: res.data.fullName,
          })
        );
      })
      .catch((err) => toast.error(err));
  }

  return (
  /*   <div className={style.login}>
      <div className={style.login_form}>
        <h1>Login</h1>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="👤"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="🔒"
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div> */
  <div className={style.logo_container}>
  
    <div className={style.login_box}>
  <iframe className={style.frame}
            
            src="https://lottie.host/embed/46e1efc7-148b-4537-92d0-1054c1188603/dGAswJ2qhq.json"
          ></iframe>
    <form className={style.form}>
      <div className={style.user_box}>
        <input type="text" name="" required=""  value={email}  onChange={(e) => setEmail(e.target.value)} />
        <label>Username</label>
      </div>
      <div className={style.user_box}>
        <input type="password" name="" required="" value={password}  onChange={(e) => setPassword(e.target.value)} />
        <label>Password</label>
      </div>
      <div className={style.onclick} onClick={handleLogin}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Submit
      </div>
    </form>
  </div>
  
  </div>
  
  
    );
};

export default Login;
