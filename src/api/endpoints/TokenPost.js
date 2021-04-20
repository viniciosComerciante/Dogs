import React from "react";

const TokenPost = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [token, setToken] = React.useState(null);
  const [error, setError] = React.useState(null);

  function handleSubmit(event) {
    event.preventDefault();

    fetch("https://dogsapi.origamid.dev/json/jwt-auth/v1/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        if(json.token){
            setToken(json.token)
            setError(null);
        }
        if(json.message){
            setToken('')
            setError(json.message)
        }
        return json;
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button>Enviar</button>

      <p style={{wordBreak: 'break-all'}}>{token ? token : ""}</p>
      <p>{error ? error : ""}</p>
    </form>
  );
};

export default TokenPost;
