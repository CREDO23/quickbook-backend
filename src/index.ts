import App from "./app";
import * as dotenv from "dotenv";

dotenv.config();

const app: App = new App();

const PORT = process.env.PORT || 3000;

app.init().then(() => {
  process.env.NODE_ENV !== "test" &&
    app.server.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Listening on ${PORT}`);
    });
});

export default app;
