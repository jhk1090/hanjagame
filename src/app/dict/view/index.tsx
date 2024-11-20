import React, { useContext } from "react";
import { Article, Button, Main, PageTitle, SubTitle, Title } from "../../../components";
import { DictViewAccordion, Dict, DictDefine, DictDescription, DictForm, DictHorizontal, DictSound, DictSummary, DictPanelBackgroundBox, DictPanel, DictShareInput, DictPanelButton } from "../../../components/dict/view";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { IDict } from "../../../database/busu";
import { DictArticle, DictButton, DictImage, DictLink, DictMain, DictSubTitle, DictTitle } from "../../../components/dict";
import { checkIcon, closeIcon, copyIcon, downloadIcon, leftChevron, pencilIcon, shareIcon } from "../../../constant/IMAGE_PATH";
import { v4 } from "uuid";
import { IndexContext } from "../..";

export const DictViewPage = () => {
  const navigate = useNavigate();
  const [initPage, setInitPage] = React.useState<JSX.Element>(<></>);
  const { dictName } = useParams<{ dictName: string; }>();
  const [dict, setDict] = React.useState<IDict | null>(null);
  const [groupOpen, setGroupOpen] = React.useState<Record<string, boolean>>({})
  const [isModifyPanelOpen, setIsModifyPanelOpen] = React.useState(false);
  const [isDeletePanelOpen, setIsDeletePanelOpen] = React.useState(false);
  const [isSharePanelOpen, setIsSharePanelOpen] = React.useState(false);
  const [isShareLinkCopied, setIsShareLinkCopied] = React.useState(false);
  const [isDownloadCompleted, setIsDownloadCompleted] = React.useState(false);
  const { setToastMessage } = useContext(IndexContext);

  React.useEffect(() => {
    const dictIntegration: Record<string, IDict> = { ...JSON.parse(localStorage.getItem("dict-common") ?? "{}"), ...JSON.parse(localStorage.getItem("dict-custom") ?? "{}") };
    if (dictName === undefined || dictIntegration[dictName] === undefined ) {
      navigate("/dict", { replace: true });
      setToastMessage(["경로에 해당하는 사전을 찾을 수 없습니다!"])
      return;
    }
    setDict(dictIntegration[dictName])
    setGroupOpen(Object.keys(dictIntegration[dictName].content).reduce((prev, cur) => ({ ...prev, [cur]: true }), {}));
  }, [dictName])

  React.useEffect(() => {
    if (dict === null) {
      setInitPage(<></>);
      return;
    }
    setInitPage(
      <>
        <PageTitle title={`${dict.name} | 사전 | 한자 마당`} />
        <DictMain>
          <DictTitle>
            <span>字</span>
            <span>{dict.name}</span>
          </DictTitle>
          <DictDescription>{dict.description}</DictDescription>
          <div style={{ display: "flex", flexDirection: "row", gap: "1rem", flexWrap: "wrap" }}>
            <DictLink to={"/dict"}>
              <DictButton style={{ width: "max-content", backgroundColor: "#ffffff70" }}>
                <DictImage src={leftChevron} />
                이전으로 (사전)
              </DictButton>
            </DictLink>
            <DictButton
              onClick={() => {
                if (dictName === undefined) {
                  return;
                }
                const dictCustom: Record<string, IDict> = { ...JSON.parse(localStorage.getItem("dict-custom") ?? "{}") };

                if (Object.keys(dictCustom).find((value) => value === dictName) === undefined) {
                  setIsDeletePanelOpen(true);
                  return;
                }

                delete dictCustom[dictName];
                localStorage.setItem("dict-custom", JSON.stringify(dictCustom));
                navigate("/dict");
                setToastMessage(["성공적으로 삭제되었습니다!"])
              }}
              style={{ backgroundColor: "#d83d3d90" }}
            >
              <DictImage src={closeIcon} />
              사전 삭제
            </DictButton>
            <DictButton
              onClick={() => {
                if (dict.edit === "disallow") {
                  setIsModifyPanelOpen(true);
                  return;
                }
                navigate(`/dict/modify/${dictName}`, { replace: true });
              }}
              style={{ backgroundColor: "#3dc1d890" }}
            >
              <DictImage src={pencilIcon} />
              수정하기
            </DictButton>
            <DictButton
              onClick={() => {
                const dictCustom: Record<string, IDict> = { ...JSON.parse(localStorage.getItem("dict-custom") ?? "{}") };
                dict.name = `${dict.name}(복사본)`;
                dict.edit = "allow";
                localStorage.setItem("dict-custom", JSON.stringify({ ...dictCustom, [v4()]: dict }));
                navigate("/dict");
                setToastMessage([`"${dict.name}" 사전이 성공적으로 복사되었습니다!`])
              }}
              style={{ backgroundColor: "#5cd83d90" }}
            >
              <DictImage src={copyIcon} />
              복사하기
            </DictButton>
            <DictButton
              onClick={() => {
                setIsSharePanelOpen(true);
              }}
              style={{ backgroundColor: "#15291070" }}
            >
              <DictImage src={shareIcon} />
              공유하기
            </DictButton>
          </div>
          <DictArticle>
            {Object.keys(dict.content).map((group) => (
              <>
                <DictViewAccordion
                  key={group}
                  contents={dict.content[group]}
                  open={groupOpen[group]}
                  onClick={() => {
                    setGroupOpen((cur) => ({ ...cur, [group]: !groupOpen[group] }));
                  }}
                  groupTitle={
                    <>
                      <DictSubTitle>
                        {group} <span>({dict.content[group].length})</span>
                      </DictSubTitle>
                    </>
                  }
                >
                  <>
                    {dict.content[group].map((dictLine) => (
                      <>
                        <DictHorizontal />
                        <Dict>
                          <div>
                            <DictForm>{dictLine.form.join("")}</DictForm>
                            <DictSound>{dictLine.sound.join(", ")}</DictSound>
                          </div>
                          <div>
                            {dictLine.define ? (
                              <>
                                <DictDefine>{dictLine.define}</DictDefine>
                              </>
                            ) : (
                              <></>
                            )}
                          </div>
                        </Dict>
                      </>
                    ))}
                  </>
                </DictViewAccordion>
              </>
            ))}
          </DictArticle>
        </DictMain>
        <DictPanelBackgroundBox
          onClick={() => {
            setIsDeletePanelOpen(false);
          }}
          style={{ display: isDeletePanelOpen ? "block" : "none" }}
        >
          <DictPanel onClick={(e) => e.stopPropagation()}>
            <div>
              <DictSubTitle>❌ 삭제 불가</DictSubTitle>
              <DictButton
                onClick={() => {
                  setIsDeletePanelOpen(false);
                }}
                style={{ backgroundColor: "#d83d3d90" }}
              >
                <DictImage src={closeIcon} />
                닫기
              </DictButton>
            </div>
            <div>이 사전은 기본 사전으로, 삭제할 수 없습니다!</div>
          </DictPanel>
        </DictPanelBackgroundBox>
        <DictPanelBackgroundBox
          onClick={() => {
            setIsModifyPanelOpen(false);
          }}
          style={{ display: isModifyPanelOpen ? "block" : "none" }}
        >
          <DictPanel onClick={(e) => e.stopPropagation()}>
            <div>
              <DictSubTitle>❌ 수정 권한 없음</DictSubTitle>
              <DictButton
                onClick={() => {
                  setIsModifyPanelOpen(false);
                }}
                style={{ backgroundColor: "#d83d3d90" }}
              >
                <DictImage src={closeIcon} />
                닫기
              </DictButton>
            </div>
            <div>
              이 사전에 대한 수정 권한이 없습니다!
              <br />
              <b>복사 및 보기</b>를 눌러서 새로 수정할 수 있습니다!
            </div>
            <DictButton
              onClick={() => {
                const dictCustom: Record<string, IDict> = { ...JSON.parse(localStorage.getItem("dict-custom") ?? "{}") };
                dict.name = `${dict.name}(복사본)`;
                dict.edit = "allow";
                const key = v4();
                localStorage.setItem("dict-custom", JSON.stringify({ ...dictCustom, [key]: dict }));
                setIsModifyPanelOpen(false);
                navigate(`/dict/view/${key}`);
                setToastMessage([`"${dict.name}" 사전이 성공적으로 복사되었습니다!`])
              }}
              style={{ backgroundColor: "#5cd83d90" }}
            >
              <DictImage src={copyIcon} />
              복사 및 보기
            </DictButton>
          </DictPanel>
        </DictPanelBackgroundBox>
        <DictPanelBackgroundBox
          onClick={() => {
            setIsSharePanelOpen(false);
            setIsShareLinkCopied(false);
            setIsDownloadCompleted(false);
          }}
          style={{ display: isSharePanelOpen ? "block" : "none" }}
        >
          <DictPanel onClick={(e) => e.stopPropagation()}>
            <div>
              <DictSubTitle style={{ display: "flex", flexDirection: "row", gap: "2rem", alignItems: "center" }}>
                <DictImage style={{ width: "8rem" }} src={shareIcon} />
                공유하기
              </DictSubTitle>
              <DictButton
                onClick={() => {
                  setIsSharePanelOpen(false);
                  setIsShareLinkCopied(false);
                  setIsDownloadCompleted(false);
                }}
                style={{ backgroundColor: "#d83d3d90" }}
              >
                <DictImage src={closeIcon} />
                닫기
              </DictButton>
            </div>
            <div style={{wordBreak:"keep-all"}}>
              아래 <b>사전 다운로드</b> 버튼을 눌러 공유하세요!
              <br />
              공유하는 방법은 <b>사전 페이지</b>에서 <b>사전 공유하기</b> 버튼을 눌러 다시 불러올 수 있습니다.
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                <DictPanelButton
                  onClick={() => {
                    const content = JSON.stringify(dict);
                    const blob = new Blob([content], { type: "text/plain" });
                    const url = URL.createObjectURL(blob);

                    const link = document.createElement("a");
                    link.href = url;
                    link.download = `${dict.name}.dict`;
                    document.body.appendChild(link);
                    link.click();

                    document.body.removeChild(link);
                    URL.revokeObjectURL(url);
                    setIsDownloadCompleted(true);
                  }}
                  style={{ backgroundColor: isDownloadCompleted ? "#2c816890" : "#3dd8a990", alignItems: "center", margin: "2rem", fontSize: "5rem" }}
                >
                  <DictImage style={{ width: "5rem" }} src={isDownloadCompleted ? checkIcon : downloadIcon} />
                  {isDownloadCompleted ? "다운로드 성공!" : "사전 다운로드"}
                </DictPanelButton>
              </div>
            </div>
          </DictPanel>
        </DictPanelBackgroundBox>
      </>
    );
  }, [dict, groupOpen, isModifyPanelOpen, isDeletePanelOpen, isSharePanelOpen, isShareLinkCopied, isDownloadCompleted]);

  return (
    <>
      {initPage}
      
    </>
  );
};
