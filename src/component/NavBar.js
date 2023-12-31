import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Img,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "./LoginProvider";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Mousewheel, Pagination, Navigation, Autoplay } from "swiper/modules";
import { HamburgerIcon } from "@chakra-ui/icons";
import { faHotel } from "@fortawesome/free-solid-svg-icons/faHotel";
import { faTruckPlane } from "@fortawesome/free-solid-svg-icons/faTruckPlane";

export function NavBar() {
  const { fetchLogin, login, isAuthenticated, isAdmin } =
    useContext(LoginContext);
  const toast = useToast();
  const navigate = useNavigate();
  const urlParams = new URLSearchParams();
  const location = useLocation();

  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    fetchLogin();
  }, [location]);

  if (login !== "") {
    urlParams.set("userId", login.userId);
  }

  const VerticalSwiper = () => {
    return (
      <>
        <Box position="relative">
          <Swiper
            direction={"vertical"}
            slidesPerView={1}
            spaceBetween={30}
            mousewheel={true}
            pagination={{
              clickable: true,
            }}
            modules={[Mousewheel, Autoplay]}
            autoplay={{
              delay: 2500, // 각 슬라이드 간의 딜레이 (밀리초 단위)
              disableOnInteraction: false,
            }}
            className="mySwiper"
            style={{ width: "40px", height: "20px" }}
          >
            <SwiperSlide style={{ fontSize: "13px" }}>강릉</SwiperSlide>
            <SwiperSlide style={{ fontSize: "13px" }}>양양</SwiperSlide>
            <SwiperSlide style={{ fontSize: "13px" }}>속초</SwiperSlide>
            <SwiperSlide style={{ fontSize: "13px" }}>부산</SwiperSlide>
            <SwiperSlide style={{ fontSize: "13px" }}>여수</SwiperSlide>
            <SwiperSlide style={{ fontSize: "13px" }}>진도</SwiperSlide>
            <SwiperSlide style={{ fontSize: "13px" }}>고성</SwiperSlide>
            <SwiperSlide style={{ fontSize: "13px" }}>거제</SwiperSlide>
            <SwiperSlide style={{ fontSize: "13px" }}>가평</SwiperSlide>
          </Swiper>
        </Box>
      </>
    );
  };

  function handleLogout() {
    axios
      .post("/api/member/logout")
      .then(() => {
        toast({
          description: "로그아웃 되었습니다.",
          status: "info",
        });
        navigate("/");
      })
      .finally(() => {
        fetchLogin();
      });
  }

  return (
    <Box>
      {/* ------------------ 최상단 배너 ------------------ */}
      {/*<Flex bor justifyContent="center" w="100%" mt={-8}>*/}
      {/*  <Box w={"75%"} justifyContent={"center"} mt={"30px"} mb={8}>*/}
      {/*    <Image src="https://study1993garbi.s3.ap-northeast-2.amazonaws.com/travel/sourceFile/imgeFile/%E1%84%87%E1%85%A2%E1%84%82%E1%85%A52.jpeg" />*/}
      {/*  </Box>*/}
      {/*</Flex>*/}
      <Flex
        fontWeight={"700"}
        fontFamily={"GmarketSansMedium"}
        // mt={-9}
        justifyContent={"center"}
        w={"100%"}
      >
        <Box mt={4} w={"80%"}>
          {/* 헤더 네브바1 */}
          <Box mb={"5px"} w="80%" h={"80px"} ml="auto" mr="auto">
            <Flex justifyContent={"space-between"} textAlign={"center"}>
              {/* 프로젝트 로고 */}
              <Box
                w={"200px"}
                // background="#b0daeb"
                lineHeight={"80px"}
                ml={2}
                onClick={() => navigate("/")}
              >
                <Img
                  _hover={{ cursor: "pointer" }}
                  src="
                 https://study1993garbi.s3.ap-northeast-2.amazonaws.com/travel/board/63/LOGO3.png"
                  alt="프로젝트 로고"
                  w="200px"
                  h="77px"
                  onClick={() => navigate("/")}
                />
              </Box>

              {/* 검색창 */}
              <Flex alignItems={"center"} gap={3} mr={"-10px"}>
                <InputGroup w={"320px"}>
                  <Input
                    _hover={{ color: "teal" }}
                    borderRadius={"30px"}
                    background={"#f5f6f6"}
                    placeholder="검색어를 입력해 주세요."
                    fontSize={"13px"}
                  />
                  <InputRightElement
                    children={<FontAwesomeIcon icon={faMagnifyingGlass} />}
                  />
                </InputGroup>
              </Flex>

              <Flex alignItems={"center"}>
                <p
                  style={{
                    color: "gray",
                    fontSize: "13px",
                    marginRight: "7px",
                  }}
                >
                  인기검색어
                </p>
                <VerticalSwiper />
              </Flex>

              {/* 회원정보, 회원가입, 로그인 버튼 */}
              <Flex alignItems={"center"}>
                {isAdmin() && (
                  <Button
                    w={"80px"}
                    h={"30px"}
                    bg={"white"}
                    color="black"
                    _hover={{ color: "blue.600" }}
                    borderRadius={0}
                    fontSize={"0.8rem"}
                    // mr={4}
                    lineHeight={"80px"}
                    style={{ borderRadius: "30px" }}
                    onClick={() => navigate("/user/list")}
                  >
                    회원목록
                  </Button>
                )}

                {isAuthenticated() && (
                  <Box position="relative" zIndex="10">
                    <Menu isOpen={showMenu}>
                      <MenuButton
                        as={Button}
                        h={"30px"}
                        borderRadius={0}
                        fontSize={"0.8rem"}
                        lineHeight={"80px"}
                        border={"0px solid"}
                        bg={"white"}
                        color="black"
                        _hover={{ color: "blue.600", background: "white" }}
                        style={{ borderRadius: "30px", padding: "0 15px" }}
                        onMouseEnter={() => setShowMenu(true)}
                        onClick={() => {
                          setShowMenu(false);
                          navigate(
                            "/user/reservationList?" + urlParams.toString(),
                          );
                        }}
                      >
                        {login.userId}님
                      </MenuButton>
                      <MenuList
                        onMouseEnter={() => setShowMenu(true)}
                        onMouseLeave={() => setShowMenu(false)}
                      >
                        <MenuItem
                          onClick={() =>
                            navigate("/user?" + urlParams.toString())
                          }
                        >
                          회원정보수정
                        </MenuItem>
                        <MenuItem
                          onClick={() =>
                            navigate(
                              "/user/reservationList?" + urlParams.toString(),
                            )
                          }
                        >
                          예약내역
                        </MenuItem>
                        <MenuItem
                          onClick={() =>
                            navigate("/user/bucket?" + urlParams.toString())
                          }
                        >
                          찜한상품
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Box>
                )}

                {isAuthenticated() || (
                  <Button
                    w={"80px"}
                    h={"30px"}
                    borderRadius={0}
                    fontSize={"0.8rem"}
                    // ml={4}
                    bg={"white"}
                    color="black"
                    _hover={{ color: "blue.600" }}
                    style={{ borderRadius: "30px" }}
                    onClick={() => navigate("signup")}
                  >
                    회원가입
                  </Button>
                )}
                {isAuthenticated() || (
                  <Button
                    w={"50px"}
                    h={"30px"}
                    borderRadius={0}
                    fontSize={"0.8rem"}
                    // ml={4}
                    mr={2}
                    bg={"white"}
                    color="black"
                    _hover={{ color: "blue.600" }}
                    style={{ borderRadius: "30px" }}
                    onClick={() => navigate("login")}
                  >
                    로그인
                  </Button>
                )}
                {isAuthenticated() && (
                  <Button
                    w={"80px"}
                    h={"30px"}
                    borderRadius={0}
                    fontSize={"0.8rem"}
                    bg={"white"}
                    color="black"
                    _hover={{ color: "blue.600" }}
                    // ml={4}
                    mr={2}
                    style={{ borderRadius: "30px" }}
                    onClick={handleLogout}
                  >
                    로그아웃
                  </Button>
                )}
              </Flex>
            </Flex>
          </Box>
          {/* 헤더 네브바2 */}
          <Box borderTop={"1px solid #eeeeee"}></Box>
          <Box w="80%" h={"60px"} ml="10%">
            <Flex justifyContent={"space-between"} textAlign={"center"}>
              <Flex
                lineHeight={"60px"}
                alignItems={"center"}
                mt={"10px"}
                w={"170px"}
                ml={5}
              >
                <Menu>
                  <MenuButton
                    bg={"white"}
                    color="black"
                    _hover={{ color: "blue.600" }}
                    w={"80px"}
                    h={"40px"}
                    fontSize={"30px"}
                  >
                    <HamburgerIcon />
                  </MenuButton>
                  <MenuList
                    zIndex={10}
                    boxShadow="md"
                    minWidth="160px"
                    fontSize="13px"
                    p={0}
                  >
                    <MenuItem
                      borderBottom={"1px solid #eeeeee"}
                      onClick={() => navigate("hotel")}
                    >
                      호텔
                    </MenuItem>
                    <MenuItem
                      borderBottom={"1px solid #eeeeee"}
                      onClick={() => navigate("hotel/?k=리조트")}
                    >
                      리조트
                    </MenuItem>
                    <MenuItem
                      borderBottom={"1px solid #eeeeee"}
                      onClick={() => navigate("hotel/?k=캠핑")}
                    >
                      캠핑
                    </MenuItem>
                    <MenuItem
                      borderBottom={"1px solid #eeeeee"}
                      onClick={() => navigate("hotel/?k=반려견")}
                    >
                      반려견 동반 숙소
                    </MenuItem>
                    <MenuItem
                      borderBottom={"1px solid #eeeeee"}
                      onClick={() => navigate("hotel/?k=수영장")}
                    >
                      수영장 있는 숙소
                    </MenuItem>
                  </MenuList>
                </Menu>

                {/* 호텔 */}
                <HStack>
                  <Button
                    bg={"white"}
                    color="black"
                    _hover={{ color: "blue.600" }}
                    w={"80px"}
                    h={"40px"}
                    onClick={() => navigate("hotel")}
                    fontSize={"1.2rem"}
                  >
                    <HStack>
                      <FontAwesomeIcon icon={faHotel} />
                      <Box ml={-1} fontSize={"0.8rem"}>
                        숙소
                      </Box>
                    </HStack>
                  </Button>

                  {/* 운송 */}
                  <Button
                    bg={"white"}
                    color="black"
                    _hover={{ color: "blue.600" }}
                    w={"auto"}
                    h={"40px"}
                    onClick={() => navigate("transport")}
                    fontSize={"1.2rem"}
                    ml={-5}
                  >
                    <HStack>
                      <FontAwesomeIcon icon={faTruckPlane} />
                      <Box ml={-1} fontSize={"0.8rem"}>
                        버스/항공
                      </Box>
                    </HStack>
                  </Button>
                </HStack>
              </Flex>
              <Button
                w={"150px"}
                mr={-3}
                h={"40px"}
                mt={"10px"}
                bg={"white"}
                color="black"
                _hover={{ color: "blue.600" }}
                fontSize={"0.8rem"}
                onClick={() => navigate("boardlist")}
              >
                게시판 / 공지사항
              </Button>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
