import { Sprite, Stage, useTick, Text } from "@pixi/react";
import { debug } from "console";
import { TextStyle } from "pixi.js";
import React, { JSX } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { IData } from "../../database/busu";
import { DictCount, Input, InputGuide, Label, PlayAfterButton, PlayAfterButtonSet, PlayAfterPanel, PlayAfterSubTitle, PlayAfterSummary, PlayAfterTitle, PlayImage, PlayInputFieldBlock, PlayMain, PlayStatBlock } from "../../components/play";
import { useForm } from "react-hook-form";
import { Button, Main, SubTitle, Title } from "../../components";
import { DictImage, DictSubTitle } from "../../components/dict";
import { enterIcon, leftChevron } from "../../constant/IMAGE_PATH";
import { IndexContext } from "..";
import { DictForm, DictHorizontal, DictSound, DictSummary } from "../../components/dict/view";
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
  const [property, _] = React.useState<IData[]>(JSON.parse(localStorage.getItem("dict-play") ?? '{ "key": [], "difficulty": 180 }').key as IData[]);
  const [difficulty, __] = React.useState<number>(JSON.parse(localStorage.getItem("dict-play") ?? '{ "key": [], "difficulty": 180 }').difficulty as number);
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
      <Text text={hanja} x={300} y={300} anchor={0.5} style={new TextStyle({ align: "center", fontSize: "100px", fill: "#000000", fontFamily: "hanyang", fontWeight: "800" })} />
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
            <SubTitle>{ difficulty < 120 ? "😱 매우 어려움" : difficulty < 180 ? "😨 어려움" : difficulty < 240 ? "😐 보통" : difficulty < 300 ? "😊 쉬움" : "😆 매우 쉬움" }</SubTitle>
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
              const allowedAnswer: string[] = []
              value.sound.forEach((sound) => {
                allowedAnswer.push(sound);
                if (sound.split(" ").length > 1) {
                  allowedAnswer.push(sound.split(" ").at(-1) as string);
                }
              });
              if (value.y < 550 && allowedAnswer.includes(data.answer?.trim() ?? "")) {
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

    const survives = Object.entries(hanjas).filter(([k, v]) => v.y >= 550).map(([k, v]) => k)
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
      setAfterPanel(
        <>
          <PlayAfterPanel>
            <PlayAfterTitle>놀이 끝!</PlayAfterTitle>
            <PlayAfterButtonSet>
              <PlayAfterButton
                onClick={() => {
                  localStorage.setItem("dict-play", JSON.stringify({ key: property, difficulty: difficulty }));
                  navigate(`/play`);
                  location.reload();
                }}
              >
                다시 하기
              </PlayAfterButton>
              <PlayAfterButton onClick={() => navigate("/")}>홈으로</PlayAfterButton>
            </PlayAfterButtonSet>
            <PlayAfterSubTitle>⏱️ 시간: {(count - 200) / 100}초</PlayAfterSubTitle>
            <PlayAfterSubTitle>📊 통계</PlayAfterSubTitle>
            <p>
              <details>
                <DictSummary>
                  <DictImage src={leftChevron} style={{ transform: "rotate(-90deg)" }} />
                  <DictSubTitle>
                    틀린 한자 <span>({Object.values(wrongItems).length}개)</span>
                  </DictSubTitle>
                </DictSummary>
                <div>
                  {Object.values(wrongItems).map((item) => {
                    return (
                      <>
                        <DictHorizontal />
                        <div>
                          <DictForm>{item.dict.form.join("")}</DictForm>
                          <DictSound>{item.dict.sound.join(", ")}</DictSound>
                          <DictCount>({item.count}번)</DictCount>
                        </div>
                      </>
                    );
                  })}
                </div>
              </details>
            </p>
            <p>
              <details>
                <DictSummary>
                  <DictImage src={leftChevron} style={{ transform: "rotate(-90deg)" }} />
                  <DictSubTitle>
                    맞춘 한자 <span>({Object.values(rightItems).length}개)</span>
                  </DictSubTitle>
                </DictSummary>
                <div>
                  {Object.values(rightItems).map((item) => {
                    return (
                      <>
                        <DictHorizontal />
                        <div>
                          <DictForm>{item.dict.form.join("")}</DictForm>
                          <DictSound>{item.dict.sound.join(", ")}</DictSound>
                          <DictCount>({item.count}번)</DictCount>
                        </div>
                      </>
                    );
                  })}
                </div>
              </details>
            </p>
          </PlayAfterPanel>
        </>
      );
    }
  }, [afterStatWrong, count])

  React.useEffect(() => {
    if (property.length === 0) {
      navigate("/");
    }
    localStorage.removeItem("dict-play")
    setColorPair(["#d68c47", "#ffe7c4"])
  }, [])
  return (
    <>
      <PlayMain>
        {/* @ts-ignore */}
        <Stage ref={stageRef} style={{zIndex: 1001, borderRadius: "2rem"}} width={600} height={600} options={{ backgroundColor: "#df5555", backgroundAlpha: stageBackgroundAlpha, antialias: true }}>
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
