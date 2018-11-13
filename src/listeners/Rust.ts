import WebRcon from "webrconjs";

export default function RustListeners(rustClient: WebRcon) {
  rustClient.connect(process.env.RUST_PASSWORD);

  rustClient.on("connect", function() {
    console.log("CONNECTED TO RUST SERVER");
  });

  rustClient.on("message", msg => {
    console.log(msg);
  });
}
