import React from "react";
import { Article, Button, Main, PageTitle, SubTitle, Title } from "../../../components";
import { Dict, DictDefine, DictDescription, DictForm, DictHorizontal, DictSound, DictSummary } from "../../../components/dict/view";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { IData, IDict } from "../../../database/busu";
import { DictArticle, DictButton, DictImage, DictLink, DictMain, DictSubTitle, DictTitle } from "../../../components/dict";
import { checkIcon, closeIcon, leftChevron, plusIcon } from "../../../constant/IMAGE_PATH";
import {
  Accordion,
  DictALButton,
  DictALImage,
  DictNewCMError,
  DictNewCMHanjaSpan,
  DictNewCMInput,
  DictNewCMLabel,
  DictNewCMSelect,
  DictNewError,
  DictNewFieldset,
  DictNewGroupBox,
  DictNewGroupBoxMain,
  DictNewGroupBoxTitle,
  DictNewGroupBoxTop,
  DictNewHanjaBox,
  DictNewHanjaBoxMain,
  DictNewHanjaBoxMainUpper,
  DictNewHanjaBoxSidebar,
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
  dictForm: Record<string, string[]> | undefined;
  dictFormPersist: Record<string, { data: Record<string, { define: string; form: string; sound: string }>; name: string }> | undefined;
  setDict: React.Dispatch<React.SetStateAction<Partial<IDict> | undefined>>;
  setDictForm: React.Dispatch<React.SetStateAction<Record<string, string[]> | undefined>>;
  setDictFormPersist: React.Dispatch<
    React.SetStateAction<Record<string, { data: Record<string, { define: string; form: string; sound: string }>; name: string }> | undefined>
  >;
  setTab: React.Dispatch<React.SetStateAction<"configMetadata" | "addList" | "preview">>;
}>({
  dict: undefined,
  dictForm: undefined,
  dictFormPersist: undefined,
  setDict: () => {},
  setDictForm: () => {},
  setDictFormPersist: () => {},
  setTab: () => {},
});

export const DictConfigMetadataPage = () => {
  const { setTab, setDict, dict } = React.useContext(DictNewContext);
  const { unregister, register, setValue, getValues, handleSubmit, watch, formState, setError } = useForm<{
    name: string;
    description: string;
    edit: "disallow" | "allow" | "password";
    password: string;
    passwordVerify: string;
  }>();

  React.useEffect(() => {
    const name = dict?.name;
    if (name !== undefined) {
      setValue("name", name);
      setValue("description", dict?.description ?? "");
      setValue("edit", dict?.edit ?? "disallow");
      setValue("password", dict?.password ?? "");
      setValue("passwordVerify", dict?.password ?? "");
    }
  }, []);

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
        <form
          onSubmit={handleSubmit((value) => {
            if (value.password !== value.passwordVerify) {
              setError("passwordVerify", { message: "비밀번호가 일치하지 않습니다!" });
              return;
            }

            setDict((cur) => ({ ...cur, ...value }));
            setTab("addList");
          })}
        >
          <DictArticle>
            <div style={{display: "flex", flexDirection: "row", gap: "2rem"}}>
              <DictLink to={"/dict"}>
                <DictButton type="button">
                  <DictImage src={leftChevron} />
                  이전으로
                </DictButton>
              </DictLink>
              <DictButton type="submit" style={{backgroundColor:"#5cd83d90", border:"1px solid #5cd83d30"}}><DictImage src={checkIcon} /> 저장 및 다음으로</DictButton>
            </div>
            <DictNewSector>
              <DictNewCMLabel htmlFor="name">이름</DictNewCMLabel>
              <DictNewCMInput
                {...register("name", { required: { value: true, message: "값을 입력하세요!" } })}
                style={{ border: formState?.errors?.name?.message ? "2px solid red" : "" }}
                autoComplete="off"
                placeholder="사전의 이름"
                id="name"
                type="text"
              />
              <DictNewCMError>{formState?.errors?.name?.message ?? ""}</DictNewCMError>
            </DictNewSector>
            <DictNewSector>
              <DictNewCMLabel htmlFor="description">설명</DictNewCMLabel>
              <DictNewCMInput {...register("description")} autoComplete="off" placeholder="사전의 설명" id="description" type="text" />
            </DictNewSector>
            <DictNewSector>
              <DictNewCMLabel htmlFor="edit">편집 설정</DictNewCMLabel>
              <DictNewCMSelect
                {...register("edit", {
                  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => {
                    if (e.currentTarget.value !== "password") {
                      setValue("password", "");
                      setValue("passwordVerify", "");
                      unregister(["password", "passwordVerify"]);
                    }
                  },
                })}
                id="edit"
                defaultValue={"disallow"}
              >
                <option value={"disallow"}>🔒 편집 허용하지 않음</option>
                <option value={"allow"}>✅ 편집 허용</option>
                <option value={"password"}>🔑 비밀번호 필요</option>
              </DictNewCMSelect>
            </DictNewSector>
            {watch()["edit"] === "password" ? (
              <>
                <DictNewSector>
                  <DictNewCMLabel htmlFor="password">비밀번호 설정</DictNewCMLabel>
                  <DictNewCMInput
                    {...register("password")}
                    style={{ border: formState?.errors?.passwordVerify?.message ? "2px solid red" : "" }}
                    autoComplete="new-password"
                    id="password"
                    type="password"
                  />
                  <DictNewCMLabel htmlFor="passwordVerify">비밀번호 확인</DictNewCMLabel>
                  <DictNewCMInput
                    {...register("passwordVerify")}
                    style={{ border: formState?.errors?.passwordVerify?.message ? "2px solid red" : "" }}
                    autoComplete="new-password"
                    id="passwordVerify"
                    type="password"
                  />
                  <DictNewCMError>{formState?.errors?.passwordVerify?.message ?? ""}</DictNewCMError>
                </DictNewSector>
              </>
            ) : (
              ""
            )}
          </DictArticle>
        </form>
      </DictMain>
    </>
  );
};

export const DictAddListPage = () => {
  const {
    dict,
    dictForm: dictFormContext,
    dictFormPersist,
    setDictForm: setDictFormContext,
    setDictFormPersist,
    setTab,
    setDict,
  } = React.useContext(DictNewContext);
  const { unregister, register, setValue, getValues, handleSubmit, watch, formState, resetField } = useForm<
    Record<string, { data: Record<string, { define: string; form: string; sound: string }>; name: string }>
  >({ defaultValues: dictFormPersist });
  const [dictForm, setDictForm] = React.useState(dictFormContext ?? { [uuidv4()]: [uuidv4()] });
  const [groupOpen, setGroupOpen] = React.useState(Object.keys(dictForm).reduce((prev, cur) => ({ ...prev, [cur]: true }), {}) as Record<string, boolean>)

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
        <DictArticle>
          <form
            onSubmit={handleSubmit((value) => {
              setDictFormPersist(value);
              setDictFormContext(dictForm);
              setTab("preview");
            })}
          >
            <div style={{ display: "flex", flexDirection: "row", gap: "2rem", marginBottom: "2rem" }}>
              <DictButton
                type="button"
                onClick={() => {
                  setDictFormPersist(undefined);
                  setDictFormContext(undefined);
                  setTab("configMetadata");
                }}
              >
                <DictImage src={leftChevron} />
                이전으로
              </DictButton>
              <DictButton type="button" onClick={() => {
                unregister();
                setDictForm({ [uuidv4()]: [uuidv4()] });
              }} style={{ backgroundColor: "#d83d3d90", border: "1px solid #d83d3d30" }}>
                <DictImage src={closeIcon} /> 초기화
              </DictButton>
              <DictButton type="submit" style={{ backgroundColor: "#5cd83d90", border: "1px solid #5cd83d30" }}>
                <DictImage src={checkIcon} /> 저장 및 미리보기
              </DictButton>
            </div>
            {Object.entries(dictForm).map(([datalinesKey, datalines]) => {
              console.log(groupOpen[datalinesKey])
              return (
                <>
                  <Accordion
                    key={datalinesKey}
                    datalines={datalines}
                    open={true}
                    onToggle={() => {
                      setGroupOpen((cur) => ({ ...cur, [datalinesKey]: !groupOpen[datalinesKey] }));
                    }}
                    top={
                      <div>
                        <DictALButton
                          type="button"
                          style={{ backgroundColor: "#d83d3d90", border: "1px solid #d83d3d30" }}
                          onClick={(e) => {
                            unregister(datalinesKey);
                            delete groupOpen[datalinesKey]
                            setGroupOpen(groupOpen)
                            setDictForm((cur) => {
                              const replaced = { ...cur };
                              delete replaced[datalinesKey];
                              return replaced;
                            });
                          }}
                        >
                          <DictALImage src={closeIcon} />
                          삭제
                        </DictALButton>
                      </div>
                    }
                  >
                    <DictNewGroupBoxMain>
                      <DictNewSector>
                        <DictNewInput
                          autoComplete="off"
                          placeholder="그룹 이름"
                          style={{ border: formState.errors?.[datalinesKey]?.name?.message ? "2px solid red" : "" }}
                          {...register(`${datalinesKey}.name`, { required: { value: true, message: "값을 입력해주세요!" } })}
                        />
                      </DictNewSector>
                      <DictNewError>{formState.errors?.[datalinesKey]?.name?.message ?? ""}</DictNewError>
                      {datalines.map((datalineKey) => {
                        return (
                          <DictNewHanjaBox key={datalineKey}>
                            <DictNewHanjaBoxMain>
                              <DictNewHanjaBoxMainUpper>
                                <DictNewSector>
                                  <DictNewInput
                                    autoComplete="off"
                                    placeholder="한자"
                                    style={{ border: formState.errors?.[datalinesKey]?.data?.[datalineKey]?.form?.message ? "2px solid red" : "" }}
                                    {...register(`${datalinesKey}.data.${datalineKey}.form`, {
                                      required: { value: true, message: "값을 입력해주세요!" },
                                    })}
                                  />
                                  <DictNewError>{formState.errors?.[datalinesKey]?.data?.[datalineKey]?.form?.message ?? ""}</DictNewError>
                                </DictNewSector>
                                <DictNewSector>
                                  <DictNewInput
                                    autoComplete="off"
                                    placeholder="음과 뜻"
                                    style={{ border: formState.errors?.[datalinesKey]?.data?.[datalineKey]?.sound?.message ? "2px solid red" : "" }}
                                    {...register(`${datalinesKey}.data.${datalineKey}.sound`, {
                                      required: { value: true, message: "값을 입력해주세요!" },
                                    })}
                                  />
                                  <DictNewError>{formState.errors?.[datalinesKey]?.data?.[datalineKey]?.sound?.message ?? ""}</DictNewError>
                                </DictNewSector>
                              </DictNewHanjaBoxMainUpper>
                              <DictNewSector>
                                <DictNewInput
                                  autoComplete="off"
                                  placeholder="한자 부가 설명"
                                  {...register(`${datalinesKey}.data.${datalineKey}.define`)}
                                />
                              </DictNewSector>
                            </DictNewHanjaBoxMain>
                            <DictNewHanjaBoxSidebar>
                              <DictButton
                                type="button"
                                onClick={(e) => {
                                  unregister(`${datalinesKey}.data.${datalineKey}`);
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
                                <DictImage src={closeIcon} />
                              </DictButton>
                            </DictNewHanjaBoxSidebar>
                          </DictNewHanjaBox>
                        );
                      })}
                      <DictALButton
                        type="button"
                        onClick={(e) => {
                          setDictForm((cur) => {
                            const replaced = { ...cur };
                            replaced[datalinesKey].push(uuidv4());
                            return replaced;
                          });
                        }}
                      >
                        <DictALImage src={plusIcon} />
                        한자 추가
                      </DictALButton>
                    </DictNewGroupBoxMain>
                  </Accordion>
                </>
              );
            })}
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
              <DictImage src={plusIcon} />
              그룹 추가
            </DictButton>
          </form>
        </DictArticle>
      </DictMain>
    </>
  );
};

export const DictPreviewPage = () => {
  const navigate = useNavigate();
  const { dict, setDict, dictFormPersist, setTab } = React.useContext(DictNewContext);
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

        <DictArticle>
          <div style={{ display: "flex", flexDirection: "row", gap: "2rem", marginBottom: "2rem" }}>
            <DictButton
              onClick={() => {
                setTab("addList");
              }}
            >
              <DictImage src={leftChevron} />
              이전으로
            </DictButton>
            <DictButton
              onClick={() => {
                localStorage.setItem(
                  "dict-custom",
                  JSON.stringify({ ...JSON.parse(localStorage.getItem("dict-custom") ?? "{}"), [`${uuidv4()}`]: dictExplicit })
                );
                navigate("/dict");
              }}
              style={{ backgroundColor: "#5cd83d90", border: "1px solid #5cd83d30" }}
            >
              <DictImage src={checkIcon} />
              최종 저장
            </DictButton>
          </div>
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
  const [dictForm, setDictForm] = React.useState<Record<string, string[]>>();
  const [dictFormPersist, setDictFormPersist] = React.useState<
    Record<string, { data: Record<string, { define: string; form: string; sound: string }>; name: string }> | undefined
  >();
  const [tab, setTab] = React.useState<"configMetadata" | "addList" | "preview">("configMetadata");

  const { setColorPair } = React.useContext(IndexContext);
  React.useEffect(() => {
    setColorPair(["#8eaaca", "#ffe7c4"]);
  }, []);

  React.useEffect(() => {
    setInitPage(
      <>
        <PageTitle title="산성비 놀이 | 놀이 준비 | 한자 마당" />
        <DictNewContext.Provider value={{ dict, dictForm, dictFormPersist, setDict, setDictForm, setDictFormPersist, setTab }}>
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
