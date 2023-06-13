import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { listen } from "./redux/listener";
import { AppRoutes } from "./routes";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

function App() {
  useEffect(() => {
    listen();
  }, []);
  console.log(listen);

  return (
    <>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
