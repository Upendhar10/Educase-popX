import React from "react";
import { useNavigate } from "react-router-dom";

const DEFAULT_PROFILE_IMG = "https://img.icons8.com/?size=100&id=AZOFoSZnC0QG&format=png&color=000000";

interface UserProfile {
  name: string;
  email: string;
  number: string;
  company: string;
  isAgency: "yes" | "no";
  photoURL?: string;
}

const Account: React.FC = () => {
  const navigate = useNavigate();

  // lazy initialization
  const [profile] = React.useState<UserProfile | null>(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    return storedUser
      ? JSON.parse(storedUser)
      : null;
  });

  const handleLogout = (): void => {
    localStorage.removeItem(
      "loggedInUser"
    );

    navigate("/login", {
      replace: true,
    });
  };

  // redirect if no user
  React.useEffect(() => {
    if (!profile) {
      navigate("/login", {
        replace: true,
      });
    }
  }, [profile, navigate]);

  if (!profile) {
    return (
      <div className="p-8 text-center text-gray-600">
        No account found!
      </div>
    );
  }

  return (
    <div className="flex flex-col text-gray-800 h-screen">
      <div className="px-4 py-6 bg-white drop-shadow-sm drop-shadow-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold tracking-tight">
          Account Settings
        </h2>

        <button
          onClick={handleLogout}
          className="text-sm font-medium text-red-500 cursor-pointer"
        >
          Logout
        </button>
      </div>

      <div className="h-full bg-gray-50">
        <div className="flex flex-col gap-5 p-4 text-sm text-gray-700 border-b border-dashed border-gray-300">
          <div className="flex items-center gap-3">
            <img
              src={
                profile.photoURL ??
                DEFAULT_PROFILE_IMG
              }
              alt="Profile"
              className="object-cover w-16 h-16 rounded-full"
            />

            <div className="flex flex-col gap-1">
              <span className="font-semibold">
                {profile.name ?? "--"}
              </span>

              <span>
                {profile.email ?? "--"}
              </span>
            </div>
          </div>

          <p>
            Company: {profile.company ?? "--"}
            <br />
            Mobile: {profile.number ?? "--"}
            <br />
            Agency:{" "}
            {profile.isAgency === "yes"
              ? "Yes"
              : "No"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Account;