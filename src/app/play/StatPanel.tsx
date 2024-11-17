import { SubTitle } from "../../components";
import { PlayStatBlock, PlayStatBlockCenter, PlayStatBlockSmall, PlayStatBlockSmallLeft } from "../../components/play";
import { ReadyButton, ReadyImage, ReadyLink } from "../../components/ready";
import { IData } from "../../database/busu";
import { DIFFICULTY_EASY, DIFFICULTY_HARD, DIFFICULTY_NORMAL, DIFFICULTY_VERY_HARD } from "../../constant/DIFFICULTY";
import { useMediaQuery } from "react-responsive";
import { leftChevron } from "../../constant/IMAGE_PATH";

export const StatPanel = ({ afterStatWrong, stageDifficulty, stageLimit, count }: { afterStatWrong: IData[]; stageDifficulty: number; stageLimit: number; count: number; }) => {
  const maxWidth = useMediaQuery({ query: "(min-width: 1300px)"})
  const middleWidth = useMediaQuery({ query: "(min-width: 650px)"})
  return (
    <>
      {maxWidth ? (
        <PlayStatBlock>
          <ReadyLink to={"/ready/acidrain"}>
            <ReadyButton>
              <ReadyImage src={leftChevron} />
              이전으로
            </ReadyButton>
          </ReadyLink>
          <p>
            <SubTitle>
              {stageDifficulty <= DIFFICULTY_VERY_HARD
                ? "😱 매우 어려움"
                : stageDifficulty <= DIFFICULTY_HARD
                ? "😨 어려움"
                : stageDifficulty <= DIFFICULTY_NORMAL
                ? "😐 보통"
                : stageDifficulty <= DIFFICULTY_EASY
                ? "😊 쉬움"
                : "😆 매우 쉬움"}
            </SubTitle>
          </p>
          <p>
            <SubTitle>
              ❌ 틀린 개수: {afterStatWrong.length}/{stageLimit}
            </SubTitle>
          </p>
          <p>
            <SubTitle>⏱️ {(count - 350) / 100 < 0 ? "0초" : (count - 350) / 100 + "초"}</SubTitle>
          </p>
        </PlayStatBlock>
      ) : middleWidth ? (
        <>
          <PlayStatBlockSmallLeft>
            <ReadyLink to={"/ready/acidrain"}>
              <ReadyButton>
                <ReadyImage src={leftChevron} /> 이전으로
              </ReadyButton>
            </ReadyLink>
          </PlayStatBlockSmallLeft>
          <PlayStatBlockSmall>
            <div>
              {stageDifficulty <= DIFFICULTY_VERY_HARD
                ? "😱"
                : stageDifficulty <= DIFFICULTY_HARD
                ? "😨"
                : stageDifficulty <= DIFFICULTY_NORMAL
                ? "😐"
                : stageDifficulty <= DIFFICULTY_EASY
                ? "😊"
                : "😆"}
            </div>
            <div>
              ❌ {afterStatWrong.length}/{stageLimit}
            </div>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
              <div>⏱️</div>
              <div style={{ minWidth: "150px", marginTop: "10px", justifyContent: "center" }}>{(count - 350) / 100 < 0 ? "0초" : String((count - 350) / 100).padEnd(2, "0") + "초"}</div>
            </div>
          </PlayStatBlockSmall>
        </>
      ) : (
        <PlayStatBlockCenter>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <div>❌</div>
            <div style={{ display: "flex", minWidth: "150px", marginTop: "10px", justifyContent: "center" }}>{afterStatWrong.length}/{stageLimit}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <div>⏱️</div>
            <div style={{ display: "flex", minWidth: "150px", marginTop: "10px", justifyContent: "center" }}>{(count - 350) / 100 < 0 ? "0초" : String((count - 350) / 100).padEnd(String(Math.trunc((count - 350))).length - 1, "0") + "초"}</div>
          </div>
        </PlayStatBlockCenter>
      )}
    </>
  );
}