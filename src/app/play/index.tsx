import { Sprite, Stage, useTick, Text } from "@pixi/react";
import { debug } from "console";
import { TextStyle } from "pixi.js";
import React, { JSX } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { IData } from "../../database/busu";
import { Input } from "../../components/play";
import { useForm } from "react-hook-form";
import { Button } from "../../components";

function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const PlayPage = () => {
  type THanjas = {
    config: IData;
    element: JSX.Element;
    uuid: string;
  } | undefined;
  const [hanjas, setHanjas] = React.useState<THanjas[]>([]);
  const [initPage, setInitPage] = React.useState<JSX.Element>(<></>);
  const [searchParams, setSearchParams] = useSearchParams();
  const [property, _] = React.useState<IData[]>(JSON.parse(searchParams.get("key") ?? "[]") as IData[])

  const Hanja = ({ text, uuid, innerHanjas }: { text: string; uuid: string; innerHanjas: THanjas[] }) => {
    const [hanjaTick, setHanjaTick] = React.useState(0);
    const [y, setY] = React.useState(0);
    const [x, setX] = React.useState(getRandomArbitrary(0, 600-(text.length * 50)));
  
    useTick((delta) => {
      setHanjaTick((cur) => (cur += 0.007 * delta));
    });
    
    React.useEffect(() => {
      setY(hanjaTick * 100);
      if (hanjaTick * 100 > 100) {
        const result = innerHanjas.findIndex(v => v ? v.uuid === uuid : false);
        if (result !== -1) {
          setHanjas((cur) => {
            const replaced = [...cur];
            delete replaced[result];
            return replaced
          })
        }

      }
    }, [hanjaTick, innerHanjas]);
  
    return (
      <>
        <Text text={text} x={x} y={y} style={new TextStyle({ align: "center", fontSize: "50px", fill: "#000", stroke: "#fff", strokeThickness: 2, fontFamily: "hanyang" })} />
      </>
    );
  };

  const StageTickManager = () => {
    const [stageTick, setStageTick] = React.useState(0);

    useTick((delta) => {
      setStageTick((cur) => (cur += 0.007 * delta));
    });
  
    React.useEffect(() => {
      if (stageTick * 100 <= 60) return;

      const result = property[getRandomInt(0, property.length - 1)]
      const uuid = crypto.randomUUID();
      setHanjas(cur => [...cur, { config: result, element: <Hanja text={result.form[getRandomInt(0, result.form.length - 1)]} uuid={uuid} innerHanjas={hanjas} />, uuid }])
      console.log(hanjas.map(v => v?.config.form))
      setStageTick(0)
    }, [stageTick, hanjas]);

    return (<><Text text="" x={-1} y={-1} /></>)
  }

  const { handleSubmit, register, resetField } = useForm();
  React.useEffect(() => {
    setInitPage(
      <>
        <Stage width={600} height={800} options={{ backgroundColor: "tomato", antialias: true }}>
          {hanjas.map(v => v ? v.element : <></>)}
          <StageTickManager />
        </Stage>
        <form onSubmit={handleSubmit((data) => {
          const result = hanjas.findIndex(v => v ? v.config.sound.includes(data.answer) : false)
          if (result !== -1) {
            setHanjas(cur => {
              const replaced = [...cur];
              delete replaced[result];
              return replaced;
            } )
          }
          resetField("answer");
        })}>
          <Input type="text" { ...register("answer") } />
          <Button type="submit" />
        </form>
      </>
    );
  }, [hanjas]);

  return <>{initPage}</>
};
