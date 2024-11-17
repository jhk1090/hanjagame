import React, { JSX } from "react";
import { PageTitle } from "../../../components";
import { IData, IDict } from "../../../database/busu";
import { GameConfigPage } from "./GameConfig";
import { DictlineSelectionPage } from "./DictlineSelection";
import { DictSelectionPage } from "./DictSelection";

export const ReadyAcidrainContext = React.createContext<{
  dict: IDict | undefined;
  setDict: React.Dispatch<React.SetStateAction<IDict | undefined>>;
  dictConfig: IData[] | undefined;
  setDictConfig: React.Dispatch<React.SetStateAction<IData[] | undefined>>;
  setTab: React.Dispatch<React.SetStateAction<"dictSelection" | "dictlineSelection" | "gameConfig">>;
}>({ dict: undefined, dictConfig: undefined, setDict: () => {}, setDictConfig: () => {}, setTab: () => {} });

export const ReadyAcidrainPage = () => {
  const [initPage, setInitPage] = React.useState<JSX.Element>(<></>);
  const [dict, setDict] = React.useState<IDict | undefined>();
  const [dictConfig, setDictConfig] = React.useState<IData[] | undefined>();
  const [tab, setTab] = React.useState<"dictSelection" | "dictlineSelection" | "gameConfig">("dictSelection");

  React.useEffect(() => {
    setInitPage(
      <>
        <PageTitle title="산성비 게임 | 게임 준비 | 한자 마당" />
        <ReadyAcidrainContext.Provider value={{ dict, setDict, dictConfig, setDictConfig, setTab }}>
          {tab === "dictSelection" ? (
            <DictSelectionPage />
          ) : tab === "dictlineSelection" ? (
            <DictlineSelectionPage />
          ) : tab === "gameConfig" ? (
            <GameConfigPage />
          ) : (
            ""
          )}
        </ReadyAcidrainContext.Provider>
      </>
    );
  }, [tab]);

  return <>{initPage}</>;
};
