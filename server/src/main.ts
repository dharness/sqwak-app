import dotenv from "dotenv-flow";
dotenv.config({ silent: false });
import app from "./app";

const port = process.env.PORT || 5050;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
