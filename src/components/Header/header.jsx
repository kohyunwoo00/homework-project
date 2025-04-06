import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();

  const handleNavClick = (navItem) => {
    if (navItem === "홈") navigate("/");
    if (navItem === "팀 게시판") navigate("/teams");
    if (navItem === "자유게시판") navigate("/board/자유게시판");
    if (navItem === "내 정보") navigate("/my-page");
  };

  const handleLogout = () => {
    // ✅ 로그아웃 시 localStorage 비우기
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("memberId");
    localStorage.removeItem("teamNo");
    localStorage.removeItem("teamName");

    alert("로그아웃 되었습니다.");
    navigate("/login"); // 로그인 페이지로 이동
  };

  // ✅ 로그인 여부 판단 (accessToken이 있으면 로그인 상태)
  const isLoggedIn = !!localStorage.getItem("accessToken");

  return (
    <header className="header">
      <div className="container">
        <img
          src="https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F5593%2F2019%2F01%2F22%2F0000007425_001_20190122235035693.jpg&type=sc960_832"
          alt="로고"
          className="logo"
        />
        <nav className="nav">
          <ul>
            <li className="nav-item" onClick={() => handleNavClick("홈")}>
              홈
            </li>
            <li
              className="nav-item"
              onClick={() => handleNavClick("팀 게시판")}
            >
              팀 게시판
            </li>
            <li
              className="nav-item"
              onClick={() => handleNavClick("자유게시판")}
            >
              자유게시판
            </li>
            <li className="nav-item" onClick={() => handleNavClick("내 정보")}>
              내 정보
            </li>
          </ul>
        </nav>

        {/* ✅ 로그인 상태에 따라 버튼 표시 */}
        <div className="header-buttons">
          {isLoggedIn ? (
            <button className="btn logout-btn" onClick={handleLogout}>
              로그아웃
            </button>
          ) : (
            <>
              <button
                className="btn login-btn"
                onClick={() => navigate("/login")}
              >
                로그인
              </button>
              <button
                className="btn signup-btn"
                onClick={() => navigate("/sign-up")}
              >
                회원가입
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
