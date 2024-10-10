"use client"
import React, { createContext, useContext, useState } from "react";

const SceneContext = createContext();

export const SceneProvider = ({ children }) => {
    const [scene, setScene] = useState(0);

    return (
        <SceneContext.Provider value={{ scene, setScene }}>
            {children}
        </SceneContext.Provider>
    );
};

export const useScene = () => {
    const context = useContext(SceneContext);
    if (!context) {
        throw new Error("useScene must be used within a SceneProvider");
    }
    return context;
};
