import { styled } from "styled-components";

export const Dict = styled.div`
  display: flex;
  flex-direction: column;

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
`;