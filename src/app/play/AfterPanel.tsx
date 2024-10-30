import { useNavigate } from "react-router-dom";
import { DictImage, DictSubTitle } from "../../components/dict";
import { DictForm, DictHorizontal, DictSound, DictSummary } from "../../components/dict/view";
import { DictCount, PlayAfterButton, PlayAfterButtonSet, PlayAfterPanel, PlayAfterSubTitle, PlayAfterTitle } from "../../components/play";
import { leftChevron } from "../../constant/IMAGE_PATH";
import { IData } from "../../database/busu";

export const AfterPanel = ({ property, difficulty, count, rightItems, wrongItems }: { property: IData[], difficulty: number; count: number; rightItems: Record<string, { dict: IData; count: number; }>; wrongItems: Record<string, { dict: IData; count: number; }> }) => {
  const navigate = useNavigate();

  return (
    <>
      <PlayAfterPanel>
        <PlayAfterTitle>놀이 끝!</PlayAfterTitle>
        <PlayAfterButtonSet>
          <PlayAfterButton
            onClick={() => {
              localStorage.setItem("dict-play", JSON.stringify({ key: property, difficulty: difficulty }));
              navigate(`/play/acidrain`);
              location.reload();
            }}
          >
            다시 하기
          </PlayAfterButton>
          <PlayAfterButton onClick={() => navigate("/")}>홈으로</PlayAfterButton>
        </PlayAfterButtonSet>
        <PlayAfterSubTitle>⏱️ 시간: {(count - 200) / 100}초</PlayAfterSubTitle>
        <PlayAfterSubTitle>📊 통계</PlayAfterSubTitle>
        <p>
          <details>
            <DictSummary>
              <DictImage src={leftChevron} style={{ transform: "rotate(-90deg)" }} />
              <DictSubTitle>
                틀린 한자 <span>({Object.values(wrongItems).length}개)</span>
              </DictSubTitle>
            </DictSummary>
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
          </details>
        </p>
        <p>
          <details>
            <DictSummary>
              <DictImage src={leftChevron} style={{ transform: "rotate(-90deg)" }} />
              <DictSubTitle>
                맞춘 한자 <span>({Object.values(rightItems).length}개)</span>
              </DictSubTitle>
            </DictSummary>
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
          </details>
        </p>
      </PlayAfterPanel>
      ;
    </>
  );
}