import { AxiosError, AxiosResponse } from "axios";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { fetchApi } from "../config/core/Api";
import Storage from "../config/core/Storage";
import { BikeType, UserInfoType, UserActionsType } from "../Types";
import { notification } from "antd";
import { NotificationPlacement } from "antd/lib/notification";
import "antd/dist/antd.css";
import _string from "../config/localization/_string";

interface UserProviderProps {
  children: JSX.Element;
}
interface IUserContextTypes {
  bikeList: BikeType[];
  actionList: UserActionsType[];
  rentBike: (id: string) => void;
  returnBike: (id: string) => void;
  userInfo: UserInfoType | null;
  login: (name: string, password: string, callback: () => any) => void;
  register: (name: string, password: string, callback: () => any) => void;
  logout: () => void;
  notify: (
    message: string,
    description: string,
    type?: string,
    placement?: NotificationPlacement,
    duration?: number
  ) => void;
}

const USER_CONTEXT_INITIAL_VALUES = {
  bikeList: [],
  actionList: [],
  rentBike: (id: string) => undefined,
  returnBike: (id: string) => undefined,
  userInfo: null,
  login: (name: string, password: string, callback: () => any) => undefined,
  register: (name: string, password: string, callback: () => any) => undefined,
  logout: () => undefined,
  notify: (
    message: string,
    description: string,
    type?: string,
    placement?: NotificationPlacement,
    duration?: number
  ) => undefined,
};

export const UserContext = createContext<IUserContextTypes>({
  ...USER_CONTEXT_INITIAL_VALUES,
});

function UserProvider({ children }: UserProviderProps) {
  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);
  const [bikeList, setBikeList] = useState<BikeType[]>([]);
  const [actionList, setActionList] = useState<UserActionsType[]>([]);

  const logout = useCallback(() => {
    setUserInfo(null);
    notify(_string.LABELS.success, _string.MESSAGES.logout_success, "success");
    Storage.removeItem("user_id");
  }, []);

  const addBikes = useCallback((newBike) => {
    fetchApi({
      url: "/bike/add",
      method: "POST",
      data: {
        ...newBike,
      },
    })
      .then((r: AxiosResponse<BikeType[]>) => {})
      .catch((e: AxiosError) => {});
  }, []);

  const getBikes = useCallback(() => {
    fetchApi({
      url: "/bike/list",
      method: "GET",
    })
      .then((r: AxiosResponse<BikeType[]>) => {
        if (r.status === 200) {
          if (!r.data.length) {
            // Mock some bikes
            mockBikes.forEach((mock) => {
              addBikes(mock);
              setTimeout(() => {
                // eslint-disable-next-line no-restricted-globals
                location.reload();
              }, 3000);
            });
            notify(
              _string.LABELS.success,
              _string.MESSAGES.mock_bikes_created,
              "success"
            );
          } else {
            setBikeList(r.data);
          }
        }
      })
      .catch((e: AxiosError) => {});
  }, [addBikes]);

  const getUserActions = useCallback(() => {
    fetchApi({
      url: "/user-actions/list",
      method: "POST",
      data: {
        id: userInfo?.id,
      },
    })
      .then((r: AxiosResponse<UserActionsType[]>) => {
        if (r.status === 200) {
          setActionList(r.data);
        }
      })
      .catch((e: AxiosError) => {});
  }, [userInfo]);

  const getUser = useCallback(
    (id: string) => {
      fetchApi({
        url: "/user/get",
        method: "POST",
        data: {
          id: id,
        },
      })
        .then((r: AxiosResponse<UserInfoType>) => {
          if (r.status === 200 && r.data) {
            setUserInfo(r.data);
          } else {
            logout();
          }
        })
        .catch((error: AxiosError) => {
          console.log(error);
          notify(
            _string.LABELS.error,
            _string.MESSAGES.something_went_wrong,
            "error"
          );
        });
    },
    [logout]
  );

  useEffect(() => {
    getBikes();
  }, [getBikes]);

  useEffect(() => {
    let id = Storage.getItem("user_id");
    if (id) {
      getUser(id);
    }
  }, [getUser]);

  useEffect(() => {
    if (userInfo) {
      getUserActions();
    }
  }, [userInfo, getUserActions]);

  function rentBike(id: string): void {
    fetchApi({
      url: "/bike/rent",
      method: "POST",
      data: {
        bike_id: id,
        user_id: userInfo?.id,
      },
    })
      .then((r: AxiosResponse<BikeType[]>) => {
        if (r.status === 200) {
          getBikes();
          getUserActions();
        }
      })
      .catch((e: AxiosError) => {});
  }

  function returnBike(id: string): void {
    fetchApi({
      url: "/bike/return",
      method: "POST",
      data: {
        bike_id: id,
        user_id: userInfo?.id,
      },
    })
      .then((r: AxiosResponse<BikeType[]>) => {
        if (r.status === 200) {
          getBikes();
          getUserActions();
        }
      })
      .catch((e: AxiosError) => {});
  }

  function register(name: string, password: string, callback: () => any) {
    fetchApi({
      url: "/user/register",
      method: "POST",
      data: {
        name: name,
        password: password,
      },
    })
      .then((r: AxiosResponse<UserInfoType>) => {
        if (r.status === 200 && r.data) {
          setUserInfo(r.data);
          Storage.setItem("user_id", r.data.id);
          notify(
            _string.LABELS.success,
            _string.MESSAGES.register_success,
            "success"
          );
        }
      })
      .catch((error: AxiosError) => {
        console.log(error.response);
        notify(_string.LABELS.error, error.response?.data, "error");
      })
      .finally(() => {
        callback();
      });
  }

  function login(name: string, password: string, callback: () => any) {
    fetchApi({
      url: "/user/login",
      method: "POST",
      data: {
        name: name,
        password: password,
      },
    })
      .then((r: AxiosResponse<UserInfoType>) => {
        if (r.status === 200 && r.data) {
          setUserInfo(r.data);
          Storage.setItem("user_id", r.data.id);
          notify(
            _string.LABELS.success,
            _string.MESSAGES.login_success,
            "success"
          );
        }
      })
      .catch((error: AxiosError) => {
        notify(
          _string.LABELS.error,
          error.response
            ? error.response.data
            : _string.MESSAGES.something_went_wrong,
          "error"
        );
      })
      .finally(() => {
        callback();
      });
  }

  function notify(
    message: string,
    description: string,
    type = "info",
    placement = "topRight" as NotificationPlacement,
    duration = 3
  ) {
    // @ts-ignore
    notification[type]({
      message: message,
      description: description,
      placement: placement,
      duration: duration,
      className: "custom-notification",
    });
  }

  const providerValue = {
    bikeList,
    actionList,
    rentBike,
    returnBike,
    userInfo,
    login,
    register,
    logout,
    notify,
  };

  return (
    <UserContext.Provider value={providerValue}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;

let mockBikes = [
  { lat: 41.3270327, lng: 19.8290031 },
  { lat: 41.3260327, lng: 19.8290031 },
  { lat: 41.3250327, lng: 19.8280031 },
  { lat: 41.3230327, lng: 19.8260031 },
  { lat: 41.3230327, lng: 19.8210031 },
  { lat: 41.3210327, lng: 19.8170031 },
];
