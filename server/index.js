import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";
import bookRoute from "./routes/book.route.js";
import userRoute from "./routes/user.route.js";
import rentalRoute from "./routes/rental.route.js";
import roleRoute from "./routes/role.route.js";


export const app = express();

// MIDDLEWARE
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/book", bookRoute);
app.use("/api/user", userRoute);
app.use("/api/rental", rentalRoute);
app.use("/api/role", roleRoute);


app.listen(8000, () => {
  console.log("server running on port 8000");
});
