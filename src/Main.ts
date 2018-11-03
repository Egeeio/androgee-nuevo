import { Client } from "discord.js";

function Main() {
  const token = process.env.TOKEN;
  const client = new Client();
  if (process.env.TOKEN !== "") {
    client
      .login(token)
      .then(() => {
        console.info("Successfully logged into the Discord servers");
      })
      .catch(err => {
        console.error(err);
      });
  } else {
    console.warn(
      "Discord will not be connected because no address was found in config file."
    );
  }
  client.on("ready", () => {
    console.info("fck ya");
  });
}

Main();
