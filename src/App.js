import "./css/reset.css";
import "./css/App.scss";
import { useState } from "react";

function App() {
    const [postTitle, setPostTitle] = useState(["남자 옷가게", "골목 옷가게", "영화관 추천"]);

    // 동적인 UI 만드는 순서
    // 1. 디자인 먼저 만들기
    // 2. UI의 현재 상태 state로 저장
    // 3. state에 따라 UI가 어떻게 달라질지 (보일거면 true, 안보일거면 false) 등으로 작성
    const [modal, setModal] = useState(false);

    const manToWoman = (postTitle) => {
        // 배열을 스프레드 연산자(...)로 새롭게 생성하지 않고 그대로 복사를 하게 되면 완전하게 같은 배열이 되기 때문에 state자체가 변한 것을 인지하지 못한다. 따라서 스프레드 연산자를 이용한다.
        let copy = [...postTitle];
        copy[0] = "여자 옷가게";
        setPostTitle(copy);
    };

    const sortByTitle = (postTitle) => {
        let copy = [...postTitle];
        copy.sort();
        setPostTitle(copy);
    };

    return (
        <div className="App">
            <h1 className="blackNavTitle">블로그 이름</h1>

            <section className="post">
                <div className="titleCategory">
                    <h2>글 목록</h2>
                    <button className="sortByTitle" onClick={() => sortByTitle(postTitle)}>
                        가나다 순으로 정렬하기🔻
                    </button>
                </div>
                <ul>
                    <li className="list">
                        <h3 className="postTitle">
                            {postTitle[0]} <span onClick={() => manToWoman(postTitle)}>⁉</span>
                        </h3>
                        <p>내용</p>
                    </li>
                    <li className="list">
                        <h3 className="postTitle">{postTitle[1]}</h3>
                        <p>내용</p>
                    </li>
                    <li className="list">
                        <h3 className="postTitle" onClick={() => setModal(!modal)}>
                            {postTitle[2]}
                        </h3>
                        <p>내용</p>
                    </li>
                </ul>
                {/* 나타나지 않게 하려면 null을 사용한다. */}
                {modal === true ? <Modal /> : null}
            </section>
        </div>
    );
}

// 컴포넌트는 언제 만들면 좋은가
// 1. 반복적인 html 축약할 때
// 2. 큰 페이지
// 3. 자주 변경되는 내용을 포함할 때
const Modal = () => {
    return (
        <div className="modal">
            <h4>제목</h4>
            <p className="date">날짜</p>
            <p className="content">내용</p>
        </div>
    );
};

export default App;
