import { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/router";

import { useAtom } from "jotai";
import { userIdAtom } from "../store/atom";

// import AuthForm from "../components/auth/auth-form";
import Summary from "../components/summary/Summary";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const [userId] = useAtom(userIdAtom);
  const router = useRouter();

  useEffect(() => {
    if (userId === null) {
      router.replace("/auth");
    }
  }, []);

  // Set up !isLoggedIn to prevent infinite loop
  if (userId !== null && !isLoggedIn) {
    setIsLoggedIn(true);

    console.log("home page user id");
    console.log(userId);
  }

  return <Fragment>{isLoggedIn && <Summary userId={userId} />}</Fragment>;
}
