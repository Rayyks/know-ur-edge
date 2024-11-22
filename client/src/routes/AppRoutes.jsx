import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<>LAYOUTS</>}>
          <Route path="home" element={<>HOME</>} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
