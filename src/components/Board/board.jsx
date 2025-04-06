import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./board.css";

const nameToNoMap = {
  두산: 1,
  LG: 2,
  키움: 3,
  한화: 4,
  SSG: 5,
  NC: 6,
  롯데: 7,
  삼성: 8,
  기아: 9,
  KT: 10,
};

const Board = () => {
  const { teamName } = useParams(); // URL에서 팀 이름 받기
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");

  const myTeamName = localStorage.getItem("teamName");
  const teamNo = nameToNoMap[teamName]; // 이름을 번호로 변환

  // ✅ 내 팀 아니면 접근 차단
  useEffect(() => {
    if (teamName !== myTeamName) {
      alert("본인의 팀 게시판만 이용할 수 있습니다.");
      navigate("/");
      return;
    }

    axios
      .get(`http://localhost:5137/boards?teamNo=${teamNo}`)
      .then((res) => setPosts(res.data))
      .catch((err) => {
        console.error("게시글 가져오기 실패:", err);
      });
  }, [teamName, myTeamName, navigate, teamNo]);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    const newPost = { content, author: "익명", teamNo };

    try {
      await axios.post("http://localhost:5137/boards", newPost);
      setPosts([...posts, newPost]);
      setContent("");
    } catch (error) {
      console.error("게시글 작성 오류:", error);
    }
  };

  return (
    <div className="board-container">
      <h2>{teamName} 게시판</h2>
      <form className="post-form" onSubmit={handlePostSubmit}>
        <textarea
          placeholder="게시글을 작성하세요..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">작성</button>
      </form>
      <ul className="post-list">
        {posts.map((post, index) => (
          <li key={index} className="post-item">
            <strong>
              {post.author} ({post.teamNo})
            </strong>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Board;
