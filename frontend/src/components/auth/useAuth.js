import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { object, string, boolean } from "yup";
import axios from "../../common/http-common";

const UserSchema = object().shape({
  admin: boolean().required("Admin status is required"),
  email: string().email("Invalid email address").required("Email is required"),
  firstName: string().required("First name is required"),
  lastName: string().required("Last name is required"),
  organization: string().required("Organization is required"),
  verified: boolean().required("Verification status is required"),
});

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [refreshSession, setRefreshSession] = useState(false);

  // check if there is an active session
  useEffect(() => {
    axios
      .get("/auth/session")
      .then((res) => {
        console.count("session");
        if (res.data && !res.data.error) {
          // validate server response, this will throw error if schema validation fails
          UserSchema.validateSync(res.data);
          setUser(res.data);

          // clear error if there was one
          if (error) {
            setError(undefined);
          }
        }
      })
      .catch((err) => {
        if (err.response) {
          // handle network error
          const { data } = err.response;
          if (data && data.message) {
            setError(data.message);
          } else if (data && data.error && typeof data.error === "string") {
            setError(data.error);
          } else {
            setError("An unknown error occurred.");
          }
        } else if (err.name === "ValidationError") {
          console.warn(`session does not match UserSchema: ${err.message}`);
        } else {
          console.error(err);
        }
      })
      .finally(() => setLoadingInitial(false));
  }, [refreshSession]); // refreshSession state used to force refresh of session

  const login = (email, password) => {
    setLoading(true);

    axios
      .post("/auth/login", { email, password })
      .then((res) => {
        console.count("login");
        if (res.data && !res.data.error) {
          // validate server response, this will throw error if schema validation fails
          UserSchema.validateSync(res.data);
          setUser(res.data);

          // clear error if there was one
          if (error) {
            setError(undefined);
          }

          // navigate to account page
          navigate("/account");
        }
      })
      .catch((err) => {
        const { data } = err.response;
        if (data && data.message) {
          setError(data.message);
        } else if (data && data.error && typeof data.error === "string") {
          setError(data.error);
        } else {
          setError("An unknown error occurred.");
        }
      })
      .finally(() => setLoading(false));
  };

  const logout = () => {
    axios
      .post("/auth/logout")
      .then((res) => {
        console.count("logout");

        if (res.data && !res.data.error) {
          setUser(undefined);
          setRefreshSession(!refreshSession);

          // clear error if there was one
          if (error) {
            setError(undefined);
          }

          // navigate to home after log out
          navigate("/");
        }
      })
      .catch((err) => {
        const { data } = err.response;
        if (data && data.message) {
          setError(data.message);
        } else if (data && data.error && typeof data.error === "string") {
          setError(data.error);
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
        setRefreshSession(!refreshSession);
        navigate("/");
        if (error) {
          setError(undefined);
        }
      })
      .catch((err) => {
        const { data } = err.response;
        if (data && data.message) {
          setError(data.message);
        } else if (data && data.error && typeof data.error === "string") {
          setError(data.error);
        } else {
          setError("An unknown error occurred.");
        }
      })
      .finally(() => setLoading(false));
  };

  const updateUserInfo = (data, cb) => {
    axios
      .post(`/users/update`, data)
      .then((res) => {
        console.count("updateUserInfo");
        // validate server response, this will throw error if schema validation fails
        UserSchema.validateSync(res.data);
        setUser(res.data);
        if (error) {
          setError(undefined);
        }
      })
      .catch((err) => {
        const { data } = err.response;
        if (data && data.message) {
          setError(data.message);
          if (cb) cb(data.message);
        } else if (data && data.error && typeof data.error === "string") {
          setError(data.error);
          if (cb) cb(data.error);
        } else {
          setError("An unknown error occurred.");
          if (cb) cb("An unknown error occurred.");
        }
      });
  };

  const updatePassword = (data, cb) => {
    axios
      .post(`/users/password`, data)
      .then((res) => {
        console.count("updatePassword");
        // validate server response, this will throw error if schema validation fails
        UserSchema.validateSync(res.data);
        setUser(res.data);
        if (error) {
          setError(undefined);
        }
        if (cb) {
          cb();
        }
      })
      .catch((err) => {
        const { data } = err.response;
        if (data && data.message) {
          setError(data.message);
          if (cb) cb(data.message);
        } else if (data && data.error && typeof data.error === "string") {
          setError(data.error);
          if (cb) cb(data.error);
        } else {
          setError("An unknown error occurred.");
          if (cb) cb("An unknown error occurred.");
        }
      });
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
    <AuthContext.Provider
      value={{
        ...memoedValue,
        login,
        logout,
        register,
        updateUserInfo,
        updatePassword,
      }}
    >
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
