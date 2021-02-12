import React, { useContext } from "react";
import _string from "../../config/localization/_string";
import { UserContext } from "../../provider/UserProvider";
import comp from "./components";
import {} from "antd";

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
            padding: "1rem 2.6rem",
            backgroundColor: "white",
            boxShadow: "5px 4px 18px #00000052",
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            fontSize: "1.4rem",
            fontWeight: "bold",
          }}
        >
          <span style={{ marginRight: "0.4rem", color: "#026e99" }}>
            {_string.STRINGS.find}
          </span>
          <span style={{}}>{_string.STRINGS.bike}</span>
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
