import React, { useContext } from "react";
import { PageTitle } from "../../../components";
import { Dict, DictDefine, DictDescription, DictForm, DictHorizontal, DictSound, DictViewAccordion } from "../../../components/dict/view";
import { useNavigate, useParams } from "react-router-dom";
import { IData, IDict } from "../../../database/busu";
import { DictArticle, DictButton, DictImage, DictMain, DictSubTitle } from "../../../components/dict";
import { checkIcon, leftChevron } from "../../../constant/IMAGE_PATH";
import { DictBottomBox, DictNewTitle } from "../../../components/dict/new";
import { v4 as uuidv4 } from "uuid";
import { DictNewContext, IDictNewContext } from ".";
import { IndexContext } from "../..";


export const DictPreviewPage = (props: { context: React.Context<IDictNewContext>; isModifying?: boolean }) => {
  const { setToastMessage } = useContext(IndexContext)
  const navigate = useNavigate();
  const { dict, setDict, dictFormPersist, setTab } = React.useContext(props.context);
  const content: Record<string, IData[]> = {};
  for (const datalines of Object.values(dictFormPersist ?? {})) {
    const tmp = [];
    for (let i = 0; i < Object.values(datalines.data).length; i++) {
      const dataline = Object.values(datalines.data)[i];
      const tmpdata: IData = {
        form: dataline.form.split(",").map((v) => v.trim()),
        sound: dataline.sound.split(",").map((v) => v.trim()),
        define: dataline.define,
        key: datalines.name + `-${i + 1}`,
      };
      tmp.push(tmpdata);
    }
    content[datalines.name] = tmp;
  }
  const dictExplicit = { ...dict, content } as IDict;
  const [groupOpen, setGroupOpen] = React.useState<Record<string, boolean>>(Object.keys(dictExplicit).reduce((prev, cur) => ({ ...prev, [cur]: true }), {}));
  const { dictName } = useParams<{ dictName: string; }>();

  return (
    <>
      <PageTitle title={`미리보기 "${dictExplicit.name}" | ${props.isModifying ? "사전 수정" : "사전 추가"} | 한자 마당`} />
      <DictMain>
        <DictNewTitle>
          <span>字</span>
          <span>미리보기 "{dictExplicit.name}"</span>
          <i>(3/3)</i>
        </DictNewTitle>
        <DictDescription>{dictExplicit.description}</DictDescription>

        <DictArticle>
          <div style={{ display: "flex", flexDirection: "row", gap: "2rem", marginBottom: "2rem" }}>
            <DictButton
              style={{ width: "max-content", backgroundColor: "#ffffff70" }}
              onClick={() => {
                setTab("addList");
              }}
            >
              <DictImage src={leftChevron} />
              이전으로 (사전 목록 추가)
            </DictButton>
          </div>
          {Object.keys(dictExplicit.content).map((group) => (
            <>
              <DictViewAccordion
                key={group}
                contents={dictExplicit.content[group]}
                open={groupOpen[group]}
                onClick={() => {
                  setGroupOpen((cur) => ({ ...cur, [group]: !groupOpen[group] }));
                }}
                groupTitle={
                  <>
                    <DictSubTitle>
                      {group} <span>({dictExplicit.content[group].length})</span>
                    </DictSubTitle>
                  </>
                }
              >
                <div>
                  {dictExplicit.content[group].map((dictLine) => (
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
              </DictViewAccordion>
            </>
          ))}
        </DictArticle>
      </DictMain>
      <DictBottomBox>
        <DictButton
          onClick={() => {
            if (props.isModifying === undefined || !props.isModifying) {
              localStorage.setItem(
                "dict-custom",
                JSON.stringify({ ...JSON.parse(localStorage.getItem("dict-custom") ?? "{}"), [`${uuidv4()}`]: dictExplicit })
              );
            } else {
              localStorage.setItem(
                "dict-custom",
                JSON.stringify({ ...JSON.parse(localStorage.getItem("dict-custom") ?? "{}"), [dictName ?? uuidv4()]: dictExplicit })
              );
            }

            navigate("/dict");
            setToastMessage([
              !props.isModifying ? `"${dictExplicit.name}" 사전이 추가되었습니다!` : `"${dictExplicit.name}" 사전이 성공적으로 수정되었습니다!`,
            ]);
          }}
          style={{ backgroundColor: "#5cd83d90", border: "1px solid #5cd83d30" }}
        >
          <DictImage src={checkIcon} />
          최종 저장
        </DictButton>
      </DictBottomBox>
    </>
  );
};
