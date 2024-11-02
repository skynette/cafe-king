import { Link } from "react-router-dom";
import MobileNav from "./mobile-nav";
import MainNav from "./main-nav";

export default function Header() {
    return (
        <div className="border-b-2 border-b-primary py-6">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2">
                    {/* <img src="/images/logo.png" alt="Cafe King Logo" className="w-12 h-12" /> */}
                    <span className="text-3xl font-bold tracking-tight text-primary">
                        Cafe King
                    </span>
                </Link>
                <div className="md:hidden">
                    <MobileNav />
                </div>
                <div className="hidden md:block">
                    <MainNav />
                </div>
            </div>
        </div>
    )
}
