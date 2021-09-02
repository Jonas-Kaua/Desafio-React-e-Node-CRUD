
import './App.css';

import { useHistory } from 'react-router-dom';

function App() {
  const caminho = useHistory();
  return (
    <div className="App">
      <header className="App-header">
            <h4>Teste ICTS CRUD Produtos e Compras</h4>
      </header>

      <div className="alert alert-success" role="alert">
        Por Jonas Kauã
      </div> 

      <div style = {{marginTop: 100}} className="container">
          <div className="row">
            <div className="col text-center">
              <button type="button" className="btn btn-dark " onClick={() => caminho.push("/produtos")}>Produtos</button>
            </div>
            <div className="col text-center">
              <button type="button" className="btn btn-dark " onClick={() => caminho.push("/compras")}>Compras</button>
            </div>
          </div>
        </div>

    </div>
  );
}

export default App;
