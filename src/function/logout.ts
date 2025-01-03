import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Logout() {
    Cookies.remove('token');
    useRouter().replace('/login');
}