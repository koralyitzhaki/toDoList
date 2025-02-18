// import { useState } from 'react'
import { ChangeEventHandler, useState } from "react";
import "./App.css";
import { Navbar } from "./components/Navbar/Navbar.tsx";
import { Table } from "./components/table/table.tsx";
import { TableRow } from "./types.tsx";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function App() {
  const [rows, setRows] = useState<TableRow[]>([
    { id: 1, status: false, task: "Drink milk" },
    { id: 2, status: false, task: "Go for a walk" },
    { id: 3, status: false, task: "Go to sleep" },
  ]);

  const handelDeleteRow = (targetIndex: number) => {
    setRows(rows.filter((row, _) =>row.id !== targetIndex));
  };

  const handelSubmit = (newRow: TableRow) => {
    setRows([...rows, newRow]);
  };


  const [search, setSearch] = useState<string>("");

  const onSearch: ChangeEventHandler<HTMLInputElement> = (event) =>
    setSearch(event.target.value);

  const filteredRows: TableRow[] = rows.filter((row: TableRow) =>
    row.task.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="App">
      <Navbar />

      <TextField
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
      />

      <Table
        rows={filteredRows}
        deleteRow={handelDeleteRow}
        onSubmit={handelSubmit}
      />

    </div>
  );
}

export default App;
