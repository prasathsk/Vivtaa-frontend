// src/Components/Header.tsx
import { useNavigate } from "react-router-dom";
import UseLocalStorage from "../@hooks/useLocalStorage";
import { logoutApi } from "../api/auth";

const Header = () => {
  const navigate = useNavigate();
  const { getLocalstorage } = UseLocalStorage();

  const handleLogout = async () => {
    try {
      const payload: any = {
        accessToken: getLocalstorage('access-token'),
        refreshToken: getLocalstorage('refresh-token')
      }
      await logoutApi(payload)
        .then((res) => {
          console.log('res', res);
          // clear auth data
          localStorage.removeItem("access-token");
          localStorage.removeItem("refresh-token");
          navigate("/login");
        })
    } catch (error) {
      console.error(error);
    }

    // optional: clear axios auth header if you set it globally
    // delete axiosInstance.defaults.headers.common["Authorization"];


  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gray-900 border-b border-gray-700">
      {/* Left */}
      <h1
        className="text-xl font-bold text-white cursor-pointer"
        onClick={() => navigate("/products")}
      >
        Vivtaa
      </h1>

      {/* Right */}
      <div className="flex items-center gap-4">
        <span className="text-gray-300 text-sm">
          Hi, User
        </span>

        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
