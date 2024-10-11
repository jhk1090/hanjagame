import React, { JSX } from "react";
import { BrowserRouter, Link, Route, Routes, useSearchParams } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import "../style.css";
import { busu } from "../database/busu";

const Title = styled.h1`
  font-size: 10rem;
  font-family: "jamsil";
  width: 100%;
  display: block;
  text-align: center;
`;

const Main = styled.main`
  max-width: 768px;
  max-height: 100%;
  padding: 1.5rem;
  overflow-wrap: break-word;
  word-break: keep-all;
  display: flex;
  flex-direction: column;
`;

const Article = styled.article`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ButtonLabel = styled.span`
  font-weight: 800;
  font-family: "hanyang";
  font-size: 10rem;
`;

const Button = styled.button`
  all: unset;
  display: flex;
  flex-direction: row;
  padding: 1rem;
  gap: 1rem;
  font-size: 7rem;
  font-family: "jamsil";
  align-items: center;
  border: 1px solid #ccc;
`;

const HeadStyle = createGlobalStyle`
`;

const SubTitle = styled.h2`
  font-size: 5rem;
  font-family: "jamsil";
  margin: 0.15rem;
`;

const Paragraph = styled.p`
  font-size: 3rem;
  font-family: "jamsil";
`;

const Dict = styled.div`
  display: flex;
  flex-direction: column;

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
  }
`;

const DictForm = styled.span`
  font-size: 8rem;
  font-family: "hanyang";
  font-weight: 800;
`;

const DictSound = styled.span`
  font-size: 4rem;
  font-family: "jamsil";
`;

const DictDefine = styled.span`
  font-size: 3rem;
  font-family: "jamsil";
`;

const DictPage = () => {
  const groups = Object.keys(busu);
  return (
    <>
      <Article>
        {groups.map((group) => (
          <>
            <SubTitle>{group}</SubTitle>
            {busu[group].map((dict) => (
              <Dict>
                <div>
                  <DictForm>{dict.form.join(",")}</DictForm>
                  <DictSound>{dict.sound.join(", ")}</DictSound>
                </div>
                <div>
                  {dict.define ? (
                    <>
                      <DictDefine>* {dict.define}</DictDefine>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </Dict>
            ))}
          </>
        ))}
      </Article>
    </>
  );
};

const InfoPage = () => {
  return (
    <>
      <Article>
        <SubTitle>저작권 고지</SubTitle>
        <Paragraph>글꼴 출처: 더남산체, 한양해서체</Paragraph>
      </Article>
    </>
  );
};

const TitlePage = () => {
  return (
    <>
      <Article>
        <Button>
          <ButtonLabel>始</ButtonLabel>시작
        </Button>
        <Link to="/?tab=dict">
          <Button>
            <ButtonLabel>字</ButtonLabel>사전
          </Button>
        </Link>
        <Button>설정</Button>
        <Link to="/?tab=info">
          <Button>정보</Button>
        </Link>
      </Article>
    </>
  );
};

const IndexPage = () => {
  const [initPage, setInitPage] = React.useState<JSX.Element>(<></>);
  const [searchParams, _] = useSearchParams();
  const [articlePage, setArticlePage] = React.useState<JSX.Element>(<TitlePage />);
  React.useEffect(() => {
    switch (searchParams.get("tab") ?? "title") {
      case "title":
        setArticlePage(<TitlePage />);
        break;
      case "info":
        setArticlePage(<InfoPage />);
        break;
      case "dict":
        setArticlePage(<DictPage />);
        break;
      default:
        break;
    }
  }, [searchParams.toString()]);

  React.useEffect(() => {
    setInitPage(
      <>
        <Main>
          <Title>한자 도감</Title>
          {articlePage}
        </Main>
      </>
    );
  }, [articlePage]);

  return <>{initPage}</>;
};

export default function App() {
  return (
    <>
      <HeadStyle />
      <BrowserRouter>
        <Routes>
          <Route index element={<IndexPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
