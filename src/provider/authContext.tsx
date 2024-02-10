import axios from "axios";
import { useContext, createContext, useState, ReactNode } from "react";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";

interface AuthContextType {
  isAuthenticated: boolean;
  userId: string | null;
  token: string | undefined | null;
  user: string | null;
  userRole: string | null;
  loginAction: (data: { username: string; password: string }) => void;
  logOut: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userId: null,
  token: null,
  user: null,
  userRole: null,
  loginAction: () => {},
  logOut: () => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["AuthToken"]);
  const [user, setUser] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  const [token, setToken] = useState<string | undefined | null>(
    cookies.AuthToken ?? null
  );

  const isAuthenticated = !!token;

  const intailFecth = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_PUBLIC_API_URL}/api/DecodeToken`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { userId, username, role } = response.data;
      setUserId(userId);
      setUser(username);
      setUserRole(role);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  if (isAuthenticated) intailFecth();

  const loginAction = async (data: { username: string; password: string }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_PUBLIC_API_URL}/api/Login`,
        { username: data.username, password: data.password },
        { withCredentials: true }
      );
      const { userId, success, username, role, token, message } = response.data;

      if (success) {
        setUserId(userId);
        setUser(username);
        setUserRole(role);
        setToken(token);
        setCookie("AuthToken", token, { path: "/" });
        return;
      }
      throw new Error(message);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const logOut = () => {
    setUser(null);
    setToken(null);
    setUserRole(null);
    removeCookie("AuthToken");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userId,
        token,
        user,
        userRole,
        loginAction,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
