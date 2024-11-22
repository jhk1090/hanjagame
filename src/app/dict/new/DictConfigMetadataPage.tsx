import React, { useContext } from "react";
import { PageTitle, StepperBody, StepperBox, StepperIndicator, StepperJoint, StepperLocation, StepperMiddle } from "../../../components";
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
import { IndexContext } from "../..";


export const DictConfigMetadataPage = (props: { context: React.Context<IDictNewContext>, isModifying?: boolean; }) => {
  const { setToastMessage } = useContext(IndexContext);
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
      setToastMessage(["경로에 해당하는 사전을 찾을 수 없습니다!"])
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
      <PageTitle title={`사전 정보 | ${props.isModifying ? "사전 수정" : "사전 추가"} | 한자 마당`} />
      <DictMain>
        <StepperBox key={"stepper"}>
          <StepperMiddle>
            <StepperJoint $type="visitable" />
            <StepperJoint $type="unreachable" />
          </StepperMiddle>
          <StepperBody>
            <StepperLocation>
              <StepperIndicator $type="visited">1</StepperIndicator>
              사전 정보
            </StepperLocation>
            <StepperLocation
              onClick={() => {
                submitRef.current?.requestSubmit();
              }}
            >
              <StepperIndicator $clickable $type="visitable">
                2
              </StepperIndicator>
              사전 목록
            </StepperLocation>
            <StepperLocation>
              <StepperIndicator $type="unreachable">3</StepperIndicator>
              미리보기
            </StepperLocation>
          </StepperBody>
        </StepperBox>
        <DictNewTitle>
          <span>字</span>
          <span>사전 정보</span>
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
                {...register("name", {
                  required: { value: true, message: "값을 입력하세요!" },
                  maxLength: { value: 50, message: "최대 50자입니다." },
                  onBlur: (event: React.ChangeEvent<HTMLInputElement>) => {
                    setValue(`name`, event.currentTarget.value.trim());
                  },
                })}
                style={{ border: formState?.errors?.name?.message ? "2px solid red" : "" }}
                autoComplete="off"
                placeholder="사전의 이름"
                id="name"
                type="text"
              />
              <DictNewCMError>{formState?.errors?.name?.message ?? ""}</DictNewCMError>
            </DictNewSector>
            <DictNewSector>
              <DictNewCMLabel htmlFor="description">설명</DictNewCMLabel>
              <DictNewCMInput
                {...register("description", {
                  onBlur: (event: React.ChangeEvent<HTMLInputElement>) => {
                    setValue(`description`, event.currentTarget.value.trim());
                  },
                })}
                autoComplete="off"
                placeholder="사전의 설명"
                id="description"
                type="text"
              />
            </DictNewSector>
            <DictNewSector>
              <DictNewCMLabel htmlFor="edit">수정 설정</DictNewCMLabel>
              <DictNewCMSelect {...register("edit")} id="edit" defaultValue={"disallow"}>
                <option value={"disallow"}>🔒 수정 허용하지 않음</option>
                <option value={"allow"}>✅ 수정 허용</option>
              </DictNewCMSelect>
            </DictNewSector>
          </DictArticle>
        </form>
      </DictMain>
      <DictBottomBox>
        <DictButton onClick={() => submitRef.current?.requestSubmit()} style={{ backgroundColor: "#5cd83d90", border: "1px solid #5cd83d30" }}>
          <DictImage src={checkIcon} /> 저장 및 다음으로
        </DictButton>
      </DictBottomBox>
    </>
  );
};
