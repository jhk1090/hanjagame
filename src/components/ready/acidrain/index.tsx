import styled from "styled-components";

export const ReadyCheckboxInput = styled.input`
  transform: scale(2.3);
`

export const ReadyBottomBox = styled.div`
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