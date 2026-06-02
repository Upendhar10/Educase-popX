import { BrowserRouter, Routes, Route } from "react-router-dom"

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element='App'>
          <Route index element='HOME' />
          <Route path="*" element='NotFound' />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router