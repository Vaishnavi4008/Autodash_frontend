import React from 'react';

function ChatHistoryCard({ chat }) {
  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Chat History</h2>
      </header>
      <div className="p-3">
        {/* Card content */}
        <div>
          <p><strong>Message:</strong> {chat.message}</p>
          <p><strong>Timestamp:</strong> {new Date(chat.timestamp).toLocaleString()}</p>
          {/* Add more fields as necessary based on `chat` data */}
        </div>
      </div>
    </div>
  );
}

export default ChatHistoryCard;
