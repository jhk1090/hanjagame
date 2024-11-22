import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ReadyAcidrainContext } from ".";
import { useForm } from "react-hook-form";
import { Button, PageTitle, StepperBody, StepperBox, StepperIndicator, StepperJoint, StepperLocation, StepperMiddle, SubTitle } from "../../../components";
import { ReadyArticle, ReadyButton, ReadyDescription, ReadyImage, ReadyMain, ReadyTitle } from "../../../components/ready";
import { checkIcon, leftChevron, refreshIcon, startIcon } from "../../../constant/IMAGE_PATH";
import { ReadyGameConfigInput, ReadyGameConfigInputDescription, ReadyGameConfigInputMetadataBox, ReadyGameConfigLabel, ReadyGameConfigSelect } from "../../../components/ready/acidrain/GameConfig";
import { INTERVAL_NORMAL, INTERVAL_VERY_EASY, INTERVAL_EASY, INTERVAL_HARD, INTERVAL_VERY_HARD, SPEED_NORMAL, SPEED_VERY_EASY, SPEED_EASY, SPEED_HARD, SPEED_VERY_HARD } from "../../../constant/DIFFICULTY";
import { ReadyBottomBox, ReadyCheckboxInput } from "../../../components/ready/acidrain";
import { IndexContext } from "../..";
import { PlayHeightWarning } from "../../../components/play";

export const GameConfigPage = () => {
  const { setToastMessage } = useContext(IndexContext);
  const navigate = useNavigate();
  const { dictConfig, setDictConfig, setTab, setDict } = React.useContext(ReadyAcidrainContext);
  type TDictConfig = { difficulty: string; limit: number; isSound: number, speed: number, interval: number };
  const { register, handleSubmit, setValue, getValues } = useForm<TDictConfig>();
  const submitRef = React.useRef<HTMLFormElement>(null);
  const [isHeightWarning, setIsHeightWarning] = React.useState(false);

  const updateDimension = () => {
    if (window.innerHeight >= 600) {
      setIsHeightWarning(false);
    }
  }

  React.useEffect(() => {
    window.addEventListener("resize", updateDimension);

    return () => window.removeEventListener("resize", updateDimension) 
  }, [])

  const difficulties = [
    [INTERVAL_EASY, SPEED_EASY].join(","),
    [INTERVAL_VERY_EASY, SPEED_VERY_EASY].join(","),
    [INTERVAL_NORMAL, SPEED_NORMAL].join(","),
    [INTERVAL_HARD, SPEED_HARD].join(","),
    [INTERVAL_VERY_HARD, SPEED_VERY_HARD].join(","),
  ];

  return (
    <>
      <PageTitle title="게임 설정하기 | 산성비 게임 | 한자 마당" />
      <ReadyMain style={{ paddingBottom: "200px" }}>
        <StepperBox key={"stepper"}>
          <StepperMiddle>
            <StepperJoint $type="visited" />
            <StepperJoint $type="visited" />
          </StepperMiddle>
          <StepperBody>
            <StepperLocation
              onClick={() => {
                setDict(undefined);
                setDictConfig(undefined);
                setTab("dictSelection");
              }}
            >
              <StepperIndicator $clickable $type="visited">
                1
              </StepperIndicator>
              사전 선택
            </StepperLocation>
            <StepperLocation
              onClick={() => {
                setDictConfig(undefined);
                setTab("dictlineSelection");
              }}
            >
              <StepperIndicator $clickable $type="visited">
                2
              </StepperIndicator>
              한자 추가 또는 삭제
            </StepperLocation>
            <StepperLocation>
              <StepperIndicator $type="visited">3</StepperIndicator>
              게임 설정하기
            </StepperLocation>
          </StepperBody>
        </StepperBox>
        <ReadyTitle>
          <span>樂</span>게임 설정하기
        </ReadyTitle>
        <ReadyDescription>마지막 설정입니다! 게임 시작을 누르면 산성비 게임이 시작됩니다.</ReadyDescription>
        <ReadyButton
          style={{ width: "max-content", backgroundColor: "#ffffff70" }}
          onClick={() => {
            setDictConfig(undefined);
            setTab("dictlineSelection");
          }}
        >
          <ReadyImage src={leftChevron} />
          이전으로 (한자 추가 또는 삭제)
        </ReadyButton>
        <ReadyButton
          style={{ width: "max-content", backgroundColor: "#5cd83d80", marginTop: "1rem" }}
          onClick={() => {
            const archive = localStorage.getItem("dict-play-archive");
            if (archive !== null) {
              const targetDifficulty = [JSON.parse(archive).interval, JSON.parse(archive).speed].join(",");
              setValue("difficulty", difficulties.includes(targetDifficulty) ? targetDifficulty : "custom");
              setValue("speed", JSON.parse(archive).speed * 100);
              setValue("interval", JSON.parse(archive).interval);
              setValue("limit", JSON.parse(archive).limit);
              setValue("isSound", JSON.parse(archive).isSound ? 1 : 0);
              setToastMessage(["성공적으로 불러왔습니다!"]);
            } else {
              setToastMessage(["게임을 플레이 한 기록을 찾을 수 없습니다!"]);
            }
          }}
        >
          <ReadyImage src={refreshIcon} />
          이전 설정 불러오기
        </ReadyButton>
        <ReadyArticle>
          <form
            onSubmit={handleSubmit((data) => {
              if (window.innerHeight < 600) {
                setIsHeightWarning(true);
                return;
              }
              localStorage.setItem(
                "dict-play",
                JSON.stringify({
                  key: dictConfig,
                  interval: data.interval,
                  limit: data.limit,
                  isSound: Number(data.isSound) === 1,
                  speed: data.speed / 100,
                })
              );
              navigate(`/play/acidrain`);
            })}
            ref={submitRef}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "3rem", marginBottom: "2rem" }}>
              <div>
                <ReadyGameConfigInputMetadataBox>
                  <ReadyGameConfigLabel htmlFor="difficulty">😐 난이도</ReadyGameConfigLabel>
                  <ReadyGameConfigInputDescription>난이도별로 한자 생성 시간이 달라집니다.</ReadyGameConfigInputDescription>
                </ReadyGameConfigInputMetadataBox>
                <ReadyGameConfigSelect
                  {...register("difficulty", {
                    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => {
                      const value = e.currentTarget.value;
                      if (value !== "custom") {
                        setValue("interval", Number(value.split(",")[0]));
                        setValue("speed", Number(value.split(",")[1]) * 100);
                      }
                    },
                  })}
                  defaultValue={`${INTERVAL_NORMAL},${SPEED_NORMAL}`}
                  required
                  id="difficulty"
                >
                  <option value={`${INTERVAL_VERY_EASY},${SPEED_VERY_EASY}`}>😆 매우 쉬움</option>
                  <option value={`${INTERVAL_EASY},${SPEED_EASY}`}>😊 쉬움</option>
                  <option value={`${INTERVAL_NORMAL},${SPEED_NORMAL}`}>😐 보통</option>
                  <option value={`${INTERVAL_HARD},${SPEED_HARD}`}>😨 어려움</option>
                  <option value={`${INTERVAL_VERY_HARD},${SPEED_VERY_HARD}`}>😱 매우 어려움</option>
                  <option value={`custom`}>🗿 사용자 지정</option>
                </ReadyGameConfigSelect>
              </div>
              <div>
                <ReadyGameConfigInputMetadataBox>
                  <ReadyGameConfigLabel htmlFor="speed">ㄴ 한자 속도</ReadyGameConfigLabel>
                  <ReadyGameConfigInputDescription>한자가 내려오는 속도입니다! 1부터 1000까지 조절 가능합니다.</ReadyGameConfigInputDescription>
                </ReadyGameConfigInputMetadataBox>
                <ReadyGameConfigInput
                  type="number"
                  min="1"
                  max="1000"
                  {...register("speed", {
                    onChange: (e) => {
                      const target = [getValues()["interval"], getValues()["speed"] / 100].join(",");
                      setValue("difficulty", difficulties.includes(target) ? target : "custom");
                    },
                  })}
                  defaultValue={SPEED_NORMAL * 100}
                  id="speed"
                  required
                />
              </div>
              <div>
                <ReadyGameConfigInputMetadataBox>
                  <ReadyGameConfigLabel htmlFor="interval">ㄴ 한자 생성 간격</ReadyGameConfigLabel>
                  <ReadyGameConfigInputDescription>
                    다음 한자가 생성되기까지의 간격(초)입니다! "낮을 수록" 더 어렵습니다.
                  </ReadyGameConfigInputDescription>
                </ReadyGameConfigInputMetadataBox>
                <ReadyGameConfigInput
                  type="number"
                  min="0.01"
                  step="0.01"
                  {...register("interval", {
                    onChange: (e) => {
                      const target = [getValues()["interval"], getValues()["speed"] / 100].join(",");
                      setValue("difficulty", difficulties.includes(target) ? target : "custom");
                    },
                  })}
                  defaultValue={INTERVAL_NORMAL}
                  id="interval"
                  required
                />
              </div>
              <div>
                <ReadyGameConfigInputMetadataBox>
                  <ReadyGameConfigLabel htmlFor="limit">❌ 틀린 개수 제한</ReadyGameConfigLabel>
                  <ReadyGameConfigInputDescription>
                    게임에서 이 틀린 개수 제한을 넘어가면 게임이 종료됩니다.
                    <br />
                    1개부터 최대 50개까지 설정할 수 있습니다.
                  </ReadyGameConfigInputDescription>
                </ReadyGameConfigInputMetadataBox>
                <ReadyGameConfigInput type="number" min="1" max="50" {...register("limit")} required defaultValue={5} id="limit" />
              </div>
              <div>
                <ReadyGameConfigInputMetadataBox>
                  <ReadyGameConfigLabel htmlFor="isSound">✅ 음으로 맞추기 허용</ReadyGameConfigLabel>
                  <ReadyGameConfigInputDescription>
                    예를 들어 家(집 가)는 "집 가"와 동시에 음인 "가" 또한 정답으로 인정됩니다.
                    <br />
                    허용하지 않는다면 "집 가"만 허용됩니다!
                  </ReadyGameConfigInputDescription>
                </ReadyGameConfigInputMetadataBox>
                <ReadyGameConfigSelect {...register("isSound")} defaultValue={1} required id="isSound">
                  <option value={1}>✅ 허용 (쉬움)</option>
                  <option value={0}>❌ 허용하지 않음 (어려움)</option>
                </ReadyGameConfigSelect>
              </div>
            </div>
          </form>
        </ReadyArticle>
      </ReadyMain>
      <ReadyBottomBox>
        <ReadyButton
          style={{ backgroundColor: "#5cd83d90", fontSize: "6.5rem", padding: "2rem", fontWeight: 800 }}
          onClick={() => submitRef.current?.requestSubmit()}
        >
          <ReadyImage src={startIcon} style={{ width: "8rem" }} />
          게임 시작!
        </ReadyButton>
      </ReadyBottomBox>
      <PlayHeightWarning style={isHeightWarning ? { display: "flex" } : { display: "none" }}>
        <h1>!</h1>
        <h2>화면 높이가 너무 작습니다!</h2>
        <span>
          <b>전체 화면으로 전환</b>하거나 <b>화면 배율</b>을 조정하세요!
        </span>
        <span>
          <b>F11</b>(전체 화면), <b>Ctrl+-</b>(화면 배율)
        </span>
        <div>
          <Button
            onClick={() => {
              const element = document.querySelector("html");
              if (element) {
                element.requestFullscreen();
              }
            }}
            style={{ backgroundColor: "#ffffffdd", color: "black", padding: "1rem 3rem" }}
          >
            전체화면 전환
          </Button>
          <Button onClick={() => setIsHeightWarning(false)} style={{ backgroundColor: "#ffffffdd", color: "black", padding: "1rem 3rem" }}>
            닫기
          </Button>
        </div>
      </PlayHeightWarning>
    </>
  );
};