import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/button";
import Input from "../../../components/input";
import useNotice from "../../../hooks/useNotice";
import { noticeCreate } from "../../../libs/apis/notice/create";
import { NoticeCreateRequestType } from "../../../types/notice/create/request";
import PageFrame from "../../pageFrame";

const NoticeWritePage = () => {
  const params = useParams();
  const noticeQuery = useNotice({ id: params.id });
  const [inputState, setInputState] = useState<NoticeCreateRequestType>({
    title: "",
    content: "",
  });
  useEffect(() => {
    if (noticeQuery.data) setInputState(noticeQuery.data);
  }, [noticeQuery.data]);

  const noticeMutation = useMutation(
    ["noticeMutation", params.id],
    noticeCreate
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (noticeMutation.data) {
      alert("공지사항 생성이 성공적으로 완료되었습니다.");
      navigate("/admin/product");
    } else if (noticeMutation.data === false)
      alert("알 수 없는 오류가 발생했습니다.");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noticeMutation.data]);

  const validateForm = (): boolean => {
    if (inputState.title === "") {
      alert("공지사항 제목이 입력되지 않았습니다!");
      return false;
    }
    if (inputState.content === "") {
      alert("공지사항 내용이 입력되지 않았습니다!");
      return false;
    }
    return true;
  };
  const isLoading =
    noticeQuery.status === "loading" ||
    (params.id !== "create" &&
      noticeQuery.status !== "success" &&
      !noticeQuery.data);

  return (
    <>
      <PageFrame
        goBackTo="/admin/notice"
        goBackTitle="공지사항 관리"
        isLoading={isLoading}
        isAdminPage={true}
      >
        <article>
          <form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              if (validateForm()) noticeMutation.mutate(inputState);
            }}
          >
            <Input
              inputType="input"
              id="title"
              labelText="공지사항 제목"
              placeholder="제목 입력..."
              value={inputState.title}
              setValue={(title: string) => {
                setInputState((prevState) => {
                  return { ...prevState, title: title };
                });
              }}
            />
            <Input
              inputType="textarea"
              id="contents"
              labelText="공지사항 내용"
              placeholder="내용 입력..."
              value={inputState.content}
              setValue={(content: string) => {
                setInputState((prevState) => {
                  return { ...prevState, content: content };
                });
              }}
            />
            {params.id === "create" ? (
              <Button labelText="생성" buttonType="submit" />
            ) : (
              <>
                <Button labelText="수정" buttonType="submit" />
                <Button labelText="삭제" buttonType="error" />
              </>
            )}
          </form>
        </article>
      </PageFrame>
      )
    </>
  );
};

export default NoticeWritePage;
