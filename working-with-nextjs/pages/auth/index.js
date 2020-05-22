import React from "react";
import User from "../../components/User";

const authIndexPage = (props) => (
  <div>
    <h1>Auth Page: {props.appName}</h1>
    <User name="max" age="31" />
  </div>
);

authIndexPage.getInitialProps = async (context) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ appName: "Super App (Auth)" });
    }, 1000);
  });
  return promise;
};

export default authIndexPage;
