import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "@/redux/thunks/authActions";
import { resetError } from "@/redux/slices/authSlice";

const useAuth = () => {
  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  React.useEffect(() => {
    dispatch(resetError());
  }, [location.pathname, dispatch]);

  const handleRegisterSubmit = async (data) => {
    try {
      const resultAction = await dispatch(registerUser(data)).unwrap();
      if (resultAction && resultAction.success) navigate("/");
    } catch (error) {
      console.error("ERROR - useAuth.jsx - onSubmit:", error);
    }
  };

  const handleLoginSubmit = async (data) => {
    try {
      const resultAction = await dispatch(loginUser(data)).unwrap();
      if (resultAction && resultAction.success) navigate("/");
    } catch (error) {
      console.error("ERROR - useAuth.jsx - onSubmit:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      navigate("/login");
    } catch (error) {
      console.error("ERROR - useAuth.jsx - handleLogout:", error);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    handleRegisterSubmit,
    handleLoginSubmit,
    handleLogout,
    error,
    loading,
  };
};

export default useAuth;
