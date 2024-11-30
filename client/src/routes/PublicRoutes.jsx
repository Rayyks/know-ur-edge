import { Loader } from "@/components/common/Loader";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PublicRoutes = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        navigate("/");
      } else {
        setIsCheckingAuth(false);
      }
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading || isCheckingAuth) {
    return <Loader />;
  }

  return children;
};

export default PublicRoutes;
