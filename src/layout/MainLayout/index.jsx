import AuthModal from "@/components/AuthModal";
import ButtonScrollTop from "@/components/ButtonScrollTop";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import MobileOverlay from "@/components/MobileOverlay";
import { AuthContextProvider } from "@/contexts/AuthContext";
import { MainContextProvider } from "@/contexts/MainContext";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <MainContextProvider>
            <AuthContextProvider>
                <div className="page-wrapper">
                    <Header />
                    <Outlet />
                    <Footer />
                </div>
                <ButtonScrollTop />
                <MobileOverlay />
                <MobileMenu />
                <AuthModal />
            </AuthContextProvider>
        </MainContextProvider>
    );
};

export default MainLayout;
