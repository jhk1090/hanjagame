import styled from "styled-components";
import { Article, Button, Main, Paragraph, SubTitle, Title } from "..";
import { Link } from "react-router-dom";

export const ReadyTitle = styled(Title)`
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

export const ReadyImage = styled.img`
  width: 6rem;
`

export const ReadySubTitle = styled(SubTitle)`
  font-size: 6rem;
  margin: 0;
  margin-top: .5rem;
  margin-bottom: .5rem;

  span {
    font-size: 4.5rem;
  }
`

export const ReadyMain = styled(Main)`
  width: 100%;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 1rem;
  padding-top: 5rem;
  padding-bottom: 5rem;
`

export const ReadyArticle = styled(Article)`
  margin: 0;
  margin-top: 3.5rem;
  gap: 2rem;
`

export const ReadyLink = styled(Link)`
  all: unset;
`

export const ReadyButton = styled(Button)`
  
`;

export const ReadyParagraph = styled(Paragraph)`
  margin: 0;
  margin-top: .25rem;
  margin-bottom: .25rem;
  font-size: 4rem;
`

export const ReadyDescription = styled.span`
  font-size: 4rem;
  margin-bottom: 2rem;
`