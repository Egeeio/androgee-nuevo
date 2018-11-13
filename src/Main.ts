import Connect from "./Connect";
import Listen from "./Listen";

async function Main() {
  if (process.env.PREFIX === "") {
    console.error("Exiting - Double check your environment variables.");
    process.exit(1);
  }
  Listen(
    await Connect.Discord(),
    Connect.Rust(
      process.env.HOST,
      process.env.RUST_PORT,
      process.env.RUST_PASSWORD
    )
  );
}

Main();
