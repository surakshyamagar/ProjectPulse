// server.js
//    ↓
// load environment variables
//    ↓
// get PORT
//    ↓
// start Express app
//    ↓
// Backend running on port 5000

import app from "./app.js";
import dotenv from "dotenv";

// This loads the .env values into: process.env
dotenv.config();

// So: process.env.PORT can read: PORT=5000 
const PORT = process.env.PORT || 5000;

// app.listen: starts the server. Start listening for requests on port 5000.
app.listen(PORT, () => {
    console.log(`Devpilot Server is running on port ${PORT}`);
});