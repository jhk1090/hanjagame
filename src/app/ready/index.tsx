import React from "react";
import { Article, Button, Main, PageTitle, Paragraph, SubTitle, Title } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import { ReadyArticle, ReadyButton, ReadyDescription, ReadyImage, ReadyLink, ReadyMain, ReadyTitle } from "../../components/ready";
import { leftChevron } from "../../constant/IMAGE_PATH";
import { IndexContext } from "..";

export const ReadyPage = () => {
  // const [initPage, setInitPage] = React.useState<JSX.Element>(<></>);
  
  // React.useEffect(() => {
  //   setInitPage(
  //     <>
  //       <PageTitle title="게임 준비 | 한자 마당" />
  //       <ReadyMain>
  //         <ReadyTitle><span>樂</span>게임 준비</ReadyTitle>
  //         <ReadyDescription>어떤 게임를 즐길까요?</ReadyDescription>
  //         <ReadyLink to={".."}>
  //           <ReadyButton>
  //             <ReadyImage src={leftChevron} />
  //             이전으로
  //           </ReadyButton>
  //         </ReadyLink>
  //         <ReadyArticle>
  //           <Button>오지선다 게임</Button>
  //           <Link to="acidrain"><Button>산성비 게임</Button></Link>
  //         </ReadyArticle>
  //       </ReadyMain>
  //     </>
  //   );
  // }, []);
  // return <>{initPage}</>;
  const navigate = useNavigate();
  navigate("/")
  return <></>;
};
