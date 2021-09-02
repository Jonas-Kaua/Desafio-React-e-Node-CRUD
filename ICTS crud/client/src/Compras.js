import './App.css';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import api from './configurationAPI/axiosconfig';

//import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  const caminho3 = useHistory();

  const [total, setTotal] = useState("");
  const [tipo_pagamento, setTpPagamento] = useState("");
  const [status, setStatus] = useState("");
  const [id_produto, setProduto] = useState("");

  const [nomeproduto, setNomeProduto] = useState([]);
  const [dados, setDados] = useState([]);

  const [restart, setRestart] = useState(false);
  const [idAtual, setidAtual] = useState(null);

  const addCompra = (() => {
    if (idAtual == null) {
      api.post('compra', {
        total: total,
        tipo_pagamento: tipo_pagamento,
        status: status,
        id_produto: id_produto,
      });
    }else{
      atualizarProduto(idAtual);
    }
    });

    useEffect(() => {
      api.get('listarproduto').then((response) => {
        setNomeProduto(response.data);
        console.log(response);
      }).catch(() => {
        console.log("deu ruim");
      });
    }, []);

    useEffect(() => {
      api.get('listarcompra').then((response) => {
        setDados(response.data);
        console.log(response);
      }).catch(() => {
        console.log("deu ruim");
      });
    }, [restart]);

    const deleteProduto = (id) => {
      api.delete('deletecompra/' + id).then(() => {
        setRestart(!restart)
      });
    }

    const buscarNomeProduto = (id) =>{
       if(nomeproduto!=undefined){
        var produtoN = nomeproduto.find(item=> item.id  == id)
        if(produtoN!=undefined){
          return produtoN.nome;
        }else{
           return "";
        }
       }else{
         return "";
       }
    }

    const camposAtualizar = (item) => {
      setTotal(item.total);
      setTpPagamento(item.tipo_pagamento);
      setStatus(item.status);
      setProduto(item.id_produto);
      setidAtual(item.id);
    }

    const atualizarProduto = (id) =>{
      api.put('updatecompra/'+id,{
        total: total,
        tipo_pagamento: tipo_pagamento,
        status: status,
        id_produto: id_produto,

      }).then(()=>{
          setRestart(!restart)
      });
    }

    return (
      <div className="App">
        <header className="App-header">
          <div className="row">
            <div className="col text-center">
              <button type="button" className="btn btn-dark " onClick={() => caminho3.push("/")}>Voltar</button>
            </div>
            <div className="col text-center">
              <button type="button" className="btn btn-dark " onClick={() => caminho3.push("/produtos")}>Produtos</button>
            </div>
          </div>
        </header>

        <div style={{ marginTop: 50 }}>
          <h2>Cadastrar Compra</h2>
        </div>

        <form>
          <div style={{ marginBottom: 10, marginTop: 50 }} className="row d-flex justify-content-center">
            <div className="form-group col-3">
              <label  >Total</label>
              <input type="number" className="form-control" onChange={(event) => { setTotal(event.target.value); }} value={total} placeholder="Total da Compra"></input>
            </div>
            <div className="col-3">
              <label  >Tipo de pagamento</label>
              <input type="text" className="form-control" onChange={(event) => { setTpPagamento(event.target.value); }} value={tipo_pagamento} placeholder="Tipo de pagamento"></input>
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col-3">
              <label  >Status</label>
              <input type="text" className="form-control" onChange={(event) => { setStatus(event.target.value); }} value={status} placeholder="Status"></input>
            </div>
            <div className="col-3">
              <label  >Produto</label>
              <select className="form-control" onChange={(event) => { setProduto(event.target.value); }} value={id_produto} placeholder="Produto">
                <option>Selecione</option>
                {nomeproduto.map((item) => (
                <option value={item.id}> {item.nome}</option>))} </select>
            </div>
          </div>
          <div style={{ marginTop: 20 }} className="row d-flex justify-content-center">
            <div className="col d-flex justify-content-center">
              <button type="submit" onClick={addCompra} className="btn btn-primary">Salvar</button>
            </div>
          </div>

        </form>

        <table style={{ marginBottom: 10, marginTop: 50 }} className="table table-dark">
          <thead>
            <tr>
              <th >id</th>
              <th >Total</th>
              <th >Data de Criação</th>
              <th >Tipo de Pagamento</th>
              <th >Status</th>
              <th >Produto</th>
              <th >Operações</th>
            </tr>
          </thead>
          <tbody >
            {dados.map((item) => (
              <tr key={item.id} >
                <td>{item.id}</td>
                <td>{item.total}</td>
                <td>{item.createdAt}</td>
                <td>{item.tipo_pagamento}</td>
                <td>{item.status}</td>
                <td>{buscarNomeProduto(item.id_produto)}</td>
                <td><button onClick={() => deleteProduto(item.id)} className="btn btn-danger" >Excluir</button><button onClick={() => camposAtualizar(item)} className="btn btn-success" >Atualizar</button></td>
              </tr>
            ))
            }
          </tbody>
        </table>

      </div>

    );
  }

export default App;