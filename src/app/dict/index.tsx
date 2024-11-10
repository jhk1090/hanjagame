import React from "react";
import { Article, Button, Main, PageTitle, SubTitle, Title } from "../../components";
import { Link } from "react-router-dom";
import { IDict } from "../../database/busu";
import { DictArticle, DictButton, DictImage, DictLink, DictMain, DictSubTitle, DictTitle, DictToView, DictToViewBox } from "../../components/dict";
import { InfoLink } from "../../components/info";
import { checkIcon, closeIcon, leftChevron, plusIcon } from "../../constant/IMAGE_PATH";
import { IndexContext } from "..";

export const DictPage = () => {
  const { setColorPair } = React.useContext(IndexContext);
  React.useEffect(() => {
    setColorPair(["#d6b547", "#ffeac4"]);
  }, []);
  const [initPage, setInitPage] = React.useState<JSX.Element>(<></>);
  const [isDeleteMode, setIsDeleteMode] = React.useState(false);
  const [deleteKeys, setDeleteKeys] = React.useState<Record<string, boolean>>({});

  React.useEffect(() => {
    const dictCommon: Record<string, IDict> = { ...JSON.parse(localStorage.getItem("dict-common") ?? "{}") };
    const dictCustom: Record<string, IDict> = { ...JSON.parse(localStorage.getItem("dict-custom") ?? "{}") };

    setInitPage(
      <>
        <PageTitle title="사전 | 한자 마당" />
        <DictMain>
          <DictTitle>
            <span>字</span>
            <span>사전</span>
          </DictTitle>
          <DictLink to={".."}>
            <DictButton>
              <DictImage src={leftChevron} />
              이전으로
            </DictButton>
          </DictLink>
          <DictArticle>
            <DictSubTitle>
              기본 사전 <span>({Object.keys(dictCommon).length})</span>
            </DictSubTitle>
            <DictToViewBox>
              {Object.entries(dictCommon).map(([key, value]) => (
                <DictLink to={`view/${key}`}>
                  <DictToView>字 {value.name}</DictToView>
                </DictLink>
              ))}
            </DictToViewBox>
            <DictSubTitle>
              사용자 추가 사전 <span>({Object.keys(dictCustom).length})</span>
            </DictSubTitle>
            <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
              {!isDeleteMode ? (
                <>
                  {Object.keys(dictCustom).length !== 0 ? (
                    <>
                      <DictLink to={"new"}>
                        <DictButton style={{ backgroundColor: "#5cd83d80" }}>
                          <DictImage src={plusIcon} />
                          사전 추가
                        </DictButton>
                      </DictLink>
                      <DictButton
                        onClick={() => {
                          setIsDeleteMode(true);
                          setDeleteKeys(Object.keys(dictCustom).reduce((prev, cur) => ({ ...prev, [cur]: true }), {}));
                        }}
                        style={{ backgroundColor: "#d83d3d80" }}
                      >
                        <DictImage src={closeIcon} />
                        선택 삭제
                      </DictButton>
                    </>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                <>
                  <DictButton
                    onClick={() => {
                      setIsDeleteMode(false);
                      const deleteTargetKeys = Object.entries(deleteKeys)
                        .filter(([key, value]) => !value)
                        .map(([key, _]) => key);
                      for (const key of deleteTargetKeys) {
                        delete dictCustom[key];
                      }
                      localStorage.setItem("dict-custom", JSON.stringify(dictCustom));
                    }}
                    style={{ backgroundColor: "#d83d3d" }}
                  >
                    <DictImage src={checkIcon} />
                    선택한 사전 삭제
                  </DictButton>
                </>
              )}
            </div>
            {!isDeleteMode ? (
              <>
                {Object.keys(dictCustom).length === 0 ? (
                  <>
                    <DictToViewBox style={{ justifyContent: "center", width: "100%", flexDirection: "column" }}>
                      <span style={{ fontSize: "5rem", fontWeight: 800 }}>사전이 없습니다!</span>
                      <DictLink to={"new"}>
                        <DictButton style={{ backgroundColor: "#5cd83d80" }}>
                          <DictImage src={plusIcon} />
                          사전 추가
                        </DictButton>
                      </DictLink>
                    </DictToViewBox>
                  </>
                ) : (
                  <>
                    <DictToViewBox>
                      {Object.entries(dictCustom).map(([key, value]) => (
                        <DictLink to={`view/${key}`}>
                          <DictToView key={key}>字 {value.name}</DictToView>
                        </DictLink>
                      ))}
                    </DictToViewBox>
                  </>
                )}
              </>
            ) : (
              <>
                <div style={{ backgroundColor: "#d83d3d80", fontSize: "4rem", padding: "2rem", borderRadius: "1rem" }}>
                  삭제할 사전을 선택하세요!
                  <br />
                  위의 사전 삭제 버튼을 누르면 최종 삭제됩니다.
                </div>
                <DictToViewBox style={{ backgroundColor: "#d83d3d40" }}>
                  {Object.entries(dictCustom).map(([key, value]) => (
                    <DictToView
                      style={
                        Object.entries(deleteKeys)
                          .filter(([key, value]) => !value)
                          .map(([key, _]) => key)
                          .includes(key)
                          ? { backgroundColor: "#d83d3d90" }
                          : {}
                      }
                      onClick={() => {
                        setDeleteKeys((cur) => ({ ...cur, [key]: !cur[key] }));
                      }}
                      key={key}
                    >
                      字 {value.name}
                    </DictToView>
                  ))}
                </DictToViewBox>
              </>
            )}
          </DictArticle>
        </DictMain>
      </>
    );
  }, [isDeleteMode, deleteKeys, JSON.stringify(localStorage)]);

  return <>{initPage}</>;
};
