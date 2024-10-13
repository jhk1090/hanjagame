import React, { createContext, JSX } from "react";
import { Article, Button, ButtonLabel, Main, Title, PageTitle, SubTitle } from "../../../components";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { IData, IDict } from "../../../database/busu";
import { Dict, DictDefine, DictForm, DictSound, DictSummary } from "../../../components/dict/view";
import { useForm, useFormContext } from "react-hook-form";
import { Input } from "../../../components/ready/acidrain";
import { ReadyArticle, ReadyButton, ReadyDescription, ReadyImage, ReadyLink, ReadyMain, ReadySubTitle, ReadyTitle } from "../../../components/ready";
import { checkIcon, closeIcon, leftChevron, plusIcon } from "../../../constant/IMAGE_PATH";
import { DictImage, DictSubTitle } from "../../../components/dict";
import { ReadyDictlineSelectionButtonSet, ReadyDictlineSelectionSubTitle, ReadyDictlineSelectionWarning } from "../../../components/ready/acidrain/DictlineSelection";

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
            navigate("..");
          }}
        >
          <ReadyImage src={leftChevron} />
          이전으로
        </ReadyButton>
        <ReadyArticle>
          <ReadySubTitle>
            기본 사전 <span>({Object.keys(dictCommon).length})</span>
          </ReadySubTitle>
          {Object.values(dictCommon).map((dictLine) => (
            <ReadyButton
              onClick={() => {
                setDict(dictLine);
                setTab("dictlineSelection")
              }}
            >
              {dictLine.name}
            </ReadyButton>
          ))}
          <ReadySubTitle>
            사용자 추가 사전 <span>({Object.keys(dictCustom).length})</span>
          </ReadySubTitle>
          {Object.values(dictCustom).map((dictLine) => (
            <ReadyButton
              onClick={() => {
                setDict(dictLine);
                setTab("dictlineSelection")
              }}
            >
              {dictLine.name}
            </ReadyButton>
          ))}
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
            setTab("dictSelection")
          }}
        >
          <ReadyImage src={leftChevron} />
          이전으로
        </ReadyButton>
        <ReadyArticle>
          <ReadyDictlineSelectionSubTitle><span>"{dict.name}"</span><span>한자 목록</span></ReadyDictlineSelectionSubTitle>
          <form
            style={{ border: error ? "3px solid #ff4747" : "3px solid transparent", borderRadius: "1rem", padding: "2rem"}}
            onSubmit={handleSubmit((data: TDictConfig) => {
              const dictAcc: IData[] = [];
              Object.keys(data).forEach((group) => {
                data[group].dict.forEach((value, index) => {
                  if (value) {
                    // 음만 차용
                    const beAdded = dict.content[group][index];
                    const soundList: string[] = [];
                    beAdded.sound.forEach((sound) => {
                      soundList.push(sound);
                      if (sound.split(" ").length > 1) {
                        soundList.push(sound.split(" ").at(-1) as string);
                      }
                    });
                    beAdded.sound = soundList;
                    dictAcc.push(beAdded);
                  }
                });
              });

              if (dictAcc.length === 0) {
                setError(true);
                return;
              }

              setDictConfig(dictAcc);
              setTab("gameConfig")
              setError(false);
            })}
          >
            <ReadyDictlineSelectionButtonSet>
              <ReadyButton type="submit"><ReadyImage src={checkIcon} />저장 및 다음으로</ReadyButton>
              <ReadyButton type="button" onClick={() => {
                {Object.keys(dict.content).forEach((group) => {
                  dict.content[group].forEach((_, index) => setValue(`${group}.dict.${index}`, true))
                  setValue(`${group}.selectAll`, true)
                })}
              }}><ReadyImage src={plusIcon} />모두 선택</ReadyButton>
              <ReadyButton type="button" onClick={() => {
                {Object.keys(dict.content).forEach((group) => {
                  dict.content[group].forEach((_, index) => setValue(`${group}.dict.${index}`, false))
                  setValue(`${group}.selectAll`, false)
                })}
              }}><ReadyImage src={closeIcon} />모두 선택 해제</ReadyButton>
            </ReadyDictlineSelectionButtonSet>
            { error ? <ReadyDictlineSelectionWarning>적어도 한 개의 한자는 선택해야 합니다!</ReadyDictlineSelectionWarning> : "" }
            {Object.keys(dict.content).map((group) => (
              <>
                <details>
                  <DictSummary>
                    <DictSubTitle>
                      <DictImage src={leftChevron} style={{ transform: "rotate(-90deg)" }} />{" "}
                      <Input
                        type="checkbox"
                        {...register(`${group}.selectAll`)}
                        onChange={(e: React.FormEvent<HTMLInputElement>) => {
                          dict.content[group].forEach((_, index) => {
                            setValue(`${group}.dict.${index}`, e.currentTarget.checked);
                          });
                        }}
                        defaultChecked
                      />{" "}
                      {group} <span>({dict.content[group].length})</span>
                    </DictSubTitle>
                  </DictSummary>
                  <div>
                    {dict.content[group].map((dictLine, index) => (
                      <Dict>
                        <div>
                          <Input
                            type="checkbox"
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
                          <DictForm>{dictLine.form.join(",")}</DictForm>
                          <DictSound>{dictLine.sound.join(", ")}</DictSound>
                        </div>
                      </Dict>
                    ))}
                  </div>
                </details>
              </>
            ))}
          </form>
        </ReadyArticle>
      </ReadyMain>
    </>
  );
}

const GameConfigPage = () => {
  const navigate = useNavigate();
  const { dictConfig, setDictConfig, setTab } = React.useContext(ReadyAcidrainContext);

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
          <SubTitle>시작할까요?</SubTitle>
          <ReadyButton
            onClick={() => {
              navigate(`/play?key=${JSON.stringify(dictConfig)}`);
            }}
          >
            시작
          </ReadyButton>
        </ReadyArticle>
      </ReadyMain>
    </>
  );
}

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
          {
            tab === "dictSelection" ?
              <DictSelectionPage />
            : tab === "dictlineSelection" ?
              <DictlineSelectionPage />
            : tab === "gameConfig" ?
              <GameConfigPage />
            : ""
          }

        </ReadyAcidrainContext.Provider>
      </>
    );
  }, [tab]);

  return <>{initPage}</>;
};
