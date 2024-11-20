import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ReadyAcidrainContext } from ".";
import { useForm } from "react-hook-form";
import { PageTitle, SubTitle } from "../../../components";
import { ReadyArticle, ReadyButton, ReadyDescription, ReadyImage, ReadyMain, ReadyTitle } from "../../../components/ready";
import { checkIcon, leftChevron, refreshIcon, startIcon } from "../../../constant/IMAGE_PATH";
import { ReadyGameConfigInput, ReadyGameConfigInputDescription, ReadyGameConfigInputMetadataBox, ReadyGameConfigLabel, ReadyGameConfigSelect } from "../../../components/ready/acidrain/GameConfig";
import { DIFFICULTY_NORMAL, DIFFICULTY_VERY_EASY, DIFFICULTY_EASY, DIFFICULTY_HARD, DIFFICULTY_VERY_HARD } from "../../../constant/DIFFICULTY";
import { ReadyBottomBox, ReadyCheckboxInput } from "../../../components/ready/acidrain";
import { IndexContext } from "../..";

export const GameConfigPage = () => {
  const { setToastMessage } = useContext(IndexContext);
  const navigate = useNavigate();
  const { dictConfig, setDictConfig, setTab } = React.useContext(ReadyAcidrainContext);
  type TDictConfig = { difficulty: number; limit: number; isSound: number };
  const { register, handleSubmit, setValue } = useForm<TDictConfig>();
  const submitRef = React.useRef<HTMLFormElement>(null);

  return (
    <>
      <PageTitle title="게임 설정하기 | 산성비 게임 | 한자 마당" />
      <ReadyMain style={{ paddingBottom: "200px" }}>
        <ReadyTitle>
          <span>樂</span>게임 설정하기 <i>(3/3)</i>
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
            const archive = localStorage.getItem("dict-play-archive")
            if (archive !== null) {
              setValue("difficulty", JSON.parse(archive).difficulty)
              setValue("limit", JSON.parse(archive).limit)
              setValue("isSound", JSON.parse(archive).isSound ? 1 : 0)
              setToastMessage(["성공적으로 불러왔습니다!"])
            } else {
              setToastMessage(["게임을 플레이 한 기록을 찾을 수 없습니다!"])
            }
          }}
        >
          <ReadyImage src={refreshIcon} />
          이전 설정 불러오기
        </ReadyButton>
        <ReadyArticle>
          <form
            onSubmit={handleSubmit((data) => {
              console.log(data.isSound)
              localStorage.setItem("dict-play", JSON.stringify({ key: dictConfig, difficulty: data.difficulty, limit: data.limit, isSound: Number(data.isSound) === 1 }));
              navigate(`/play/acidrain`);
            })}
            ref={submitRef}
          >
            <div style={{display: "flex", flexDirection: "column", gap: "3rem", marginBottom: "2rem"}}>
              <div>
                <ReadyGameConfigInputMetadataBox>
                  <ReadyGameConfigLabel htmlFor="difficulty">😐 난이도</ReadyGameConfigLabel>
                  <ReadyGameConfigInputDescription>난이도별로 한자 생성 시간이 달라집니다.</ReadyGameConfigInputDescription>
                </ReadyGameConfigInputMetadataBox>
                <ReadyGameConfigSelect {...register("difficulty")} defaultValue={DIFFICULTY_NORMAL} id="difficulty">
                  <option value={DIFFICULTY_VERY_EASY}>😆 매우 쉬움</option>
                  <option value={DIFFICULTY_EASY}>😊 쉬움</option>
                  <option value={DIFFICULTY_NORMAL}>😐 보통</option>
                  <option value={DIFFICULTY_HARD}>😨 어려움</option>
                  <option value={DIFFICULTY_VERY_HARD}>😱 매우 어려움</option>
                </ReadyGameConfigSelect>
              </div>
              <div>
                <ReadyGameConfigInputMetadataBox>
                  <ReadyGameConfigLabel htmlFor="limit">❌ 틀린 개수 제한</ReadyGameConfigLabel>
                  <ReadyGameConfigInputDescription>게임에서 이 틀린 개수 제한을 넘어가면 게임이 종료됩니다.<br />1개부터 최대 50개까지 설정할 수 있습니다.</ReadyGameConfigInputDescription>
                </ReadyGameConfigInputMetadataBox>
                <ReadyGameConfigInput type="number" min="1" max="100" {...register("limit")} defaultValue={5} id="limit" />
              </div>
              <div>
                <ReadyGameConfigInputMetadataBox>
                  <ReadyGameConfigLabel htmlFor="isSound">✅ 음으로 맞추기 허용</ReadyGameConfigLabel>
                  <ReadyGameConfigInputDescription>예를 들어 家(집 가)는 "집 가"와 동시에 음인 "가" 또한 정답으로 인정됩니다.<br />허용하지 않는다면 "집 가"만 허용됩니다!</ReadyGameConfigInputDescription>
                </ReadyGameConfigInputMetadataBox>
                <ReadyGameConfigSelect {...register("isSound")} defaultValue={1} id="isSound">
                  <option value={1}>✅ 허용 (쉬움)</option>
                  <option value={0}>❌ 허용하지 않음 (어려움)</option>
                </ReadyGameConfigSelect>
              </div>
            </div>
          </form>
        </ReadyArticle>
      </ReadyMain>
      <ReadyBottomBox>
        <ReadyButton style={{ backgroundColor: "#5cd83d90", fontSize: "6.5rem", padding: "2rem", fontWeight: 800 }} onClick={() => submitRef.current?.requestSubmit()}>
          <ReadyImage src={startIcon} style={{width: "8rem"}} />
          게임 시작!
        </ReadyButton>
      </ReadyBottomBox>
    </>
  );
};