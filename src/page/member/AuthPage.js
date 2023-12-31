import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { Box, Center, Spinner, useToast } from "@chakra-ui/react";

export function AuthPage() {
  const location = useLocation();
  const code = new URL(window.location.href).searchParams.get("code"); // 인가코드 뽑아오기
  const navigate = useNavigate();

  const toast = useToast();

  useEffect(() => {
    if (code) {
      // 카카오에서 받은 code를 서버로 전송
      axios
        .post("/api/member/kakaoLogin", null, {
          params: {
            code: code,
          },
        })
        .then((response) => {
          toast({
            description: "로그인 성공",
            status: "success",
          });
          sessionStorage.setItem("userId", response.data.userId);
          navigate("/");
          // // 서버 응답에 따른 처리
          // if (response.data.success) {
          //   // 로그인 성공
          //   console.log("로그인 성공");
          // } else {
          //   // 실패에 대한 처리
          //   console.log(code);
          //   console.error("로그인 실패");
          // }
        })
        .catch((error) => {
          console.error("서버 요청 오류:", error.response.data);
        });
    } else {
      // 카카오로부터 받은 code가 없는 경우에 대한 처리
      console.error("카카오로부터 받은 code가 없습니다.");
    }
  }, [code]);
  return (
    <Center>
      <h1>로그인중...</h1>
      <Spinner />
    </Center>
  );
}
