import React, { useState } from "react";
import classes from "./SignUp.module.css";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const handleChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
  };

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
          disabled={loading}
          className={`btn text-white p-3 ${classes.signupbtn}`}
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
        <OAuth/>
      </form>
      <div className="d-flex justify-content-end mt-4">
        <p>Have an account?</p>
        <NavLink to={"/sign-in"}>
          <span className="mx-2">singn in</span>
        </NavLink>
      </div>
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
};

export default SignUp;
