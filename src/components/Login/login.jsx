import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {
  const [memberId, setMemberId] = useState("");
  const [memberPw, setMemberPw] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("로그인 요청 데이터:", { memberId, memberPw });

    try {
      const response = await axios.post(
        "http://localhost/auth/login",
        { memberId, memberPw },
        { headers: { "Content-Type": "application/json" } } // JSON 데이터 명시
      );

      console.log("로그인 응답:", response.data); // 응답 데이터 확인

      // 응답 데이터에 토큰이 있으면 로그인 성공
      if (response.data.accessToken) {
        alert("로그인 성공!");

        // ✅ 토큰을 로컬 스토리지에 저장 (추후 API 요청 시 사용)
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);

        localStorage.setItem("teamNo", response.data.teamNo);
        localStorage.setItem("teamName", response.data.teamName);

        navigate("/");
      } else {
        setError("아이디 또는 비밀번호가 올바르지 않습니다.");
      }
    } catch (error) {
      console.error("로그인 요청 중 오류 발생:", error);

      if (error.response) {
        if (error.response.status === 403) {
          setError("접근이 거부되었습니다. 관리자에게 문의하세요.");
        } else if (error.response.status === 400) {
          setError("아이디 또는 비밀번호가 올바르지 않습니다.");
        } else {
          setError(`로그인 실패: ${error.response.status}`);
        }
      } else if (error.request) {
        setError("서버 응답이 없습니다. 네트워크 상태를 확인하세요.");
      } else {
        setError("로그인 요청 중 문제가 발생했습니다.");
      }
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>로그인</h2>

        {error && <p className="error-message">{error}</p>}

        <div className="input-group">
          <label htmlFor="memberId">아이디</label>
          <input
            type="text"
            id="memberId"
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
            placeholder="아이디를 입력하세요"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="memberPw">비밀번호</label>
          <input
            type="password"
            id="memberPw"
            value={memberPw}
            onChange={(e) => setMemberPw(e.target.value)}
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
