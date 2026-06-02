import React from "react";
import Button from "../components/Button";

const Home: React.FC = () => {
  return (
    <div className="flex h-full flex-col justify-end gap-6 px-4 py-14">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome to PopX
        </h1>

        <p className="text-sm text-gray-500 text-justify">
          PopX is a comprehensive MSP platform that seamlessly integrates and automates service operations.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <Button to="/signup" variant="primary">
          Create Account
        </Button>

        <Button to="/login" variant="secondary">
          Already Registered ? Login
        </Button>
      </div>
    </div>
  );
};

export default Home;