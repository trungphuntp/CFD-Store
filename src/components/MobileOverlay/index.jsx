import { useMainContext } from "@/contexts/MainContext";
import React from "react";

const MobileOverlay = () => {
    const { handleCloseMobileMenu } = useMainContext();

    return <div onClick={handleCloseMobileMenu} className="mobile-menu-overlay" />;
};

export default MobileOverlay;
