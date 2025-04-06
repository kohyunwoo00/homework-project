import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TeamList = () => {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);

  // 팀 목록 불러오기
  useEffect(() => {
    axios
      .get("http://localhost/teams") // 포트 확인
      .then((res) => {
        setTeams(res.data);
      })
      .catch((err) => {
        console.error("팀 목록 가져오기 실패:", err);
        alert("팀 목록을 불러오는 데 실패했습니다.");
      });
  }, []);

  const handleTeamClick = (teamName) => {
    console.log("✅ 버튼이 클릭되었습니다!");
    console.log("선택한 팀:", teamName);
    localStorage.setItem("teamName", teamName);
    navigate(`/board/${teamName}`);
  };

  return (
    <div>
      <h2>팀 목록</h2>
      <ul>
        {teams.map((team) => (
          <li key={team.teamNo} style={{ marginBottom: "10px" }}>
            <button
              onClick={() => handleTeamClick(team.teamName)}
              style={{
                padding: "10px",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              {team.teamName} 게시판 이동
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamList;
