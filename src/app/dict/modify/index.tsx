import React from "react";
import { Article, Button, Main, PageTitle, SubTitle, Title } from "../../../components";
import { Dict, DictDefine, DictDescription, DictForm, DictHorizontal, DictSound, DictSummary, DictViewAccordion } from "../../../components/dict/view";
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
import { v4 as uuidv4, v4 } from "uuid";
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
  const navigate = useNavigate();
  const { setTab, setDict, dict, setDictForm, setDictFormPersist } = React.useContext(DictNewContext);
  const { unregister, register, setValue, getValues, handleSubmit, watch, formState, setError } = useForm<{
    name: string;
    description: string;
    edit: "disallow" | "allow";
  }>();
  const { dictName } = useParams<{ dictName: string; }>();

  React.useEffect(() => {
    const dictIntegration: Record<string, IDict> = { ...JSON.parse(localStorage.getItem("dict-common") ?? "{}"), ...JSON.parse(localStorage.getItem("dict-custom") ?? "{}") };
    if (dictName === undefined || dictIntegration[dictName] === undefined ) {
      navigate("/dict", { replace: true });
      return;
    }

    const dictOrigin = dictIntegration[dictName]
    const dictMetadata = { ...dictOrigin, content: undefined };
    setValue("name", dictMetadata.name);
    setValue("description", dictMetadata.description ?? "");
    setValue("edit", dictMetadata.edit ?? "disallow");
    setDict(dictMetadata)
    
    let rebuildDictForm: Record<string, string[]> = {};
    let rebuildDictFormPersist: Record<string, { data: Record<string, { define: string; form: string; sound: string }>; name: string }> = {};
    for (const [groupName, data] of Object.entries(dictOrigin.content)) {
      const datalinesKey = v4();
      const tmpRebuildDictForm = [];
      let tmpRebuildDictFormPersist = {};

      for (let dataline of data) {
        const datalineKey = v4();
        let datalineComprehensive: { define: string; form: string; sound: string } = {
          form: dataline.form.join(","),
          sound: dataline.sound.join(","),
          define: dataline.define ?? ""
        };
        tmpRebuildDictForm.push(datalineKey)
        tmpRebuildDictFormPersist = {...tmpRebuildDictFormPersist, [datalineKey]: datalineComprehensive }
      }

      rebuildDictForm = { ...rebuildDictForm, [datalinesKey]: tmpRebuildDictForm }
      rebuildDictFormPersist = {...rebuildDictFormPersist, [datalinesKey]: { data: tmpRebuildDictFormPersist, name: groupName } }
    }

    setDictForm(rebuildDictForm)
    setDictFormPersist(rebuildDictFormPersist)
  }, [])

  React.useEffect(() => {
    const name = dict?.name;
    if (name !== undefined) {
      setValue("name", name);
      setValue("description", dict?.description ?? "");
      setValue("edit", dict?.edit ?? "disallow");
    }
  }, []);

  return (
    <>
      <PageTitle title={`사전 정보 수정 | 한자 마당`} />
      <DictMain>
        <DictNewTitle>
          <span>字</span>
          <span>사전 정보 수정</span>
          <i>(1/3)</i>
        </DictNewTitle>
        <DictDescription>사전 정보를 수정해주세요!</DictDescription>
        <form
          onSubmit={handleSubmit((value) => {
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
              <DictNewCMLabel htmlFor="edit">수정 설정</DictNewCMLabel>
              <DictNewCMSelect
                {...register("edit")}
                id="edit"
                defaultValue={"disallow"}
              >
                <option value={"disallow"}>🔒 수정 허용하지 않음</option>
                <option value={"allow"}>✅ 수정 허용</option>
              </DictNewCMSelect>
            </DictNewSector>
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
  const { unregister, register, setValue, getValues, handleSubmit, watch, formState, resetField, setError, clearErrors } = useForm<
    Record<string, { data: Record<string, { define: string; form: string; sound: string }>; name: string }>
  >({ defaultValues: dictFormPersist, mode: "onChange" });
  const [dictForm, setDictForm] = React.useState(dictFormContext ?? { [uuidv4()]: [uuidv4()] });
  const [groupOpen, setGroupOpen] = React.useState(Object.keys(dictForm).reduce((prev, cur) => ({ ...prev, [cur]: true }), {}) as Record<string, boolean>)
  console.log("error", formState.errors)
  return (
    <>
      <PageTitle title={`사전 목록 수정 | 한자 마당`} />
      <DictMain>
        <DictNewTitle>
          <span>字</span>
          <span>사전 목록 수정</span>
          <i>(2/3)</i>
        </DictNewTitle>
        <DictDescription>목록에서 수정할 내용을 찾아 수정하세요!</DictDescription>
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
              <DictButton
                type="button"
                onClick={() => {
                  unregister();
                  const key = uuidv4();
                  setDictForm({ [key]: [uuidv4()] });
                  setGroupOpen({ [key]: true })
                }}
                style={{ backgroundColor: "#d83d3d90", border: "1px solid #d83d3d30" }}
              >
                <DictImage src={closeIcon} /> 초기화
              </DictButton>
              <DictButton type="submit" style={{ backgroundColor: "#5cd83d90", border: "1px solid #5cd83d30" }}>
                <DictImage src={checkIcon} /> 저장 및 미리보기
              </DictButton>
            </div>
            {Object.values(formState.errors).length > 0 ? (
              <>
                <div style={{ backgroundColor: "#ff474795", borderRadius: "1rem", padding: "1.5rem", marginBottom: "1rem" }}>
                  <span style={{ fontSize: "4rem", color: "black" }}>필수 입력값을 입력했는지, 값이 중복되지 않았는지 확인하세요!</span>
                </div>
              </>
            ) : (
              <></>
            )}
            {Object.entries(dictForm).map(([datalinesKey, datalines]) => {
              return (
                <>
                  <Accordion
                    key={datalinesKey}
                    datalines={datalines}
                    open={groupOpen[datalinesKey]}
                    onClick={() => {
                      setGroupOpen((cur) => ({ ...cur, [datalinesKey]: !groupOpen[datalinesKey] }));
                    }}
                    top={
                      <div>
                        <DictALButton
                          type="button"
                          style={{ backgroundColor: "#d83d3d90", border: "1px solid #d83d3d30" }}
                          onClick={(e) => {
                            unregister(datalinesKey);
                            delete groupOpen[datalinesKey];
                            setGroupOpen(groupOpen);
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
                      <DictNewSector style={{flexDirection: "row", alignItems: "center"}}>
                        <DictNewInput
                          autoComplete="off"
                          placeholder="그룹 이름"
                          style={{ border: formState.errors?.[datalinesKey]?.name?.message ? "2px solid red" : "" }}
                          {...register(`${datalinesKey}.name`, {
                            required: { value: true, message: "이름을 입력해주세요!" },
                            validate: {
                              duplicated: (value) =>
                                !Object.entries(watch())
                                  .filter(([key, _]) => key !== datalinesKey)
                                  .map(([_, v]) => v.name)
                                  .includes(value) || "이미 사용된 이름입니다!",
                            },
                            onBlur: (event: React.ChangeEvent<HTMLInputElement>) => {
                              setValue(`${datalinesKey}.name`, event.currentTarget.value.trim());
                            }
                          })}
                        />
                        <DictNewError>{formState.errors?.[datalinesKey]?.name?.message}</DictNewError>
                      </DictNewSector>
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
                                      // validate: {
                                      //   duplicated: (value) => {
                                      //     const dataEntries = Object.entries(Object.values(watch()).map(v => v.data).reduce((prev, cur) => ({ ...prev, ...cur }), {} as Record<string, { form: string; }>))
                                      //     const searchArray = dataEntries.filter(([key, _]) => key !== datalineKey).map(([_, v]) => v.form.split(",")).flat().filter(v => v !== "");
                                      //     const targetArray = value.split(",").map(v => v.trim()).filter(v => v !== "")
                                      //     console.log(searchArray, targetArray, targetArray.some(v => searchArray.includes(v)))
                                      //     return targetArray.some(v => searchArray.includes(v)) ? "이미 사용된 값입니다." : true;
                                      //   }
                                      // },
                                      onBlur: (event: React.ChangeEvent<HTMLInputElement>) => {
                                        setValue(`${datalinesKey}.data.${datalineKey}.form`, Array.from(new Set(event.currentTarget.value.split(",").map(v => v.trim()).filter(v => v !== ""))).join(","));
                                      }
                                    })}
                                  />
                                </DictNewSector>
                                <DictNewSector>
                                  <DictNewInput
                                    autoComplete="off"
                                    placeholder="음과 뜻"
                                    style={{ border: formState.errors?.[datalinesKey]?.data?.[datalineKey]?.sound?.message ? "2px solid red" : "" }}
                                    {...register(`${datalinesKey}.data.${datalineKey}.sound`, {
                                      required: { value: true, message: "값을 입력해주세요!" },
                                      onBlur: (event: React.ChangeEvent<HTMLInputElement>) => {
                                        setValue(
                                          `${datalinesKey}.data.${datalineKey}.sound`,
                                          Array.from(
                                            new Set(
                                              event.currentTarget.value
                                                .split(",")
                                                .map((v) => v.trim())
                                                .filter((v) => v !== "")
                                            )
                                          ).join(",")
                                        );
                                      }
                                    })}
                                  />
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
                  const key = uuidv4();
                  replaced[key] = [uuidv4()];
                  setGroupOpen((cur) => ({ ...cur, [key]: true }))
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
  const { dictName } = useParams<{ dictName: string; }>();
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
  const [groupOpen, setGroupOpen] = React.useState<Record<string, boolean>>(Object.keys(dictExplicit).reduce((prev, cur) => ({ ...prev, [cur]: true }), {}))

  if (dictName === undefined) {
    navigate("/dict")
    return <></>
  }

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
                  JSON.stringify({ ...JSON.parse(localStorage.getItem("dict-custom") ?? "{}"), [dictName ?? v4()]: dictExplicit })
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
    </>
  );
};

export const DictModifyPage = () => {
  const navigate = useNavigate();
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
        <PageTitle title="사전 수정 | 한자 마당" />
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
