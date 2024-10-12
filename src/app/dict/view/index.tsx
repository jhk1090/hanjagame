import React from "react";
import { Article, Button, Main, PageTitle, SubTitle, Title } from "../../../components";
import { Dict, DictDefine, DictForm, DictSound } from "../../../components/dict/view";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { IDict } from "../../../database/busu";

export const DictViewPage = () => {
  const navigate = useNavigate();
  const [initPage, setInitPage] = React.useState<JSX.Element>(<></>);
  const { dictName } = useParams<{ dictName: string; }>();
  const [dict, setDict] = React.useState<IDict | null>(null);

  React.useEffect(() => {
    const dictIntegration: Record<string, IDict> = { ...JSON.parse(localStorage.getItem("dict-common") ?? "{}"), ...JSON.parse(localStorage.getItem("dict-custom") ?? "{}") };
    if (dictName === undefined || dictIntegration[dictName] === undefined ) {
      navigate("/dict", { replace: true });
      return;
    }
    setDict(dictIntegration[dictName])
  }, [dictName])

  React.useEffect(() => {
    if (dict === null) {
      setInitPage(<></>);
      return;
    }
    setInitPage(
      <>
        <PageTitle title={`${dictName} | 사전 | 한자 도감`} />
        <Main>
          <Title>{dictName}</Title>
          <Article>
            <Link to={"/dict"}><Button>뒤로가기</Button></Link>
            {Object.keys(dict.content).map((group) => (
              <>
                <SubTitle>{group}</SubTitle>
                {dict.content[group].map((dictLine) => (
                  <Dict>
                    <div>
                      <DictForm>{dictLine.form.join(",")}</DictForm>
                      <DictSound>{dictLine.sound.join(", ")}</DictSound>
                    </div>
                    <div>
                      {dictLine.define ? (
                        <>
                          <DictDefine>{dictLine.define}</DictDefine>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  </Dict>
                ))}
              </>
            ))}
          </Article>
        </Main>
      </>
    );
  }, [dict]);

  return <>{initPage}</>;
};
