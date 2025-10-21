import React from "react";
import { ProjectInfo } from "./pages/ProjectInfo";
import { ChatButton } from "./pages/ChatButton";
import "./App.css";

const App: React.FC = () => (
    <div className="main-bg">
        <ProjectInfo />
        <ChatButton />
    </div>
);

export default App;
