import React, { useState } from "react";
import classes from "./SignUp.module.css";
import { NavLink } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const submitHandler = (event) => {
    event.preventDefault();

    console.log("hello");
  };

  const handleChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.id] : event.target.value
    }));
  }
  console.log(formData)


  return (
    <div className={classes.signup}>
      <h1 className="text-bold text-center my-5">SignUp</h1>
      <form className="d-flex flex-column" onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="username"
          id="username"
          className="border p-3"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          className="border p-3"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="border p-3"
          onChange={handleChange}
        />
        <button
          className={`btn text-white p-3 disabled:opacity-80 ${classes.signupbtn}`}
        >
          Sign up
        </button>
      </form>
      <div className="d-flex justify-content-end mt-4">
        <p>Have an account?</p>
        <NavLink to={"/sign-in"}>
          <span className="mx-2">singn in</span>
        </NavLink>
      </div>
    </div>
  );
};

export default SignUp;
