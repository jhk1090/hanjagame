import { styled } from "styled-components";
import { Helmet } from "react-helmet";

export const PageTitle = ({ title }: { title: string; }) => {
    return <Helmet><title>{title}</title></Helmet>
}

export const Title = styled.h1`
  font-size: 10rem;
  width: 100%;
  display: block;
  text-align: center;
`;

export const Main = styled.main`
  max-width: 768px;
  max-height: 100%;
  padding: 2rem;
  overflow-wrap: break-word;
  word-break: keep-all;
  display: flex;
  flex-direction: column;
`;

export const Article = styled.article`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const ButtonLabel = styled.span`
  font-weight: 800;
  font-family: "hanyang";
  font-size: 10rem;
`;

export const Button = styled.button`
  all: unset;
  display: flex;
  flex-direction: row;
  padding: 1rem;
  gap: 1rem;
  font-size: 7rem;
  align-items: center;
  border: 1px solid #ccc;
`;

export const SubTitle = styled.h2`
  font-size: 5rem;
  margin: 0.15rem;
`;

export const Paragraph = styled.p`
  font-size: 3rem;
`;