import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import Button from "../../../components/button";
import Input from "../../../components/input";
import useCategory from "../../../hooks/useCategory";
import { categoryCreate } from "../../../libs/apis/category/create";
import { CategoryCreateRequestType } from "../../../types/category/create/request";
import PageFrame from "../../pageFrame";

const CategoryWritePage = () => {
  const params = useParams();
  const categoryQuery = useCategory(params.id);
  const [inputState, setInputState] = useState<CategoryCreateRequestType>({
    category: "",
    image: "",
  });
  useEffect(() => {
    if (categoryQuery.data)
      categoryQuery.data.forEach((v) => {
        if (v.id === parseInt(params.id)) {
          setInputState(v);
          return;
        }
      }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryQuery.data]);

  const categoryMutation = useMutation(
    ["categoryMutation", params.id],
    categoryCreate
  );

  const validateForm = (): boolean => {
    if (inputState.image === "") {
      alert("카테고리 사진이 선택되지 않았습니다!");
      return false;
    }
    if (inputState.category === "") {
      alert("카테고리 이름이 입력되지 않았습니다!");
      return false;
    }
    return true;
  };
  const isLoading =
    categoryMutation.status === "loading" ||
    (categoryMutation.status !== "success" && !categoryMutation);

  return (
    <PageFrame
      goBackTo="/admin/category"
      goBackTitle="카테고리 관리"
      isLoading={isLoading}
      isAdminPage={true}
    >
      <article>
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (validateForm()) categoryMutation.mutate(inputState);
          }}
        >
          <Input
            inputType="image"
            id="image"
            labelText="카테고리 사진"
            value={inputState.image}
            setValue={(image: string) => {
              setInputState((prevState) => {
                return { ...prevState, image: image };
              });
            }}
            disabled={params.id !== "create"}
          />
          <Input
            inputType="input"
            id="title"
            labelText="카테고리 이름"
            placeholder="이름 입력..."
            value={inputState.category}
            setValue={(category: string) => {
              setInputState((prevState) => {
                return { ...prevState, category: category };
              });
            }}
            disabled={params.id !== "create"}
          />
          {params.id === "create" ? (
            <Button labelText="생성" buttonType="submit" />
          ) : (
            <Button labelText="삭제" buttonType="error" />
          )}
        </form>
      </article>
    </PageFrame>
  );
};

export default CategoryWritePage;
