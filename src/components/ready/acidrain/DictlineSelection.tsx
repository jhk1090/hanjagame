import styled from "styled-components";
import { ReadySubTitle } from "..";

export const ReadyDictlineSelectionSubTitle = styled(ReadySubTitle)`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  max-width: 100%;
  flex-wrap: wrap;
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
  margin-bottom: 2rem;
  font-size: 4.5rem;
  background-color: #d83d3d90;
  padding: 2rem;
  border-radius: 1rem;
  font-weight: 800;
`