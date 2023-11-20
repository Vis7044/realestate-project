import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./component/Home";
import About from "./component/About";
import SignIn from "./component/SignIn";
import SignOut from "./component/SignOut";
import Profile from "./component/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route path="/sign-out" element={<SignOut/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
