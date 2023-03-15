import { useEffect, useRef } from "react";
import styled from "styled-components";
import { Search, Upload } from "../../assets/images";
import { resizeTextarea } from "../../libs/utils/resizeTextarea";
import { readFile } from "../../libs/utils/readFile";

interface InputProps {
  inputType: "input" | "number" | "textarea" | "image" | "search";
  id: string;
  placeholder?: string;
  value: string | number;
  labelText: string;
  setValue?: (value: string | number, labelIndex?: number) => void;
  disabled?: boolean;
}

const Input = ({
  inputType,
  id,
  placeholder,
  value,
  labelText,
  setValue,
  disabled,
}: InputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (inputType === "textarea") resizeTextarea(textareaRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const fileRef = useRef<HTMLInputElement>(null);

  return inputType === "image" ? (
    <UploadImage previewImage={value as string}>
      <label htmlFor="image">{!value && `${labelText} 업로드`}</label>
      <input
        ref={fileRef}
        id="image"
        type="file"
        accept="image/*"
        onChange={() => readFile(fileRef, setValue)}
        disabled={disabled}
      />
    </UploadImage>
  ) : (
    <>
      {inputType === "input" && (
        <Wrapper>
          <label htmlFor={id}>{labelText}</label>
          <input
            id={id}
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setValue!(e.currentTarget.value)
            }
            disabled={disabled}
          />{" "}
        </Wrapper>
      )}
      {inputType === "number" && (
        <Wrapper>
          <label htmlFor={id}>{labelText}</label>
          <input
            id={id}
            type="number"
            placeholder={placeholder}
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setValue!(e.currentTarget.value)
            }
            disabled={disabled}
          />{" "}
        </Wrapper>
      )}
      {inputType === "textarea" && (
        <Wrapper>
          <label htmlFor={id}>{labelText}</label>
          <textarea
            id={id}
            ref={textareaRef}
            placeholder={placeholder}
            value={value}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              resizeTextarea(textareaRef.current);
              setValue!(e.currentTarget.value);
            }}
            disabled={disabled}
          />{" "}
        </Wrapper>
      )}
      {inputType === "search" && (
        <SearchInput>
          <input
            id={id}
            type="search"
            placeholder={labelText}
            defaultValue={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setValue!(e.currentTarget.value)
            }
          />
          <img src={Search} alt="검색" />
        </SearchInput>
      )}
    </>
  );
};

export default Input;

const SearchInput = styled.div`
  width: 100%;
  height: 24px;

  display: flex;
  align-items: center;

  input {
    padding-left: 24px;
    padding-right: 8px;
    padding-bottom: 1px;

    width: 100%;
    height: 24px;

    border: none;
    border-radius: 6px;
  }

  img {
    position: absolute;

    margin-left: 8px;
  }
`;

interface UploadImageProps {
  previewImage: string;
}

const UploadImage = styled.div<UploadImageProps>`
  margin-top: 8px;

  display: flex;
  justify-content: center;
  align-items: flex-end;

  span {
    position: absolute;

    margin-bottom: 8px;
  }

  input {
    display: none;
  }

  label {
    background-color: ${({ theme }) => theme.colors.white};

    ${(props) =>
      props.previewImage
        ? `background-image: url(${props.previewImage});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;`
        : `background-image: url(${Upload});
    background-repeat: no-repeat;
    background-position: 50% calc(50% - 14px);
    padding-top: 56px;`}

    width: 100%;
    height: 224px;

    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 10px;

    ${({ theme }) => theme.common.boxShadow}
    ${({ theme }) => theme.common.hoverEffect}
  }
`;

const Wrapper = styled.div`
  margin-top: 8px;

  display: flex;
  flex-direction: column;

  input {
    padding: 8px;
    margin-top: 8px;

    width: 100%;

    border: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.grey};

    :disabled {
      background-color: transparent;
    }
  }

  textarea {
    background-color: ${({ theme }) => theme.colors.white};

    padding: 8px;
    margin-top: 8px;

    width: 100%;

    border: none;
    border-radius: 10px;
    resize: none;
    overflow: hidden;

    ${({ theme }) => theme.common.boxShadow}
  }
`;
