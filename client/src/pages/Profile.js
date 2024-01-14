import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [fileperc, setFilePerc] = useState(0);
  const [fieUploadError, setFileUploadError] = useState(false);

  const [formdata, setFormData] = useState({
    email: currentUser.email,
    username: currentUser.username,
  });

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

  return (
    <div className="  p-3 max-w-lg mx-auto ">
      <h1 className="text-3xl font-semibold text-center my-7 text-black">
        Profile
      </h1>
      <form className="flex flex-col gap-5">
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
          value={formdata.username}
          type="text"
          className="bordr p-3 rounded-lg"
          id="username"
          onChange={handleChange}
        />

        <input
          placeholder={formdata.email}
          type="email"
          value={formdata.email}
          className="bordr p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />

        <input
          placeholder="password"
          type="password"
          className="bordr p-3 rounded-lg"
          id="password"
        />
        <button className="bg-slate-700 text-white roundedl-lg p-3 uppercase hover:opacity-95 disabled: opacity-80">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer"> Delete Account</span>

        <span className="text-red-700 cursor-pointer"> Sign Out</span>
      </div>
    </div>
  );
}
