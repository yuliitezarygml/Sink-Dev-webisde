import React from "react";
import { ProjectInfo } from "./pages/ProjectInfo";
import { ChatButton } from "./pages/ChatButton";
import { PhotoGallery } from "./pages/PhotoGallery";
import "./App.css";

const App: React.FC = () => (
    <div className="main-bg">
        <ProjectInfo />
        <PhotoGallery />
        <ChatButton />
    </div>
);

export default App;
