import React from "react";

const PhotoPost = () => {
  const [token, setToken] = React.useState("");
  const [nome, setNome] = React.useState("");
  const [peso, setPeso] = React.useState("");
  const [idade, setIdade] = React.useState("");
  const [img, setImg] = React.useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('img', img);
    formData.append('nome', nome);
    formData.append('peso', peso);
    formData.append('idade', idade);

    console.log(formData);


    fetch("https://dogsapi.origamid.dev/json/api/photo", {
      method: "POST",
      headers: {
        Authorization: 'Bearer ' +token, 
      },
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log(json);
        return json;
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="token"
        type="text"
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />

      <input
        placeholder="nome"
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <input
        placeholder="peso"
        type="text"
        value={peso}
        onChange={(e) => setPeso(e.target.value)}
      />

      <input
        placeholder="idade"
        type="text"
        value={idade}
        onChange={(e) => setIdade(e.target.value)}
      />

      <input
        type="file"
        onChange={(e) => setImg(e.target.files[0])}
      />

      <button>Enviar</button>
    </form>
  );
};

export default PhotoPost;
