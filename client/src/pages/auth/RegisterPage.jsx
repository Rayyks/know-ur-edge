import { RegisterForm } from "@/components/auth/Forms";
import React from "react";
import { Link } from "react-router-dom";
import { HelpCircle } from "lucide-react";

const RegisterPage = () => {
  return (
    <section className="font-inter">
      <div className="flex justify-center relative">
        <img
          src="https://pagedone.io/asset/uploads/1702362010.png"
          alt="gradient background image"
          className="w-full h-full object-cover fixed brightness-50"
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 absolute py-24">
          <div className="grid lg:grid-cols-2 grid-cols-1">
            <div className="lg:mb-0 mb-10">
              <div className="group w-full h-full">
                <div className="relative h-full">
                  <img
                    src="https://pagedone.io/asset/uploads/1696488602.png"
                    alt="ContactUs tailwind section"
                    className="w-full h-full lg:rounded-l-2xl rounded-2xl bg-blend-multiply bg-indigo-700 object-cover"
                  />
                  <h1 className="font-manrope text-white text-4xl font-bold leading-10 absolute top-11 left-11">
                    Before you create your account
                  </h1>
                  <div className="absolute bottom-0 w-full lg:p-11 p-5">
                    <div className="bg-white rounded-lg p-3 block space-y-4">
                      <Link
                        to="/terms-and-conditions"
                        className="flex items-center bg-slate-100 hover:bg-slate-300 p-3 rounded-xl transition-colors duration-300"
                      >
                        {/* ICONS */}
                        <HelpCircle className="text-black" size={24} />
                        <h5 className="text-black text-base font-normal leading-6 ml-5">
                          Read Our Terms and Conditions
                        </h5>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center bg-gray-50 p-5 lg:p-11 lg:rounded-r-2xl rounded-2xl">
              <RegisterForm />
              <Link
                to="/login"
                className="flex justify-center text-gray-900 text-base font-medium leading-6 pt-10"
              >
                {" "}
                Already have an account?{" "}
                <span className="text-indigo-600 font-semibold pl-3 hover:underline">
                  {" "}
                  Sign In
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
