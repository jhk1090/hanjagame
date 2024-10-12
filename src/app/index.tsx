import React, { JSX } from "react";
import { BrowserRouter, Link, Outlet, Route, Routes } from "react-router-dom";
import "../style.css";
import { Article, Button, ButtonLabel, Main, Title, PageTitle } from "../components";
import { DictPage } from "./dict";
import { InfoPage } from "./info";
import { busu } from "../database/busu";
import { DictViewPage } from "./dict/view";
import { ReadyPage } from "./ready";
import { ReadyAcidrainPage } from "./ready/acidrain";
import { PlayPage } from "./play";

const IndexPage = () => {
  const [initPage, setInitPage] = React.useState<JSX.Element>(<></>);

  React.useEffect(() => {
    setInitPage(
      <>
        <PageTitle title="홈 | 한자 도감" />
        <Main>
          <Title>한자 도감</Title>
          <Article>
            <Link to="/ready">
              <Button>
                <ButtonLabel>始</ButtonLabel>시작
              </Button>
            </Link>
            <Link to="/dict">
              <Button>
                <ButtonLabel>字</ButtonLabel>사전
              </Button>
            </Link>
            <Button>설정</Button>
            <Link to="/info">
              <Button>정보</Button>
            </Link>
          </Article>
        </Main>
      </>
    );
  }, []);

  return <>{initPage}</>;
};

export default function App() {
  React.useEffect(() => {
    const common = localStorage.getItem("dict-common");
    const custom = localStorage.getItem("dict-custom");
    if (common === null) {
      localStorage.setItem("dict-common", JSON.stringify({ 부수: busu }));
    }
    if (custom === null) {
      localStorage.setItem("dict-custom", JSON.stringify({}));
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<IndexPage />} />
          <Route path="/dict" element={<><Outlet /></>}>
            <Route index element={<DictPage />} />
            <Route path=":dictName" element={<DictViewPage />} />
          </Route>
          <Route path="/info" element={<InfoPage />} />
          <Route path="/ready" element={<><Outlet /></>}>
            <Route index element={<ReadyPage />} />
            <Route path="acidrain" element={<ReadyAcidrainPage />} />
          </Route>
          <Route path="/play" element={<PlayPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
