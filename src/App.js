import React, { useEffect, useState } from 'react';
import {uuid} from "uuidv4";
import api from "services/api";

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      if (!response.data) { 
        setRepositories([...repositories, response.data]);
      }
    })  
  }, [repositories]); 
  
  async function handleAddRepository() {
    const response = await api.post("/repositories", {
      id: uuid(),
      title: "Daniel",
      url: "https://github.com/dkdaniz",
      tech: ["nodejs", "solidity"],
    });
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);
    if (response) {
      const respo = repositories.filter(repo => repo.id !== id);
      setRepositories([...respo], [response.data]);
    } 
  }

  return (
    <>    
      <ul data-testid="repository-list">
        {repositories.map((repo) =>
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>Remover</button>
        </li>)}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </>
  );
}

export default App;
