// import { useState } from 'react'
import { useState } from "react";
import "./App.css";
import { Navbar } from "./components/Navbar/Navbar.tsx";
import { Table } from "./components/table/table.tsx";
import { TableRow } from "./types.tsx";
import { SearchBar } from "./components/SearchBar.tsx";
// import { Buttons } from "./components/buttons.tsx";

import { useRecoilState } from "recoil";
import editModeStore from "./atoms/editMode.store.ts";
import { toast } from "react-toastify";


function App() {

  const showToast = (message: string, id: string) => {
    if (!toast.isActive(id)) {
      toast(message, { toastId: id })
    }
  };




  const [rows, setRows] = useState<TableRow[]>([
    { id: 1, checked: false, task: "Drink milk" },
    { id: 2, checked: false, task: "Go for a walk" },
    { id: 3, checked: false, task: "Go to sleep" },
  ]);

  const [editMode, setEditMode] = useRecoilState(editModeStore);


  const handleDeleteRow = (id: number) => {
    setRows(rows.filter((row, _) =>row.id !== id));
    if (id === editMode) {
      setEditMode(null);
    }
  };

  const handleSubmit = (newRow: TableRow) => {
    setRows([...rows, newRow]);
  };



  const handleEdit = (editedRowValue: string, rowId: number) => {
    const updatedRows = rows.map(row => row.id === rowId ? {
      ...row, task: editedRowValue } : row )

    setRows(updatedRows);
  };



  const [search, setSearch] = useState<string>("");

  const handleFiteredRows = (search: string) => {
    if (editMode === null) {
      setSearch(search);
      setEditMode(null);
    }
  };
    
  const filteredRows: TableRow[] = rows.filter((row: TableRow) =>
    row.task.toLowerCase().includes(search.toLowerCase())
  );

  const handleCheckAll = (checkAll: boolean) => {
    if (checkNotNull()) {
      if (editMode !== null) {
        setEditMode(null);
      }
      let newRows = filteredRows.map(checkBox => (
          {...checkBox, checked: checkAll}
        ))
      setRows([...newRows,...rows.filter(row => !newRows.some(newRow => newRow.id === row.id))]);
    }
  }
    


  const handleCheckBoxChange = (id: number) => {
    setRows(checkBoxses => 
      checkBoxses.map(checkbox =>
      checkbox.id === id ? {
        ...checkbox, checked: !checkbox.checked
      } : checkbox ));
  }


  const checkNotNull = () => {
    if (!rows.every(item => !(item.task === ""))) {
      showToast("can not save an empty task", "1")
      return false;
    } else {
      return true;
    }
  }

  


  return (
    <div className="App">
      <Navbar />
      <SearchBar 
        sendFilteredRows={handleFiteredRows}
        search={search}
        checkNotNull={checkNotNull}
      />

      <Table
        rows={filteredRows}
        deleteRow={handleDeleteRow}
        onSubmit={handleSubmit}
        onChange={handleCheckBoxChange}
        handleEdit={handleEdit}
        checkNotNull={checkNotNull}
      />


      <div className="data">
        <div>Tasks left: {rows.length - rows.filter(row => row.checked).length}</div>
        <div>Tasks you have completed: {rows.filter(row => row.checked).length}</div>
      </div>



      {/* <Buttons /> */}

      <div className="buttons"> 
        <button onClick={() => handleCheckAll(true)}>check all</button>
        <button onClick={() => handleCheckAll(false)}>uncheck all</button>
      </div>

      



    </div>
  );
}

export default App;
