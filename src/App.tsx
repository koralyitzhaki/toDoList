// import { useState } from 'react'
import { ChangeEventHandler, useState } from "react";
import "./App.css";
import { ModalForm } from "./components/Modal/Modal.tsx";
import { Navbar } from "./components/Navbar/Navbar.tsx";
import { Table } from "./components/table/table.tsx";
import { TableRow } from "./types.tsx";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function App() {
  const [rows, setRows] = useState([
    { status: false, task: "Drink milk" },
    { status: false, task: "Go for a walk" },
    { status: false, task: "Go to sleep" },
  ]);

  const handelDeleteRow = (targetIndex: number) => {
    setRows(rows.filter((_, index) => index !== targetIndex));
  };

  const handelSubmit = (newRow: TableRow) => {
    setRows([...rows, newRow]);
  };



  // const [rowToEdit, setRowToEdit] = useState<number | null>(null);

  // const handleEdit = (index: number) => {
  //   setRowToEdit(index);
  // }





  const [search, setSearch] = useState<string>("");

  const onSearch: ChangeEventHandler<HTMLInputElement> = (event) =>
    setSearch(event.target.value);

  const filteredRows: TableRow[] = rows.filter((row: TableRow) =>
    Object.values(row).some((value) => value.toString().includes(search))
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

      <ModalForm />
    </div>
  );
}

export default App;
