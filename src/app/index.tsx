import React, { JSX } from "react";
import { BrowserRouter, Link, Navigate, Outlet, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "../style.css";
import { Article, Button, ButtonLabel, Main, Title, PageTitle, ToastMessageBox } from "../components";
import { DictPage } from "./dict";
import { InfoPage } from "./info";
import { busu } from "../database/busu";
import { DictViewPage } from "./dict/view";
import { ReadyAcidrainPage } from "./ready/acidrain";
import styled, { createGlobalStyle } from "styled-components";
import { DictNewPage } from "./dict/new";
import { v4 } from "uuid";
import { PlayAcidrainPage } from "./play/acidrain";
import { DictModifyPage } from "./dict/modify";

interface IAnimateBackground {
  $primary: string;
  $secondary: string;
}

const AnimateBackground = styled.div<IAnimateBackground>`
  position: absolute;
  left: 0;
  top: 0;
  background: ${(props) => props.$primary};
  background: -webkit-linear-gradient(to left, ${(props) => props.$secondary}, ${(props) => props.$primary});
  width: 100%;
  height: 100%;

  .circles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0;
  }

  .circles li {
    position: absolute;
    display: block;
    text-align: center;
    list-style: none;
    width: 20px;
    height: 20px;
    /* background: rgba(255, 255, 255, 0.3); */
    animation: animate 25s linear infinite;
    bottom: -150px;
  }

  .circles li:nth-child(1) {
    left: 25%;
    width: 120px;
    height: 120px;
    font-size: 80px;
    animation-delay: 0s;
  }

  .circles li:nth-child(2) {
    left: 10%;
    width: 60px;
    height: 60px;
    font-size: 20px;
    animation-delay: 2s;
    animation-duration: 12s;
  }

  .circles li:nth-child(3) {
    left: 70%;
    width: 60px;
    height: 60px;
    font-size: 20px;
    animation-delay: 4s;
  }

  .circles li:nth-child(4) {
    left: 40%;
    width: 100px;
    height: 100px;
    font-size: 60px;
    animation-delay: 0s;
    animation-duration: 18s;
  }

  .circles li:nth-child(5) {
    left: 65%;
    width: 60px;
    height: 60px;
    font-size: 20px;
    animation-delay: 0s;
  }

  .circles li:nth-child(6) {
    left: 75%;
    width: 150px;
    height: 150px;
    font-size: 110px;
    animation-delay: 3s;
  }

  .circles li:nth-child(7) {
    left: 35%;
    width: 190px;
    height: 190px;
    font-size: 150px;
    animation-delay: 7s;
  }

  .circles li:nth-child(8) {
    left: 50%;
    width: 65px;
    height: 65px;
    font-size: 25px;
    animation-delay: 15s;
    animation-duration: 45s;
  }

  .circles li:nth-child(9) {
    left: 20%;
    width: 55px;
    height: 55px;
    font-size: 15px;
    animation-delay: 2s;
    animation-duration: 35s;
  }

  .circles li:nth-child(10) {
    left: 85%;
    width: 190px;
    height: 190px;
    font-size: 150px;
    animation-delay: 0s;
    animation-duration: 11s;
  }

  @keyframes animate {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 1;
      border-radius: 0;
    }

    100% {
      transform: translateY(-1000px) rotate(720deg);
      opacity: 0;
      border-radius: 50%;
    }
  }
`;

const Logo = styled(Title)`
  position: relative;

  span:nth-child(1) {
    font-size: 8rem;
    position: absolute;
    top: -8rem;
    transform: rotate(-10deg);
    left: -2rem;
  }
  span:nth-child(2) {
    font-size: 10rem;
    position: absolute;
    top: -10rem;
    transform: rotate(10deg);
    left: 12rem;
  }
`;

const TitleLink = styled(Link)`
  all: unset;
`;

const TitleButton = styled(Button)`
  font-weight: 400;

  &:hover {
    font-weight: 800;
    animation: 0.2s cubic-bezier(0.52, 0.55, 0.6, 0.95) hover;
    animation-fill-mode: both;

    span {
      transform: rotate(-10deg);
    }
  }
`;

const TitleButtonLabel = styled(ButtonLabel)``;

const HeadStyle = createGlobalStyle`
*::-webkit-scrollbar {
  width: 16px;
}

*::-webkit-scrollbar-track {
  border-radius: 8px;
  background-color: #e7e7e740;
  border: 1px solid #cacaca40;
}

*::-webkit-scrollbar-thumb {
  border-radius: 8px;
  border: 3px solid transparent;
  background-clip: content-box;
  background-color: #33333390;
}

*::-webkit-scrollbar-corner {
    background-color: #e7e7e740; 
}
`;

const IndexPage = () => {
  const { setColorPair } = React.useContext(IndexContext);
  const [initPage, setInitPage] = React.useState<JSX.Element>(<></>);

  React.useEffect(() => {
    setColorPair(["#d6b547", "#ffeac4"])
    setInitPage(
      <>
        <PageTitle title="홈 | 한자 마당" />
        <Main>
          <Logo>
            한자 마당<span>漢</span>
            <span>字</span>
          </Logo>
          <Article>
            <TitleLink to="/ready/acidrain">
              <TitleButton style={{ fontSize: "7rem", gap: "2rem" }}>
                <TitleButtonLabel>樂</TitleButtonLabel>게임 시작
              </TitleButton>
            </TitleLink>
            <TitleLink to="/dict">
              <TitleButton style={{ fontSize: "7rem", gap: "2rem" }}>
                <TitleButtonLabel>字</TitleButtonLabel>사전
              </TitleButton>
            </TitleLink>
            <TitleLink to="/info">
              <TitleButton style={{ fontSize: "7rem", gap: "2rem" }}>
                <TitleButtonLabel>知</TitleButtonLabel>정보
              </TitleButton>
            </TitleLink>
          </Article>
        </Main>
      </>
    );
  }, []);

  return <>{initPage}</>;
};

export const IndexContext = React.createContext<{ setColorPair: React.Dispatch<React.SetStateAction<string[]>>; setToastMessage: React.Dispatch<React.SetStateAction<string[]>>; }>({ setColorPair: () => {}, setToastMessage: () => {} });

export default function App() {
  const [colorPair, setColorPair] = React.useState(["#d6b547", "#ffeac4"]);
  const [toastMessage, setToastMessage] = React.useState<string[]>([]);
  const [toastLayout, setToastLayout] = React.useState(<></>);

  React.useEffect(() => {
    const common = localStorage.getItem("dict-common");
    const custom = localStorage.getItem("dict-custom");
    if (common === null) {
      localStorage.setItem("dict-common", JSON.stringify({ [`${v4()}`]: busu }));
    }
    if (custom === null) {
      localStorage.setItem("dict-custom", JSON.stringify({}));
    }
  }, []);

  React.useEffect(() => {
    if (toastMessage.toReversed()[0] && toastMessage.toReversed()[0].length !== 0) {
      setToastLayout(<ToastMessageBox onClick={()=>{setToastLayout(<></>)}} key={v4()}>{toastMessage.toReversed()[0]}</ToastMessageBox>)
      setToastMessage([]);
    }
  }, [toastMessage.at(-1)])

  return (
    <>
      <HeadStyle />
      <AnimateBackground $primary={colorPair[0]} $secondary={colorPair[1]}>
        <ul className="circles">
          <li>日</li>
          <li>困</li>
          <li>力</li>
          <li>⼔</li>
          <li>匸</li>
          <li>樂</li>
          <li>⼾</li>
          <li>⽽</li>
          <li>⾗</li>
          <li>⾣</li>
        </ul>
      </AnimateBackground>
      {toastLayout}
      <IndexContext.Provider value={{ setColorPair, setToastMessage }}>
        <BrowserRouter>
          <Routes>
            <Route index path="/" element={<IndexPage />} />
            <Route
              path="/dict"
              element={
                <>
                  <Outlet />
                </>
              }
            >
              <Route index element={<DictPage />} />
              <Route
                path="view"
                element={
                  <>
                    <Outlet />
                  </>
                }
              >
                <Route path=":dictName" element={<DictViewPage />} />
              </Route>
              <Route path="new" element={<DictNewPage />} />
              <Route path="modify" element={<><Outlet/></>}>
                <Route path=":dictName" element={<DictModifyPage />} />
              </Route>
            </Route>
            <Route path="/info" element={<InfoPage />} />
            <Route path="/ready" element={<IndexReadyPage />}>
              <Route index element={<Navigate to="/" replace />} />
              <Route path="acidrain" element={<ReadyAcidrainPage />} />
            </Route>
            <Route path="/play" element={<><IndexReadyPage /></>}>
              <Route index element={<Navigate to="/" replace />} />
              <Route path="acidrain" element={<PlayAcidrainPage />} />
            </Route>
            <Route path="*" element={ <Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </IndexContext.Provider>
    </>
  );
}

const IndexReadyPage = () => {
  const { setColorPair } = React.useContext(IndexContext);
  React.useEffect(()=>{
    setColorPair(["#d68c47", "#ffe7c4"])    
  }, [])


  return <Outlet />
}