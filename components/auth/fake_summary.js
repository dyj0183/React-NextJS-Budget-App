import { useSession } from "next-auth/client";

import { useAtom } from "jotai";
import { userIdAtom } from "../../store/atom";

function Fake_summary() {
	const [session, loading] = useSession();

    // Jotai, by default, we set to null for userIdAtom
	const [userId] = useAtom(userIdAtom);

	if (loading) {
		return <p>loading...</p>;
	}

	return (
		<div>
			{session && <div>fake_summary page and user id: {userId}</div>}
		</div>
	);
}

export default Fake_summary;
