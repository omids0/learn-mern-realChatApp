import { useEffect, useState } from "react";
import io from "socket.io-client";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const socket = io.connect("/");
    socket.on("msg", (data) => {
      setMessage(data);
    });
  }, []);

  return (
    <div>
      <h1>This is Client Site</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
