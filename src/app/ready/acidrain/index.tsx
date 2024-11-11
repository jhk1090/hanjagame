import React, { createContext, JSX } from "react";
import { Article, Button, ButtonLabel, Main, Title, PageTitle, SubTitle } from "../../../components";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { IData, IDict } from "../../../database/busu";
import { Dict, DictDefine, DictForm, DictHorizontal, DictSound, DictSummary, DictViewAccordion } from "../../../components/dict/view";
import { useForm, useFormContext } from "react-hook-form";
import { Input } from "../../../components/ready/acidrain";
import { ReadyArticle, ReadyButton, ReadyDescription, ReadyImage, ReadyLink, ReadyMain, ReadySubTitle, ReadyTitle } from "../../../components/ready";
import { checkIcon, closeIcon, leftChevron, plusIcon } from "../../../constant/IMAGE_PATH";
import { DictImage, DictSubTitle, DictToView, DictToViewBox } from "../../../components/dict";
import {
  ReadyDictlineSelectionButtonSet,
  ReadyDictlineSelectionSubTitle,
  ReadyDictlineSelectionWarning,
} from "../../../components/ready/acidrain/DictlineSelection";
import { ReadyGameConfigSelect } from "../../../components/ready/acidrain/GameConfig";
import { DIFFICULTY_EASY, DIFFICULTY_HARD, DIFFICULTY_NORMAL, DIFFICULTY_VERY_EASY, DIFFICULTY_VERY_HARD } from "../../../constant/DIFFICULTY";

const ReadyAcidrainContext = React.createContext<{
  dict: IDict | undefined;
  setDict: React.Dispatch<React.SetStateAction<IDict | undefined>>;
  dictConfig: IData[] | undefined;
  setDictConfig: React.Dispatch<React.SetStateAction<IData[] | undefined>>;
  setTab: React.Dispatch<React.SetStateAction<"dictSelection" | "dictlineSelection" | "gameConfig">>;
}>({ dict: undefined, dictConfig: undefined, setDict: () => {}, setDictConfig: () => {}, setTab: () => {} });

const DictSelectionPage = () => {
  const { setDict, setTab } = React.useContext(ReadyAcidrainContext);
  const navigate = useNavigate();
  const dictCommon: Record<string, IDict> = { ...JSON.parse(localStorage.getItem("dict-common") ?? "{}") };
  const dictCustom: Record<string, IDict> = { ...JSON.parse(localStorage.getItem("dict-custom") ?? "{}") };
  return (
    <>
      <PageTitle title="사전 선택 | 산성비 놀이 | 한자 마당" />
      <ReadyMain>
        <ReadyTitle>
          <span>樂</span>사전 선택 <i>(1/3)</i>
        </ReadyTitle>
        <ReadyDescription>게임에서 사용될 사전을 선택하세요. 사전을 선택하면 그 사전 내에 있는 한자가 떨어지게 됩니다.</ReadyDescription>
        <ReadyButton
          onClick={() => {
            navigate("/");
          }}
        >
          <ReadyImage src={leftChevron} />
          이전으로
        </ReadyButton>
        <ReadyArticle>
          <ReadySubTitle>
            기본 사전 <span>({Object.keys(dictCommon).length})</span>
          </ReadySubTitle>
          <DictToViewBox>
            {Object.values(dictCommon).map((dictLine) => (
              <DictToView
                onClick={() => {
                  setDict(dictLine);
                  setTab("dictlineSelection");
                }}
              >
                字 {dictLine.name}
              </DictToView>
            ))}
          </DictToViewBox>
          <ReadySubTitle>
            사용자 추가 사전 <span>({Object.keys(dictCustom).length})</span>
          </ReadySubTitle>
          {Object.keys(dictCustom).length === 0 ? (
            <>
              <DictToViewBox style={{ justifyContent: "center", width: "100%", flexDirection: "column" }}>
                <span style={{ fontSize: "5rem", fontWeight: 800 }}>사전이 없습니다!</span>
              </DictToViewBox>
            </>
          ) : (
            <DictToViewBox>
              {Object.values(dictCustom).map((dictLine) => (
                <DictToView
                  onClick={() => {
                    setDict(dictLine);
                    setTab("dictlineSelection");
                  }}
                >
                  字 {dictLine.name}
                </DictToView>
              ))}
            </DictToViewBox>
          )}
        </ReadyArticle>
      </ReadyMain>
    </>
  );
};

const DictlineSelectionPage = () => {
  const navigate = useNavigate();
  const { dict, setDict, setDictConfig, setTab } = React.useContext(ReadyAcidrainContext);
  const [error, setError] = React.useState(false);
  type TDictConfig = Record<string, { selectAll: boolean; dict: boolean[] }>;
  const { unregister, register, setValue, getValues, handleSubmit } = useForm<TDictConfig>();
  const [groupOpen, setGroupOpen] = React.useState<Record<string, boolean>>({})

  React.useEffect(() => {
    if (dict) {
      setGroupOpen(Object.keys(dict.content).reduce((prev, cur) => ({ ...prev, [cur]: true }), {}));
    }
  }, [dict])

  if (dict === undefined) {
    return <></>;
  }

  return (
    <>
      <PageTitle title="한자 추가 또는 삭제 | 산성비 놀이 | 한자 마당" />
      <ReadyMain>
        <ReadyTitle>
          <span>樂</span>한자 추가 또는 삭제 <i>(2/3)</i>
        </ReadyTitle>
        <ReadyDescription>게임에서 떨어질 한자를 직접 선택하거나 삭제할 수 있습니다. 체크박스를 눌러 확인해보세요.</ReadyDescription>
        <ReadyButton
          onClick={() => {
            unregister();
            setDict(undefined);
            setTab("dictSelection");
          }}
        >
          <ReadyImage src={leftChevron} />
          이전으로
        </ReadyButton>
        <ReadyArticle>
          <ReadyDictlineSelectionSubTitle>
            <span>"{dict.name}"</span>
            <span>한자 목록</span>
          </ReadyDictlineSelectionSubTitle>
          <form
            style={{ border: error ? "3px solid #ff4747" : "3px solid #00000070", borderRadius: "1rem", padding: "2rem" }}
            onSubmit={handleSubmit((data: TDictConfig) => {
              const dictFlatArray: IData[] = [];
              Object.keys(data).forEach((group) => {
                data[group].dict.forEach((value, index) => {
                  if (value) {
                    dictFlatArray.push(dict.content[group][index]);
                  }
                  // if (value) {
                  //   // 음만 차용
                  //   const data = dict.content[group][index];
                  //   const soundList: string[] = [];
                  //   data.sound.forEach(sound => {
                  //     soundList.push(sound);
                  //     if (sound.split(" ").length > 1) {
                  //       soundList.push(sound.split(" ").at(-1) as string);
                  //     }
                  //   })
                  //   console.log(soundList)
                  //   data.sound = soundList;
                  //   dictAcc.push(data);
                  // }
                });
              });

              if (dictFlatArray.length === 0) {
                setError(true);
                return;
              }

              const dictMap: Record<string, string[]> = {};
              for (const dictFlatElem of dictFlatArray) {
                for (const form of dictFlatElem.form) {
                  if (!dictMap[form]) {
                    dictMap[form] = [];
                  }
                  dictMap[form].push(...dictFlatElem.sound)
                }
              }

              const dictMapFlatArray: IData[] = [];
              for (const [form, sound] of Object.entries(dictMap)) {
                dictMapFlatArray.push({ form: [form], sound: Array.from(new Set(sound)), key: form })
              }

              setDictConfig(dictMapFlatArray);
              setTab("gameConfig");
              setError(false);
            })}
          >
            <ReadyDictlineSelectionButtonSet>
              <ReadyButton style={{ backgroundColor: "#5cd83d90" }} type="submit">
                <ReadyImage src={checkIcon} />
                저장 및 다음으로
              </ReadyButton>
              <ReadyButton
                style={{ backgroundColor: "#3dc1d890" }}
                type="button"
                onClick={() => {
                  {
                    Object.keys(dict.content).forEach((group) => {
                      dict.content[group].forEach((_, index) => setValue(`${group}.dict.${index}`, true));
                      setValue(`${group}.selectAll`, true);
                    });
                  }
                }}
              >
                <ReadyImage src={plusIcon} />
                모두 선택
              </ReadyButton>
              <ReadyButton
                style={{ backgroundColor: "#d83d3d90" }}
                type="button"
                onClick={() => {
                  {
                    Object.keys(dict.content).forEach((group) => {
                      dict.content[group].forEach((_, index) => setValue(`${group}.dict.${index}`, false));
                      setValue(`${group}.selectAll`, false);
                    });
                  }
                }}
              >
                <ReadyImage src={closeIcon} />
                모두 선택 해제
              </ReadyButton>
            </ReadyDictlineSelectionButtonSet>
            {error ? <ReadyDictlineSelectionWarning>적어도 한 개의 한자는 선택해야 합니다!</ReadyDictlineSelectionWarning> : ""}
            <div style={{ marginTop: "2.5rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
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
                        <DictSubTitle style={{ alignItems: "center", display: "flex", flexDirection: "row", gap: "4rem" }}>
                          <Input
                            type="checkbox"
                            {...register(`${group}.selectAll`)}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e: React.FormEvent<HTMLInputElement>) => {
                              dict.content[group].forEach((_, index) => {
                                setValue(`${group}.dict.${index}`, e.currentTarget.checked);
                              });
                            }}
                            defaultChecked
                          />
                          <div>
                            {group} <span>({dict.content[group].length})</span>
                          </div>
                        </DictSubTitle>
                      </>
                    }
                  >
                    <>
                      {dict.content[group].map((dictLine, index) => (
                        <>
                          <DictHorizontal />
                          <Dict>
                            <div
                              style={{
                                alignItems: "center",
                                display: "flex",
                                flexDirection: "row",
                                gap: "3rem",
                                padding: "0 2rem 0 2rem",
                                flexWrap: "wrap",
                              }}
                            >
                              <div>
                                <Input
                                  type="checkbox"
                                  id={`${group}.dict.${index}`}
                                  {...register(`${group}.dict.${index}`)}
                                  key={index}
                                  onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                    if (e.currentTarget.checked) {
                                      const groupSelections = getValues()[group].dict as boolean[];
                                      groupSelections[index] = true;
                                      if (groupSelections.every((v) => v)) {
                                        setValue(`${group}.selectAll`, true);
                                      }
                                    } else {
                                      setValue(`${group}.selectAll`, false);
                                    }
                                  }}
                                  defaultChecked
                                />
                              </div>
                              <div>
                                <label style={{display: "flex", gap: "1rem", alignItems: "center"}} htmlFor={`${group}.dict.${index}`}>
                                  <DictForm>{dictLine.form.join(",")}</DictForm>
                                  <DictSound>{dictLine.sound.join(", ")}</DictSound>
                                </label>
                              </div>
                            </div>
                          </Dict>
                        </>
                      ))}
                    </>
                  </DictViewAccordion>
                </>
              ))}
            </div>
          </form>
        </ReadyArticle>
      </ReadyMain>
    </>
  );
};

const GameConfigPage = () => {
  const navigate = useNavigate();
  const { dictConfig, setDictConfig, setTab } = React.useContext(ReadyAcidrainContext);
  type TDictConfig = { difficulty: number };
  const { unregister, register, setValue, getValues, handleSubmit } = useForm<TDictConfig>();

  return (
    <>
      <PageTitle title="놀이 설정하기 | 산성비 놀이 | 한자 마당" />
      <ReadyMain>
        <ReadyTitle>
          <span>樂</span>놀이 설정하기 <i>(3/3)</i>
        </ReadyTitle>
        <ReadyButton
          onClick={() => {
            setDictConfig(undefined);
            setTab("dictlineSelection");
          }}
        >
          <ReadyImage src={leftChevron} />
          이전으로
        </ReadyButton>
        <ReadyArticle>
          <SubTitle>난이도</SubTitle>
          <form
            onSubmit={handleSubmit((data) => {
              localStorage.setItem("dict-play", JSON.stringify({ key: dictConfig, difficulty: data.difficulty }));
              navigate(`/play/acidrain`);
            })}
          >
            <ReadyGameConfigSelect {...register("difficulty")} defaultValue={DIFFICULTY_NORMAL}>
              <option value={DIFFICULTY_VERY_EASY}>😆 매우 쉬움</option>
              <option value={DIFFICULTY_EASY}>😊 쉬움</option>
              <option value={DIFFICULTY_NORMAL}>😐 보통</option>
              <option value={DIFFICULTY_HARD}>😨 어려움</option>
              <option value={DIFFICULTY_VERY_HARD}>😱 매우 어려움</option>
            </ReadyGameConfigSelect>
            <ReadyButton type="submit">시작</ReadyButton>
          </form>
        </ReadyArticle>
      </ReadyMain>
    </>
  );
};

export const ReadyAcidrainPage = () => {
  const [initPage, setInitPage] = React.useState<JSX.Element>(<></>);
  const [dict, setDict] = React.useState<IDict | undefined>();
  const [dictConfig, setDictConfig] = React.useState<IData[] | undefined>();
  const [tab, setTab] = React.useState<"dictSelection" | "dictlineSelection" | "gameConfig">("dictSelection");

  React.useEffect(() => {
    setInitPage(
      <>
        <PageTitle title="산성비 놀이 | 놀이 준비 | 한자 마당" />
        <ReadyAcidrainContext.Provider value={{ dict, setDict, dictConfig, setDictConfig, setTab }}>
          {tab === "dictSelection" ? (
            <DictSelectionPage />
          ) : tab === "dictlineSelection" ? (
            <DictlineSelectionPage />
          ) : tab === "gameConfig" ? (
            <GameConfigPage />
          ) : (
            ""
          )}
        </ReadyAcidrainContext.Provider>
      </>
    );
  }, [tab]);

  return <>{initPage}</>;
};
