import React from "react";
import { Article, Button, Main, PageTitle, Paragraph, SubTitle, Title } from "../../components";
import { Link } from "react-router-dom";

export const ReadyPage = () => {
  const [initPage, setInitPage] = React.useState<JSX.Element>(<></>);
  React.useEffect(() => {
    setInitPage(
      <>
        <PageTitle title="놀이 준비 | 한자 도감" />
        <Main>
          <Title>놀이 준비</Title>
          <Article>
            <Link to={".."}><Button>뒤로가기</Button></Link>
            <SubTitle>놀이 방식을 설정해주세요!</SubTitle>
            <Button>오지선다 놀이</Button>
            <Link to="acidrain"><Button>산성비 놀이</Button></Link>
          </Article>
        </Main>
      </>
    );
  }, []);
  return <>{initPage}</>;
};
