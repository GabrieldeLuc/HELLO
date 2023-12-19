import { useState } from "react";
import "./App.css";
import Titulo from "./Titulo";

function App() {
  // Criar as propriedades titulo, texto, textoLink
  // passar as propriedades em cada um dios 3 componentes abaixo.

  const [nome, setNome] = useState("Riddler");
  const [sobrenome , setSobrenome] = useState("")

  function alterarNome() {
    setNome("Gabriel");
  }

  return (
    <div className="App">
      <h1>Bem vindo - {nome}</h1>
<Titulo texto={`${nome}  ${sobrenome}`} />


      <p>Nome: <strong>{nome} {sobrenome}</strong></p>

      <br />
      <input
        type="text"
        placeholder="digite seu nome"
        value={nome}
        onChange={(e) => {
          setNome(e.target.value);
        }}
      />

      <br />
      <input
        type="text"
        placeholder="digite seu Sobrenome"
        value={sobrenome}
        onChange={(e) => {
          setSobrenome(e.target.value);
        }}
      />
      <br />
      <button
        onClick={() => {
          alterarNome();
        }}
      >
        Mudar Nome
      </button>
    </div>
  );
}

export default App;
