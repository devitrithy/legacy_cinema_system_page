<script lang="ts">
  import { io } from "socket.io-client";
  let server = io("https://cinemaapi.serveo.net");
  server.on("connec", () => {
    console.log("object");
  });
</script>
