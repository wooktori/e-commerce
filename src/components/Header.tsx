import { Link } from "react-router-dom";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { CiSearch } from "react-icons/ci";
import { BiShoppingBag } from "react-icons/bi";

export default function Header() {
  const hot = [
    // 실서비스일 때는 인기검색어 api에서 데이터 가져와서 보여주기.
    "반팔",
    "반바지",
    "셔츠",
    "슬랙스",
    "데님팬츠",
    "조거팬츠",
    "래시가드",
    "무지티셔츠",
    "밴딩팬츠",
    "바람막이",
  ];
  const [index, setIndex] = useState(0);
  const [isScrollDown, setIsScrollDown] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % hot.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrollDown(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`flex flex-col gap-5 p-5 fixed top-0 w-full ${
        isScrollDown ? "shadow-md" : ""
      }`}
    >
      <div className="flex justify-between items-center px-5 text-sm">
        <div className="flex gap-2">
          <Link to="">로그인</Link>
          <Link to="">회원가입</Link>
          <Link to="">주문조회</Link>
          <Link to="">장바구니</Link>
          <Link to="">마이페이지</Link>
        </div>
        <div className="flex gap-2 items-center">
          <HoverCard>
            <HoverCardTrigger className="w-36">
              {index + 1}. {hot[index]}
            </HoverCardTrigger>
            <HoverCardContent className="w-28 flex gap-2 flex-col">
              <div>인기검색어</div>
              <hr />
              {hot.map((item, index) => (
                <div key={index} className="text-xs transition">
                  {index + 1}. {item}
                </div>
              ))}
            </HoverCardContent>
          </HoverCard>
          <div className="relative w-full">
            <Input type="text" placeholder="검색어를 입력하세요."></Input>
            <CiSearch className="w-8 h-8 absolute top-0 right-0" />
          </div>
          <BiShoppingBag className="w-12 h-12" />
        </div>
      </div>
      <div className="text-3xl font-bold text-center">WOOKPANG</div>
      <div className="flex justify-around items-center mt-5">
        <span>상의</span>
        <span>하의</span>
        <span>아우터</span>
        <span>속옷</span>
        <span>신발</span>
        <span>악세사리</span>
      </div>
    </div>
  );
}
