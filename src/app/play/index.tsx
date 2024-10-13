import { Sprite, Stage, useTick, Text } from "@pixi/react";
import { debug } from "console";
import { TextStyle } from "pixi.js";
import React, { JSX } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { IData } from "../../database/busu";
import { Input, InputGuide, Label, PlayImage, PlayInputFieldBlock, PlayMain, PlayStatBlock } from "../../components/play";
import { useForm } from "react-hook-form";
import { Button, Main, SubTitle } from "../../components";
import { DictImage } from "../../components/dict";
import { enterIcon } from "../../constant/IMAGE_PATH";
import { IndexContext } from "..";

function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const PlayPage = () => {
  const [hanjas, setHanjas] = React.useState<{ [k: string]: { config: IData; element: JSX.Element } }>({});
  const [searchParams, setSearchParams] = useSearchParams();
  const [property, _] = React.useState<IData[]>(JSON.parse(searchParams.get("key") ?? "[]") as IData[]);
  const { setColorPair } = React.useContext(IndexContext);

  const { handleSubmit, register, resetField } = useForm<{ answer: string; }>();
  const [count, setCount] = React.useState(0);
  const [wrongCount, setWrongCount] = React.useState(0);
  const [statElement, setStatElement] = React.useState<JSX.Element>(<></>);
  const [inputElement, setInputElement] = React.useState<JSX.Element>(<></>);
  const [isInit, setIsInit] = React.useState(false);
  const [isCounterInit, setIsCounterInit] = React.useState<string>("3");
  const [timeText, setTimeText] = React.useState(<></>);

  const Hanja = ({ text, uuid }: { text: string; uuid: string }) => {
    const [hanjaTick, setHanjaTick] = React.useState(0);
    const [y, setY] = React.useState(0);
    const [x, setX] = React.useState(getRandomArbitrary(0, 600 - text.length * 50));

    useTick((delta) => {
      setHanjaTick((cur) => (cur += 0.01 * delta));
    });

    React.useEffect(() => {
      setY(hanjaTick * 100);
      if (hanjaTick * 100 > 750) {
        setWrongCount(cur => cur + 1);
        setHanjas((cur) => {
          const replaced = { ...cur };
          delete replaced[uuid];
          return replaced;
        });
      }
    }, [hanjaTick]);

    return (
      <>
        <Text
          text={text}
          x={x}
          y={y}
          style={new TextStyle({ align: "center", fontSize: "50px", fill: "#000", stroke: "#fff", strokeThickness: 2, fontFamily: "hanyang" })}
        />
      </>
    );
  };

  const Counter = ({ hanja, text }: { hanja: string; text: string }) => {
    return <>
      <Text text={hanja} x={200} y={400} rotation={getRandomArbitrary(-0.5, 0.5)} anchor={0.5} style={new TextStyle({ align: "center", fontSize: "80px", fill: "#000000", fontFamily: "hanyang" })} />
      <Text text={text} x={300} y={400} anchor={0.5} style={new TextStyle({ align: "center", fontSize: "100px", fill: "#000000", fontFamily: "jamsil", fontWeight: "800" })} />
    </>
  }

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCount(count + 1);
    }, 10);

    return () => clearInterval(timer);
  });

  React.useEffect(() => {
    setStatElement(
      <>
        <PlayStatBlock>
        <p>
          <SubTitle>틀린 개수: {wrongCount}/3</SubTitle>
        </p>
        <p>
          <SubTitle>{((count - 200) / 100 < 0) ? "0초" : ((count - 200) / 100) + "초"}</SubTitle>
        </p>
        </PlayStatBlock>
      </>
    );
  }, [wrongCount, count]);

  React.useEffect(() => {
    if (!isInit) {
      if (count % 60 !== 0) {
        return;
      } else if (count % 60 === 0) {
        if (isCounterInit === "3") {
          setTimeText(<Counter hanja={"三"} text={"3"} />);
          setIsCounterInit("2");
          return;
        } else if (isCounterInit === "2") {
          setTimeText(<Counter hanja={"二"} text={"2"} />);
          setIsCounterInit("1");
          return;
        } else if (isCounterInit === "1") {
          setTimeText(<Counter hanja={"一"} text={"1"} />);
          setIsCounterInit("0");
          return;
        } else {
          setTimeText(<></>);
          setIsInit(true);
        }
      }
    } else {
      if (count % 60 !== 0) {
        return;
      }
    }

    const result = property[getRandomInt(0, property.length - 1)];
    const uuid = crypto.randomUUID();
    setHanjas((cur) => {
      return {
        ...cur,
        [uuid]: { config: result, element: <Hanja key={uuid} text={result.form[getRandomInt(0, result.form.length - 1)]} uuid={uuid} /> }
      };
    });
    setIsInit(true);
  }, [count])
  React.useEffect(() => {
    setInputElement(<>
        <PlayInputFieldBlock>
        <form
          onSubmit={handleSubmit(async (data) => {
            let result: string | null = null;
            for await (const [key, value] of Object.entries(hanjas).toReversed()) {
              if (value.config.sound.includes(data.answer?.trim() ?? "")) {
                result = key;
              }
            }
            if (result !== null) {
              setHanjas((cur) => {
                const replaced = { ...cur };
                delete replaced[result];
                return replaced;
              });
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
    </>)
  }, [hanjas])

  React.useEffect(() => {
    searchParams.delete("key")
    setSearchParams(searchParams)
    setColorPair(["#d68c47", "#ffe7c4"])
  }, [])
  return (
    <>
      <PlayMain>
        <Stage style={{zIndex: 1001}} width={600} height={800} options={{ backgroundColor: "#dfba55", backgroundAlpha: 0.4, antialias: true }}>
          {Object.values(hanjas).map((v) => (v ? v.element : <></>))}
          {timeText}
        </Stage>
        {statElement}
        {inputElement}
      </PlayMain>
    </>
  );
};
