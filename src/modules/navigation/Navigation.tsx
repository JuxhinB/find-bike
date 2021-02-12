import React, { useContext } from "react";
import _string from "../../config/localization/_string";
import { UserContext } from "../../provider/UserProvider";
import comp from "./components";
import logo from "../../assets/svg/app-logo.svg";

function Navigation(): JSX.Element {
  const { userInfo } = useContext(UserContext);
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 401,
        }}
      >
        <p
          style={{
            padding: "0.4rem 2.6rem",
            backgroundColor: "white",
            boxShadow: "5px 4px 13px #00000052",
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            fontSize: "1.4rem",
            fontWeight: "bold",
          }}
        >
          <img style={{ maxWidth: 130 }} src={logo} />
        </p>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 30,
          right: 15,
          zIndex: 401,
        }}
      >
        {userInfo ? <comp.AuthActions /> : <comp.GuestActions />}
      </div>
    </>
  );
}

export default Navigation;
