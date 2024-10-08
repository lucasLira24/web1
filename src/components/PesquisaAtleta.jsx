import React, { useState } from "react";
import axios from "axios";
import './PesquisaAtleta.css';

function PesquisaAtleta({ onResultados, onSearchExecuted }) {
  const [novaBusca, setNovaBusca] = useState('');

  const buscar = (e) => {
    setNovaBusca(e.target.value);
  };

  const pesquisar = async (e) => {
    e.preventDefault();
    const nomeAtleta = novaBusca.trim();
    if (!nomeAtleta) return;

    const url = `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${encodeURIComponent(nomeAtleta)}`;
    
    try {
      const response = await axios.get(url);
      const data = response.data;
      
      if (!data.player || data.player.length === 0) {
        console.log("Nenhum jogador encontrado");
        onResultados([]);
      } else {
        onResultados(data.player.slice(0, 10));
      }
    } catch (error) {
      console.error("Não é possível obter dados:", error);
    } finally {
        onSearchExecuted();
      }
  };

  return (
    <div className="main">
      <form onSubmit={pesquisar}>
        <input 
          value={novaBusca}
          onChange={buscar} 
          type="text" 
          placeholder="Digite o nome do atleta..."
        />
        <button type="submit">Pesquisar</button>
      </form>
    </div>
  );
}

export default PesquisaAtleta;