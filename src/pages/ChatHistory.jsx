import React, { useState, useEffect } from "react";
import ChatHistoryCard from "../partials/dashboard/ChatHistoryCard";
import { Button as BaseButton } from '@mui/base';
import { styled } from '@mui/system';

// Custom styled Button component
const CustomButton = styled(BaseButton)`
  background-color: black;
  padding: 8px;
  border: 1px solid #000;
  border-radius: 8px;
  color: white;
  &:hover {
    background-color: #444242;
  }
`;

function ChatHistory() {
  const [chatHistory, setChatHistory] = useState([]);
  const [pageno, setPageno] = useState(1); // Manage current page number

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await fetch(`${process.env.SPRINGURI}/java/api/chat/getHistory`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ pageno: pageno }),
        });

        if (response.ok) {
          const data = await response.json();
          setChatHistory(data);
        } else {
          console.error("Failed to fetch chat history");
        }
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    fetchChatHistory();
  }, [pageno]); // Trigger the effect whenever pageno changes

  // Function to handle page navigation
  const goToNextPage = () => setPageno((prevPage) => prevPage + 1);
  const goToPreviousPage = () => setPageno((prevPage) => Math.max(prevPage - 1, 1));

  return (
    <div>
      {chatHistory.length > 0 ? (
        chatHistory.map((chat, index) => (
          <ChatHistoryCard key={index} chat={chat} />
        ))
      ) : (
        <p>No chat history available.</p>
      )}
      <span> Page {pageno} </span>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <CustomButton onClick={goToPreviousPage} disabled={pageno === 1}>
          Previous Page
        </CustomButton>
        
        <CustomButton onClick={goToNextPage}>
          Next Page
        </CustomButton>
      </div>
    </div>
  );
}

export default ChatHistory;
