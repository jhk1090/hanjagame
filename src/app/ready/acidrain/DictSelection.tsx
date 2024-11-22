import React from "react";
import { PageTitle, StepperBody, StepperBox, StepperIndicator, StepperJoint, StepperLocation, StepperMiddle } from "../../../components";
import { useNavigate } from "react-router-dom";
import { IDict } from "../../../database/busu";
import { ReadyArticle, ReadyButton, ReadyDescription, ReadyImage, ReadyLink, ReadyMain, ReadySubTitle, ReadyTitle } from "../../../components/ready";
import { leftChevron, plusIcon, startIcon } from "../../../constant/IMAGE_PATH";
import { DictToView, DictToViewBox } from "../../../components/dict";
import { ReadyAcidrainContext } from ".";
import styled from "styled-components";

export const DictSelectionPage = () => {
  const { setDict, setTab } = React.useContext(ReadyAcidrainContext);
  const navigate = useNavigate();
  const dictCommon: Record<string, IDict> = { ...JSON.parse(localStorage.getItem("dict-common") ?? "{}") };
  const dictCustom: Record<string, IDict> = { ...JSON.parse(localStorage.getItem("dict-custom") ?? "{}") };
  return (
    <>
      <PageTitle title="사전 선택 | 산성비 게임 | 한자 마당" />
      <ReadyMain>
        <StepperBox key={"stepper"}>
          <StepperMiddle>
            <StepperJoint $type="visitable" />
            <StepperJoint $type="unreachable" />
          </StepperMiddle>
          <StepperBody>
            <StepperLocation>
              <StepperIndicator $type="visited">1</StepperIndicator>
              사전 선택
            </StepperLocation>
            <StepperLocation>
              <StepperIndicator $type="visitable">2</StepperIndicator>
              한자 추가 또는 삭제
            </StepperLocation>
            <StepperLocation>
              <StepperIndicator $type="unreachable">3</StepperIndicator>
              게임 설정하기
            </StepperLocation>
          </StepperBody>
        </StepperBox>
        <ReadyTitle>
          <span>樂</span>사전 선택
        </ReadyTitle>
        <ReadyDescription>게임에서 사용될 사전을 선택하세요. 사전을 선택하면 그 사전 내에 있는 한자가 떨어지게 됩니다.</ReadyDescription>
        <ReadyButton
          style={{ width: "max-content", backgroundColor: "#ffffff70" }}
          onClick={() => {
            navigate("/");
          }}
        >
          <ReadyImage src={leftChevron} />
          이전으로 (홈)
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
                <ReadyLink to={"/dict"}>
                  <ReadyButton style={{ backgroundColor: "#5cd83d80" }}>
                    <ReadyImage src={startIcon} />
                    사전 페이지로 이동
                  </ReadyButton>
                </ReadyLink>
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
