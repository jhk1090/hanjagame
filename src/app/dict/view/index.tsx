import React from "react";
import { Article, Button, Main, PageTitle, SubTitle, Title } from "../../../components";
import { Dict, DictDefine, DictDescription, DictForm, DictHorizontal, DictSound, DictSummary } from "../../../components/dict/view";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { IDict } from "../../../database/busu";
import { DictArticle, DictButton, DictImage, DictLink, DictMain, DictSubTitle, DictTitle } from "../../../components/dict";
import { leftChevron } from "../../../constant/IMAGE_PATH";

export const DictViewPage = () => {
  const navigate = useNavigate();
  const [initPage, setInitPage] = React.useState<JSX.Element>(<></>);
  const { dictName } = useParams<{ dictName: string; }>();
  const [dict, setDict] = React.useState<IDict | null>(null);

  React.useEffect(() => {
    const dictIntegration: Record<string, IDict> = { ...JSON.parse(localStorage.getItem("dict-common") ?? "{}"), ...JSON.parse(localStorage.getItem("dict-custom") ?? "{}") };
    if (dictName === undefined || dictIntegration[dictName] === undefined ) {
      navigate("/dict", { replace: true });
      return;
    }
    setDict(dictIntegration[dictName])
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
          <DictLink to={"/dict"}>
            <DictButton>
              <DictImage src={leftChevron} />
              이전으로
            </DictButton>
          </DictLink>
          <DictArticle>
            {Object.keys(dict.content).map((group) => (
              <>
                <details>
                  <DictSummary>
                    <DictImage src={leftChevron} style={{transform:"rotate(-90deg)"}} /> 
                    <DictSubTitle>
                      {group} <span>({dict.content[group].length})</span>
                    </DictSubTitle>
                  </DictSummary>
                  <div>
                    {dict.content[group].map((dictLine) => (
                      <>
                      <DictHorizontal />
                      <Dict>
                        <div>
                          <DictForm>{dictLine.form.join(",")}</DictForm>
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
                  </div>
                </details>
              </>
            ))}
          </DictArticle>
        </DictMain>
      </>
    );
  }, [dict]);

  return <>{initPage}</>;
};
