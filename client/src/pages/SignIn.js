import React, { useState } from "react";
import classes from "./SignIn.module.css";
import { NavLink, useNavigate } from "react-router-dom";


const SignIn = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate()


  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message)
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/');
    } catch (error) {
      setLoading(false);
      console.log(error.message)
      setError(error.message);
    }
  };

  const handleChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.id] : event.target.value
    }));
  }



  return (
    <div className={classes.signup}>
      <h1 className="text-bold text-center my-5">Sign In</h1>
      <form className="d-flex flex-column" onSubmit={submitHandler}>
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
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
      <div className="d-flex justify-content-end mt-4">
        <p>Dont have an account?</p>
        <NavLink to={"/sign-up"}>
          <span className="mx-2">singn up</span>
        </NavLink>
      </div>
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
};

export default SignIn;
