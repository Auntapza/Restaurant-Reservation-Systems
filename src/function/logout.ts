import Cookies from "js-cookie";
import { redirect } from "next/navigation";

export default function Logout() {
    Cookies.remove('token', {path: "/", domain: "localhost"});
    redirect('/login');
}