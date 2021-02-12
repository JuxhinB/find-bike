import { AxiosError, AxiosResponse } from "axios";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { fetchApi } from "../config/core/Api";
import { BikeType, UserInfoType } from "../Types";
require("antd/lib/notification/style/css");
require("antd/lib/button/style/css");

interface UserProviderProps {
  children: JSX.Element;
}
interface IUserContextTypes {
  bikeList: BikeType[];
  rentBike: (id: string) => void;
  returnBike: (id: string) => void;
  userInfo: UserInfoType | null;
  login: () => void;
  logout: () => void;
}

const USER_CONTEXT_INITIAL_VALUES = {
  bikeList: [],
  rentBike: (id: string) => undefined,
  returnBike: (id: string) => undefined,
  userInfo: null,
  login: () => undefined,
  logout: () => undefined,
};

export const UserContext = createContext<IUserContextTypes>({
  ...USER_CONTEXT_INITIAL_VALUES,
});

function UserProvider({ children }: UserProviderProps) {
  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);
  const [bikeList, setBikeList] = useState<BikeType[]>([]);

  const getBikes = useCallback(() => {
    fetchApi({
      url: "/bike/list",
      method: "GET",
    })
      .then((r: AxiosResponse<BikeType[]>) => {
        if (r.status === 200) {
          setBikeList(r.data);
        }
      })
      .catch((e: AxiosError) => {});
  }, []);

  useEffect(() => {
    getBikes();
  }, [getBikes]);

  function rentBike(id: string): void {
    fetchApi({
      url: "/bike/rent",
      method: "POST",
      data: {
        id: id,
      },
    })
      .then((r: AxiosResponse<BikeType[]>) => {
        if (r.status === 200) {
          getBikes();
        }
      })
      .catch((e: AxiosError) => {});
  }

  function returnBike(id: string): void {
    fetchApi({
      url: "/bike/return",
      method: "POST",
      data: {
        id: id,
      },
    })
      .then((r: AxiosResponse<BikeType[]>) => {
        if (r.status === 200) {
          getBikes();
        }
      })
      .catch((e: AxiosError) => {});
  }

  function register(name: string, password: string) {
    fetchApi({
      url: "/user/register",
      method: "POST",
    })
      .then((r: AxiosResponse<UserInfoType[]>) => {
        if (r.status === 200 && r.data.length) {
          setUserInfo(r.data[0]);
        }
      })
      .catch((e: AxiosError) => {
        console.log(e);
      });
  }

  function getUser(id: string) {
    fetchApi({
      url: "/user/get",
      method: "POST",
    })
      .then((r: AxiosResponse<UserInfoType[]>) => {
        if (r.status === 200 && r.data.length) {
          setUserInfo(r.data[0]);
        }
      })
      .catch((e: AxiosError) => {
        console.log(e);
      });
  }

  function login() {}

  function logout() {
    setUserInfo(null);
  }

  const providerValue = {
    bikeList,
    rentBike,
    returnBike,
    userInfo,
    login,
    logout,
  };

  return (
    <UserContext.Provider value={providerValue}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
