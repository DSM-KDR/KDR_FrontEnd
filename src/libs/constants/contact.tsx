import styled from "styled-components";

const ContactContents = () => {
  return (
    <Wrapper>
      <dl>
        <dd>
          항상 키다리아저씨 푸드에 관심을 가져주시고 사랑해 주셔서 감사합니다.
        </dd>
        <dd>
          키다리아저씨 푸드에 대하여 궁금하신 점이나 개선이 필요하다고 느끼시는
          부분이 있다면 편히 문의해주시기를 바랍니다.
        </dd>
        <dt>이메일</dt>
        <dd>naver@naver.com</dd>
        <dt>전화번호</dt>
        <dd>010-1234-5678</dd>
      </dl>
    </Wrapper>
  );
};

export default ContactContents;

const Wrapper = styled.article`
  dd,
  dt {
    margin-bottom: 8px;

    width: 100%;
  }

  dt {
    padding-left: 8px;

    font-weight: 600;

    border-left: 3px solid ${({ theme }) => theme.colors.black};
  }
`;
