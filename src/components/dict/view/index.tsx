import { styled } from "styled-components";

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