import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../../_actions/user_action";

function RegisterPage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onEmailHandler = (e) => {
    setEmail(e.target.value);
  };

  const onNameHandler = (e) => {
    setName(e.target.value);
  };
  const onPasswordHandler = (e) => {
    setPassword(e.target.value);
  };
  const onConfirmPasswordHandler = (e) => {
    setConfirmPassword(e.target.value);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("비밀번호와 비밀번호 확인은 같아야합니다");
      return;
    }

    let body = {
      email,
      password,
      name,
    };

    dispatch(registerUser(body)).then((res) => {
      if (res.payload.success) {
        navigate("/login");
      } else {
        alert("Error");
      }
    });
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={email} onChange={onEmailHandler} />
        <label>Name</label>
        <input type="text" value={name} onChange={onNameHandler} />
        <label>Password</label>
        <input type="password" value={password} onChange={onPasswordHandler} />
        <label>Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={onConfirmPasswordHandler}
        />
        <br />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}

export default RegisterPage;
