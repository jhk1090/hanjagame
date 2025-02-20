import React from "react";
import { Article, Button, Main, PageTitle, Paragraph, SubTitle, Title } from "../../components";
import { Link } from "react-router-dom";
import { InfoArticle, InfoButton, InfoImage, InfoLi, InfoLink, InfoMain, InfoParagraph, InfoSubTitle, InfoTitle } from "../../components/info";
import { leftChevron } from "../../constant/IMAGE_PATH";

export const InfoPage = () => {
  const [initPage, setInitPage] = React.useState<JSX.Element>(<></>);
  React.useEffect(() => {
    setInitPage(
      <>
        <PageTitle title="정보 | 한자 마당" />
        <InfoMain>
          <InfoTitle>
            <span>知</span>
            <span>정보</span>
          </InfoTitle>
          <InfoLink to={".."}>
            <InfoButton><InfoImage src={leftChevron} />이전으로</InfoButton>
          </InfoLink>
          <InfoArticle>
            <div>
              <InfoSubTitle>
                v.0.15.1 <span>(24. 11. 17.)</span>
              </InfoSubTitle>
              <ul>
                <InfoLi>사전 추가 기능이 추가되었습니다</InfoLi>
                <InfoLi>사전 공유하기 기능이 추가되었습니다</InfoLi>
                <InfoLi>산성비 게임 업데이트</InfoLi>
              </ul>
            </div>
            <div>
              <InfoSubTitle>저작권 고지</InfoSubTitle>
              <InfoParagraph>글꼴 출처: <a style={{textDecoration: "none"}} href="https://noonnu.cc/font_page/1127" target="_blank">더잠실체</a>, <a style={{textDecoration: "none"}} href="https://fonts.google.com/noto/specimen/Noto+Serif+KR" target="_blank">본명조(Noto Serif Korean)</a></InfoParagraph>
            </div>
            <div>
              <InfoSubTitle>제작자</InfoSubTitle>
              <InfoParagraph><a style={{textDecoration: "none"}} href="https://github.com/jhk1090" target="_blank">Github@jhk1090</a></InfoParagraph>
              <InfoParagraph>(저장소) <a style={{textDecoration: "none"}} href="https://github.com/jhk1090/hanjagame" target="_blank">Github@jhk1090/hanjagame</a></InfoParagraph>
            </div>
          </InfoArticle>
        </InfoMain>
      </>
    );
  }, []);
  return <>{initPage}</>;
};
