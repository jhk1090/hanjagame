import React from "react";
import { Article, Button, Main, PageTitle, Paragraph, SubTitle, Title } from "../../components";
import { Link } from "react-router-dom";

export const InfoPage = () => {
  const [initPage, setInitPage] = React.useState<JSX.Element>(<></>);
  React.useEffect(() => {
    setInitPage(
      <>
        <PageTitle title="정보 | 한자 도감" />
        <Main>
          <Title>정보</Title>
          <Article>
            <Link to={".."}><Button>뒤로가기</Button></Link>
            <SubTitle>저작권 고지</SubTitle>
            <Paragraph>글꼴 출처: 더남산체, 한양해서체</Paragraph>
          </Article>
        </Main>
      </>
    );
  }, []);
  return <>{initPage}</>;
};
