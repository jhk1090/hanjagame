import { useRef } from "react";
import { Input, InputGuide, Label, PlayImage, PlayInputFieldBlock, PlayMain, PlayStatBlock } from "../../../components/play";
import { Stage, Text } from "@pixi/react";
import React from "react";
import { IData } from "../../../database/busu";
import { v4 } from "uuid";
import { TextStyle } from "pixi.js";
import { ReadyButton, ReadyLink } from "../../../components/ready";
import { Button, SubTitle } from "../../../components";
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
  const { setColorPair } = React.useContext(IndexContext);
  const navigate = useNavigate();

  const [stageKey, setStageKey] = React.useState<IData[]>([]);
  const [stageDifficulty, setStageDifficulty] = React.useState<number>(0);
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

  const generateHanja = () => {
    const data = stageKey[getRandomInt(0, stageKey.length - 1)];
    const text = data.form[getRandomInt(0, data.form.length - 1)];
    const newHanja = {
      id: v4(),
      text,
      data,
      x: getRandomArbitrary(0, 600 - text.length * 50),
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
      const filtered = reflected.filter((hanja) => hanja.y < 550);
      setAfterStatWrong((prev) => [...prev, ...reflected.filter((v) => !filtered.map((v) => v.id).includes(v.id)).map((v) => v.data)]);
      return filtered;
    });
  };

  React.useEffect(() => {
    const dictPlay = localStorage.getItem("dict-play");
    if (dictPlay !== null) {
      setStageKey(JSON.parse(dictPlay).key);
      setStageDifficulty(JSON.parse(dictPlay).difficulty);
      setIsInit(true);
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
    setStageBackgroundAlpha(
      afterStatWrong.length === 0
        ? 0.3
        : afterStatWrong.length === 1
        ? 0.4
        : afterStatWrong.length === 2
        ? 0.5
        : afterStatWrong.length === 3
        ? 0.6
        : afterStatWrong.length === 4
        ? 0.7
        : afterStatWrong.length === 5
        ? 0.8
        : 0.9
    );
  }, [afterStatWrong]);

  React.useEffect(() => {
    //@ts-ignore
    window.app = stageRef.current;
    //@ts-ignore
    stageRef.current.app.renderer.backgroundAlpha = stageBackgroundAlpha;
  }, [stageBackgroundAlpha]);

  React.useEffect(() => {
    if (afterStatWrong.length === 5) {
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
          <AfterPanel property={stageKey} difficulty={stageDifficulty} count={count} wrongItems={wrongItems} rightItems={rightItems} />
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
                  if (sound.split(" ").length > 1) {
                    allowedAnswer.push(sound.split(" ").at(-1) as string);
                  }
                });
                if (hanja.y < 550 && allowedAnswer.includes(data.answer?.trim() ?? "")) {
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
            <Input type="text" autoComplete="off" {...register("answer")} />
            <InputGuide>
              <PlayImage src={enterIcon} />
              <Label>입력</Label>
            </InputGuide>
            <Button type="submit" />
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
          x={300}
          y={300}
          anchor={0.5}
          style={new TextStyle({ align: "center", fontSize: "100px", fill: "#000000", fontFamily: "hanyang", fontWeight: "800" })}
        />
      );
    } else if (150 <= count && count <= 249) {
      setTimerElement(
        <Text
          text={"二"}
          x={300}
          y={300}
          anchor={0.5}
          style={new TextStyle({ align: "center", fontSize: "100px", fill: "#000000", fontFamily: "hanyang", fontWeight: "800" })}
        />
      );
    } else if (250 <= count && count <= 349) {
      setTimerElement(
        <Text
          text={"一"}
          x={300}
          y={300}
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
      <PlayMain>
        <Stage
          ref={stageRef}
          style={{ zIndex: 1001, borderRadius: "2rem" }}
          width={600}
          height={600}
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
        <StatPanel count={count} afterStatWrong={afterStatWrong} stageDifficulty={stageDifficulty} />
        {afterPanel}
        {inputElement}
      </PlayMain>
    </>
  );
};
