// import { useState } from 'react'
import { useState } from "react";
import "./App.css";
import { Navbar } from "./components/Navbar/Navbar.tsx";
import { Table } from "./components/table/table.tsx";
import { TableRow } from "./types.tsx";
import { SearchBar } from "./components/SearchBar.tsx";
// import { Buttons } from "./components/buttons.tsx";

function App() {

  const [rows, setRows] = useState<TableRow[]>([
    { id: 1, checked: false, task: "Drink milk" },
    { id: 2, checked: false, task: "Go for a walk" },
    { id: 3, checked: false, task: "Go to sleep" },
  ]);

  const handleDeleteRow = (id: number) => {
    setRows(rows.filter((row, _) =>row.id !== id));
  };

  const handleSubmit = (newRow: TableRow) => {
    setRows([...rows, newRow]);
  };


  // const [search, setSearch] = useState<string>("");
  // const onSearch: ChangeEventHandler<HTMLInputElement> = (event) =>
  //   setSearch(event.target.value);

  // const filteredRows: TableRow[] = rows.filter((row: TableRow) =>
  //   row.task.toLowerCase().includes(search.toLowerCase())
  // );

  const [search, setSearch] = useState<string>("");

  const handleFiteredRows = (search: string) => {
    setSearch(search);
  };
    
  const filteredRows: TableRow[] = rows.filter((row: TableRow) =>
    row.task.toLowerCase().includes(search.toLowerCase())
  );

  const handleCheckAll = (checkAll: boolean) => {
    let newRows = filteredRows.map(checkBox => (
        {...checkBox, checked: checkAll}
      ))
    setRows([...newRows,...rows.filter(row => !newRows.some(newRow => newRow.id === row.id))]);
  }


  const handleCheckBoxChange = (id: number) => {
    setRows(checkBoxses => 
      checkBoxses.map(checkbox =>
      checkbox.id === id ? {
        ...checkbox, checked: !checkbox.checked
      } : checkbox ));
  }


  return (
    <div className="App">
      <Navbar />
      <SearchBar 
        sendFilteredRows={handleFiteredRows}
        search={search}
      />

      {/* <TextField
        className="SearchBar"
        fullWidth
        value={search}
        onChange={onSearch}
        slotProps={{
          input: {
            placeholder: "Search...",
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
      /> */}

      <Table
        rows={filteredRows}
        deleteRow={handleDeleteRow}
        onSubmit={handleSubmit}
        onChange={handleCheckBoxChange}

      />

      {/* <Buttons /> */}

      <div className="buttons"> 
        <button onClick={() => handleCheckAll(true)}>check all</button>
        <button onClick={() => handleCheckAll(false)}>uncheck all</button>
      </div>


    </div>
  );
}

export default App;
