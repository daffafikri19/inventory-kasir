import { jwtDecode } from "jwt-decode";
import Cookie from "js-cookie";

export const getSessionUser = () => {
    const session = Cookie.get('existingUser');
    if (!session) {
        console.log("Token tidak ada");
        return null;
    }

    try {
        const decoded: any = jwtDecode(session) as any;
        return decoded;
    } catch (error) {
        return null;
    }
};
