// import logo from "./logo.svg";
import "./App.styles.scss";
import { Routes, Route, Outlet } from "react-router-dom";
import Home from "./routes/home/home.component.jsx";
import Navigation from "./routes/navigation/navigation.component";
import SignIn from "./routes/sign-in/sign-in.component.jsx";

function Shop() {
  return <h1>I AM THE SHOP PAGE</h1>;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />}></Route>
        <Route path="shop" element={<Shop />}></Route>
        <Route path="sign-in" element={<SignIn />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
