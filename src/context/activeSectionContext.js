"use client"
import React, { createContext, useContext, useState } from "react";

const ActiveSectionContext = createContext();

export const ActiveSectionProvider = ({ children }) => {
    const [activeSection, setActiveSection] = useState("Home");
    const [timeOfLastClick, setTimeOfLastClick] = useState(0);

    return (
        <ActiveSectionContext.Provider value={{
            activeSection,
            setActiveSection,
            timeOfLastClick,
            setTimeOfLastClick,
        }}>
            {children}
        </ActiveSectionContext.Provider>
    );
};

export const useActiveSectionContext = () => {
    const context = useContext(ActiveSectionContext);
    if (!context) {
        throw new Error("useScene must be used within a SceneProvider");
    }
    return context;
};
