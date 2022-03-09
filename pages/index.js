import { Fragment, useState } from "react";
import AuthForm from "../components/auth/auth-form";
import Summary from "../components/summary/Summary";
import { useSession } from "next-auth/client";
import { useAtom } from "jotai";
import { userIdAtom } from "../store/atom";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // TODO: set userId with session
  const [session, loading] = useSession();
  const [userId] = useAtom(userIdAtom);

  // Set up !isLoggedIn to prevent infinite loop
  if (session && !loading && !isLoggedIn) {
    setIsLoggedIn(true);

    console.log("home page user id");
    console.log(userId);
  }

  return (
    <Fragment>
      {!isLoggedIn && <AuthForm />}
      {isLoggedIn && <Summary userId={userId} />}
    </Fragment>
  );
}
