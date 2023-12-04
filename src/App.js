import { useEffect, useState } from "react";

import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";

import "./App.css";

const App = () => {
  const [monsters, setMonsters] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => {
        setMonsters(users);
      });
  }, []);

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchString);
    });
    setFilteredMonsters(newFilteredMonsters);
  }, [monsters, searchString]);

  const onSearchChangeHandler = (event) => {
    const searchString = event.target.value.toLowerCase();
    setSearchString(searchString);
  };

  return (
    <div className="App">
      <h1 className="app-title">Monsters Rolodex</h1>
      <SearchBox
        className="monster-search-box"
        placeholder="search"
        onChangeHandler={onSearchChangeHandler}
      />
      <CardList monsters={filteredMonsters} />
    </div>
  );
};

export default App;
