import React, { JSX } from "react";
import { Article, Button, ButtonLabel, Main, Title, PageTitle, SubTitle } from "../../../components";

export const ReadyAcidrainPage = () => {
  const [initPage, setInitPage] = React.useState<JSX.Element>(<></>);

  React.useEffect(() => {
    setInitPage(
      <>
        <PageTitle title="산성비 놀이 | 놀이 준비 | 한자 도감" />
        <Main>
          <Title>산성비 놀이</Title>
          <Article>
            <SubTitle>떨어지는 한자 또는 한자어의 음을 입력해 없애는 게임입니다.</SubTitle>
          </Article>
        </Main>
      </>
    );
  }, []);

  return <>{initPage}</>;
};