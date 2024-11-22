import React from "react";
import { PageTitle, StepperBody, StepperBox, StepperIndicator, StepperJoint, StepperLocation, StepperMiddle } from "../../../components";
import { DictDescription } from "../../../components/dict/view";
import { DictArticle, DictButton, DictImage, DictMain } from "../../../components/dict";
import { checkIcon, closeIcon, leftChevron, plusIcon } from "../../../constant/IMAGE_PATH";
import {
  Accordion,
  DictALButton,
  DictALImage, DictBottomBox, DictNewError, DictNewGroupBoxMain, DictNewHanjaBox,
  DictNewHanjaBoxMain,
  DictNewHanjaBoxMainUpper,
  DictNewHanjaBoxSidebar, DictNewInput, DictNewSector,
  DictNewTitle
} from "../../../components/dict/new";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { DictNewContext, IDictNewContext } from ".";
import { useNavigate } from "react-router-dom";
import { PlayHeightWarning } from "../../../components/play";


export const DictAddListPage = (props: { context: React.Context<IDictNewContext>; isModifying?: boolean; }) => {
  const navigate = useNavigate();
  const {
    dict, dictForm: dictFormContext, dictFormPersist, setDictForm: setDictFormContext, setDictFormPersist, setTab, setDict,
  } = React.useContext(props.context);
  const { unregister, register, setValue, getValues, handleSubmit, watch, formState, resetField, setError, clearErrors } = useForm<
    Record<string, { data: Record<string, { define: string; form: string; sound: string; }>; name: string; }>
  >({ defaultValues: dictFormPersist, mode: "onChange" });
  const [dictForm, setDictForm] = React.useState(dictFormContext ?? { [uuidv4()]: [uuidv4()] });
  const [groupOpen, setGroupOpen] = React.useState(Object.keys(dictForm).reduce((prev, cur) => ({ ...prev, [cur]: true }), {}) as Record<string, boolean>);
  const submitRef = React.useRef<HTMLFormElement>(null);
  return (
    <>
      <PageTitle title={`사전 목록 | ${props.isModifying ? "사전 수정" : "사전 추가"} | 한자 마당`} />
      <DictMain style={{ paddingBottom: "100px" }}>
        <StepperBox key={"stepper"}>
          <StepperMiddle>
            <StepperJoint $type="visited" />
            <StepperJoint $type="visitable" />
          </StepperMiddle>
          <StepperBody>
            <StepperLocation
              onClick={() => {
                setDictFormPersist(undefined);
                setDictFormContext(undefined);
                setTab("configMetadata");
              }}
            >
              <StepperIndicator $clickable $type="visited">
                1
              </StepperIndicator>
              사전 정보
            </StepperLocation>
            <StepperLocation>
              <StepperIndicator $type="visited">2</StepperIndicator>
              사전 목록
            </StepperLocation>
            <StepperLocation
              onClick={() => {
                submitRef.current?.requestSubmit();
              }}
            >
              <StepperIndicator $clickable $type="visitable">
                3
              </StepperIndicator>
              미리보기
            </StepperLocation>
          </StepperBody>
        </StepperBox>
        <DictNewTitle>
          <span>字</span>
          <span>사전 목록</span>
        </DictNewTitle>
        <DictDescription>나만의 사전을 만들어보세요!</DictDescription>
        <DictButton
          type="button"
          onClick={() => {
            setDictFormPersist(undefined);
            setDictFormContext(undefined);
            setTab("configMetadata");
          }}
          style={{ width: "max-content", backgroundColor: "#ffffff70" }}
        >
          <DictImage src={leftChevron} />
          이전으로 (사전 정보)
        </DictButton>
        <DictArticle>
          <form
            ref={submitRef}
            onSubmit={handleSubmit((value) => {
              setDictFormPersist(value);
              setDictFormContext(dictForm);
              setTab("preview");
            })}
          >
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
                    id={`${datalinesKey}-group`}
                    key={datalinesKey}
                    datalines={datalines}
                    open={groupOpen[datalinesKey]}
                    title={getValues()[datalinesKey]?.name}
                    onClick={() => {
                      setGroupOpen((cur) => ({ ...cur, [datalinesKey]: !groupOpen[datalinesKey] }));
                    }}
                    top={
                      <div>
                        {Object.keys(dictForm).length > 1 ? (
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
                        ) : (
                          <></>
                        )}
                      </div>
                    }
                  >
                    <DictNewGroupBoxMain>
                      <DictNewSector style={{ flexDirection: "row", alignItems: "center" }}>
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
                            },
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
                                        setValue(
                                          `${datalinesKey}.data.${datalineKey}.form`,
                                          Array.from(
                                            new Set(
                                              event.currentTarget.value
                                                .split(",")
                                                .map((v) => v.trim())
                                                .filter((v) => v !== "")
                                            )
                                          ).join(",")
                                        );
                                      },
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
                                      },
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
                              {datalines.length > 1 ? (
                                <>
                                  <DictButton
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
                                    style={{ backgroundColor: "#d83d3d90", border: "1px solid #d83d3d30", padding: ".5rem" }}
                                    type="button"
                                  >
                                    <DictImage src={closeIcon} />
                                  </DictButton>
                                </>
                              ) : (
                                <></>
                              )}
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
                        style={{ backgroundColor: "#3dc1d890" }}
                      >
                        <DictALImage src={plusIcon} />
                        한자 추가
                      </DictALButton>
                    </DictNewGroupBoxMain>
                  </Accordion>
                </>
              );
            })}
          </form>
        </DictArticle>
      </DictMain>
      <DictBottomBox>
        <DictButton
          type="button"
          onClick={() => {
            unregister();
            const key = uuidv4();
            setDictForm({ [key]: [uuidv4()] });
            setGroupOpen({ [key]: true });
          }}
          style={{ backgroundColor: "#d83d3d90", border: "1px solid #d83d3d30" }}
        >
          <DictImage src={closeIcon} /> 초기화
        </DictButton>
        <DictButton
          type="button"
          onClick={(e) => {
            const key = uuidv4();
            setDictForm((cur) => {
              const replaced = { ...cur };
              replaced[key] = [uuidv4()];
              setGroupOpen((cur) => ({ ...cur, [key]: true }));
              return replaced;
            });
          }}
          style={{ backgroundColor: "#3dc1d890" }}
        >
          <DictImage src={plusIcon} />
          그룹 추가
        </DictButton>
        <DictButton onClick={() => submitRef.current?.requestSubmit()} style={{ backgroundColor: "#5cd83d90", border: "1px solid #5cd83d30" }}>
          <DictImage src={checkIcon} /> 저장
        </DictButton>
      </DictBottomBox>
    </>
  );
};
