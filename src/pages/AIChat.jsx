import React, { useState } from "react";
import {
  Grid,
  Box,
  TextField,
  IconButton,
  Paper,
  Rating,
  Button,
  Backdrop,
} from "@mui/material";
import { FiSend } from "react-icons/fi";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import Typography from "@mui/material/Typography";
import remarkGfm from "remark-gfm";
import MermaidChart from "./MermaidChart";
import "./table.scss";

const BASE_IMAGE_URL = "https://mayur.mydigicardmanager.com/upload"; // or wherever your files live

const BlockquoteComponent = (props, ref) => (
  <Box
    ref={ref} // forward ref correctly
    component="blockquote" // Render as blockquote element
    sx={{
      borderLeft: "3px solid #1877f2",
      pl: 1,
      color: "#555",
      fontStyle: "italic", // Optional: add more styling
    }}
    {...props}
  />
);
BlockquoteComponent.displayName = "BlockquoteComponent";

const BASE_URL =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";

export default function AIChat() {
  const [messages, setMessages] = useState([
    { text: "Hi, how can I help you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [selectedText, setSelectedText] = useState(null);
  const [buttonPosition, setButtonPosition] = useState(null);
  const [enlargedChart, setEnlargedChart] = useState(null);
  const [overlayOpen, setOverlayOpen] = useState(false);

  const [options, setOptions] = useState({
    te_code: {
      active: false,
      text: "T Code",
    },
    flowchart: {
      active: false,
      text: "Flowchart",
    },
    detailed_answer: {
      active: false,
      text: "Detailed Answer",
    },
    // bi_capable: {
    //   active: false,
    //   text: "BI Output",
    // },
  });

  //   type OptionKey = 'te_code' | 'flowchart' | 'detailed_answer' | 'bi_capable';

  const setOption = (option) => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      [option]: { ...prevOptions[option], active: !prevOptions[option].active },
    }));
  };

  const handleSend = async () => {
    if (input.trim() !== "") {
      const userMessage = { text: input, sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInput("");

      try {
        const payload = { question: input };
        const activeOption = Object.entries(options).find(
          ([_, value]) => value.active
        );
        if (activeOption) {
          payload.prcode = activeOption[0];
        }
        const response = await axios.post(`${BASE_URL}/ask`, payload);
        const botReply = {
          text: response.data.answer,
          sender: "bot",
          rating: null,
        };
        setMessages((prevMessages) => [...prevMessages, botReply]);
      } catch (error) {
        console.error("Error communicating with server:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: "Sorry, I couldn't process your request. Please try again later.",
            sender: "bot",
            rating: null,
          },
        ]);
      }
    }
  };

  const handleRatingChange = (index, newRating) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg, i) =>
        i === index
          ? { ...msg, rating: newRating, feedbackSubmitted: false }
          : msg
      )
    );
  };

  const handleSubmitFeedback = (index) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg, i) =>
        i === index ? { ...msg, feedbackSubmitted: true } : msg
      )
    );
  };

  const handleTextSelection = (e) => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim()) {
      setSelectedText(selection.toString().trim());

      // Get the position of the cursor to display the button
      const { clientX: x, clientY: y } = e;
      setButtonPosition({ x, y });
    } else {
      setSelectedText(null);
      setButtonPosition(null);
    }
  };

  return (
    <Box
      maxWidth="xl"
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        paddingBottom: "0px",
        backgroundColor: "#ffffff00",
      }}
    >
      {/* Overlay */}
      {overlayOpen && (
        <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open={overlayOpen}
          onClick={() => setOverlayOpen(false)}
        >
          <MermaidChart chart={enlargedChart} style={{ width: "90%" }} />
        </Backdrop>
      )}
      {/* <Typography variant="h2" sx={{ mb: 3 }}>
        DocSearch welcomes you
      </Typography> */}

      <Box
        className="black-bullets"
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          p: 2,
          bgcolor: "#f9f9f9",
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
            }}
          >
            <Paper
              sx={{
                maxWidth: "60%",
                p: 2,
                mb: 2,
                bgcolor: msg.sender === "user" ? "#60d1d3" : "#e0e0e0",
                color: msg.sender === "user" ? "white" : "black",
                borderRadius:
                  msg.sender === "user"
                    ? "12px 12px 0 12px"
                    : "12px 12px 12px 0",
                position: "relative",
              }}
              onMouseUp={handleTextSelection}
            >
              {/* <ReactMarkdown
                children={msg.text}
                components={{
                  blockquote: BlockquoteComponent,
                }}
                remarkPlugins={[remarkGfm]} // Enable GFM for markdown
              /> */}
              {msg.text.split(/(```mermaid[\s\S]*?```)/g).map((part, i) => {
                if (part.startsWith("```mermaid")) {
                  const chart = part.slice(10, -3).trim();
                  return (
                    <Box key={i} sx={{ position: "relative" }}>
                      <MermaidChart chart={chart} />
                      <Button
                        sx={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          backgroundColor: "#1877f2ad",
                          color: "white",
                          "&:hover": { backgroundColor: "#1559b3" },
                        }}
                        onClick={() => {
                          setEnlargedChart(chart);
                          setOverlayOpen(true);
                        }}
                      >
                        Enlarge
                      </Button>
                    </Box>
                  );
                }

                const parts = parseWithImageInjection(part);

                return (
                  <div key={i} className="prose max-w-none">
                    {parts.map((subpart, j) =>
                      typeof subpart === "string" ? (
                        <ReactMarkdown
                          key={j}
                          children={subpart}
                          components={{
                            blockquote: BlockquoteComponent,
                            table: ({ node, ...props }) => (
                              <div style={{ overflowX: "auto" }} className="table-wrapper">
                                <table {...props} />
                              </div>
                            ),
                          }}
                          remarkPlugins={[remarkGfm]}
                        />
                      ) : (
                        subpart
                      )
                    )}
                  </div>
                );
              })}

              {/* {msg.sender === 'bot' && (
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <Rating
                    value={msg.rating || 0}
                    onChange={(event, newValue) => handleRatingChange(index, newValue)}
                    disabled={msg.feedbackSubmitted} // Disable rating once submitted
                  />
                  {msg.feedbackSubmitted ? (
                    <Typography
                      sx={{
                        ml: 1,
                        color: 'green',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      ✅ {msg.rating}
                    </Typography>
                  ) : (
                    <Button
                      sx={{ ml: 1, backgroundColor: '#1877f2ad' }}
                      variant="contained"
                      onClick={() => handleSubmitFeedback(index)}
                    >
                      Submit
                    </Button>
                  )}
                </Box>
              )} */}
            </Paper>
          </Box>
        ))}
      </Box>

      {/* Display Quote button only when text is selected and close to cursor */}
      {selectedText && buttonPosition && (
        <Button
          sx={{
            position: "absolute",
            top: buttonPosition.y + 10, // Position near cursor
            left: buttonPosition.x + 10,
            backgroundColor: "#4b4b4bcc",
            color: "white",
            cursor: "pointer", // Neat cursor on hover
            "&:hover": {
              backgroundColor: "#242a2fe8", // Button changes color on hover
            },
          }}
          variant="contained"
          size="small"
          onClick={() => {
            setInput(`> "${selectedText}"\n`); // Insert the quoted text
            setSelectedText(null); // Hide the button after clicking
            setButtonPosition(null); // Remove the button
          }}
        >
          Quote
        </Button>
      )}
      <Box
        sx={{
          position: "sticky",
          bottom: 0,
          left: 0,
          width: "100%",
          bgcolor: "white",
          p: 2,
          boxShadow: 3,
          // display: 'flex',
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderRadius: "24px",
            border: "1px solid #e0e0e0",
            padding: "0px 12px",
          }}
        >
          <TextField
            fullWidth
            label="Type a message..."
            variant="outlined"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "24px",
                border: "none",
              },
            }}
          />
          <IconButton
            sx={{
              ml: 1,
              bgcolor: "#1877f2",
              color: "white",
              "&:hover": { bgcolor: "#1559b3" },
            }}
            onClick={handleSend}
          >
            <FiSend size={24} />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 2,
            mb: 1,
            borderRadius: "24px",
          }}
        >
          {/* switch buttons */}
          {Object.entries(options).map(([key, value]) => (
            <SwitchButton
              key={key}
              active={value.active}
              text={value.text}
              setActive={() => setOption(key)}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

const SwitchButton = ({ active, setActive, logo, text }) => (
  <Button
    sx={{
      bgcolor: active ? "#1877f2" : "#f9f9f9",
      color: active ? "white" : "black",
      "&:hover": {
        bgcolor: active ? "#1559b3" : "#f1f1f1",
      },
      border: "1px solid #e0e0e0",
      borderRadius: "24px",
      textTransform: "none",
      fontWeight: "bold",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      py: 1,
      px: 2,
      ml: 1,
    }}
    onClick={() => setActive(!active)}
  >
    {logo ? <Box sx={{ mr: 1 }}>{logo}</Box> : null}
    <Typography sx={{ ml: 1 }}>{text}</Typography>
  </Button>
);

const ImageRenderer = ({ src, alt }) => (
  <Box sx={{ mt: 2, mb: 2 }}>
    <img
      src={`${IMAGE_BASE_URL}${src}`}
      alt={alt || "image"}
      style={{
        maxWidth: "100%",
        borderRadius: "8px",
        border: "1px solid #ccc",
      }}
    />
  </Box>
);
const parseWithImageInjection = (text) => {
  const IMAGE_TAG_BLOCK_REGEX =
    /<<START_IMAGE:([^>]+)>>[\s\S]*?<<END_IMAGE:\1>>/g;

  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = IMAGE_TAG_BLOCK_REGEX.exec(text)) !== null) {
    const before = text.slice(lastIndex, match.index);
    if (before) parts.push(before);

    const imageName = match[1];
    parts.push(
      <img
        key={match.index}
        src={`${BASE_IMAGE_URL}/${imageName}`}
        alt={imageName}
        style={{ maxWidth: "100%", borderRadius: "8px", margin: "8px 0" }}
      />
    );

    lastIndex = IMAGE_TAG_BLOCK_REGEX.lastIndex;
  }

  const after = text.slice(lastIndex);
  if (after) parts.push(after);

  return parts;
};
