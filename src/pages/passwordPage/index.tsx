import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Spinner from "../../components/spinner";
import { authLogin } from "../../libs/apis/auth/login";
import PageFrame from "../pageFrame";

const PasswordPage = () => {
  const navigate = useNavigate();

  const [inputState, setInputState] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validateForm = (): boolean => {
    if (inputState === "") {
      alert("암호가 입력되지 않았습니다!");
      return false;
    }
    return true;
  };

  return (
    <PageFrame>
      {isLoading && <Spinner displayType="cover" />}
      <section>
        <Title>
          <h2>주의!</h2>
          <p>외부인 출입이 제한된 페이지에 접근 중입니다.</p>
        </Title>
        <Contents>
          <form
            onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              if (validateForm && !isLoading) {
                setIsLoading(true);
                const response = await authLogin({ password: inputState });
                setIsLoading(false);
                if (response) navigate("/admin");
                else alert("비밀번호가 일치하지 않습니다.");
              }
            }}
          >
            <label htmlFor="pw">암호를 입력해주세요.</label>
            <input
              id="pw"
              type="password"
              placeholder="비밀번호 입력..."
              value={inputState}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setInputState(e.currentTarget.value)
              }
            />
          </form>
        </Contents>
      </section>
    </PageFrame>
  );
};

export default PasswordPage;

const Title = styled.article`
  padding-bottom: 8px;
  margin-bottom: 8px;

  border-bottom: 1px solid ${({ theme }) => theme.colors.grey};

  p {
    margin-top: 8px;
  }
`;

const Contents = styled.article`
  padding: 8px;

  border-radius: 10px;

  ${({ theme }) => theme.common.boxShadow}

  form {
    display: flex;
    flex-direction: column;

    label {
      min-width: max-content;
    }

    input {
      padding: 8px;
      margin-top: 8px;

      width: 100%;

      border: none;
      border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
    }
  }
`;
