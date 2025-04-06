import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/header"; // ✅ 파일명 확인
import Login from "./components/Login/login";
import Signup from "./components/Sing-up/sign-up";
import Board from "./components/Board/board";
import Home from "./components/Home/home";
import TeamList from "./components/TeamList";

const App = () => {
  return (
    <div className="App">
      <Header /> {/* 모든 페이지에서 공통으로 유지 */}
      <main>
        {" "}
        {/* ✅ 메인 콘텐츠 영역을 명확하게 분리 */}
        <Routes>
          <Route path="/" element={<Home />} />{" "}
          {/* ✅ 루트 페이지를 Home으로 */}
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/board/:teamName" element={<Board />} />
          <Route path="/teams" element={<TeamList />} />
          <Route path="*" element={<h1>404 - 페이지를 찾을 수 없습니다.</h1>} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
