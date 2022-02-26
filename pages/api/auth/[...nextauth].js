import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
	session: {
		jwt: true,
	},
	providers: [],
});
