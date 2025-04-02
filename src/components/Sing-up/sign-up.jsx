import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./sign-up.css";

const Signup = () => {
  const navigate = useNavigate();
  const [team, setTeam] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { team, username, password };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/signup",
        userData
      );
      console.log("회원가입 성공:", response.data);
      alert("회원가입이 완료되었습니다!");
      navigate("/"); // 회원가입 후 메인 페이지로 이동
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert("회원가입에 실패했습니다.");
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>회원가입</h2>
        <div className="input-group">
          <label htmlFor="team">팀</label>
          <input
            type="text"
            id="team"
            value={team}
            onChange={(e) => setTeam(e.target.value)}
            placeholder="팀 이름을 입력하세요"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="username">아이디</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="아이디를 입력하세요"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            required
          />
        </div>
        <button type="submit" className="signup-button">
          회원가입
        </button>
      </form>
    </div>
  );
};

export default Signup;
