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
import { z } from "zod";

export const DictPage = () => {
  const { setColorPair, setToastMessage } = React.useContext(IndexContext);
  const { hash } = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    setColorPair(["#d6b547", "#ffeac4"]);
    const target = decodeURIComponent(hash).substring(1);
    try {
      let parsed = JSON.parse(target);
      const validator = z.object({
        name: z.string(),
        description: z.string(),
        content: z.record(z.string(), z.array(z.object({ key: z.string(), form: z.array(z.string()), sound: z.array(z.string()), define: z.string().optional() }))),
        edit: z.enum(["disallow", "allow"])
      })
      validator.parse(parsed)
      
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
          <DictButton style={{ width: "max-content", backgroundColor: "#ffffff70" }}>
            <DictImage src={leftChevron} />
            이전으로 (홈)
          </DictButton>
        </DictLink>
        <DictArticle>
          <DictSubTitle>
            기본 사전 <span>({Object.keys(dictCommon).length})</span>
          </DictSubTitle>
          <DictToViewBox>
            {Object.entries(dictCommon).map(([key, value]) => (
              <DictToView key={key} onClick={() => navigate(`view/${key}`)}>
                字 {value.name}
              </DictToView>
            ))}
          </DictToViewBox>
          <DictSubTitle>
            사용자 추가 사전 <span>({Object.keys(dictCustom).length})</span>
          </DictSubTitle>
          <div style={{ display: "flex", flexDirection: "row", gap: "1rem", flexWrap: "wrap" }}>
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
                      <DictToView onClick={() => navigate(`view/${key}`)} key={key}>
                        字 {value.name}
                      </DictToView>
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
          <div style={{ wordBreak: "keep-all" }}>
            <b>다운로드한 사전</b>을 <b>업로드</b>하세요!
            <br></br>
            사전 공유는 <b>각 사전 조회 페이지</b>에서 <b>공유하기</b> 버튼을 눌러 사전을 다운받을 수 있습니다.
            <br></br>
            <span style={{ color: "#00000090", fontStyle: "italic", fontSize: "3.5rem" }}>부수.dict 형식의 사전을 업로드하세요!</span>
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
                      setToastMessage([`"${parsed.name}" 사전을 불러왔습니다!`]);
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
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
            <DictPanelButton
              onClick={() => {
                uploadRef.current?.click();
              }}
              style={{
                border: isFileUploadFailed ? "2px solid #ff4747" : "",
                backgroundColor: "#3dd8a990",
                alignItems: "center",
                margin: "2rem",
                fontSize: "5rem",
              }}
            >
              <DictImage style={{ width: "5rem" }} src={shareIcon} />
              파일 불러오기
            </DictPanelButton>
          </div>
        </DictPanel>
      </DictPanelBackgroundBox>
    </>
  );
};
