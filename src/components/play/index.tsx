import styled from "styled-components";
import { Main, SubTitle, Title } from "..";
import { DictImage } from "../dict";
import { DictSound } from "../dict/view";
import { ReadyButton } from "../ready";

export const Input = styled.input`
  all: unset;
  background-color: #ffffff95;
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
  min-width: 600px;
  min-height: 700px;
  overflow: visible;
`

export const PlayInputFieldBlock = styled.div`
  position: absolute;
  bottom: 0;
  width: 600px;
  height: fit-content;
  z-index: 1001;
  display: flex;
  justify-content: center;
`

export const PlayStatBlock = styled.div`
  background-color: #ffffff40;
  border-radius: 2rem;
  padding: 2rem;
  position: absolute;
  bottom: 40rem;
  width: fit-content;
  height: fit-content;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  left: -45rem;
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
  width: 600px;
  max-height: 100vh;
  overflow: scroll;
  overflow-x: auto;
  overflow-y: auto;
  padding: 2rem;
  z-index: 1003;
`

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