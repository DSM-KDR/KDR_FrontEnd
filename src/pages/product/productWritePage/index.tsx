import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/button";
import Input from "../../../components/input";
import useCategory from "../../../hooks/useCategory";
import useProduct from "../../../hooks/useProduct";
import { productCreate } from "../../../libs/apis/product/create";
import { ProductCreateRequestType } from "../../../types/product/create/request";
import PageFrame from "../../pageFrame";

const ProductWritePage = () => {
  const params = useParams();
  const categoryQuery = useCategory();
  const productQuery = useProduct({ id: params.id });
  const [inputState, setInputState] = useState<ProductCreateRequestType>({
    name: "",
    image: "",
    category: [],
    capacity: 0,
    description: "",
    price: 0,
    origin: "",
  });
  useEffect(() => {
    if (productQuery.data) setInputState(productQuery.data);
  }, [productQuery.data]);

  const productMutation = useMutation("productListState", productCreate);
  const navigate = useNavigate();
  useEffect(() => {
    if (productMutation.data) {
      alert("상품 생성이 성공적으로 완료되었습니다.");
      navigate("/admin/product");
    } else if (productMutation.data === false)
      alert("알 수 없는 오류가 발생했습니다.");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productMutation.data]);

  const validateForm = (): boolean => {
    if (inputState.image === "") {
      alert("상품 사진이 선택되지 않았습니다!");
      return false;
    }
    if (inputState.name === "") {
      alert("상품 이름이 입력되지 않았습니다!");
      return false;
    }
    if (`${inputState.price}` === "") {
      alert("상품 가격이 입력되지 않았습니다!");
      return false;
    }
    if (inputState.origin === "") {
      alert("상품 원산지가 입력되지 않았습니다!");
      return false;
    }
    if (`${inputState.capacity}` === "") {
      alert("상품 중량이 입력되지 않았습니다!");
      return false;
    }
    if (inputState.category.join(", ").length === 0) {
      alert("상품 분류가 입력되지 않았습니다!");
      return false;
    }
    if (inputState.description === "") {
      alert("상품 설명이 입력되지 않았습니다!");
      return false;
    }
    return true;
  };
  const convertInputState = (): ProductCreateRequestType | boolean => {
    try {
      return {
        ...inputState,
        category: inputState.category.map(
          (category) =>
            (category = categoryQuery.data.filter(
              (data) => data.category === category
            )[0].id)
        ),
      };
    } catch {
      alert("잘못된 상품 분류 입니다!");
      return false;
    }
  };
  const isLoading =
    productQuery.status === "loading" ||
    (params.id !== "create" &&
      productQuery.status !== "success" &&
      !productQuery.data);

  return (
    <PageFrame
      goBackTo="/admin/product"
      goBackTitle="상품 관리"
      isLoading={isLoading}
      isAdminPage={true}
    >
      <article>
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (validateForm()) {
              const conversion = convertInputState();
              if (conversion)
                productMutation.mutate(conversion as ProductCreateRequestType);
            }
          }}
        >
          <Input
            inputType="image"
            id="image"
            labelText="상품 사진"
            value={inputState && inputState.image}
            setValue={(image: string) => {
              setInputState((prevState) => {
                return { ...prevState, image: image };
              });
            }}
          />
          <Input
            inputType="input"
            id="title"
            labelText="상품 이름"
            placeholder="이름 입력..."
            value={inputState && inputState.name}
            setValue={(name: string) => {
              setInputState((prevState) => {
                return { ...prevState, name: name };
              });
            }}
          />
          <Input
            inputType="number"
            id="price"
            labelText="상품 가격"
            placeholder="가격 입력..."
            value={inputState && inputState.price}
            setValue={(price: number) => {
              setInputState((prevState) => {
                return { ...prevState, price: price };
              });
            }}
          />
          <Input
            inputType="input"
            id="origin"
            labelText="상품 원산지"
            placeholder="원산지 입력..."
            value={inputState && inputState.origin}
            setValue={(origin: string) => {
              setInputState((prevState) => {
                return { ...prevState, origin: origin };
              });
            }}
          />
          <Input
            inputType="number"
            id="capacity"
            labelText="상품 중량"
            placeholder="중량 입력..."
            value={inputState && inputState.capacity}
            setValue={(capacity: number) => {
              setInputState((prevState) => {
                return { ...prevState, capacity: capacity };
              });
            }}
          />
          <Input
            inputType="input"
            id="category"
            labelText="상품 분류"
            placeholder="카테고리 입력..."
            value={inputState && inputState.category.join(", ")}
            setValue={(category: string) => {
              setInputState((prevState) => {
                return { ...prevState, category: category.split(", ") };
              });
            }}
          />
          <Input
            inputType="textarea"
            id="description"
            labelText="상품 설명"
            placeholder="내용 입력..."
            value={inputState && inputState.description}
            setValue={(description: string) => {
              setInputState((prevState) => {
                return { ...prevState, description: description };
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
  );
};

export default ProductWritePage;
