import React from "react";
import { Article, Button, Main, PageTitle, Paragraph, SubTitle, Title } from "../../components";
import { Link } from "react-router-dom";
import { ReadyArticle, ReadyButton, ReadyDescription, ReadyImage, ReadyLink, ReadyMain, ReadyTitle } from "../../components/ready";
import { leftChevron } from "../../constant/IMAGE_PATH";
import { IndexContext } from "..";

export const ReadyPage = () => {
  const [initPage, setInitPage] = React.useState<JSX.Element>(<></>);
  
  React.useEffect(() => {
    setInitPage(
      <>
        <PageTitle title="놀이 준비 | 한자 마당" />
        <ReadyMain>
          <ReadyTitle><span>樂</span>놀이 준비</ReadyTitle>
          <ReadyDescription>어떤 놀이를 즐길까요?</ReadyDescription>
          <ReadyLink to={".."}>
            <ReadyButton>
              <ReadyImage src={leftChevron} />
              이전으로
            </ReadyButton>
          </ReadyLink>
          <ReadyArticle>
            <Button>오지선다 놀이</Button>
            <Link to="acidrain"><Button>산성비 놀이</Button></Link>
          </ReadyArticle>
        </ReadyMain>
      </>
    );
  }, []);
  return <>{initPage}</>;
};
