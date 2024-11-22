import styled from "styled-components";
import { Main, SubTitle, Title } from "..";
import { DictImage } from "../dict";
import { DictSound } from "../dict/view";
import { ReadyButton } from "../ready";

export const Input = styled.input`
  all: unset;
  background-color: #ffffff99;
  backdrop-filter: blur(2px);
  border: 1px solid #00000030;
  height: 8rem;
  width: 60rem;
  font-size: 5rem;
  border-radius: 2rem;
  text-align: center;
`

export const InputGuide = styled.div`
  padding: .5rem;
  position: absolute;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  top: 1.5rem;
  left: -2rem;

  span {
    font-size: 3.5rem;
  }
`

export const Label = styled.span`
  font-size: 4rem !important;
`

export const PlayMain = styled(Main)`
  position: relative;
  overflow: visible;
  height: 100%;
  justify-content: center;

  @media only screen and (max-width: 768px) {
    width: 100%;
    align-items: center;
  }

  @media only screen and (min-width: 769px) {
    width: 600px;
  }
`

export const PlayInputFieldBlock = styled.div`
  position: absolute;
  bottom: 0;
  height: fit-content;
  z-index: 1001;
  display: flex;
  justify-content: center;

  @media only screen and (max-width: 768px) {
    width: 100%;
  }

  @media only screen and (min-width: 769px) {
    width: 600px;
  }
`

export const PlayStatBlock = styled.div`
  background-color: #ffffff40;
  border-radius: 2rem;
  padding: 2rem;
  position: absolute;
  top: 50%;
  width: fit-content;
  height: fit-content;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  left: -45rem;
  transform: translateY(-50%);
`

export const PlayStatBlockSmallLeft = styled.div`
  border-radius: 2rem;
  padding: 2rem;
  position: absolute;
  width: fit-content;
  height: fit-content;
  z-index: 1001;
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 0;
  left: -20px;
`

export const PlayStatBlockSmall = styled.div`
  background-color: #ffffff40;
  border-radius: 2rem;
  padding: 1rem;
  position: absolute;
  width: fit-content;
  height: fit-content;
  z-index: 1001;
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 0;
  right: -20px;
  align-items: center;
  font-size: 5.5rem;
  font-weight: 800;
  vertical-align: middle;
`

export const PlayStatBlockCenter = styled(PlayStatBlockSmall)`
  width: max-content;
  right: 50%;
  transform: translateX(50%);
`

export const PlayImage = styled(DictImage)`
  width: 5rem;
  transform: scaleX(-1);
`

export const PlayAfterPanel = styled.div`
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  background-color: rgba(248, 185, 126, 0.9);
  border-radius: 2rem;
  max-height: 100dvh;
  overflow: scroll;
  overflow-x: auto;
  overflow-y: auto;
  padding: 2rem;
  z-index: 1003;

  @media only screen and (max-width: 768px) {
    width: 100%;
  }

  @media only screen and (min-width: 769px) {
    width: 600px;
  }
`;

export const PlayAfterTitle = styled(Title)`
  font-size: 12rem;
  font-weight: 800;
`

export const PlayAfterSubTitle = styled(SubTitle)`
  font-size: 7rem;
`

export const PlayAfterSummary = styled.summary`
  font-size: 5rem;
`

export const DictCount = styled(DictSound)`
  font-size: 3.5rem;
  font-style: italic;
`

export const PlayAfterButton = styled(ReadyButton)`
  background-color: #ffffff40;
  padding: 2rem 5rem 2rem 5rem;
`

export const PlayAfterButtonSet = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`

export const PlayHeightWarning = styled.div`
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  background-color: #000000aa;
  border-radius: 2rem;
  padding: 7rem 2rem 7rem 2rem;
  z-index: 7000;
  color: #fffffff0;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  backdrop-filter: blur(1px);

  @media only screen and (max-width: 768px) {
    width: 100%;
  }

  @media only screen and (min-width: 769px) {
    width: 700px;
  }

  h1 {
    all: unset;
    font-weight: 800;
    font-size: 10rem;
  }

  h2 {
    all: unset;
    display: block;
    font-weight: 800;
    font-size: 7rem;
  }

  span {
    font-size: 4rem;
  }

  div {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }
`;