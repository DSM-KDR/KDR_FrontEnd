import ReactDOM from "react-dom/client";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { RecoilRoot } from "recoil";
import App from "./App";

const rootNode = document.getElementById("root");
if (!rootNode) throw new Error("Root Node Not Found");
const root = ReactDOM.createRoot(rootNode);

const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <ReactQueryDevtools initialIsOpen={true} />
      <App />
    </RecoilRoot>
  </QueryClientProvider>
);
