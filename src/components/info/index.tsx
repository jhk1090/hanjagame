import styled from "styled-components";
import { Article, Button, Main, Paragraph, SubTitle, Title } from "..";
import { Link } from "react-router-dom";

export const InfoTitle = styled(Title)`
  display: flex;
  text-align: left;
  align-items: center;
  flex-direction: row;
  gap: 3rem;
  font-size: 10rem;
  margin: 0;

  span:nth-child(1) {
    font-size: 12.5rem;
  }
`

export const InfoImage = styled.img`
  width: 6rem;
`

export const InfoSubTitle = styled(SubTitle)`
  font-size: 6rem;
  margin: 0;
  margin-top: .5rem;
  margin-bottom: .5rem;

  span {
    font-size: 4.5rem;
  }
`

export const InfoMain = styled(Main)`
  width: 100%;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 1rem;
  padding-top: 5rem;
  padding-bottom: 5rem;
`

export const InfoArticle = styled(Article)`
  margin: 0;
  margin-top: 3.5rem;
  gap: 2rem;
`

export const InfoLink = styled(Link)`
  all: unset;
`

export const InfoButton = styled(Button)`
  
`;

export const InfoParagraph = styled(Paragraph)`
  margin: 0;
  margin-top: .25rem;
  margin-bottom: .25rem;
  font-size: 4rem;
`

export const InfoLi = styled.li`
  font-size: 4rem;
`