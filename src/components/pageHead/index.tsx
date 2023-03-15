import styled from "styled-components";
import { Logo } from "../../assets/images";

interface PageHeadProps {
  title: string;
  description: string;
}

const PageHead = ({ title, description }: PageHeadProps) => {
  return (
    <>
      <Wrapper>
        <img src={Logo} alt="키다리아저씨 푸드 로고" width="48" height="48" />
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </Wrapper>
    </>
  );
};

export default PageHead;

const Wrapper = styled.article`
  padding-top: 8px;

  display: flex;

  img {
    border-radius: 50%;
  }

  div {
    margin-left: 8px;
  }
`;
