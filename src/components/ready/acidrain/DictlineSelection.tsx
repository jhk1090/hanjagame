import styled from "styled-components";
import { ReadySubTitle } from "..";

export const ReadyDictlineSelectionSubTitle = styled(ReadySubTitle)`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  max-width: 100%;
  flex-wrap: wrap;
  span:nth-child(1) {
    font-weight: 800;
    font-size: 8rem;
  }
  span:nth-child(2) {
    font-weight: 400;
    font-size: 7rem;
  }
`

export const ReadyDictlineSelectionButtonSet = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 100%;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
`

export const ReadyDictlineSelectionWarning = styled.span`
  display: block;
  margin-top: 2.5rem;
  margin-bottom: 2.5rem;
  font-size: 4.5rem;
  color: #ff4747;
  font-weight: 800;
`