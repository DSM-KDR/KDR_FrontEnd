import { useState } from "react";
import styled from "styled-components";
import Input from "../input";

interface SearchBarProps {
  value: string;
  setValue: (value: string) => void;
  refetch?: () => void;
}

const SearchBar = ({ value, setValue, refetch }: SearchBarProps) => {
  const [inputState, setInputState] = useState<string>(value);

  return (
    <Wrapper
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setValue(inputState);
        if (refetch) refetch();
      }}
    >
      <Input
        id="search"
        inputType="search"
        labelText="검색..."
        value={inputState}
        setValue={(query: string) => setInputState(query)}
      />
    </Wrapper>
  );
};

export default SearchBar;

const Wrapper = styled.form`
  padding: 8px;

  border-radius: 10px;

  ${({ theme }) => theme.common.boxShadow}
`;
