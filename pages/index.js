import { Fragment, useState } from "react";
import AuthForm from "../components/auth/auth-form";
import Summary from "../components/summary/Summary";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  // TODO: set userId with session
  const userId = "621d742436c291324f692b38";

  return (
    <Fragment>
      {!isLoggedIn && <AuthForm />}
      {isLoggedIn && <Summary userId={userId} />}
    </Fragment>
  );
}
