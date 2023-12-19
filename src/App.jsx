import { useState } from "react";
import "./App.css";
import Titulo from "./Titulo";

import axios from "axios";

function App() {
  
  //states 
  const [cep, setCep] = useState(""); 
  const [endereco, setEndereco] = useState(""); 
  const [numero, setNumero] = useState(""); 
  const [bairro, setBairro] = useState(""); 
  const [cidade, setCidade] = useState(""); 
  const [estado, setEstado] = useState(""); 
  const [complemento, setComplemento] = useState(""); 

  
const [mensagem, setMensagem] = useState("")

  //funções 
  //https://viacep.com.br/ws/09230770/json/
  const buscarCep = async (cep) => {



    console.log(`CEP digitado: ${cep}`);
   
if (cep.length < 8) {
  setMensagem("Precisa ter pelo menos 8 números"); 
  return; 
}

setMensagem(""); //limpa a mensagem atual 
    try {
      const retorno = await axios.get(`https://viacep.com.br/ws/${cep}/json/`); 
      console.log(retorno);

if(retorno.data.erro) {
setMensagem("CEP inválido")
return; 

}

// dados ok 
setEndereco(retorno.data.logradouro); 
setBairro(retorno.data.bairro);
setCidade(retorno.data.localidade);
setEstado(retorno.data.uf);


    } catch (error) {
      setMensagem("Erro ao buscar o Cep. Verifique a conexão ")
    }
  }

  const salvarContato = async (e) => {
e.preventDefault(); 
    
try {
  const retorno = await axios.post ("http://localhost:3000/agenda" , {
  cep: cep,
  endereco: endereco,
  numero: numero,
  complemento: complemento,
  bairro: bairro,
  cidade: cidade,
  estado: estado
})
setMensagem("Cadastrado com sucesso")
} catch (error) {
  setMensagem("Erro ao cadastrar, verifique a conexão com o servidor")
}

  }


  return (
    <div className="App">
<Titulo texto="Agenda de Contato" />    
<span>{mensagem}</span>

<form onSubmit={salvarContato}>

<input type="number" placeholder="Digite o cep" name="cep" value={cep} onChange= {(e) => {setCep(e.target.value)}} 
onBlur= {() => {buscarCep(cep)}}/>


<br/> 
<input type="text" placeholder="endereço" name="endereco" value={endereco} onChange= {(e) => {setEndereco(e.target.value)}}/>
<br/>
<input type="text" placeholder="numero" name="numero" value={numero} onChange= {(e) => {setNumero(e.target.value)}}/>
<br/>
<input type="text" placeholder="complemento" name="complemento" value={complemento} onChange= {(e) => {setComplemento(e.target.value)}}/>

<br/>
<input type="text" placeholder="bairro" name="bairro" value={bairro} onChange= {(e) => {setBairro(e.target.value)}}/>
<br/>
<input type="text" placeholder="cidade" name="cidade" value={cidade} onChange= {(e) => {setCidade(e.target.value)}}/>
<br/>
<input type="text" placeholder="estado" name="estado" value={estado} onChange= {(e) => {setEstado(e.target.value)}}/>

<br/>
<button>Salvar</button>

</form>
    </div>
  );
  }

export default App;
