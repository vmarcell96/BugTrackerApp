//Packages
import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";
//Hooks
import useFlashMessages from "./useFlashMessages";
import useRefreshToken from "./useRefreshToken";

const useAxiosFunction = () => {

  const [response, setResponse] = useState();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [controller, setController] = useState();
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const { flash } = useFlashMessages();
  const refresh = useRefreshToken();


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
        response => response,
        async (error) => {
          const prevRequest = error?.config;
          if (error?.response?.status === 401 && !prevRequest?.sent) {
            prevRequest.sent = true;
            const newAccessToken = await refresh();
            prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return axiosInstance(prevRequest);
          }
          else if (error.response.status === 400) {
            flash(error.response.data);
          }
          else if (error.response.status === 401) {
            flash("Your session has expired.");
            navigate("/");
            setAuth(null);
          }
          else if (error.response.status === 403) {
            flash("You are not allowed to use this feature.");
            navigate("/");
          }
          else if (error.response.status === 404) {
            flash("Not found.");
          }
          else {
            flash("Something went wrong.");
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

      setResponse(res.data);
      
      
      axiosInstance.interceptors.request.eject(requestIntercept);
      axiosInstance.interceptors.response.eject(responseIntercept);

      return res.data;

    } catch (err) {

      console.log(err.message);
      setError(err.meassage);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // useEffect cleanup
    return () => controller && controller.abort();
  }, [controller]);

  return { response, setResponse, error, loading, axiosFetch };
};

export default useAxiosFunction;
