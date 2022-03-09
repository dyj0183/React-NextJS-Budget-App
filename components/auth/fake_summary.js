import React from "react";
import { useSession } from "next-auth/client";

function Fake_summary() {
	const [session, loading] = useSession();

	if (loading) {
		return <p>loading...</p>;
	}

	return <div>{session && <div>fake_summary page</div>}</div>;
}

export default Fake_summary;
