import React, { useEffect, useState } from 'react';
import {uuid} from "uuidv4";
import api from "services/api";

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("/repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);   
  
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
    await api.delete(`/repositories/${id}`);
    const newRepositories = repositories.filter((repo) => repo.id !== id);
    setRepositories(newRepositories);
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
