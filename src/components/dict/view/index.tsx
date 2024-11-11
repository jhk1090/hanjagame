import React from "react";
import { styled } from "styled-components";
import { DictButton, DictImage } from "..";
import { leftChevron } from "../../../constant/IMAGE_PATH";
import { IData } from "../../../database/busu";

export const Dict = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 0 1rem 0;

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
  }
`;

export const DictForm = styled.span`
  font-size: 8rem;
  font-family: "hanyang";
  font-weight: 800;
`;

export const DictSound = styled.span`
  font-size: 4rem;
`;

export const DictDefine = styled.span`
  font-size: 3rem;
  color: #00000095;
`;

export const DictDescription = styled.span`
  font-size: 4rem;
  margin-bottom: 2rem;
`
export const DictSummary = styled.summary`
  border: 1px solid rgba(255, 255, 255, 0.2);
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  padding: 1rem;

  &::marker {
    font-size: 0;
  }
`

export const DictHorizontal = styled.hr`
  all: unset;
  display: block;
  width: 100%;
  border: .5px solid #00000040;
`

export const DictViewGroupBox = styled.div`
  all: unset;
  display: flex;
  flex-direction: column;
  background-color: #ffffff30;
  padding: 1.5rem;
  gap: 1rem;
`

export const DictViewGroupBoxTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const DictViewGroupBoxTitle = styled.h2`
  margin: 1rem 0 1rem 0;
  font-size: 4.5rem;
`

const StyledAccordion = styled.div<{ $length: number; }>`
  all: unset;
  border: 3px solid #ffffff50;
  border-radius: 1rem;
  background-color: #ffffff30;
  display: flex;
  flex-direction: column;

  .summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .content-wrapper {
    overflow: hidden;
  }
  
  .content {
    padding: 1.5rem;
    transition: 0.3s ease;
    margin-top: -${(props) => props.$length * 200}px;
    opacity: 0;
  }

  .open + .content-wrapper > .content {
    margin-top: 0px;
    opacity: 1;
  }

  .arrow {
    transition: transform 0.3s;
    transform: rotate(270deg);
  }

  .open .arrow {
    transform: rotate(90deg);
  }
`;

export const DictViewAccordion = (props: { groupTitle: JSX.Element, contents: any; open: boolean; onClick: () => void, children: JSX.Element }) => {
  const contentRef = React.useRef<HTMLDivElement>(null);
  return (
    <>
      <StyledAccordion $length={props.contents.length}>
        <DictViewGroupBox onClick={props.onClick} className={props.open ? "open" : ""}>
          <DictViewGroupBoxTop>
            <div style={{display: "flex", flexDirection: "row", gap: "4rem"}}>
              <DictImage className="arrow" src={leftChevron} />
              <DictViewGroupBoxTitle>{props.groupTitle}</DictViewGroupBoxTitle>
            </div>
          </DictViewGroupBoxTop>
        </DictViewGroupBox>
        <div className={"content-wrapper"}>
          <div className={"content"} ref={contentRef}>
            {props.children}
          </div>
        </div>
      </StyledAccordion>
    </>
  );
}

export const DictPanelBackgroundBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1001;
  backdrop-filter: blur(1px);
  background-color: #00000010;
`

export const DictPanel = styled.div`
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  border: 3px solid rgba(255, 189, 66, 0.9);
  background-color: rgba(255, 213, 124, 0.9);
  border-radius: 2rem;
  padding: 3rem;
  width: 600px;

  h2 {
    font-size: 7rem;
  }

  div:nth-child(1) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  div:nth-child(2) {
    margin-top: 4rem;
    margin-bottom: 4rem;
    font-size: 4rem;
  }
`

export const DictShareInput = styled.input`
  all: unset;
  border: 1px solid rgba(255, 255, 255, 0.6);
  background-color: rgba(255, 255, 255, 0.6);
  width: 100%;
  height: 5rem;
  font-size: 3rem;
  padding: .5rem;
  border-radius: 1rem;
`

export const DictPanelButton = styled(DictButton)`
  border-radius: 1rem;
  font-size: 4rem;
`
