import { Navigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = getAuth();
  const user = auth.currentUser;

  // 로그인 안 된 경우 로그인 페이지로 이동
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 로그인 된 경우 자식 컴포넌트 렌더링
  return <>{children}</>;
}
