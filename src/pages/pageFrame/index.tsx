import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import PageHead from "../../components/pageHead";
import Spinner from "../../components/spinner";
import Wrapper from "../../components/wrapper";
import { authRefresh } from "../../libs/apis/auth/refresh";
import { getCookie } from "../../libs/utils/cookie";
import { isEndWithConsonant } from "../../libs/utils/isEndWithConsonant";

interface PageFrameProps {
  children: JSX.Element | JSX.Element[];
  goBackTo?: string;
  goBackTitle?: string;
  pageHeadTitle?: string;
  pageHeadDescription?: string;
  isLoading?: boolean;
  isAdminPage?: boolean;
}

const PageFrame = ({
  children,
  goBackTo,
  goBackTitle,
  pageHeadTitle,
  pageHeadDescription,
  isLoading,
  isAdminPage = false,
}: PageFrameProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAdminPage === true) {
      if (!getCookie("accessToken")) navigate("/admin/verify");
      else authRefresh();
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCookie("accessToken")]);

  const element = (
    <>
      {isLoading && <Spinner displayType="cover" />}
      <Navbar />
      <Wrapper>
        {goBackTo && (
          <aside>
            <Link to={goBackTo}>
              ← {goBackTitle}
              {isEndWithConsonant(goBackTitle) && "으"}로 돌아가기
            </Link>
          </aside>
        )}
        {pageHeadTitle && (
          <PageHead title={pageHeadTitle} description={pageHeadDescription} />
        )}
        <>{children}</>
      </Wrapper>
      <Footer />
    </>
  );

  return isAdminPage ? getCookie("accessToken") && element : element;
};

export default PageFrame;
