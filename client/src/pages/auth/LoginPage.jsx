import { LoginForm } from "@/components/auth/Forms";

import React from "react";

const LoginPage = () => {
  return (
    <section className="font-inter">
      <div className="flex justify-center relative">
        <img
          src="/bg/login-bg.webp"
          alt="gradient background image"
          className="w-full h-full object-cover fixed"
        />
        <div className="mx-auto max-w-lg px-6 lg:px-8 absolute py-20">
          <img
            src="https://pagedone.io/asset/uploads/1702362108.png"
            alt="pagedone logo"
            className="mx-auto lg:mb-11 mb-8 object-cover"
          />
          <div className="rounded-2xl bg-white shadow-xl ">
            <LoginForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
