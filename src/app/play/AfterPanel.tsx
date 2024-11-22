import { useNavigate } from "react-router-dom";
import { DictImage, DictSubTitle } from "../../components/dict";
import { DictForm, DictHorizontal, DictSound, DictSummary, DictViewAccordion } from "../../components/dict/view";
import { DictCount, PlayAfterButton, PlayAfterButtonSet, PlayAfterPanel, PlayAfterSubTitle, PlayAfterTitle, PlayHeightWarning, PlayImage } from "../../components/play";
import { homeIcon, leftChevron, refreshIcon } from "../../constant/IMAGE_PATH";
import { IData } from "../../database/busu";
import styled from "styled-components";
import React from "react";
import { Button } from "../../components";

const AfterPanelBackground = styled.div`
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  width: 100vw;
  height: 100dvh;
  background-color: #00000020;
  z-index: 1003;
`;

export const AfterPanel = ({
  property,
  interval,
  limit,
  speed,
  count,
  rightItems,
  isSound,
  wrongItems,
}: {
  property: IData[];
  interval: number;
  limit: number;
  speed: number;
  count: number;
  isSound: boolean;
  rightItems: Record<string, { dict: IData; count: number }>;
  wrongItems: Record<string, { dict: IData; count: number }>;
}) => {
  const navigate = useNavigate();
  const [isRightOpen, setIsRightOpen] = React.useState(false);
  const [isWrongOpen, setIsWrongOpen] = React.useState(false);
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

  return (
    <>
      <AfterPanelBackground>
        <PlayAfterPanel>
          <PlayAfterTitle>게임 오버!</PlayAfterTitle>
          <PlayAfterButtonSet>
            <PlayAfterButton
              onClick={() => {
                if (window.innerHeight < 600) {
                  setIsHeightWarning(true);
                  return;
                }

                localStorage.setItem("dict-play", JSON.stringify({ key: property, interval, limit, speed, isSound }));
                navigate(`/play/acidrain`, { replace: true });
                location.reload();
              }}
            >
              <PlayImage src={refreshIcon} /> 다시 하기
            </PlayAfterButton>
            <PlayAfterButton onClick={() => navigate("/")}>
              <PlayImage src={homeIcon} /> 홈으로
            </PlayAfterButton>
          </PlayAfterButtonSet>
          <PlayAfterSubTitle>⏱️ 시간: {(count - 350) / 100}초</PlayAfterSubTitle>
          <PlayAfterSubTitle>🎯 통계</PlayAfterSubTitle>
          <p>
            <DictViewAccordion
              contents={Object.values(wrongItems)}
              open={isWrongOpen}
              onClick={() => {
                setIsWrongOpen((cur) => !cur);
              }}
              groupTitle={
                <>
                  <DictSubTitle>
                    ❌ 틀린 한자 <span>({Object.values(wrongItems).length}개)</span>
                  </DictSubTitle>
                </>
              }
            >
              <div>
                {Object.values(wrongItems).map((item) => {
                  return (
                    <>
                      <DictHorizontal />
                      <div>
                        <DictForm>{item.dict.form.join("")}</DictForm>
                        <DictSound>{item.dict.sound.join(", ")}</DictSound>
                        <DictCount>({item.count}번)</DictCount>
                      </div>
                    </>
                  );
                })}
              </div>
            </DictViewAccordion>
          </p>
          <p>
            {/* <details>
              <DictSummary>
                <DictImage src={leftChevron} style={{ transform: "rotate(-90deg)" }} />
                <DictSubTitle>
                  맞춘 한자 <span>({Object.values(rightItems).length}개)</span>
                </DictSubTitle>
              </DictSummary> */}
            <DictViewAccordion
              contents={Object.values(rightItems)}
              open={isRightOpen}
              onClick={() => {
                setIsRightOpen((cur) => !cur);
              }}
              groupTitle={
                <>
                  <DictSubTitle>
                    ⭕ 맞춘 한자 <span>({Object.values(rightItems).length}개)</span>
                  </DictSubTitle>
                </>
              }
            >
              <div>
                {Object.values(rightItems).map((item) => {
                  return (
                    <>
                      <DictHorizontal />
                      <div>
                        <DictForm>{item.dict.form.join("")}</DictForm>
                        <DictSound>{item.dict.sound.join(", ")}</DictSound>
                        <DictCount>({item.count}번)</DictCount>
                      </div>
                    </>
                  );
                })}
              </div>
            </DictViewAccordion>
          </p>
        </PlayAfterPanel>
      </AfterPanelBackground>
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
