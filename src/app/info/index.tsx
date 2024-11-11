import React from "react";
import { Article, Button, Main, PageTitle, Paragraph, SubTitle, Title } from "../../components";
import { Link } from "react-router-dom";
import { InfoArticle, InfoButton, InfoImage, InfoLink, InfoMain, InfoParagraph, InfoSubTitle, InfoTitle } from "../../components/info";
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
                v.0.14.1 <span>(24. 11. 11.)</span>
              </InfoSubTitle>
              <InfoParagraph>ㅁ 사전 추가 기능이 추가되었습니다</InfoParagraph>
              <InfoParagraph>ㅁ 사전 공유하기 기능이 추가되었습니다</InfoParagraph>
            </div>
            <div>
              <InfoSubTitle>저작권 고지</InfoSubTitle>
              <InfoParagraph>글꼴 출처: 더잠실체, 한양해서체</InfoParagraph>
            </div>
          </InfoArticle>
        </InfoMain>
      </>
    );
  }, []);
  return <>{initPage}</>;
};
