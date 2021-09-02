import './App.css';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import api from './configurationAPI/axiosconfig';

function App() {
    const caminho2 = useHistory();

    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [preco, setPreco] = useState(0);

    const [dados, setDados] = useState([]);

    const [restart, setRestart] = useState(false);
    const [idAtual, setidAtual] = useState(null);

    useEffect(() => {
        api.get('listarproduto').then((response) => {
            setDados(response.data);
            console.log(response);
        }).catch(() => {
            console.log("deu ruim");
        });
    }, [restart]);


    const deleteProduto = (id) =>{
        api.delete('deleteproduto/'+ id).then(()=>{
            setRestart(!restart)
        });
    }

    const atualizarProduto = (id) =>{
        api.put('updateproduto/'+id,{
                nome: nome,
                descricao: descricao,
                preco: preco,
        }).then(()=>{
            setRestart(!restart)
        });
    }

    const camposAtualizar = (item) =>{
        setNome(item.nome);
        setDescricao(item.descricao);
        setPreco(item.preco);
        setidAtual(item.id);
    }

    const addProduto = () => {
        if(idAtual == null){
            
                api.post('produto', {
                    nome: nome,
                    descricao: descricao,
                    preco: preco,
                }).then(() => {
                    console.log("sucess");
                }).catch(() => {
                    console.log("failed");
                });
                  
        }else{
            atualizarProduto(idAtual);
        }   
    };

    return (
        <div className="App">
            <header className="App-header">
                <div className="row">
                    <div className="col text-center">
                        <button type="button" className="btn btn-dark " onClick={() => caminho2.push("/")}>Voltar</button>
                    </div>
                    <div className="col text-center">
                        <button type="button" className="btn btn-dark " onClick={() => caminho2.push("/compras")}>Compras</button>
                    </div>
                </div>
            </header>

            <div style={{ marginTop: 50 }}>
                <h2>Cadastrar Produto</h2>
            </div>

            <form>
                <div style={{ marginBottom: 10, marginTop: 50 }} className="row d-flex justify-content-center">
                    <div className="form-group col-3">
                        <label  >Produto</label>
                        <input type="text" className="form-control" onChange={(event) => { setNome(event.target.value); }} value={nome} placeholder="Nome do Produto"></input>
                    </div>
                    <div className="col-3">
                        <label  >Descrição</label>
                        <input type="text" className="form-control" onChange={(event) => { setDescricao(event.target.value); }} value={descricao} placeholder="Descrição do Produto"></input>
                    </div>
                </div>
                <div className="row d-flex justify-content-center">

                    <div className="col-2">
                        <label  >Preço</label>
                        <input type="number" className="form-control" onChange={(event) => { setPreco(event.target.value); }} value={preco} placeholder="Preço"></input>
                    </div>
                </div>
                <div style={{ marginTop: 20 }} className="row d-flex justify-content-center">
                    <div className="col d-flex justify-content-center">
                        <button type="submit" onClick={addProduto} className="btn btn-primary">Salvar</button>
                    </div>
                </div>

            </form>

            <table style={{ marginBottom: 10, marginTop: 50 }} className="table table-dark">
                <thead>
                    <tr>
                        <th >id</th>
                        <th >Nome</th>
                        <th >Descrição</th>
                        <th >Preço</th>
                        <th >Data de Criação</th>
                        <th >Data de Atualização</th>
                        <th >Operações</th>
                    </tr>
                </thead>
                <tbody >
                    {dados.map((item) => (
                        <tr key ={item.id} >
                            <td>{item.id}</td>
                            <td>{item.nome}</td>
                            <td>{item.descricao}</td>
                            <td>{item.preco}</td>
                            <td>{item.createdAt}</td>
                            <td>{item.updatedAt}</td>
                            <td><button onClick={()=>deleteProduto(item.id)} className="btn btn-danger" >Excluir</button><button onClick={()=>camposAtualizar(item)} className="btn btn-success" >Atualizar</button></td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>

        </div>

    );
}

export default App;