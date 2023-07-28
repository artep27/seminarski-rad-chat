import { useState } from "react";

const Login = ({ setLoggedIn, setUser, randomName }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setInput("");
    setUser((prevUser) => ({ ...prevUser, username: input }));
    setLoggedIn(true);
  };

  const generirajNadimak = () => {
    const value = randomName();
    setInput(value);
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit} className="forma">
        <input
          type="text"
          placeholder="Upiši željeni nadimak"
          autoFocus={true}
          value={input}
          required
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Prihvati i uđi</button>
      </form>
      <div className="insp">
        <p>Nemaš inspiracije?</p>
        <button className="generiraj" onClick={generirajNadimak}>
          Generiraj nasumični nadimak
        </button>
      </div>
    </div>
  );
};

export default Login;
