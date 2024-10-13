import styled from "styled-components";
import { Main } from "..";
import { DictImage } from "../dict";

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
  min-height: 900px;
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
  left: -40rem;
`

export const PlayImage = styled(DictImage)`
  width: 5rem;
  transform: scaleX(-1);
`