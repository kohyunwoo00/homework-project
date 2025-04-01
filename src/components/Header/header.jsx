import React from "react";
import "./Header.css"; // 사용자 정의 CSS 파일 import

const Header = () => {
  //const handleNavClick = (navItem) => {
  // 클릭 시 실행될 로직을 여기에 추가합니다.
  //  alert(`${navItem}이 클릭되었습니다!`); // 간단하게 알림창 표시
  //};

  return (
    <header className="header">
      <div className="container">
        <img
          src={
            "https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F5593%2F2019%2F01%2F22%2F0000007425_001_20190122235035693.jpg&type=sc960_832"
          }
          alt="로고"
          className="logo"
        />
        {/* 이미지 추가 */}
        <nav className="nav">
          <ul>
            <li className="nav-item" onClick={() => handleNavClick("홈")}>
              홈
            </li>
            <li className="nav-item" onClick={() => handleNavClick("팀게시판")}>
              팀 게시판
            </li>
            <li
              className="nav-item"
              onClick={() => handleNavClick("자유게시판")}
            >
              자유게시판
            </li>
            <li className="nav-item" onClick={() => handleNavClick("공지사항")}>
              공지사항
            </li>
          </ul>
        </nav>
        <div className="header-buttons">
          <button className="btn login-btn">로그인</button>
          <button className="btn signup-btn">회원가입</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
