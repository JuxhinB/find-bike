import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import notFoundIllustration from "../../assets/svg/launch_day.svg";
import _string from "../../config/localization/_string";
import global from "../../global";
import { GeneralLayout } from "../../layouts";

function NotFoundScreen(): JSX.Element {
  let history = useHistory();

  useEffect(() => {
    document.body.classList.add("not-found-screen");
    return () => {
      document.body.classList.remove("not-found-screen");
    };
  }, []);

  return (
    <GeneralLayout>
      <>
        <global.Image
          className="not-found-illustration"
          src={notFoundIllustration}
        />
        <h1 className="not-found-error">404</h1>
        <p className="not-found-message">
          {_string.MESSAGES.something_went_wrong}
        </p>
        <global.Button
          onClick={() => {
            history.replace("/");
          }}
        >
          {_string.ACTIONS.go_home}
        </global.Button>
      </>
    </GeneralLayout>
  );
}

export default NotFoundScreen;
