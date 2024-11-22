import { css, styled } from "styled-components";
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
  max-height: 100dvh;
  padding: 2rem;
  overflow-wrap: break-word;
  word-break: keep-all;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  overflow: scroll;
  overflow-x: auto;
  overflow-y: auto;
  backdrop-filter: blur(2px);
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
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 2rem;
  font-size: 5rem;
  font-weight: 400;
  backdrop-filter: blur(2px);

  &:hover {
    font-weight: 800;
    animation: 0.05s cubic-bezier(0.47, 0, 0.745, 0.715) hover;
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
      box-shadow: 0px 0px 5px .5px rgba(0, 0, 0, 0.75);
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

export const ToastMessageBox = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 50%;
  transform: translateX(50%);
  font-size: 4.5rem;
  background-color: #00000090;
  border-radius: 1rem;
  padding: 1.5rem 3rem 1.5rem 3rem;
  color: #fff;
  word-break: keep-all;
  backdrop-filter: blur(2px);
  text-align: center;
  z-index: 4000;
  animation: 4s slideDown cubic-bezier(0.42, 0, 0.58, 1) forwards;

  @media only screen and (max-width: 768px) {
    width: 100%;
  }

  @media only screen and (min-width: 769px) {
    width: 600px;
  }

  @keyframes slideDown {
    0% {
      bottom: 2rem;
      opacity: 1;
    }
    50% {
      bottom: 2rem;
      opacity: 1;
    }
    100% {
      bottom: -50vh;
      opacity: 0;
    }
  }
`;

export const StepperJoint = styled.hr<IStepperIndicator>`
  all: unset;
  border-top: 3px solid ${(props) => props.$type === "visited" ? "#245aaa" : props.$type === "visitable" ? "#5182cc" : "#3f3f3f"};
  width: 50%;
`

export const StepperLocation = styled.div`
  position: relative;
  font-size: 4rem;
  width: 33.3%;
  text-align: center;
`

interface IStepperIndicator {
  $type: "visited" | "visitable" | "unreachable"
  $clickable?: boolean;
}

export const StepperIndicator = styled.div<IStepperIndicator>`
  position: absolute;
  width: 7rem;
  height: 7rem;
  border-radius: 30rem;
  background-color: ${(props) => (props.$type === "visited" ? "#245aaa" : props.$type === "visitable" ? "#5182cc" : "#3f3f3f")};
  top: -8rem;
  right: 50%;
  transform: translateX(50%);
  font-size: 3.5rem;
  color: #ffffffc1;
  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) =>
    props.$clickable
      ? css`
          &:hover {
            font-weight: 800;
            animation: 0.01s cubic-bezier(0.52, 0.55, 0.6, 0.95) stepperHover;
            animation-fill-mode: both;

            span {
              transform: rotate(-10deg);
            }
          }
        `
      : ""}

  @keyframes stepperHover {
    0% {
      box-shadow: 0px 0px 0px 0px #ffffff90;
    }
    100% {
      box-shadow: 0px 0px 3px 5px #ffffff90;
    }
  }
`;

export const StepperMiddle = styled.div`
  position: absolute;
  top: 3rem;
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding: 0rem 15%;
`

export const StepperBody = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  margin-top: 8rem;
`

export const StepperBox = styled.div`
  position: relative;
  margin: 1rem 0;
`