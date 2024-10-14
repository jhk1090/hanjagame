import { Sprite, Stage, useTick, Text } from "@pixi/react";
import { debug } from "console";
import { TextStyle } from "pixi.js";
import React, { JSX } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { IData } from "../../database/busu";
import { DictCount, Input, InputGuide, Label, PlayAfterButton, PlayAfterButtonSet, PlayAfterPanel, PlayAfterSubTitle, PlayAfterSummary, PlayAfterTitle, PlayImage, PlayInputFieldBlock, PlayMain, PlayStatBlock } from "../../components/play";
import { useForm } from "react-hook-form";
import { Button, Main, SubTitle, Title } from "../../components";
import { DictImage } from "../../components/dict";
import { enterIcon } from "../../constant/IMAGE_PATH";
import { IndexContext } from "..";
import { DictForm, DictSound, DictSummary } from "../../components/dict/view";
import { ReadyButton, ReadyLink } from "../../components/ready";

function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const PlayPage = () => {
  const navigate = useNavigate();

  const [hanjas, setHanjas] = React.useState<{ [k: string]: IData & { y: number } }>({});
  const [hanjasElement, setHanjasElement] = React.useState<{ [k: string]: JSX.Element }>({});
  const [searchParams, setSearchParams] = useSearchParams();
  const [property, _] = React.useState<IData[]>(JSON.parse(searchParams.get("key") ?? "[]") as IData[]);
  const [difficulty, __] = React.useState<number>(JSON.parse(searchParams.get("difficulty") ?? "180") as number);
  const { setColorPair } = React.useContext(IndexContext);

  const { handleSubmit, register, resetField, setValue } = useForm<{ answer: string; }>();
  const [count, setCount] = React.useState(0);
  const [statElement, setStatElement] = React.useState<JSX.Element>(<></>);
  const [inputElement, setInputElement] = React.useState<JSX.Element>(<></>);
  const [isInit, setIsInit] = React.useState(false);
  const [isCounterInit, setIsCounterInit] = React.useState<string>("3");
  const [isAfter, setIsAfter] = React.useState(false);
  const [timeText, setTimeText] = React.useState(<></>);
  const [stageBackgroundAlpha, setStageBackgroundAlpha] = React.useState(0.4);

  const [afterStatWrong, setAfterStatWrong] = React.useState<IData[]>([]);
  const [afterStatRight, setAfterStatRight] = React.useState<IData[]>([]);
  const [afterPanel, setAfterPanel] = React.useState(<></>);

  const Hanja = ({ text, uuid }: { text: string; uuid: string }) => {
    const [hanjaTick, setHanjaTick] = React.useState(0);
    const [y, setY] = React.useState(0);
    const [x, setX] = React.useState(getRandomArbitrary(0, 600 - text.length * 50));

    useTick((delta) => {
      setHanjaTick((cur) => (cur += 0.01 * delta));
    });

    React.useEffect(() => {
      if (hanjaTick * 100 < 800) {
        setY(hanjaTick * 100);
        setHanjas((cur) => {
          const replaced = { ...cur };
          replaced[uuid].y = y;
          return replaced;
        })
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
    if (isAfter) {
      return;
    }

    const timer = setInterval(() => {
      setCount(count + 1);
    }, 10);

    return () => clearInterval(timer);
  });

  React.useEffect(() => {
    setStatElement(
      <>
        <PlayStatBlock>
          <ReadyLink to={"/ready/acidrain"}><ReadyButton>이전으로</ReadyButton></ReadyLink>
          <p>
            <SubTitle>{ difficulty < 120 ? "😱 난이도: pH1" : difficulty < 180 ? "😨 난이도: pH4" : difficulty < 240 ? "😐 난이도: pH7" : difficulty < 300 ? "😊 난이도: pH10" : "😆 난이도: pH13" }</SubTitle>
          </p>
        <p>
          <SubTitle>❌ 틀린 개수: {afterStatWrong.length}/5</SubTitle>
        </p>
        <p>
          <SubTitle>⏱️ {((count - 200) / 100 < 0) ? "0초" : ((count - 200) / 100) + "초"}</SubTitle>
        </p>
        </PlayStatBlock>
      </>
    );
  }, [afterStatWrong, count]);

  React.useEffect(() => {
    if (isAfter) {
      setHanjas({})
      setHanjasElement({})
      return;
    }
    
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
      if (count % difficulty !== 0) {
        return;
      }
    }


    const result = property[getRandomInt(0, property.length - 1)];
    const uuid = crypto.randomUUID();
    setHanjas((cur) => {
      return {
        ...cur,
        [uuid]: { ...result, y: 0 }
      };
    });
    setHanjasElement((cur) => {
      return {
        ...cur,
        [uuid]: <Hanja key={uuid} text={result.form[getRandomInt(0, result.form.length - 1)]} uuid={uuid} />
      }
    })
    setIsInit(true);
  }, [isAfter, count])
  React.useEffect(() => {
    if (isAfter) {
      return;
    }

    setInputElement(<>
        <PlayInputFieldBlock>
        <form
          onSubmit={handleSubmit(async (data) => {
            let result: string | null = null;
            for await (const [key, value] of Object.entries(hanjas).toReversed()) {
              if (value.y < 750 && value.sound.includes(data.answer?.trim() ?? "")) {
                result = key;
              }
            }
            if (result !== null) {
              setAfterStatRight(cur => [ ...cur, hanjas[result] ])
              setHanjas((cur) => {
                const replaced = { ...cur };
                delete replaced[result];
                return replaced;
              });
              setHanjasElement((cur) => {
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

    const survives = Object.entries(hanjas).filter(([k, v]) => v.y >= 750).map(([k, v]) => k)
    setAfterStatWrong(survives.map(survive => hanjas[survive]))
    setHanjasElement((cur) => {
      let item: Record<string, JSX.Element> = {};
      Object.entries(cur).filter(([k, v]) => !survives.includes(k)).forEach(([k, v]) => {item[k] = v});
      return item;
    })
  }, [hanjas, isAfter])

  const stageRef = React.useRef<Stage>(null);
  React.useEffect(() => {
    setStageBackgroundAlpha(afterStatWrong.length === 0 ? 0.3 : afterStatWrong.length === 1 ? 0.4 : afterStatWrong.length === 2 ? 0.5 : afterStatWrong.length === 3 ? 0.6 : afterStatWrong.length === 4 ? 0.7 : afterStatWrong.length === 5 ? 0.8 : 0.9)
  }, [afterStatWrong])

  React.useEffect(() => {
    //@ts-ignore
    window.app = stageRef.current
    //@ts-ignore
    stageRef.current.app.renderer.backgroundAlpha = stageBackgroundAlpha;
  }, [stageBackgroundAlpha])

  React.useEffect(() => {
    if (afterStatWrong.length === 5) {
      const wrongItems: Record<string, { dict: IData; count: number; }> = {}
      for (const item of afterStatWrong) {
        if (Object.keys(wrongItems).includes(item.key)) {
          wrongItems[item.key].count++;
        } else {
          wrongItems[item.key] = { dict: item, count: 1 }
        }
      }

      const rightItems: Record<string, { dict: IData; count: number; }> = {}
      for (const item of afterStatRight) {
        if (Object.keys(rightItems).includes(item.key)) {
          rightItems[item.key].count++;
        } else {
          rightItems[item.key] = { dict: item, count: 1 }
        }
      }

      setIsAfter(true);
      setAfterPanel(<>
        <PlayAfterPanel>
          <PlayAfterTitle>놀이 끝!</PlayAfterTitle>
          <PlayAfterButtonSet>
            <ReadyLink to={`/play?key=${JSON.stringify(property)}&difficulty=${difficulty}`} reloadDocument><PlayAfterButton>다시 하기</PlayAfterButton></ReadyLink>
            <PlayAfterButton onClick={() => navigate("/")}>홈으로</PlayAfterButton>
          </PlayAfterButtonSet>
          <PlayAfterSubTitle>⏱️ 시간: {(count - 200) / 100}초</PlayAfterSubTitle>
          <PlayAfterSubTitle>📊 통계</PlayAfterSubTitle>
          <p>
            <details>
              <PlayAfterSummary>틀린 한자</PlayAfterSummary>
              <div>
                {Object.values(wrongItems).map(item => {
                  return (
                    <>
                      <div>
                        <DictForm>{item.dict.form.join(",")}</DictForm>
                        <DictSound>{item.dict.sound.join(", ")}</DictSound>
                        <DictCount>({item.count})</DictCount>
                      </div>
                    </>
                  );
                })}
              </div>
            </details>
          </p>
          <p>
            <details>
              <PlayAfterSummary>맞춘 한자</PlayAfterSummary>
              <div>
                {Object.values(rightItems).map(item => {
                  return (
                    <>
                      <div>
                        <DictForm>{item.dict.form.join(",")}</DictForm>
                        <DictSound>{item.dict.sound.join(", ")}</DictSound>
                        <DictCount>({item.count})</DictCount>
                      </div>
                    </>
                  );
                })}
              </div>
            </details>
          </p>
        </PlayAfterPanel>
      </>)
    }
  }, [afterStatWrong, count])

  React.useEffect(() => {
    searchParams.delete("key")
    searchParams.delete("difficulty")
    setSearchParams(searchParams)
    setColorPair(["#d68c47", "#ffe7c4"])
  }, [])
  return (
    <>
      <PlayMain>
        {/* @ts-ignore */}
        <Stage ref={stageRef} style={{zIndex: 1001}} width={600} height={800} options={{ backgroundColor: "#df5555", backgroundAlpha: stageBackgroundAlpha, antialias: true }}>
          {Object.values(hanjasElement)}
          {timeText}
        </Stage>
        {statElement}
        {inputElement}
        {afterPanel}
      </PlayMain>
    </>
  );
};
