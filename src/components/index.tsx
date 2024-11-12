import { styled } from "styled-components";
import { Helmet } from "react-helmet";

export const PageTitle = ({ title }: { title: string; }) => {
    return <Helmet><title>{title}</title></Helmet>
}

export const Title = styled.h1`
  font-size: 12.5rem;
  width: 100%;
  display: block;
  text-align: center;
`;

export const Main = styled.main`
  max-width: 768px;
  max-height: 100lvh;
  padding: 2rem;
  overflow-wrap: break-word;
  word-break: keep-all;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  overflow: scroll;
  overflow-x: auto;
  overflow-y: auto;
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
  cursor: pointer;
  display: flex;
  flex-direction: row;
  padding: 1rem;
  gap: 1rem;
  font-size: 3rem;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 2rem;
  font-size: 5rem;
  font-weight: 400;

  &:hover {
    font-weight: 800;
    animation: 0.2s cubic-bezier(0.47, 0, 0.745, 0.715) hover;
    animation-fill-mode: both;

    span {
      transform: rotate(-10deg);
    }
  }

  @keyframes hover {
    0% {
      box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.75);
      border: 1px solid transparent;
    }
    100% {
      box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.75);
      border: 1px solid rgba(0, 0, 0, 0.2);
    }
  }
  
`;

export const SubTitle = styled.h2`
  font-size: 5rem;
  margin: 0.15rem;
`;

export const Paragraph = styled.p`
  font-size: 3rem;
`;