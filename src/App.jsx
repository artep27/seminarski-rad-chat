import { useState, useEffect } from "react";
import "./App.css";
import Login from "./components/Login";
import Chat from "./components/Chat";

function App() {
  /* Funkcije randomName i randomColor posuđene su iz Scaledrone tutoriala: https://www.scaledrone.com/blog/tutorial-build-a-reactjs-chat-app/ */
  const randomName = () => {
    const adjectives = [
      "autumn",
      "hidden",
      "bitter",
      "misty",
      "silent",
      "empty",
      "dry",
      "dark",
      "summer",
      "icy",
      "delicate",
      "quiet",
      "white",
      "cool",
      "spring",
      "winter",
      "patient",
      "twilight",
      "dawn",
      "crimson",
      "wispy",
      "weathered",
      "blue",
      "billowing",
      "broken",
      "cold",
      "damp",
      "falling",
      "frosty",
      "green",
      "long",
      "late",
      "lingering",
      "bold",
      "little",
      "morning",
      "muddy",
      "old",
      "red",
      "rough",
      "still",
      "small",
      "sparkling",
      "throbbing",
      "shy",
      "wandering",
      "withered",
      "wild",
      "black",
      "young",
      "holy",
      "solitary",
      "fragrant",
      "aged",
      "snowy",
      "proud",
      "floral",
      "restless",
      "divine",
      "polished",
      "ancient",
      "purple",
      "lively",
      "nameless",
    ];
    const nouns = [
      "waterfall",
      "river",
      "breeze",
      "moon",
      "rain",
      "wind",
      "sea",
      "morning",
      "snow",
      "lake",
      "sunset",
      "pine",
      "shadow",
      "leaf",
      "dawn",
      "glitter",
      "forest",
      "hill",
      "cloud",
      "meadow",
      "sun",
      "glade",
      "bird",
      "brook",
      "butterfly",
      "bush",
      "dew",
      "dust",
      "field",
      "fire",
      "flower",
      "firefly",
      "feather",
      "grass",
      "haze",
      "mountain",
      "night",
      "pond",
      "darkness",
      "snowflake",
      "silence",
      "sound",
      "sky",
      "shape",
      "surf",
      "thunder",
      "violet",
      "water",
      "wildflower",
      "wave",
      "water",
      "resonance",
      "sun",
      "wood",
      "dream",
      "cherry",
      "tree",
      "fog",
      "frost",
      "voice",
      "paper",
      "frog",
      "smoke",
      "star",
    ];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    return adjective + noun;
  };
  const randomColor = () => {
    return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
  };

  /* States */

  const [loggedIn, setLoggedIn] = useState(false);
  const [didRender, setDidRender] = useState(false);
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState({
    username: "",
    color: randomColor(),
  });
  const [drone, setDrone] = useState(null);

  /*   didRender sprječava da useEffect na inicijalnom renderu drone-u pošalje trenutnog usera bez postavljenog username-a */
  useEffect(() => {
    setDidRender(true);
  }, []);

  /* --- povezivanje sa Scaledronom, prema tutorialu i dokumentaciji, modificirano prema potrebama projekta: --- */

  useEffect(() => {
    if (didRender) {
      const drone = new window.Scaledrone("cuFZg5F9Dqu32jWh", {
        data: user,
      });
      setDrone(drone);
    }
  }, [loggedIn]);

  console.log(user);

  useEffect(() => {
    if (drone) {
      const room = drone.subscribe("observable-room");
      drone.on("open", (error) => {
        if (error) {
          return console.error(error);
        } else {
          setUser((prevUser) => ({ ...prevUser, id: drone.clientId }));
        }
      });
      room.on("message", (message) =>
        console.log("Received message:", message)
      );
      room.on("data", (message, userResponse) => {
        const { id, clientData: user } = userResponse;
        user.id = id;
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: message, user: user },
        ]);
      });
    }
  }, [drone]);
  console.log(user);

  const onSendMessage = (message) => {
    drone.publish({ room: "observable-room", message });
  };

  return (
    <main className="container">
      <header>
        <h1>Pričaonica</h1>
      </header>
      {!loggedIn && (
        <Login
          setLoggedIn={setLoggedIn}
          setUser={setUser}
          randomName={randomName}
        />
      )}
      {loggedIn && (
        <Chat
          trenutniUser={user}
          messages={messages}
          onSendMessage={onSendMessage}
        />
      )}
    </main>
  );
}

export default App;
