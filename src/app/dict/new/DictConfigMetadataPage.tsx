import React from "react";
import { PageTitle } from "../../../components";
import { DictDescription } from "../../../components/dict/view";
import { DictArticle, DictButton, DictImage, DictLink, DictMain } from "../../../components/dict";
import { checkIcon, leftChevron } from "../../../constant/IMAGE_PATH";
import {
  DictBottomBox,
  DictNewCMError, DictNewCMInput,
  DictNewCMLabel,
  DictNewCMSelect, DictNewSector,
  DictNewTitle
} from "../../../components/dict/new";
import { useForm } from "react-hook-form";
import { DictNewContext, IDictNewContext } from ".";
import { IDict } from "../../../database/busu";
import { useNavigate, useParams } from "react-router-dom";
import { v4 } from "uuid";


export const DictConfigMetadataPage = (props: { context: React.Context<IDictNewContext>, isModifying?: boolean; }) => {
  const { setTab, setDict, dict, setDictForm, setDictFormPersist } = React.useContext(props.context);
  const { unregister, register, setValue, getValues, handleSubmit, watch, formState, setError } = useForm<{
    name: string;
    description: string;
    edit: "disallow" | "allow";
  }>();
  
  // modify 한정
  const navigate = useNavigate()
  const { dictName } = useParams<{ dictName: string; }>();

  React.useEffect(() => {
    if (props.isModifying === undefined || !props.isModifying) {
      return;
    }

    const dictIntegration: Record<string, IDict> = { ...JSON.parse(localStorage.getItem("dict-common") ?? "{}"), ...JSON.parse(localStorage.getItem("dict-custom") ?? "{}") };
    if (dictName === undefined || dictIntegration[dictName] === undefined ) {
      navigate("/dict", { replace: true });
      return;
    }

    const dictOrigin = dictIntegration[dictName]
    const dictMetadata = { ...dictOrigin, content: undefined };
    setValue("name", dictMetadata.name);
    setValue("description", dictMetadata.description ?? "");
    setValue("edit", dictMetadata.edit ?? "disallow");
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
  }, [])


  React.useEffect(() => {
    const name = dict?.name;
    if (name !== undefined) {
      setValue("name", name);
      setValue("description", dict?.description ?? "");
      setValue("edit", dict?.edit ?? "disallow");
    }
  }, []);

  const submitRef = React.useRef<HTMLFormElement>(null);

  return (
    <>
      <PageTitle title={`사전 정보 | 한자 마당`} />
      <DictMain>
        <DictNewTitle>
          <span>字</span>
          <span>사전 정보</span>
          <i>(1/3)</i>
        </DictNewTitle>
        <DictDescription>사전 정보를 입력해주세요!</DictDescription>
        <DictLink to={"/dict"}>
          <DictButton type="button" style={{ width: "max-content", backgroundColor: "#ffffff70" }}>
            <DictImage src={leftChevron} />
            이전으로 (사전)
          </DictButton>
        </DictLink>
        <form
          ref={submitRef}
          onSubmit={handleSubmit((value) => {
            setDict((cur) => ({ ...cur, ...value }));
            setTab("addList");
          })}
        >
          <DictArticle>
            <DictNewSector>
              <DictNewCMLabel htmlFor="name">이름</DictNewCMLabel>
              <DictNewCMInput
                {...register("name", { required: { value: true, message: "값을 입력하세요!" } })}
                style={{ border: formState?.errors?.name?.message ? "2px solid red" : "" }}
                autoComplete="off"
                placeholder="사전의 이름"
                id="name"
                type="text" />
              <DictNewCMError>{formState?.errors?.name?.message ?? ""}</DictNewCMError>
            </DictNewSector>
            <DictNewSector>
              <DictNewCMLabel htmlFor="description">설명</DictNewCMLabel>
              <DictNewCMInput {...register("description")} autoComplete="off" placeholder="사전의 설명" id="description" type="text" />
            </DictNewSector>
            <DictNewSector>
              <DictNewCMLabel htmlFor="edit">수정 설정</DictNewCMLabel>
              <DictNewCMSelect
                {...register("edit")}
                id="edit"
                defaultValue={"disallow"}
              >
                <option value={"disallow"}>🔒 수정 허용하지 않음</option>
                <option value={"allow"}>✅ 수정 허용</option>
              </DictNewCMSelect>
            </DictNewSector>
          </DictArticle>
        </form>
      </DictMain>
      <DictBottomBox>
        <DictButton onClick={()=>submitRef.current?.requestSubmit()} style={{ backgroundColor: "#5cd83d90", border: "1px solid #5cd83d30" }}>
          <DictImage src={checkIcon} /> 저장 및 다음으로
        </DictButton>
      </DictBottomBox>
    </>
  );
};
