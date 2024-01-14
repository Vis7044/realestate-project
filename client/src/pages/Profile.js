import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
  uploadString,
} from "firebase/storage";
import { app } from "../firebase";

import { updateUserFailure,updateUserStart, updateUserSuccess } from "../redux/user/UserSlice";
import { useDispatch } from "react-redux";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser,loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [fileperc, setFilePerc] = useState(0);
  const [fieUploadError, setFileUploadError] = useState(false);
  const [updateSucces, setUpdateSuccess] = useState(false)

  const [formdata, setFormData] = useState({});

  const dispatch = useDispatch()

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const pregress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(pregress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formdata, avatar: downloadURL });
        });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formdata)
      })
      const data = await res.json()
      if(data.success ===false) {
        dispatch(updateUserFailure(data.message))
        return
      }
      dispatch(updateUserSuccess(data))
      setUpdateSuccess(true)
      setTimeout(()=> {
        setUpdateSuccess(false)
      },1000)
    } catch (error) {
      dispatch(updateUserFailure(error.message))
    }
  }

  return (
    <div className="  p-3 max-w-lg mx-auto ">
      <h1 className="text-3xl font-semibold text-center my-7 text-black">
        Profile
      </h1>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formdata.avatar || currentUser.avatar}
          alt="Profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center"
        />
        <p className="text-sm self-center">
          {fieUploadError ? (
            <span className="text-red-700">Error Image uplaod(image must be less than 2mb)</span>
          ) : fileperc > 0 && fileperc < 100 ? (
            <span className="text-slate-700">{`Uploading ${fileperc}%`}</span>
          ) : fileperc === 100 ? (
            <span className="text-green-700">Image succesfully uploaded!</span>
          ) : (
            ""
          )}
        </p>

        <input
          placeholder={formdata.username}
          defaultValue={currentUser.username}
          type="text"
          className="bordr p-3 rounded-lg"
          id="username"
          onChange={handleChange}
        />

        <input
          placeholder={formdata.email}
          type="email"
          defaultValue={currentUser.email}
          className="bordr p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />

        <input
          placeholder="password"
          type="password"
          className="bordr p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button disabled={loading} className="bg-slate-700 text-white roundedl-lg p-3 uppercase hover:opacity-95 disabled: opacity-80">
          {loading? 'Loading...': 'Update'}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer"> Delete Account</span>

        <span className="text-red-700 cursor-pointer"> Sign Out</span>
      </div>
      <p className="text-red-700 mt-5">{error? error: ''}</p>
      <p className="text-green-700 mt-5">{updateSucces? 'User is updated Succesfully': ''}</p>
    </div>
  );
}
