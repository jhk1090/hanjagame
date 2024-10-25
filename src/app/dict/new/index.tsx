import React from "react";
import { Article, Button, Main, PageTitle, SubTitle, Title } from "../../../components";
import { Dict, DictDefine, DictDescription, DictForm, DictHorizontal, DictSound, DictSummary } from "../../../components/dict/view";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { IData, IDict } from "../../../database/busu";
import { DictArticle, DictButton, DictImage, DictLink, DictMain, DictSubTitle, DictTitle } from "../../../components/dict";
import { leftChevron } from "../../../constant/IMAGE_PATH";
import {
  DictNewCMError,
  DictNewCMHanjaSpan,
  DictNewCMInput,
  DictNewCMLabel,
  DictNewCMSelect,
  DictNewError,
  DictNewFieldset,
  DictNewHanjaSpan,
  DictNewInput,
  DictNewLabel,
  DictNewLegend,
  DictNewSector,
  DictNewTitle,
} from "../../../components/dict/new";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { IndexContext } from "../..";

const DictNewContext = React.createContext<{
  dict: Partial<IDict> | undefined;
  setDict: React.Dispatch<React.SetStateAction<Partial<IDict> | undefined>>;
  setTab: React.Dispatch<React.SetStateAction<"configMetadata" | "addList" | "preview">>;
}>({ dict: undefined, setDict: () => {}, setTab: () => {} });

export const DictAddListPage = () => {
  const { setTab, setDict } = React.useContext(DictNewContext)
  const { unregister, register, setValue, getValues, handleSubmit, watch, formState } =
    useForm<Record<string, { data: Record<string, { define: string; form: string; sound: string }>; name: string }>>();
  const [dictForm, setDictForm] = React.useState<Record<string, string[]>>({ [uuidv4()]: [uuidv4()] });
  return (
    <>
      <PageTitle title={`사전 목록 추가 | 한자 마당`} />
      <DictMain>
        <DictNewTitle>
          <span>字</span>
          <span>사전 목록 추가</span>
          <i>(2/3)</i>
        </DictNewTitle>
        <DictDescription>나만의 사전을 만들어보세요!</DictDescription>
        <DictButton
          type="button"
          onClick={() => {
            setDict(undefined);
            setTab("configMetadata");
          }}
        >
          <DictImage src={leftChevron} />
          이전으로
        </DictButton>
        <DictArticle>
          <form
            onSubmit={handleSubmit((value) => {
              const content: Record<string, IData[]> = {};
              for (const datalines of Object.values(value)) {
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
              setDict((cur) => ({ ...cur, content }));
              setTab("preview");
            })}
          >
            <DictButton type="submit">저장</DictButton>
            {Object.entries(dictForm).map(([datalinesKey, datalines]) => {
              return (
                <DictNewFieldset key={datalinesKey}>
                  <DictNewLegend>그룹</DictNewLegend>
                  <div>
                    <DictNewSector>
                      <DictNewLabel htmlFor={`${datalinesKey}.name`}>
                        <DictNewHanjaSpan>名</DictNewHanjaSpan> 그룹 이름
                      </DictNewLabel>
                      <DictNewInput
                        autoComplete="off"
                        id={`${datalinesKey}.name`}
                        {...register(`${datalinesKey}.name`, { required: { value: true, message: "값을 입력해주세요!" } })}
                      />
                    </DictNewSector>
                    <DictNewError>{formState.errors?.[datalinesKey]?.name?.message ?? ""}</DictNewError>
                    <DictNewFieldset>
                      <DictNewLegend>한자 목록</DictNewLegend>
                      <div>
                        {datalines.map((datalineKey) => {
                          return (
                            <DictNewFieldset key={datalineKey}>
                              <DictNewLegend>한자</DictNewLegend>
                              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                <DictNewSector>
                                  <DictNewLabel htmlFor={`${datalinesKey}.data.${datalineKey}.form`}>
                                    <DictNewHanjaSpan>字</DictNewHanjaSpan> 한자
                                  </DictNewLabel>
                                  <DictNewInput
                                    autoComplete="off"
                                    id={`${datalinesKey}.data.${datalineKey}.form`}
                                    {...register(`${datalinesKey}.data.${datalineKey}.form`, {
                                      required: { value: true, message: "값을 입력해주세요!" },
                                    })}
                                  />
                                </DictNewSector>
                                <DictNewError>{formState.errors?.[datalinesKey]?.data?.[datalineKey]?.form?.message ?? ""}</DictNewError>
                                <DictNewSector>
                                  <DictNewLabel htmlFor={`${datalinesKey}.data.${datalineKey}.sound`}>
                                    <DictNewHanjaSpan>音/志</DictNewHanjaSpan> 음과 뜻
                                  </DictNewLabel>
                                  <DictNewInput
                                    autoComplete="off"
                                    id={`${datalinesKey}.data.${datalineKey}.sound`}
                                    {...register(`${datalinesKey}.data.${datalineKey}.sound`, {
                                      required: { value: true, message: "값을 입력해주세요!" },
                                    })}
                                  />
                                </DictNewSector>
                                <DictNewError>{formState.errors?.[datalinesKey]?.data?.[datalineKey]?.sound?.message ?? ""}</DictNewError>
                                <DictNewSector>
                                  <DictNewLabel htmlFor={`${datalinesKey}.data.${datalineKey}.define`}>
                                    <DictNewHanjaSpan>說明</DictNewHanjaSpan> 설명
                                  </DictNewLabel>
                                  <DictNewInput
                                    autoComplete="off"
                                    id={`${datalinesKey}.data.${datalineKey}.define`}
                                    {...register(`${datalinesKey}.data.${datalineKey}.define`)}
                                  />
                                </DictNewSector>
                                <DictButton
                                  type="button"
                                  onClick={(e) => {
                                    setDictForm((cur) => {
                                      const replaced = { ...cur };
                                      replaced[datalinesKey].splice(
                                        replaced[datalinesKey].findIndex((v) => v === datalineKey),
                                        1
                                      );
                                      return replaced;
                                    });
                                  }}
                                >
                                  한자 삭제
                                </DictButton>
                              </div>
                            </DictNewFieldset>
                          );
                        })}
                        <DictButton
                          type="button"
                          onClick={(e) => {
                            setDictForm((cur) => {
                              const replaced = { ...cur };
                              replaced[datalinesKey].push(uuidv4());
                              return replaced;
                            });
                          }}
                        >
                          한자 추가
                        </DictButton>
                      </div>
                    </DictNewFieldset>
                    <DictButton
                      type="button"
                      onClick={(e) => {
                        setDictForm((cur) => {
                          const replaced = { ...cur };
                          replaced[uuidv4()] = [uuidv4()];
                          return replaced;
                        });
                      }}
                    >
                      그룹 추가
                    </DictButton>
                    <DictButton
                      type="button"
                      onClick={(e) => {
                        setDictForm((cur) => {
                          const replaced = { ...cur };
                          delete replaced[datalinesKey];
                          return replaced;
                        });
                      }}
                    >
                      그룹 삭제
                    </DictButton>
                  </div>
                </DictNewFieldset>
              );
            })}
          </form>
        </DictArticle>
      </DictMain>
    </>
  );
};

export const DictConfigMetadataPage = () => {
  const { setTab, setDict } = React.useContext(DictNewContext)
  const { unregister, register, setValue, getValues, handleSubmit, watch, formState } =
    useForm<{ name: string; description: string; edit: "disallow" | "allow" | "password"; password: string; }>();

  return (
    <>
      <PageTitle title={`사전 설정 | 한자 마당`} />
      <DictMain>
        <DictNewTitle>
          <span>字</span>
          <span>사전 설정</span>
          <i>(1/3)</i>
        </DictNewTitle>
        <DictDescription>사전 정보를 입력해주세요!</DictDescription>
        <DictLink to={"/dict"}>
          <DictButton type="button">
            <DictImage src={leftChevron} />
            이전으로
          </DictButton>
        </DictLink>
        <form onSubmit={handleSubmit((value) => {
          setDict(cur => ({...cur, ...value}))
          setTab("addList")
        })}>

        <DictArticle>
          <DictButton type="submit">사전 목록 추가로 이동</DictButton>
          <DictNewSector>
            <DictNewCMLabel htmlFor="name">이름</DictNewCMLabel>
            <DictNewCMInput {...register("name", { required: { value: true, message: "값을 입력하세요!" } })} id="name" type="text" />
          </DictNewSector>
          <DictNewCMError>{formState?.errors?.name?.message ?? ""}</DictNewCMError>
          <DictNewSector>
          <DictNewCMLabel htmlFor="description">설명</DictNewCMLabel>
            <DictNewCMInput {...register("description")} id="description" type="text" />
          </DictNewSector>
          <DictNewSector>
          <DictNewCMLabel htmlFor="edit">편집 설정</DictNewCMLabel>
            <DictNewCMSelect {...register("edit", { onChange: (e: React.ChangeEvent<HTMLSelectElement>) => {
              if (e.currentTarget.value !== "password") {
                setValue("password", "")
              }
            }})} id="edit" defaultValue={"disallow"}>
              <option value={"disallow"}>편집 허용하지 않음</option>
              <option value={"allow"}>편집 허용</option>
              <option value={"password"}>비밀번호 필요</option>
            </DictNewCMSelect>
          </DictNewSector>
          <DictNewSector>
          <DictNewCMLabel htmlFor="password">비밀번호 설정</DictNewCMLabel>
            <DictNewCMInput {...register("password")} id="password" disabled={watch()["edit"] !== "password"} type="text" />
          </DictNewSector>
        </DictArticle>
        </form>
      </DictMain>
    </>
  );
};

export const DictPreviewPage = () => {
  const navigate = useNavigate();
  const { dict, setDict, setTab } = React.useContext(DictNewContext)
  const dictExplicit = dict as IDict

  return (
    <>
      <PageTitle title={`미리보기 "${dictExplicit.name}" | 한자 마당`} />
      <DictMain>
        <DictNewTitle>
          <span>字</span>
          <span>미리보기 "{dictExplicit.name}"</span>
          <i>(3/3)</i>
        </DictNewTitle>
        <DictDescription>{dictExplicit.description}</DictDescription>
        <DictButton
          onClick={() => {
            setDict((cur) => ({ ...cur, content: undefined }));
            setTab("addList");
          }}
        >
          <DictImage src={leftChevron} />
          이전으로
        </DictButton>
        <DictArticle>
        <DictButton
          onClick={() => {
            localStorage.setItem("dict-custom", JSON.stringify({...JSON.parse(localStorage.getItem("dict-custom") ?? "{}"), [`${dictExplicit.name}-${uuidv4()}`]: dictExplicit}))
            navigate("/dict");
          }}
        >
          저장 및 돌아가기
        </DictButton>
          {Object.keys(dictExplicit.content).map((group) => (
            <>
              <details>
                <DictSummary>
                  <DictImage src={leftChevron} style={{ transform: "rotate(-90deg)" }} />
                  <DictSubTitle>
                    {group} <span>({dictExplicit.content[group].length})</span>
                  </DictSubTitle>
                </DictSummary>
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
              </details>
            </>
          ))}
        </DictArticle>
      </DictMain>
    </>
  );
};

export const DictNewPage = () => {
  const [initPage, setInitPage] = React.useState<JSX.Element>(<></>);
  const [dict, setDict] = React.useState<Partial<IDict> | undefined>();
  const [tab, setTab] = React.useState<"configMetadata" | "addList" | "preview">("configMetadata");

  const { setColorPair } = React.useContext(IndexContext);
  React.useEffect(()=>{
    setColorPair(["#8eaaca", "#ffe7c4"])    
  }, [])

  React.useEffect(() => {
    setInitPage(
      <>
        <PageTitle title="산성비 놀이 | 놀이 준비 | 한자 마당" />
        <DictNewContext.Provider value={{ dict, setDict, setTab }}>
          {tab === "configMetadata" ? (
            <DictConfigMetadataPage />
          ) : tab === "addList" ? (
            <DictAddListPage />
          ) : tab === "preview" ? (
            <DictPreviewPage />
          ) : (
            ""
          )}
        </DictNewContext.Provider>
      </>
    );
  }, [tab]);

  return <>{initPage}</>;
};
