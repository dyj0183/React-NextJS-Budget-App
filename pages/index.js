import { Fragment, useState } from "react";
import AuthForm from "../components/auth/auth-form";
import Summary from "../components/summary/Summary";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <Fragment>
      {!isLoggedIn && <AuthForm />}
      {isLoggedIn && <Summary />}
    </Fragment>
  );
}
