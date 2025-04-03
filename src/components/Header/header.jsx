import React from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위해 import
import "./Header.css";

const Header = () => {
  const navigate = useNavigate(); // 페이지 이동 함수

  const handleNavClick = (navItem) => {
    alert(`${navItem}이 클릭되었습니다!`);
  };

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
        <div className="header-buttons">
          <button className="btn login-btn" onClick={() => navigate("/login")}>
            로그인
          </button>
          <button
            className="btn signup-btn"
            onClick={() => navigate("/sign-up")}
          >
            회원가입
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
