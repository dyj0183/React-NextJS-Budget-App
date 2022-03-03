import { Fragment } from "react";
import Summary from "../components/summary/Summary";

export default function Home() {
  return (
    <Fragment>
      {/* !isLoggedIn ?? redirect to /auth */}
      {/* isLoggedIn ?? Summary() */}
      <Summary />
    </Fragment>
  );
}
