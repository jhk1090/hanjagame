import { useRef } from "react";
import { Input, InputGuide, Label, PlayHeightWarning, PlayImage, PlayInputFieldBlock, PlayMain, PlayStatBlock } from "../../../components/play";
import { Stage, Text } from "@pixi/react";
import React from "react";
import { IData } from "../../../database/busu";
import { v4 } from "uuid";
import { TextStyle } from "pixi.js";
import { ReadyButton, ReadyLink } from "../../../components/ready";
import { Button, PageTitle, SubTitle } from "../../../components";
import { AfterPanel } from "../AfterPanel";
import { IndexContext } from "../..";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { enterIcon } from "../../../constant/IMAGE_PATH";
import { StatPanel } from "../StatPanel";

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export const PlayAcidrainPage = () => {
  const { setColorPair, setToastMessage } = React.useContext(IndexContext);
  const navigate = useNavigate();

  const [stageKey, setStageKey] = React.useState<IData[]>([]);
  const [stageDifficulty, setStageDifficulty] = React.useState<number>(0);
  const [stageLimit, setStageLimit] = React.useState(5);
  const [stageIsSound, setStageIsSound] = React.useState(true);
  const [isInit, setIsInit] = React.useState(false);
  const [isCountdownInit, setIsCountdownInit] = React.useState(false);
  const [isAfter, setIsAfter] = React.useState(false);
  const [hanjas, setHanjas] = React.useState<{ id: string; text: string; data: IData; x: number; y: number; speed: number }[]>([]);
  const [count, setCount] = React.useState(0);
  const [stageBackgroundAlpha, setStageBackgroundAlpha] = React.useState(0.3);

  const [afterStatWrong, setAfterStatWrong] = React.useState<IData[]>([]);
  const [afterStatRight, setAfterStatRight] = React.useState<IData[]>([]);

  const [afterPanel, setAfterPanel] = React.useState(<></>);
  const [inputElement, setInputElement] = React.useState(<></>);
  const [timerElement, setTimerElement] = React.useState(<></>);

  const [gameWidth, setGameWidth] = React.useState((window.innerWidth < 600 ? window.innerWidth - 50 : 600));
  const [gameHeight, setGameHeight] = React.useState(window.innerHeight > 650 ? (window.innerHeight > 1050 ? 1000 : window.innerHeight - 50) : 600);

  const updateDimension = () => {
    if (!/iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent)) {
      setToastMessage(["화면 크기를 조정해도 게임 크기는 바뀌지 않습니다!"])
    }
  }

  React.useEffect(() => {
    window.addEventListener("resize", updateDimension);

    return () => window.removeEventListener("resize", updateDimension) 
  }, [])

  const generateHanja = () => {
    const data = stageKey[getRandomInt(0, stageKey.length - 1)];
    const text = data.form[getRandomInt(0, data.form.length - 1)];
    const newHanja = {
      id: v4(),
      text,
      data,
      x: getRandomArbitrary(0, gameWidth - text.length * 50),
      y: 0,
      speed: 0.25,
    };
    setHanjas((prev) => [...prev, newHanja]);
  };

  const updateTimer = () => {
    setCount((cur) => { 
      if (!isCountdownInit && cur > 350) {
        setIsCountdownInit(true)
      }
      return cur + 1
    });
  };
  const updateHanjas = () => {
    setHanjas((prev) => {
      const reflected = prev.map((hanja) => ({ ...hanja, y: hanja.y + hanja.speed }));
      const filtered = reflected.filter((hanja) => hanja.y < gameHeight - 50);
      setAfterStatWrong((prev) => [...prev, ...reflected.filter((v) => !filtered.map((v) => v.id).includes(v.id)).map((v) => v.data)]);
      return filtered;
    });
  };

  React.useEffect(() => {
    const dictPlay = localStorage.getItem("dict-play");
    localStorage.setItem("dict-play-archive", dictPlay ?? "");
    if (dictPlay !== null) {
      setStageKey(JSON.parse(dictPlay).key);
      setStageDifficulty(JSON.parse(dictPlay).difficulty);
      setStageLimit(Number(JSON.parse(dictPlay).limit));
      setStageIsSound(JSON.parse(dictPlay).isSound);
      setIsInit(true);
    } else {
      navigate("/")
    }
  }, []);

  React.useEffect(() => {
    if (!isInit || isAfter) {
      return;
    }

    const timer = setInterval(updateTimer, 10);
    if (isCountdownInit) {
      const interval = setInterval(generateHanja, stageDifficulty * 1000);
      const animation = setInterval(updateHanjas, 4);

      return () => {
        clearInterval(timer);
        clearInterval(interval);
        clearInterval(animation);
      };
    }
    return () => clearInterval(timer);
  }, [isInit, isAfter, isCountdownInit]);

  React.useEffect(() => {
    if (afterStatWrong.length === 0) {
      setStageBackgroundAlpha(0.3)
    } else {
      setStageBackgroundAlpha(0.7 * (afterStatWrong.length / stageLimit) + 0.3)
      console.log(afterStatWrong.length, stageLimit, afterStatWrong.length / stageLimit)
    }
  }, [afterStatWrong, stageLimit]);

  React.useEffect(() => {
    //@ts-ignore
    window.app = stageRef.current;
    //@ts-ignore
    stageRef.current.app.renderer.backgroundAlpha = stageBackgroundAlpha;
  }, [stageBackgroundAlpha]);

  React.useEffect(() => {
    if (afterStatWrong.length === stageLimit) {
      const wrongItems: Record<string, { dict: IData; count: number }> = {};
      for (const item of afterStatWrong) {
        if (Object.keys(wrongItems).includes(item.key)) {
          wrongItems[item.key].count++;
        } else {
          wrongItems[item.key] = { dict: item, count: 1 };
        }
      }

      const rightItems: Record<string, { dict: IData; count: number }> = {};
      for (const item of afterStatRight) {
        if (Object.keys(rightItems).includes(item.key)) {
          rightItems[item.key].count++;
        } else {
          rightItems[item.key] = { dict: item, count: 1 };
        }
      }

      setIsAfter(true);
      setAfterPanel(
        <>
          <AfterPanel property={stageKey} difficulty={stageDifficulty} count={count} limit={stageLimit} wrongItems={wrongItems} isSound={stageIsSound} rightItems={rightItems} />
        </>
      );
    }
  }, [afterStatWrong, count]);

  const { handleSubmit, register, resetField, setValue } = useForm<{ answer: string }>();

  React.useEffect(() => {
    if (isAfter) {
      return;
    }

    setInputElement(
      <>
        <PlayInputFieldBlock>
          <form
            onSubmit={handleSubmit(async (data) => {
              let result: {
                id: string;
                text: string;
                data: IData;
                x: number;
                y: number;
                speed: number;
              } | null = null;
              for (const hanja of hanjas.toReversed()) {
                const allowedAnswer: string[] = [];
                hanja.data.sound.forEach((sound) => {
                  allowedAnswer.push(sound);
                  if (stageIsSound && sound.split(" ").length > 1) {
                    allowedAnswer.push(sound.split(" ").at(-1) as string);
                  }
                });
                if (hanja.y < gameHeight - 50 && allowedAnswer.includes(data.answer?.trim() ?? "")) {
                  result = hanja;
                }
              }
              if (result !== null) {
                setAfterStatRight((cur) => [...cur, result.data]);
                setHanjas((cur) => cur.filter((hanja) => hanja.id !== result.id));
              }
              resetField("answer");
            })}
          >
            <Input type="text" autoComplete="off" {...register("answer")} placeholder={"뜻 입력"} />
            <Button type="submit" style={{visibility: "hidden"}} />
          </form>
        </PlayInputFieldBlock>
      </>
    );
  }, [hanjas, isAfter]);

  React.useEffect(() => {
    if (!isInit) {
      return;
    }

    if (stageKey.length === 0) {
      navigate("/");
    }

    localStorage.removeItem("dict-play");
    setColorPair(["#d68c47", "#ffe7c4"]);
  }, [isInit]);

  React.useEffect(() => {
    if (50 <= count && count <= 149) {
      setTimerElement(
        <Text
          text={"三"}
          x={gameWidth / 2}
          y={gameHeight / 2}
          anchor={0.5}
          style={new TextStyle({ align: "center", fontSize: "100px", fill: "#000000", fontFamily: "hanyang", fontWeight: "800" })}
        />
      );
    } else if (150 <= count && count <= 249) {
      setTimerElement(
        <Text
          text={"二"}
          x={gameWidth / 2}
          y={gameHeight / 2}
          anchor={0.5}
          style={new TextStyle({ align: "center", fontSize: "100px", fill: "#000000", fontFamily: "hanyang", fontWeight: "800" })}
        />
      );
    } else if (250 <= count && count <= 349) {
      setTimerElement(
        <Text
          text={"一"}
          x={gameWidth / 2}
          y={gameHeight / 2}
          anchor={0.5}
          style={new TextStyle({ align: "center", fontSize: "100px", fill: "#000000", fontFamily: "hanyang", fontWeight: "800" })}
        />
      );
    } else {
      setTimerElement(<></>);
    }
  }, [count]);

  const stageRef = useRef<Stage>(null);
  return (
    <>
      <PageTitle title={`산성비 게임 | 한자 마당`} />
      <PlayMain>
        <Stage
          ref={stageRef}
          style={{ zIndex: 1001, borderRadius: "2rem" }}
          width={gameWidth}
          height={gameHeight}
          options={{ backgroundColor: "#df5555", backgroundAlpha: stageBackgroundAlpha, antialias: true }}
        >
          {hanjas.map((hanja) => (
            <Text
              key={hanja.id}
              text={hanja.text}
              x={hanja.x}
              y={hanja.y}
              style={new TextStyle({ align: "center", fontSize: "50px", fill: "#000", stroke: "#fff", strokeThickness: 2, fontFamily: "hanyang" })}
            />
          ))}
          {timerElement}
        </Stage>
        <StatPanel count={count} afterStatWrong={afterStatWrong} stageLimit={stageLimit} stageDifficulty={stageDifficulty} />
        {afterPanel}
        {inputElement}
      </PlayMain>
    </>
  );
};
