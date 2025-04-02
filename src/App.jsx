import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/header"; // 파일명 대소문자 맞춤
import Login from "./components/Login/login"; // 로그인 페이지 import
import Signup from "./components/Sing-up/sign-up";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header /> {/* 모든 페이지에서 공통으로 유지 */}
        <Routes>
          <Route path="/" element={<h1></h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="*" element={<h1>404 - 페이지를 찾을 수 없습니다.</h1>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
