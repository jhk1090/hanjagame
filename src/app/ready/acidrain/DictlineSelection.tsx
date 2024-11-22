import React from "react";
import { PageTitle, StepperBody, StepperBox, StepperIndicator, StepperJoint, StepperLocation, StepperMiddle } from "../../../components";
import { useNavigate } from "react-router-dom";
import { IData } from "../../../database/busu";
import { Dict, DictForm, DictHorizontal, DictSound, DictViewAccordion } from "../../../components/dict/view";
import { useForm } from "react-hook-form";
import { ReadyBottomBox, ReadyCheckboxInput } from "../../../components/ready/acidrain";
import { ReadyArticle, ReadyButton, ReadyDescription, ReadyImage, ReadyMain, ReadyTitle } from "../../../components/ready";
import { checkIcon, closeIcon, leftChevron, plusIcon } from "../../../constant/IMAGE_PATH";
import { DictSubTitle } from "../../../components/dict";
import {
  ReadyDictlineSelectionButtonSet,
  ReadyDictlineSelectionSubTitle,
  ReadyDictlineSelectionWarning,
} from "../../../components/ready/acidrain/DictlineSelection";
import { ReadyAcidrainContext } from ".";

export const DictlineSelectionPage = () => {
  const navigate = useNavigate();
  const { dict, setDict, setDictConfig, setTab } = React.useContext(ReadyAcidrainContext);
  const [error, setError] = React.useState(false);
  type TDictConfig = Record<string, { selectAll: boolean; dict: boolean[] }>;
  const { unregister, register, setValue, getValues, handleSubmit } = useForm<TDictConfig>();
  const [groupOpen, setGroupOpen] = React.useState<Record<string, boolean>>({});
  const submitRef = React.useRef<HTMLFormElement>(null);

  React.useEffect(() => {
    if (dict) {
      setGroupOpen(Object.keys(dict.content).reduce((prev, cur) => ({ ...prev, [cur]: true }), {}));
    }
  }, [dict]);

  if (dict === undefined) {
    return <></>;
  }
  return (
    <>
      <PageTitle title="한자 추가 또는 삭제 | 산성비 게임 | 한자 마당" />
      <ReadyMain style={{ paddingBottom: "200px" }}>
        <StepperBox key={"stepper"}>
          <StepperMiddle>
            <StepperJoint $type="visited" />
            <StepperJoint $type="visitable" />
          </StepperMiddle>
          <StepperBody>
            <StepperLocation
              onClick={() => {
                unregister();
                setDict(undefined);
                setTab("dictSelection");
              }}
            >
              <StepperIndicator $clickable $type="visited">1</StepperIndicator>
              사전 선택
            </StepperLocation>
            <StepperLocation>
              <StepperIndicator $type="visited">2</StepperIndicator>
              한자 추가 또는 삭제
            </StepperLocation>
            <StepperLocation onClick={() => {
                submitRef.current?.requestSubmit();
              }}>
              <StepperIndicator $clickable $type="visitable">3</StepperIndicator>
              게임 설정하기
            </StepperLocation>
          </StepperBody>
        </StepperBox>
        <ReadyTitle>
          <span>樂</span>한자 추가 또는 삭제
        </ReadyTitle>
        <ReadyDescription>게임에서 떨어질 한자를 직접 선택하거나 삭제할 수 있습니다. 체크박스를 눌러 확인해보세요.</ReadyDescription>
        <ReadyButton
          style={{ width: "max-content", backgroundColor: "#ffffff70" }}
          onClick={() => {
            unregister();
            setDict(undefined);
            setTab("dictSelection");
          }}
        >
          <ReadyImage src={leftChevron} />
          이전으로 (사전 선택)
        </ReadyButton>
        <ReadyArticle>
          <span
            style={{ backgroundColor: "#ffffff90", padding: "2rem", borderRadius: "2rem", fontSize: "7.5rem", fontWeight: 800, width: "max-content" }}
          >
            "字 {dict.name}" <span style={{ fontWeight: 300, fontSize: "7rem" }}>목록</span>
          </span>
          <form
            ref={submitRef}
            style={{ border: error ? "3px solid #ff4747" : "unset", borderRadius: "1rem", padding: error ? ".5rem" : "" }}
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
                  dictMap[form].push(...dictFlatElem.sound);
                }
              }

              const dictMapFlatArray: IData[] = [];
              for (const [form, sound] of Object.entries(dictMap)) {
                dictMapFlatArray.push({ form: [form], sound: Array.from(new Set(sound)), key: form });
              }

              setDictConfig(dictMapFlatArray);
              setTab("gameConfig");
              setError(false);
            })}
          >
            {error ? <ReadyDictlineSelectionWarning>적어도 한 개의 한자는 선택해야 합니다!</ReadyDictlineSelectionWarning> : ""}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
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
                          <ReadyCheckboxInput
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
                                <ReadyCheckboxInput
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
                                <label style={{ display: "flex", gap: "1rem", alignItems: "center" }} htmlFor={`${group}.dict.${index}`}>
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
      <ReadyBottomBox>
        <ReadyButton
          style={{ backgroundColor: "#5cd83d99", backdropFilter: "blur(2px)", fontSize: "4.5rem" }}
          onClick={() => submitRef.current?.requestSubmit()}
        >
          <ReadyImage src={checkIcon} />
          저장 및 다음으로
        </ReadyButton>
        <ReadyButton
          style={{ backgroundColor: "#3dc1d899", backdropFilter: "blur(2px)", fontSize: "4.5rem" }}
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
          style={{ backgroundColor: "#d83d3d99", backdropFilter: "blur(2px)", fontSize: "4.5rem" }}
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
      </ReadyBottomBox>
    </>
  );
};
