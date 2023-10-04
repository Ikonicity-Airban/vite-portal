import { ILoginResponse } from "../@types";
import { Types } from "../reducer";
import axios from "../https";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { dispatch } = useAuth();

  const refresh = async () => {
    const response = await axios.get<ILoginResponse>("/refresh", {
      withCredentials: true,
    });
    console.log(response.data.accessToken);
    dispatch({
      type: Types.login,
      payload: response.data,
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
