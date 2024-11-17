import React from "react";
import { Article, Button, Main, PageTitle, SubTitle, Title } from "../../../components";
import { DictSummary } from "../../../components/dict/view";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { IDict } from "../../../database/busu";
import { DictTitle } from "../../../components/dict";
import {
  DictNewCMHanjaSpan,
  DictNewFieldset,
  DictNewGroupBox,
  DictNewGroupBoxTitle,
  DictNewGroupBoxTop,
  DictNewHanjaSpan,
  DictNewLabel,
  DictNewLegend,
} from "../../../components/dict/new";
import { IndexContext } from "../..";
import { DictConfigMetadataPage } from "./DictConfigMetadataPage";
import { DictAddListPage } from "./DictAddListPage";
import { DictPreviewPage } from "./DictPreviewPage";

export interface IDictNewContext {
  dict: Partial<IDict> | undefined;
  dictForm: Record<string, string[]> | undefined;
  dictFormPersist: Record<string, { data: Record<string, { define: string; form: string; sound: string }>; name: string }> | undefined;
  setDict: React.Dispatch<React.SetStateAction<Partial<IDict> | undefined>>;
  setDictForm: React.Dispatch<React.SetStateAction<Record<string, string[]> | undefined>>;
  setDictFormPersist: React.Dispatch<
    React.SetStateAction<Record<string, { data: Record<string, { define: string; form: string; sound: string }>; name: string }> | undefined>
  >;
  setTab: React.Dispatch<React.SetStateAction<"configMetadata" | "addList" | "preview">>;
}

export const DictNewContext = React.createContext<IDictNewContext>({
  dict: undefined,
  dictForm: undefined,
  dictFormPersist: undefined,
  setDict: () => {},
  setDictForm: () => {},
  setDictFormPersist: () => {},
  setTab: () => {},
});

export const DictNewPage = () => {
  const [initPage, setInitPage] = React.useState<JSX.Element>(<></>);
  const [dict, setDict] = React.useState<Partial<IDict> | undefined>();
  const [dictForm, setDictForm] = React.useState<Record<string, string[]>>();
  const [dictFormPersist, setDictFormPersist] = React.useState<
    Record<string, { data: Record<string, { define: string; form: string; sound: string }>; name: string }> | undefined
  >();
  const [tab, setTab] = React.useState<"configMetadata" | "addList" | "preview">("configMetadata");

  const { setColorPair } = React.useContext(IndexContext);
  React.useEffect(() => {
    setColorPair(["#8eaaca", "#ffe7c4"]);
  }, []);

  React.useEffect(() => {
    setInitPage(
      <>
        <PageTitle title="산성비 게임 | 게임 준비 | 한자 마당" />
        <DictNewContext.Provider value={{ dict, dictForm, dictFormPersist, setDict, setDictForm, setDictFormPersist, setTab }}>
          {tab === "configMetadata" ? (
            <DictConfigMetadataPage context={DictNewContext} />
          ) : tab === "addList" ? (
            <DictAddListPage context={DictNewContext} />
          ) : tab === "preview" ? (
            <DictPreviewPage context={DictNewContext} />
          ) : (
            ""
          )}
        </DictNewContext.Provider>
      </>
    );
  }, [tab]);

  return <>{initPage}</>;
};
