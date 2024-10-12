import React, { JSX } from "react";
import { Article, Button, ButtonLabel, Main, Title, PageTitle, SubTitle } from "../../../components";
import { Link, useNavigate } from "react-router-dom";
import { IData, IDict } from "../../../database/busu";
import { Dict, DictDefine, DictForm, DictSound } from "../../../components/dict/view";
import { useForm, useFormContext } from "react-hook-form";
import { Input } from "../../../components/ready/acidrain";

export const ReadyAcidrainPage = () => {
  const navigate = useNavigate();
  const [initPage, setInitPage] = React.useState<JSX.Element>(<></>);
  const [dict, setDict] = React.useState<IDict | undefined>();
  const [tab, setTab] = React.useState<"home" | "selectDict" | "selectGameConfig">("home");
  const [dictConfig, setDictConfig] = React.useState<IData[] | undefined>();

  type TDictConfig = Record<string, { selectAll: boolean; dict: boolean[]; }>;
  const { unregister, register, setValue, getValues, handleSubmit } = useForm<TDictConfig>();

  React.useEffect(() => {
    const dictIntegration: Record<string, IDict> = {
      ...JSON.parse(localStorage.getItem("dict-common") ?? "{}"),
      ...JSON.parse(localStorage.getItem("dict-custom") ?? "{}"),
    };

    setInitPage(
      <>
        <PageTitle title="산성비 놀이 | 놀이 준비 | 한자 도감" />
        <Main>
          <Title>산성비 놀이</Title>
          <Article>
            <Button
              onClick={() => {
                if (tab === "home") {
                  navigate("..");
                  return;
                } else if (tab === "selectDict") {
                  unregister();
                  setDict(undefined);
                  setTab("home");
                } else if (tab === "selectGameConfig") {
                  console.log("dictconfig", dictConfig)
                  setDictConfig(undefined);
                  setTab("selectDict")
                }
              }}
            >
              뒤로가기
            </Button>
            {tab === "home" ? (
              <>
                <SubTitle>떨어지는 한자 또는 한자어의 음을 입력해 없애는 게임입니다.</SubTitle>
                {Object.values(dictIntegration).map((dictLine) => (
                  <Button
                    onClick={() => {
                      setDict(dictLine);
                      setTab("selectDict");
                    }}
                  >
                    {dictLine.name}
                  </Button>
                ))}
              </>
            ) : tab === "selectDict" && dict !== undefined ? (
              <>
                <SubTitle>선택하세요!</SubTitle>
                <form onSubmit={handleSubmit((data: TDictConfig) => {
                  const dictAcc: IData[] = [];
                  console.log(data, dict);
                  Object.keys(data).forEach(group => {
                    data[group].dict.forEach((value, index) => {
                      if (value) {
                        dictAcc.push(dict.content[group][index])
                      }
                    })
                  })
                  setDictConfig(dictAcc)
                  setTab("selectGameConfig")
                })}>
                  <Button type="submit">저장</Button>
                  {Object.keys(dict.content).map((group) => (
                    <>
                      <SubTitle>
                        <Input
                          type="checkbox"
                          {...register(`${group}.selectAll`)}
                          onChange={(e: React.FormEvent<HTMLInputElement>) => {
                            dict.content[group].forEach((_, index) => {
                              setValue(`${group}.dict.${index}`, e.currentTarget.checked);
                            });
                          }}
                          defaultChecked
                        />
                        {group}
                      </SubTitle>
                      {dict.content[group].map((dictLine, index) => (
                        <Dict>
                          <div>
                            <Input
                              type="checkbox"
                              {...register(`${group}.dict.${index}`)}
                              key={index}
                              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                if (e.currentTarget.checked) {
                                  const groupSelections = getValues()[group].dict as boolean[];
                                  groupSelections[index] = true;
                                  if (groupSelections.every((v) => v)) {
                                    setValue(`${group}.selectAll`, true);
                                  }
                                } else {
                                  setValue(`${group}.selectAll`, false);
                                }
                              }}
                              defaultChecked
                            />
                            <DictForm>{dictLine.form.join(",")}</DictForm>
                            <DictSound>{dictLine.sound.join(", ")}</DictSound>
                          </div>
                        </Dict>
                      ))}
                    </>
                  ))}
                </form>
              </>
            ) : tab === "selectGameConfig" && dictConfig !== undefined ? (
              <>
                <SubTitle>시작할까요?</SubTitle>
                <Link to={`/play?key=${JSON.stringify(dictConfig)}`}><Button>시작</Button></Link>
              </>
            ) : ""}
          </Article>
        </Main>
      </>
    );
  }, [tab]);

  return <>{initPage}</>;
};
