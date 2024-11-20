import React from "react";
import { PageTitle } from "../../../components";
import { useNavigate, useParams } from "react-router-dom";
import { IDict } from "../../../database/busu";
import { v4 } from "uuid";
import { IndexContext } from "../..";
import { DictConfigMetadataPage } from "../new/DictConfigMetadataPage";
import { DictAddListPage } from "../new/DictAddListPage";
import { DictPreviewPage } from "../new/DictPreviewPage";

const DictModifyContext = React.createContext<{
  dict: Partial<IDict> | undefined;
  dictForm: Record<string, string[]> | undefined;
  dictFormPersist: Record<string, { data: Record<string, { define: string; form: string; sound: string }>; name: string }> | undefined;
  setDict: React.Dispatch<React.SetStateAction<Partial<IDict> | undefined>>;
  setDictForm: React.Dispatch<React.SetStateAction<Record<string, string[]> | undefined>>;
  setDictFormPersist: React.Dispatch<
    React.SetStateAction<Record<string, { data: Record<string, { define: string; form: string; sound: string }>; name: string }> | undefined>
  >;
  setTab: React.Dispatch<React.SetStateAction<"configMetadata" | "addList" | "preview">>;
}>({
  dict: undefined,
  dictForm: undefined,
  dictFormPersist: undefined,
  setDict: () => {},
  setDictForm: () => {},
  setDictFormPersist: () => {},
  setTab: () => {},
});

export const DictModifyPage = () => {
  const navigate = useNavigate();
  const [dict, setDict] = React.useState<Partial<IDict> | undefined>();
  const [dictForm, setDictForm] = React.useState<Record<string, string[]>>();
  const [dictFormPersist, setDictFormPersist] = React.useState<
    Record<string, { data: Record<string, { define: string; form: string; sound: string }>; name: string }> | undefined
  >();
  const [tab, setTab] = React.useState<"configMetadata" | "addList" | "preview">("configMetadata");

  const { setColorPair, setToastMessage } = React.useContext(IndexContext);
  const { dictName } = useParams<{ dictName: string; }>();

  React.useEffect(() => {
    setColorPair(["#8eaaca", "#ffe7c4"]);
    const dictIntegration: Record<string, IDict> = { ...JSON.parse(localStorage.getItem("dict-common") ?? "{}"), ...JSON.parse(localStorage.getItem("dict-custom") ?? "{}") };
    if (dictName === undefined || dictIntegration[dictName] === undefined ) {
      navigate("/dict", { replace: true });
      setToastMessage(["경로에 해당하는 사전을 찾을 수 없습니다!"])
      return;
    }

    const dictOrigin = dictIntegration[dictName]
    const dictMetadata = { ...dictOrigin, content: undefined };
    setDict(dictMetadata)
    
    let rebuildDictForm: Record<string, string[]> = {};
    let rebuildDictFormPersist: Record<string, { data: Record<string, { define: string; form: string; sound: string }>; name: string }> = {};
    for (const [groupName, data] of Object.entries(dictOrigin.content)) {
      const datalinesKey = v4();
      const tmpRebuildDictForm = [];
      let tmpRebuildDictFormPersist = {};

      for (let dataline of data) {
        const datalineKey = v4();
        let datalineComprehensive: { define: string; form: string; sound: string } = {
          form: dataline.form.join(","),
          sound: dataline.sound.join(","),
          define: dataline.define ?? ""
        };
        tmpRebuildDictForm.push(datalineKey)
        tmpRebuildDictFormPersist = {...tmpRebuildDictFormPersist, [datalineKey]: datalineComprehensive }
      }

      rebuildDictForm = { ...rebuildDictForm, [datalinesKey]: tmpRebuildDictForm }
      rebuildDictFormPersist = {...rebuildDictFormPersist, [datalinesKey]: { data: tmpRebuildDictFormPersist, name: groupName } }
    }

    setDictForm(rebuildDictForm)
    setDictFormPersist(rebuildDictFormPersist)
  }, [dictName])


  return (
    <>
      <PageTitle title="사전 수정 | 한자 마당" />
      <DictModifyContext.Provider value={{ dict, dictForm, dictFormPersist, setDict, setDictForm, setDictFormPersist, setTab }}>
        {tab === "configMetadata" ? (
          <DictConfigMetadataPage context={DictModifyContext} isModifying={true} />
        ) : tab === "addList" ? (
          <DictAddListPage context={DictModifyContext} isModifying={true} />
        ) : tab === "preview" ? (
          <DictPreviewPage context={DictModifyContext} isModifying={true} />
        ) : (
          ""
        )}
      </DictModifyContext.Provider>
    </>
  );
};
