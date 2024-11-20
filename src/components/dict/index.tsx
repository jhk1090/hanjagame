import styled from "styled-components";
import { Article, Button, Main, Paragraph, SubTitle, Title } from "..";
import { Link } from "react-router-dom";

export const DictTitle = styled(Title)`
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

export const DictImage = styled.img`
  width: 6rem;
`

export const DictSubTitle = styled(SubTitle)`
  font-size: 6rem;
  margin: 0;
  margin-top: .5rem;
  margin-bottom: .5rem;

  span {
    font-size: 4.5rem;
  }
`

export const DictMain = styled(Main)`
  width: 100%;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 1rem;
  padding-top: 5rem;
  padding-bottom: 5rem;
`

export const DictArticle = styled(Article)`
  margin: 0;
  margin-top: 3.5rem;
  gap: 2rem;
`

export const DictLink = styled(Link)`
  all: unset;
`

export const DictButton = styled(Button)`
  
`;

export const DictToViewBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 2rem;
  border-radius: 1rem;
  flex-wrap: wrap;
`

export const DictToView = styled(Button)`
  display: block;
  padding: 2rem;
  font-size: 5rem;
  font-weight: 800;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
  border: 1px solid rgba(255, 255, 255, 0.4);
  background-color: rgba(255, 255, 255, 0.4);
`;

export const DictParagraph = styled(Paragraph)`
  margin: 0;
  margin-top: .25rem;
  margin-bottom: .25rem;
  font-size: 4rem;
`