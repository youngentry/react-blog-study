import "./css/reset.css";
import "./css/App.scss";
import { useState } from "react";

function App() {
    const [postTitle, setPostTitle] = useState(["남자 옷가게", "골목 옷가게", "영화관 추천"]);

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
                        <h3 className="postTitle">{postTitle[2]}</h3>
                        <p>내용</p>
                    </li>
                </ul>
            </section>
        </div>
    );
}

export default App;
