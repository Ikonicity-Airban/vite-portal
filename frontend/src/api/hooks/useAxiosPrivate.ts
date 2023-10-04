import { httpPrivate } from "../https";
import useAuth from "./useAuth";
import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const {
    state: { user: auth },
  } = useAuth();

  const [accessToken] = useLocalStorage("access_token", "");

  useEffect(() => {
    const requestIntercept = httpPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = httpPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return httpPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      httpPrivate.interceptors.request.eject(requestIntercept);
      httpPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh, accessToken]);

  return httpPrivate;
};

export default useAxiosPrivate;
