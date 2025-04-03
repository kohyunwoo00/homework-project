import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 로그인 성공 후 이동을 위해 import
import axios from "axios"; // 백엔드와 통신하기 위해 axios 사용
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // 로그인 성공 시 이동

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:80/auth/login", {
        username,
        password,
      });

      if (response.data.success) {
        alert("로그인 성공!");
        navigate("/"); // 로그인 성공 시 홈으로 이동
      } else {
        setError("아이디 또는 비밀번호가 올바르지 않습니다.");
      }
    } catch (error) {
      setError("서버 오류: 로그인 실패");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>로그인</h2>

        {error && <p className="error-message">{error}</p>}

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

        <button type="submit" className="login-button">
          로그인
        </button>
      </form>
    </div>
  );
}

export default Login;
