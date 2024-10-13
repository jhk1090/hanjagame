import React from "react";
import { Article, Button, Main, PageTitle, SubTitle, Title } from "../../components";
import { Link } from "react-router-dom";
import { IDict } from "../../database/busu";
import { DictArticle, DictButton, DictImage, DictLink, DictMain, DictSubTitle, DictTitle } from "../../components/dict";
import { InfoLink } from "../../components/info";
import { leftChevron } from "../../constant/IMAGE_PATH";

export const DictPage = () => {
  const [initPage, setInitPage] = React.useState<JSX.Element>(<></>);

  React.useEffect(() => {
    const dictCommon: Record<string, IDict> = { ...JSON.parse(localStorage.getItem("dict-common") ?? "{}") }
    const dictCustom: Record<string, IDict> = { ...JSON.parse(localStorage.getItem("dict-custom") ?? "{}") }
    
    setInitPage(
      <>
        <PageTitle title="사전 | 한자 마당" />
        <DictMain>
          <DictTitle><span>字</span><span>사전</span></DictTitle>
          <DictLink to={".."}><DictButton><DictImage src={leftChevron} />이전으로</DictButton></DictLink>
          <DictArticle>
            <DictSubTitle>기본 사전 <span>({Object.keys(dictCommon).length})</span></DictSubTitle>
            {Object.values(dictCommon).map((dict) => (
              <Link to={`${dict.name}`}>
                <Button>{dict.name}</Button>
              </Link>
            ))}
            <DictSubTitle>사용자 추가 사전 <span>({Object.keys(dictCustom).length})</span></DictSubTitle>
            {Object.values(dictCustom).map((dict) => (
              <Link to={`${dict.name}`}>
                <Button>{dict.name}</Button>
              </Link>
            ))}
          </DictArticle>
        </DictMain>
      </>
    );
  }, []);

  return (
    <>
      {initPage}
    </>
  );
};
