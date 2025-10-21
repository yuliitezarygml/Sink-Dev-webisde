import React from "react";
import "../css/ChatButton.css";

export const ChatButton: React.FC = () => (
    <div className="chat-btn-wrap">
        <button className="chat-btn">
            Написать фотографу
            <span className="chat-btn-icon">
        {/* SVG иконка чата (bubble) */}
                <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff"><path d="M4 22v-4a9 9 0 119 0v4a1 1 0 01-2 0v-4a7 7 0 10-7-7 7.012 7.012 0 006.3 6.934m-.3 1.066a9 9 0 119-9v2a7 7 0 10-7 7h-2a9 9 0 019-9"/></svg>
      </span>
        </button>
    </div>
);
