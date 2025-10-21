import React from "react";
import "../css/ProjectInfo.css";
import bgimage from '../image/bgfoto.jpg';

export const ProjectInfo: React.FC = () => (
    <div className="project-bg-wrapper">
        <img src={bgimage} alt="Background" className="project-bg-image" />
        <div className="main-content">
            <div className="project-date">13.10.2025</div>
            <h1 className="project-title">photo gallery</h1>
            <p className="project-author">
                автор проекта:{" "}
                <a href="https://github.com/yuliitezarygml" target="_blank" rel="noreferrer">
                        yuliitezarygml
                </a>
            </p>
        </div>
    </div>
);
