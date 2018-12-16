import RustAnnounce from '../helpers/RustAnnounce';

export default function RustListener(rustClient, discordGuild) {
  rustClient.on('connect', function() {
    console.log('CONNECTED TO RUST SERVER');
  });

  rustClient.on('message', msg => {
    RustAnnounce(rustClient, discordGuild, msg.message);
  });

  rustClient.on('error', function(err) {
    console.log('ERROR:', err);
  });

  rustClient.on('disconnect', function() {
    console.log('DISCONNECTED FROM RUST SERVER');
  });
}
