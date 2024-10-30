import { connectDB } from "./config/db.config.js";
import app from "./app.js";

app.listen(4000, () => {
  try {
    connectDB();
    console.log("Server running on port 4000");
  } catch (error) {
    console.log("Error", error.message);
  }
});
