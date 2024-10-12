import React from "react";
import { Article, Button, Main, PageTitle, SubTitle, Title } from "../../components";
import { Link } from "react-router-dom";
import { IDict } from "../../database/busu";

export const DictPage = () => {
  const [initPage, setInitPage] = React.useState<JSX.Element>(<></>);

  React.useEffect(() => {
    const dictIntegration: Record<string, IDict> = { ...JSON.parse(localStorage.getItem("dict-common") ?? "{}"), ...JSON.parse(localStorage.getItem("dict-custom") ?? "{}") };
    
    setInitPage(
      <>
        <PageTitle title="사전 | 한자 도감" />
        <Main>
          <Title>사전</Title>
          <Article>
          <Link to={".."}><Button>뒤로가기</Button></Link>
            {Object.values(dictIntegration).map((dict) => (
              <Link to={`${dict.name}`}>
                <Button>{dict.name}</Button>
              </Link>
            ))}
          </Article>
        </Main>
      </>
    );
  }, []);

  return (
    <>
      {initPage}
    </>
  );
};
