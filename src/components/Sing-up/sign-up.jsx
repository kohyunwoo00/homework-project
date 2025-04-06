import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./sign-up.css";

const Signup = () => {
  const navigate = useNavigate();
  const [teamNo, setTeamNo] = useState("");
  const [memberId, setMemberId] = useState("");
  const [memberPw, setMemberPw] = useState("");
  const [memberName, setMemberName] = useState("");
  const [teamList, setTeamList] = useState([]);

  useEffect(() => {
    // 팀 목록을 백엔드에서 불러오기
    axios
      .get("http://localhost:80/teams")
      .then((res) => {
        setTeamList(res.data);
      })
      .catch((err) => {
        console.error("팀 선택을 안했습니다:", err);
        setTeamList([
          { teamNo: 1, teamName: "두산" },
          { teamNo: 2, teamName: "키움" },
          { teamNo: 3, teamName: "LG" },
          { teamNo: 4, teamName: "NC" },
          { teamNo: 5, teamName: "기아" },
          { teamNo: 6, teamName: "롯데" },
          { teamNo: 7, teamName: "SSG" },
          { teamNo: 8, teamName: "한화" },
          { teamNo: 9, teamName: "삼성" },
          { teamNo: 10, teamName: "KT" },
        ]);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { teamNo, memberId, memberPw, memberName };

    try {
      const response = await axios.post("http://localhost/members", userData);
      console.log("회원가입 성공:", response.data);

      const selectedTeam = teamList.find(
        (team) => team.teamNo.toString() === teamNo
      );
      if (selectedTeam) {
        localStorage.setItem("teamNo", selectedTeam.teamNo);
        localStorage.setItem("teamName", selectedTeam.teamName);
      }

      alert("회원가입이 완료되었습니다!");
      navigate("/");
    } catch (error) {
      console.error("회원가입 실패:", error); // 전체 에러 찍기
      console.log("에러 응답 내용:", error.response?.data); // 여기!

      const errorData = error.response?.data;

      if (
        errorData &&
        typeof errorData === "object" &&
        errorData["error-message"] === "중복된 아이디"
      ) {
        alert("중복된 아이디입니다");
      } else {
        alert("회원가입에 실패했습니다.");
      }
    }
  };
  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>회원가입</h2>
        <div className="input-group">
          <label htmlFor="team">좋아하는 팀</label>
          <select
            id="team"
            value={teamNo}
            onChange={(e) => setTeamNo(e.target.value)}
            required
          >
            <option value="">팀을 선택하세요</option>
            {teamList.map((teamItem) => (
              <option key={teamItem.teamNo} value={teamItem.teamNo}>
                {teamItem.teamName}
              </option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="memberId">아이디</label>
          <input
            type="text"
            id="memberId"
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
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
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="memberName">이름</label>
          <input
            type="text"
            id="memberName"
            value={memberName}
            onChange={(e) => setMemberName(e.target.value)}
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
