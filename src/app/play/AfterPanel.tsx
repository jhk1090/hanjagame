import { useNavigate } from "react-router-dom";
import { DictImage, DictSubTitle } from "../../components/dict";
import { DictForm, DictHorizontal, DictSound, DictSummary, DictViewAccordion } from "../../components/dict/view";
import { DictCount, PlayAfterButton, PlayAfterButtonSet, PlayAfterPanel, PlayAfterSubTitle, PlayAfterTitle, PlayImage } from "../../components/play";
import { homeIcon, leftChevron, refreshIcon } from "../../constant/IMAGE_PATH";
import { IData } from "../../database/busu";
import styled from "styled-components";
import React from "react";

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
  difficulty,
  limit,
  count,
  rightItems,
  isSound,
  wrongItems,
}: {
  property: IData[];
  difficulty: number;
  limit: number;
  count: number;
  isSound: boolean;
  rightItems: Record<string, { dict: IData; count: number }>;
  wrongItems: Record<string, { dict: IData; count: number }>;
}) => {
  const navigate = useNavigate();
  const [isRightOpen, setIsRightOpen] = React.useState(false);
  const [isWrongOpen, setIsWrongOpen] = React.useState(false);

  return (
    <>
      <AfterPanelBackground>
        <PlayAfterPanel>
          <PlayAfterTitle>게임 오버!</PlayAfterTitle>
          <PlayAfterButtonSet>
            <PlayAfterButton
              onClick={() => {
                localStorage.setItem("dict-play", JSON.stringify({ key: property, difficulty: difficulty, limit: limit, isSound }));
                navigate(`/play/acidrain`);
                location.reload();
              }}
            >
              <PlayImage src={refreshIcon} />{" "}
              다시 하기
            </PlayAfterButton>
            <PlayAfterButton onClick={() => navigate("/")}><PlayImage src={homeIcon} />{" "}홈으로</PlayAfterButton>
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
    </>
  );
};
