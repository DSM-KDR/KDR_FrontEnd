import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import ContactContents from "./libs/constants/contact";
import PouecContents from "./libs/constants/pouec";
import AdminPage from "./pages/adminPage";
import ArticlePage from "./pages/articlePage";
import CategoryManagePage from "./pages/category/categoryManagePage";
import CategoryWritePage from "./pages/category/categoryWritePage";
import MainPage from "./pages/mainPage";
import NoticeDetailPage from "./pages/notice/noticeDetailPage";
import NoticeListPage from "./pages/notice/noticeListPage";
import NoticeManagePage from "./pages/notice/noticeManagePage";
import NoticeWritePage from "./pages/notice/noticeWritePage";
import PasswordPage from "./pages/passwordPage";
import ProductDetailPage from "./pages/product/productDetailPage";
import ProductListPage from "./pages/product/productListPage";
import ProductManagePage from "./pages/product/productManagePage";
import ProductWritePage from "./pages/product/productWritePage";
import { GlobalStyle } from "./styles/globalStyle";
import theme from "./styles/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/product" element={<ProductListPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/notice" element={<NoticeListPage />} />
          <Route path="/notice/:id" element={<NoticeDetailPage />} />
          <Route path="/admin/verify" element={<PasswordPage />} />
          <Route
            path="/admin/denied"
            element={<ArticlePage title="페이지 접근 권한이 없습니다." />}
          />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/notice" element={<NoticeManagePage />} />
          <Route path="/admin/notice/:id" element={<NoticeWritePage />} />
          <Route path="/admin/product" element={<ProductManagePage />} />
          <Route path="/admin/product/:id" element={<ProductWritePage />} />
          <Route path="/admin/category" element={<CategoryManagePage />} />
          <Route path="/admin/category/:id" element={<CategoryWritePage />} />
          <Route
            path="/pouec"
            element={
              <ArticlePage
                title="이메일무단수집거부"
                contents={<PouecContents />}
              />
            }
          />
          <Route
            path="/contact"
            element={
              <ArticlePage title="고객센터" contents={<ContactContents />} />
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
