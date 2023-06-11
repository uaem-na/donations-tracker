import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../common/http-common";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(true);

  // check if there is an active session
  useEffect(() => {
    axios
      .get("/auth/session")
      .then((res) => {
        console.count("session");
        if (!res.data.error) {
          setUser(res.data);
        }
      })
      .catch((err) => {
        const { data } = err.response;
        if (data && data.message) {
          setError(data.message);
        }
      })
      .finally(() => setLoadingInitial(false));
  }, []);

  const login = (email, password) => {
    setLoading(true);

    axios
      .post("/auth/login", { email, password })
      .then((res) => {
        console.count("login");
        setUser(res.data);
        navigate("/account");
      })
      .catch((err) => {
        const { data } = err.response;
        if (data && data.message) {
          setError(data.message);
        } else {
          setError("An unknown error occurred.");
        }
      })
      .finally(() => setLoading(false));
  };

  const logout = () => {
    axios
      .post("/auth/logout")
      .then(() => {
        console.count("logout");
        setUser(undefined);
        navigate("/");
      })
      .catch((err) => {
        const { data } = err.response;
        if (data && data.message) {
          setError(data.message);
        } else {
          setError("An unknown error occurred.");
        }
      })
      .finally(() => setLoading(false));
  };

  const register = (data) => {
    axios
      .post("/auth/register", data)
      .then((res) => {
        console.count("register");
        navigate("/");
      })
      .catch((err) => {
        const { data } = err.response;
        if (data && data.message) {
          setError(data.message);
        } else {
          setError("An unknown error occurred.");
        }
      })
      .finally(() => setLoading(false));
  };

  const memoedValue = useMemo(
    () => ({
      user,
      error,
      loading,
    }),
    [user, loading, error]
  );

  return (
    // render children only after we've checked for an active session
    <AuthContext.Provider value={{ ...memoedValue, login, logout, register }}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
