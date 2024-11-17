import styled from "styled-components";
import { Title } from "../..";
import { DictButton, DictImage } from "..";
import React from "react";
import { leftChevron } from "../../../constant/IMAGE_PATH";

export const DictNewInput = styled.input`
  all: unset;
  border: 1px solid #ffffff70;
  background-color: #ffffff30;
  font-size: 3.5rem;
  border-radius: 1rem;
  padding: .75rem;
`

export const DictNewFieldset = styled.fieldset`
  border: 3px solid #40404090;
  border-radius: 1rem;
  padding: .5rem;
`

export const DictNewLegend = styled.legend`
  font-size: 4rem;
  font-weight: 800;
`

export const DictNewLabel = styled.label`
  font-size: 3.5rem;
`

export const DictNewHanjaSpan = styled.span`
  font-size: 4.5rem;
  font-weight: 800;
  font-family: "hanyang";
`

export const DictNewError = styled.span`
  all: unset;
  font-size: 3rem;
  color: #ff4747;
`;

export const DictNewGroupBox = styled.div`
  all: unset;
  display: flex;
  flex-direction: column;
  background-color: #ffffff30;
  padding: 1.5rem;
  gap: 1rem;
`

export const DictNewGroupBoxTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const DictNewGroupBoxMain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`

export const DictNewGroupBoxTitle = styled.h2`
  margin: 1rem 0 1rem 0;
  font-size: 4.5rem;
`

export const DictNewHanjaBox = styled.div`
  all: unset;
  border: 3px solid #00000070;
  border-radius: 1rem;
  background-color: #ffffff30;
  display: flex;
  flex-direction: row;
  gap: 1rem;
`

export const DictNewHanjaBoxMain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
`

export const DictNewHanjaBoxMainUpper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`

export const DictNewHanjaBoxSidebar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`

export const DictNewCMInput = styled(DictNewInput)`
  font-size: 4.5rem;
  padding: 1rem;
`

export const DictNewCMLabel = styled(DictNewLabel)`
  font-size: 4.5rem;
`

export const DictNewCMHanjaSpan = styled(DictNewHanjaSpan)`
  font-size: 5.5rem;
`

export const DictNewCMError = styled(DictNewError)`
  font-size: 4rem;
`

export const DictNewCMSelect = styled.select`
  /* all: unset; */
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 2rem;
  font-size: 4.5rem;
  padding: 1rem;
`

export const DictNewSector = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const DictNewTitle = styled(Title)`
  display: flex;
  text-align: left;
  align-items: center;
  flex-direction: row;
  gap: 3rem;
  font-size: 8rem;
  margin: 0;

  span:nth-child(1) {
    font-size: 10rem;
  }

  i {
    font-weight: 400;
    font-size: 6rem;
  }
`

export const DictALButton = styled(DictButton)`
  font-size: 4rem;
`;

export const DictALImage = styled(DictImage)`
  width: 5rem;
`

export const DictBottomBox = styled.div`
  position: fixed;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  flex-wrap: wrap;
  bottom: 0;
  max-width: 700px;
  margin-left: 2rem;
  margin-right: 2rem;
  padding: 2rem;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
  background-color: #ffffff90;
  border: 1px solid #ffffff70;
  backdrop-filter: blur(2px);
  z-index: 2000;
`

const StyledAccordion = styled.div<{ $length: number; }>`
  all: unset;
  border: 3px solid #00000070;
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
    margin-top: 20px;
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

export const Accordion = (props: { top: JSX.Element; title?: string; datalines: string[]; open: boolean; onClick: () => void, children: JSX.Element }) => {
  const contentRef = React.useRef<HTMLDivElement>(null);
  return (
    <>
      <StyledAccordion $length={props.datalines.length}>
        <DictNewGroupBox onClick={props.onClick} className={props.open ? "open" : ""}>
          <DictNewGroupBoxTop>
            <div style={{ display: "flex", flexDirection: "row", gap: "4rem" }}>
              <DictImage className="arrow" src={leftChevron} />
              <DictNewGroupBoxTitle>{props.title ? (props.title.length === 0 ? "그룹" : props.title) : "그룹"}</DictNewGroupBoxTitle>
            </div>
            <div className="summary">{props.top}</div>
          </DictNewGroupBoxTop>
        </DictNewGroupBox>
        <div className={"content-wrapper"}>
          <div className={"content"} ref={contentRef}>
            {props.children}
          </div>
        </div>
      </StyledAccordion>
    </>
  );
}