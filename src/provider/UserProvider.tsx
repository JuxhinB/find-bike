import { AxiosError, AxiosResponse } from "axios";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { fetchApi } from "../config/core/Api";
import { BikeType } from "../Types";

interface UserProviderProps {
  children: JSX.Element;
}
interface IUserContextTypes {
  bikeList: BikeType[];
  rentBike: (id: string) => void;
  returnBike: (id: string) => void;
}

const USER_CONTEXT_INITIAL_VALUES = {
  bikeList: [],
  rentBike: (id: string) => undefined,
  returnBike: (id: string) => undefined,
};

export const UserContext = createContext<IUserContextTypes>({
  ...USER_CONTEXT_INITIAL_VALUES,
});

function UserProvider({ children }: UserProviderProps) {
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

  const providerValue = {
    bikeList,
    rentBike,
    returnBike,
  };

  return (
    <UserContext.Provider value={providerValue}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
