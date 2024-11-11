import React from "react";
import { Article, Button, Main, PageTitle, SubTitle, Title } from "../../components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IDict } from "../../database/busu";
import { DictArticle, DictButton, DictImage, DictLink, DictMain, DictSubTitle, DictTitle, DictToView, DictToViewBox } from "../../components/dict";
import { InfoLink } from "../../components/info";
import { checkIcon, closeIcon, leftChevron, plusIcon, shareIcon } from "../../constant/IMAGE_PATH";
import { IndexContext } from "..";
import { v4 } from "uuid";
import { DictPanel, DictPanelBackgroundBox, DictPanelButton, DictShareInput } from "../../components/dict/view";
import { useForm } from "react-hook-form";

export const DictPage = () => {
  const { setColorPair } = React.useContext(IndexContext);
  const { hash } = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    setColorPair(["#d6b547", "#ffeac4"]);
    const target = decodeURIComponent(hash).substring(1);
    try {
      let parsed = JSON.parse(target);
      const dictCustom: Record<string, IDict> = { ...JSON.parse(localStorage.getItem("dict-custom") ?? "{}") };
      localStorage.setItem("dict-custom", JSON.stringify({ ...dictCustom, [v4()]: parsed }));
      navigate("#");
    } catch {}
  }, [hash]);

  const [initPage, setInitPage] = React.useState<JSX.Element>(<></>);
  const [isDeleteMode, setIsDeleteMode] = React.useState(false);
  const [deleteKeys, setDeleteKeys] = React.useState<Record<string, boolean>>({});
  const [isSharePanelOpen, setIsSharePanelOpen] = React.useState(false);
  const { register, handleSubmit, resetField, formState, setError, clearErrors } = useForm<{
    link: string;
  }>();
  const [isFileUploadFailed, setIsFileUploadFailed] = React.useState(false);

  const dictCommon: Record<string, IDict> = { ...JSON.parse(localStorage.getItem("dict-common") ?? "{}") };
  const dictCustom: Record<string, IDict> = { ...JSON.parse(localStorage.getItem("dict-custom") ?? "{}") };
  const uploadRef = React.useRef<HTMLInputElement>(null);

  return (
    <>
      <PageTitle title="사전 | 한자 마당" />
      <DictMain>
        <DictTitle>
          <span>字</span>
          <span>사전</span>
        </DictTitle>
        <DictLink to={".."}>
          <DictButton>
            <DictImage src={leftChevron} />
            이전으로
          </DictButton>
        </DictLink>
        <DictArticle>
          <DictSubTitle>
            기본 사전 <span>({Object.keys(dictCommon).length})</span>
          </DictSubTitle>
          <DictToViewBox>
            {Object.entries(dictCommon).map(([key, value]) => (
              <DictLink to={`view/${key}`}>
                <DictToView>字 {value.name}</DictToView>
              </DictLink>
            ))}
          </DictToViewBox>
          <DictSubTitle>
            사용자 추가 사전 <span>({Object.keys(dictCustom).length})</span>
          </DictSubTitle>
          <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
            {!isDeleteMode ? (
              <>
                {Object.keys(dictCustom).length !== 0 ? (
                  <>
                    <DictLink to={"new"}>
                      <DictButton style={{ backgroundColor: "#5cd83d80" }}>
                        <DictImage src={plusIcon} />
                        사전 추가
                      </DictButton>
                    </DictLink>
                    <DictButton
                      onClick={() => {
                        setIsDeleteMode(true);
                        setDeleteKeys(Object.keys(dictCustom).reduce((prev, cur) => ({ ...prev, [cur]: true }), {}));
                      }}
                      style={{ backgroundColor: "#d83d3d80" }}
                    >
                      <DictImage src={closeIcon} />
                      선택 삭제
                    </DictButton>
                    <DictButton onClick={() => setIsSharePanelOpen(true)} style={{ backgroundColor: "#15291070" }}>
                      <DictImage src={shareIcon} />
                      사전 불러오기
                    </DictButton>
                  </>
                ) : (
                  ""
                )}
              </>
            ) : (
              <>
                <DictButton
                  onClick={() => {
                    setIsDeleteMode(false);
                    const deleteTargetKeys = Object.entries(deleteKeys)
                      .filter(([key, value]) => !value)
                      .map(([key, _]) => key);
                    for (const key of deleteTargetKeys) {
                      delete dictCustom[key];
                    }
                    localStorage.setItem("dict-custom", JSON.stringify(dictCustom));
                  }}
                  style={{ backgroundColor: "#d83d3d" }}
                >
                  <DictImage src={checkIcon} />
                  선택한 사전 삭제
                </DictButton>
                <DictButton
                  onClick={() => {
                    let tmpKeys = {};
                    for (const key of Object.keys(deleteKeys)) {
                      tmpKeys = { ...tmpKeys, [key]: false };
                    }
                    setDeleteKeys(tmpKeys);
                  }}
                  style={{ backgroundColor: "#a54040" }}
                >
                  <DictImage src={plusIcon} />
                  모두 선택
                </DictButton>
                <DictButton
                  onClick={() => {
                    let tmpKeys = {};
                    for (const key of Object.keys(deleteKeys)) {
                      tmpKeys = { ...tmpKeys, [key]: true };
                    }
                    setDeleteKeys(tmpKeys);
                  }}
                  style={{ backgroundColor: "#f15b5b" }}
                >
                  <DictImage src={closeIcon} />
                  모두 해제
                </DictButton>
              </>
            )}
          </div>
          {!isDeleteMode ? (
            <>
              {Object.keys(dictCustom).length === 0 ? (
                <>
                  <DictToViewBox style={{ justifyContent: "center", width: "100%", flexDirection: "column" }}>
                    <span style={{ fontSize: "5rem", fontWeight: 800 }}>사전이 없습니다!</span>
                    <DictLink to={"new"}>
                      <DictButton style={{ backgroundColor: "#5cd83d80" }}>
                        <DictImage src={plusIcon} />
                        사전 추가
                      </DictButton>
                    </DictLink>
                    <DictButton onClick={() => setIsSharePanelOpen(true)} style={{ backgroundColor: "#15291070" }}>
                      <DictImage src={shareIcon} />
                      사전 불러오기
                    </DictButton>
                  </DictToViewBox>
                </>
              ) : (
                <>
                  <DictToViewBox>
                    {Object.entries(dictCustom).map(([key, value]) => (
                      <DictLink to={`view/${key}`}>
                        <DictToView key={key}>字 {value.name}</DictToView>
                      </DictLink>
                    ))}
                  </DictToViewBox>
                </>
              )}
            </>
          ) : (
            <>
              <div style={{ backgroundColor: "#d83d3d80", fontSize: "4rem", padding: "2rem", borderRadius: "1rem" }}>
                삭제할 사전을 선택하세요!
                <br />
                위의 <b>선택한 사전 삭제</b>를 누르면 최종 삭제됩니다.
              </div>
              <DictToViewBox style={{ backgroundColor: "#d83d3d40" }}>
                {Object.entries(dictCustom).map(([key, value]) => (
                  <DictToView
                    style={
                      Object.entries(deleteKeys)
                        .filter(([key, value]) => !value)
                        .map(([key, _]) => key)
                        .includes(key)
                        ? { backgroundColor: "#d83d3d90" }
                        : {}
                    }
                    onClick={() => {
                      setDeleteKeys((cur) => ({ ...cur, [key]: !cur[key] }));
                    }}
                    key={key}
                  >
                    字 {value.name}
                  </DictToView>
                ))}
              </DictToViewBox>
            </>
          )}
        </DictArticle>
      </DictMain>
      <DictPanelBackgroundBox
        onClick={() => {
          clearErrors();
          setIsSharePanelOpen(false);
          setIsFileUploadFailed(false);
        }}
        style={{ display: isSharePanelOpen ? "block" : "none" }}
      >
        <DictPanel onClick={(e) => e.stopPropagation()}>
          <div>
            <DictSubTitle style={{ display: "flex", flexDirection: "row", gap: "2rem", alignItems: "center" }}>
              <DictImage style={{ width: "8rem" }} src={shareIcon} />
              사전 불러오기
            </DictSubTitle>
            <DictButton
              onClick={() => {
                clearErrors();
                setIsSharePanelOpen(false);
                setIsFileUploadFailed(false);
              }}
              style={{ backgroundColor: "#d83d3d90" }}
            >
              <DictImage src={closeIcon} />
              닫기
            </DictButton>
          </div>
          <div>
            <b>공유된 링크</b>를 여기에 <b>입력</b>해주세요!
            <br />
            <span style={{ color: "#00000090", fontStyle: "italic", fontSize: "3.5rem" }}>팁: 주소창에 직접 입력해 불러올 수 있습니다</span>
            <form
              onSubmit={handleSubmit((value) => {
                const target = value.link.split("#").slice(1).join("#");
                try {
                  let parsed = JSON.parse(target);
                  const dictCustom: Record<string, IDict> = { ...JSON.parse(localStorage.getItem("dict-custom") ?? "{}") };
                  localStorage.setItem("dict-custom", JSON.stringify({ ...dictCustom, [v4()]: parsed }));
                  resetField("link");
                  clearErrors();
                  setIsSharePanelOpen(false);
                  setIsFileUploadFailed(false);
                } catch {
                  setError("link", { type: "validate", message: "링크가 잘못되었습니다!" });
                }
              })}
            >
              <DictShareInput
                autoComplete="off"
                style={{ border: formState.errors.link?.message ? "2px solid #ff4747" : "1px solid rgba(255, 255, 255, 0.6)" }}
                {...register("link", { required: { message: "링크를 입력해주세요!", value: true } })}
                placeholder="여기에 링크를 입력하세요"
              />
              <span style={{ color: "#ff4747", fontSize: "3.5rem" }}>{formState.errors.link?.message || ""}</span>
              <DictPanelButton style={{ backgroundColor: "#5cd83d90" }}>
                <DictImage style={{ width: "4rem" }} src={shareIcon} />
                링크 불러오기
              </DictPanelButton>
            </form>
            <br />
            또는, <b>다운로드한 파일</b>을 <b>업로드</b>하세요!
            <DictPanelButton
              onClick={() => {
                uploadRef.current?.click();
              }}
              style={{ border: isFileUploadFailed ? "2px solid #ff4747" : "", backgroundColor: "#3dd8a990" }}
            >
              <DictImage style={{ width: "4rem" }} src={shareIcon} />
              파일 불러오기
            </DictPanelButton>
            <input
              type="file"
              accept=".dict"
              ref={uploadRef}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const file = event.currentTarget.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    try {
                      let parsed = JSON.parse((event.target?.result as string) ?? "");
                      const dictCustom: Record<string, IDict> = { ...JSON.parse(localStorage.getItem("dict-custom") ?? "{}") };
                      localStorage.setItem("dict-custom", JSON.stringify({ ...dictCustom, [v4()]: parsed }));
                      clearErrors();
                      setIsSharePanelOpen(false);
                      setIsFileUploadFailed(false);
                    } catch {
                      setIsFileUploadFailed(true);
                    }
                  };
                  reader.readAsText(file);
                }
              }}
              style={{ visibility: "hidden", width: "0px", height: "0px" }}
            />
            {isFileUploadFailed ? <span style={{ color: "#ff4747", fontSize: "3.5rem" }}>잘못된 파일. 업로드 중 문제가 발생했습니다!</span> : <> </>}
          </div>
        </DictPanel>
      </DictPanelBackgroundBox>
    </>
  );
};
