import {Route, Routes} from "react-router-dom";

import YourInformationPage from "@/pages/index";
import ErrorPage from "@/pages/error.tsx";
import CancerStatusPage from "@/pages/cancer-status.tsx";

function App() {
  return (
      <Routes>
        <Route element={<YourInformationPage/>} path="/"/>
        <Route element={<ErrorPage/>} path="/error"/>
        <Route element={<CancerStatusPage/>} path="/cancer-status"/>
      </Routes>
  );
}

export default App;
