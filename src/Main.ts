import Listen from "./Listen";

async function Main() {
  if (process.env.PREFIX === "") {
    console.error("Exiting - Double check your environment variables.");
    process.exit(1);
  }
  Listen();
}

Main();
