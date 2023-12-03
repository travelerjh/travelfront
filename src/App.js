import React, { createContext, useEffect, useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { HomeLayout } from "./layout/HomeLayout";
import { HomeBody } from "./component/HomeBody";
import { TransPort } from "./page/transport/TransPort";
import { Hotel } from "./page/hotel/Hotel";
import { UserLogin } from "./page/member/UserLogin";
import { UserSignup } from "./page/member/UserSignup";
import { UserEdit } from "./page/member/UserEdit";
import { TransPortList } from "./page/transport/TransPortList";
import { TransPortWrite } from "./page/transport/TransPortWrite";
import { BoardList } from "./page/board/BoardList";
import { BoardWrite } from "./page/board/BoardWrite";
import { BoardView } from "./page/board/BoardView";
import { BoardEdit } from "./page/board/BoardEdit";
import { Reserv } from "./page/hotel/Reserv";
import { AuthPage } from "./page/member/AuthPage";
import { TransPortView } from "./page/transport/TransPortView";
import { TransPortEdit } from "./page/transport/TransPortEdit";
import axios from "axios";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HomeLayout />}>
      <Route index element={<HomeBody />} />
      <Route path="transport" element={<TransPort />} />
      <Route path="transport/:id" element={<TransPortView />} />
      <Route path="transport/list" element={<TransPortList />} />
      <Route path="transport/write" element={<TransPortWrite />} />
      <Route path="transport/edit/:id" element={<TransPortEdit />} />
      <Route path="hotel" element={<Hotel />} />
      <Route path="boardlist" element={<BoardList />} />
      <Route path="boardwrite" element={<BoardWrite />} />
      <Route path="board/:id" element={<BoardView />} />
      <Route path="edit/:id" element={<BoardEdit />} />
      <Route path="login" element={<UserLogin />} />
      <Route path="auth" element={<AuthPage />} />
      <Route path="signup" element={<UserSignup />} />
      <Route path="userEdit" element={<UserEdit />} />
      <Route path="hotel/reserv/:id" element={<Reserv />} />
    </Route>,
  ),
);

export const LoginContext = createContext(null);

function App() {
  const [login, setLogin] = useState("");
  // const code = new URL(window.location.href).searchParams.get("code");
  const code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    fetchLogin();
  }, []);

  console.log(login);

  // 카카오 로그인 세션저장용 -동작안됨-
  // function fetchLogin() {
  //   if (code) {
  //     axios
  //       .post("/api/member/kakaoLogin", null, {
  //         params: {
  //           code: code,
  //         },
  //       })
  //       .then((response) => setLogin(response.data));
  //   }
  // }

  // 일반로그인 세션저장용
  function fetchLogin() {
    axios.get("/api/member/login").then((response) => setLogin(response.data));
  }

  // 로그인상태
  function isAuthenticated() {
    return login !== ""; // 빈 스트링이 아니면 로그인상태
  }

  return (
    <LoginContext.Provider value={{ login, fetchLogin, isAuthenticated }}>
      <RouterProvider router={routes} />;
    </LoginContext.Provider>
  );
}

export default App;
