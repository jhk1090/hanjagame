import React from "react";
import { Article, Button, Main, PageTitle, SubTitle, Title } from "../../../components";
import { DictViewAccordion, Dict, DictDefine, DictDescription, DictForm, DictHorizontal, DictSound, DictSummary } from "../../../components/dict/view";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { IDict } from "../../../database/busu";
import { DictArticle, DictButton, DictImage, DictLink, DictMain, DictSubTitle, DictTitle } from "../../../components/dict";
import { closeIcon, copyIcon, leftChevron, pencilIcon } from "../../../constant/IMAGE_PATH";
import { v4 } from "uuid";

export const DictViewPage = () => {
  const navigate = useNavigate();
  const [initPage, setInitPage] = React.useState<JSX.Element>(<></>);
  const { dictName } = useParams<{ dictName: string; }>();
  const [dict, setDict] = React.useState<IDict | null>(null);
  const [groupOpen, setGroupOpen] = React.useState<Record<string, boolean>>({})

  React.useEffect(() => {
    const dictIntegration: Record<string, IDict> = { ...JSON.parse(localStorage.getItem("dict-common") ?? "{}"), ...JSON.parse(localStorage.getItem("dict-custom") ?? "{}") };
    if (dictName === undefined || dictIntegration[dictName] === undefined ) {
      navigate("/dict", { replace: true });
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
          <div style={{display: "flex", flexDirection: "row", gap: "1rem", flexWrap: "wrap"}}>
            <DictLink to={"/dict"}>
              <DictButton>
                <DictImage src={leftChevron} />
                이전으로
              </DictButton>
            </DictLink>
            <DictButton onClick={() => {
              if (!dictName) {
                return
              }
              const dictCustom: Record<string, IDict> = { ...JSON.parse(localStorage.getItem("dict-custom") ?? "{}") };
              delete dictCustom[dictName]
              localStorage.setItem("dict-custom", JSON.stringify(dictCustom));
              navigate("/dict")
            }} style={{ backgroundColor: "#d83d3d90" }}>
              <DictImage src={closeIcon} />
              사전 삭제
            </DictButton>
            <DictButton style={{ backgroundColor: "#3dc1d890" }}>
              <DictImage src={pencilIcon} />
              수정하기
            </DictButton>
            <DictButton onClick={() => {
              const dictCustom: Record<string, IDict> = { ...JSON.parse(localStorage.getItem("dict-custom") ?? "{}") };
              dict.name = `${dict.name} - 복사본`
              localStorage.setItem("dict-custom", JSON.stringify({...dictCustom, [v4()]: dict}));
              navigate("/dict")
            }}  style={{ backgroundColor: "#5cd83d90" }}>
              <DictImage src={copyIcon} />
              복사하기
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
      </>
    );
  }, [dict, groupOpen]);

  return <>{initPage}</>;
};
