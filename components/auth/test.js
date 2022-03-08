import React from "react";
// Test how useSession works here
import { useSession, signOut } from "next-auth/client";

function Test() {
	const [session, loading] = useSession();

	console.log("session");
	console.log(session);
	console.log("loading");
	console.log(loading);

	const logoutHandler = () => {
		// Sign out, nextjs will clear out the cookie
		signOut();
	};

	return (
		<div>
			<div style={{ textAlign: "center" }}>
				<h1>My fake and testing nav bar</h1>
				{!session && !loading && <button>login</button>}
				{session && (
					<ul>
						<li>Summary</li>
						<li>Expense</li>
					</ul>
				)}
				{session && (
					<button onClick={logoutHandler} style={{ color: "blue" }}>
						logout
					</button>
				)}
			</div>
		</div>
	);
}

export default Test;
