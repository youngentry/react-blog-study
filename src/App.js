import "./css/reset.css";
import "./css/App.scss";
import { useState } from "react";

// 22.12.17 20:25 Array.map() 메서드 return
// [1,2,3].map()에 return "리턴값" 과 같이 곧바로 return을 넣으면
// ["리턴값","리턴값","리턴값"] 바로 return의 값을 반복하여 배열의 길이만큼 반환함

function App() {
    const [postTitle, setPostTitle] = useState(["남자 옷가게", "골목 옷가게", "영화관 추천"]);
    const [likes, setLikes] = useState(new Array(postTitle.length).fill(0));
    const [writePost, setWritePost] = useState("");

    const plusLike = (index) => {
        const copy = [...likes];
        copy[index]++;
        setLikes(copy);
    };

    // 22.12.17 20:30 동적인 UI 만드는 순서
    // 1. 디자인 먼저 만들기
    // 2. UI의 현재 상태 state로 저장
    // 3. state에 따라 UI가 어떻게 달라질지 (보일거면 true, 안보일거면 false) 등으로 작성
    const [modal, setModal] = useState(new Array(postTitle.length).fill(0));

    const isModalVisible = (index) => {
        const copy = [...modal];
        copy[index] = !copy[index];
        setModal(copy);
    };

    const sortByTitle = () => {
        let copy = [...postTitle];
        copy.sort();
        setPostTitle(copy);
    };

    const 글쓰기 = (e) => {
        e.preventDefault();
        const postCopy = [...postTitle];
        postCopy.unshift(writePost);
        setPostTitle(postCopy);
        const likesCopy = [...likes];
        likesCopy.unshift(0);
        setLikes(likesCopy);
    };

    const 글삭제 = (e, index) => {
        e.preventDefault();
        console.log(e.target);
        const copy = [...postTitle];
        copy.splice(index, 1);
        setPostTitle(copy);
    };

    return (
        <div className="App">
            <h1 className="blackNavTitle">블로그 이름</h1>
            <form className="writePostForm" action="">
                <input type="text" placeholder="제목을 입력해주세요" onChange={(e) => setWritePost(e.target.value)} />
                <button onClick={(e) => 글쓰기(e)}>글쓰기</button>
            </form>

            <section className="post">
                <div className="titleCategory">
                    <h2>글 목록</h2>
                    <button className="sortByTitle" onClick={() => sortByTitle(postTitle)}>
                        가나다 순으로 정렬하기🔻
                    </button>
                </div>
                <ul>
                    {postTitle.map((title, index) => (
                        <li key={index} className="list">
                            <div className="titleBox">
                                <h3 className="postTitle" onClick={() => isModalVisible(index)}>
                                    {title}
                                </h3>
                                <div className="buttonBox">
                                    <button
                                        className="like"
                                        onClick={() => {
                                            plusLike(index);
                                        }}
                                    >
                                        {" "}
                                        ❤ {likes[index]}
                                    </button>
                                    <button
                                        className="remove"
                                        onClick={(e) => {
                                            글삭제(e, index);
                                        }}
                                    >
                                        글 지우기
                                    </button>
                                </div>
                            </div>
                            <p className="content">내용</p>
                            {/* 221218 15:35 나타나지 않게 하려면 null을 사용한다.
                            component에 데이터를 전달하려면 props를 통해서 전달해야 한다. */}
                            {modal[index] === true ? <Modal originalTitle={postTitle} setTitle={setPostTitle} titleIndex={index} manToWoman={manToWoman} /> : null}
                            {/* 221218 15:50 modal을 여러개 생성하지 않고 배경 색상만을 변경하기 쉽게 만들 수 있다.
                            props.color 이런 식으로 구멍을 뚫어놓으면 이제 컴포넌트 사용할 때
                            <div className="modal" style={{ background : 'skyblue' }}></div> 
                            <Modal color={'skyblue'} /> 이러면 하늘색 모달창이 생성됩니다. 
                            <Modal color={'orange'} /> 이러면 오렌지색 모달창이 생성됩니다. */}
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}

// 22.12.17 20:00 배열 스프레드 연산자로 생성하는 이유
const manToWoman = (index, setPostTitle, originalData) => {
    // 배열을 스프레드 연산자(...)로 새롭게 생성하지 않고 그대로 복사를 하게 되면 완전하게 같은 배열이 되기 때문에 state자체가 변한 것을 인지하지 못한다. 따라서 스프레드 연산자를 이용한다.
    let copy = [...originalData];
    copy[index] = "바뀐 제목";
    console.log(copy);
    setPostTitle(copy);
};

const Modal = (props) => {
    // 22.12.17 20:10 컴포넌트는 언제 만들면 좋은가
    // 1. 반복적인 html 축약할 때
    // 2. 큰 페이지
    // 3. 자주 변경되는 내용을 포함할 때
    return (
        <div className="modal">
            <h4>{props.originalTitle[props.titleIndex]}</h4>
            <p className="date">날짜</p>
            <p className="content">내용</p>
            <div className="changeWordBox">
                <button onClick={() => props.manToWoman(props.titleIndex, props.setTitle, props.originalTitle)}>제목바꾸기</button>
            </div>
        </div>
    );
};

export default App;
