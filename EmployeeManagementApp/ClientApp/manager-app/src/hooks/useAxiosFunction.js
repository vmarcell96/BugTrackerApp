import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";
import useFlashMessages from "./useFlashMessages";

const useAxiosFunction = () => {
  const [response, setResponse] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [controller, setController] = useState();
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const { flash } = useFlashMessages();

  const axiosFetch = async (configObj) => {
    const { axiosInstance, method, url, requestConfig = {} } = configObj;

    try {
      const requestIntercept = axiosInstance.interceptors.request.use(
        (config) => {
          if (!config.headers["Authorization"] && auth?.accessToken) {
            config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
          }
          return config;
        },
        (error) => Promise.reject(error)
      );
      const responseIntercept = axiosInstance.interceptors.response.use(
        (response) => {
          return response;
        },
        (error) => {
          if (error.response.status === 401) {
            flash("Your session has expired");
            logout();
          } else if (error.response.status === 403) {
            flash("You are not allowed to use this feature");
            navigate("/");
          } else {
            flash("Something went horribly wrong.");
            navigate("/");
          }
          return Promise.reject(error);
        }
      );

      setLoading(true);
      const ctrl = new AbortController();
      setController(ctrl);
      const res = await axiosInstance[method.toLowerCase()](url, {
        ...requestConfig,
        signal: ctrl.signal,
      });
      console.log(res);
      setResponse(res.data);

      axiosInstance.interceptors.request.eject(requestIntercept);
      axiosInstance.interceptors.response.eject(responseIntercept);
    } catch (err) {
      console.log(err.message);
      setError(err.meassage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(controller);
    // useEffect cleanup
    return () => controller && controller.abort();
  }, [controller]);

  return [response, error, loading, axiosFetch];
};

export default useAxiosFunction;
