import { getAuth } from "firebase/auth";
import { useEffect } from "react";

export default function Mypage() {
  const auth = getAuth();
  useEffect(() => {
    console.log(auth);
  }, []);
  return <>마이페이지</>;
}
