import styled from "styled-components";
import { Title } from "../..";

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
  font-size: 3rem;
  color: #ff4747;
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
  flex-direction: row;
  align-items: center;
  gap: 2rem;
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