import express from 'express';
import cors from 'cors';
import { StreamChat } from 'stream-chat';

const app = express();
app.use(cors());  // Enable all CORS requests

const API_KEY = '97njbetmktk2';
const API_SECRET = 'naxt72dghm5p4zn5fdpr4u6n3bdqkexybvv5c9mh8m4g6c46zpg45jywj4j2v3k3';
const client = StreamChat.getInstance(API_KEY, API_SECRET);

app.get('/generate-token/:userId', (req, res) => {
  try {
    const { userId } = req.params; // Corrected: Use `userId` instead of `user1`
    const token = client.createToken(userId); // Generate token for the provided userId
    res.json({ token });
  } catch (error) {
    console.error("Error generating token:", error);
    res.status(500).send("Error generating token");
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});