// import { useState } from 'react'
import { useState } from "react";
import "./App.css";
import { Navbar } from "./components/Navbar/Navbar.tsx";
import { Table } from "./components/table/table.tsx";
import { TableRow } from "./types.tsx";
import { SearchBar } from "./components/SearchBar.tsx";
// import { Buttons } from "./components/buttons.tsx";
import { Slide, ToastContainer } from 'react-toastify';

import { useRecoilState } from "recoil";
import editModeStore from "./atoms/editMode.store.ts";
import { toast } from "react-toastify";
  
let showToast = (message: string, id: string) => {
  if (!toast.isActive(id)) {
    toast(message, { toastId: id, style: {color: id === "error" ? "indianred": id === "success" ? "Green" : "Gold"}} )
  }
};


function App() {

  const [rows, setRows] = useState<TableRow[]>([
    { id: 1, checked: false, task: "Drink milk" },
    { id: 2, checked: false, task: "Go for a walk" },
    { id: 3, checked: false, task: "Go to sleep" },
  ]);

  const [editMode, setEditMode] = useRecoilState(editModeStore);


  const handleDeleteRow = (id: number) => {
    setRows(rows.filter((row, _) =>row.id !== id));
    if (editMode === id) {
      setEditMode(null);
    }
    showToast("Task deleted", "success");
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

  const handleFilteredRows = (search: string) => {
    if (checkEditModeOpen()) {
      setSearch(search);
    }
  };
    
  const filteredRows: TableRow[] = rows.filter((row: TableRow) =>
    row.task.toLowerCase().includes(search.toLowerCase())
  );

  if (filteredRows.length === 0) {
    showToast("There are no results", "info");
  }

  const handleCheckAll = (checkAll: boolean) => {
    if (checkNotNull()) {
      let newRows = filteredRows.map(checkBox => (
        checkBox.id !== editMode ?
          {...checkBox, checked: checkAll} : checkBox
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
    if (!rows.every(item => !(item.task.trim() === ""))) {
      showToast("can not save an empty task", "error")
      return false;
    } 
    return true;
  }

  const checkEditModeOpen = (id?: Number) => {
    if (id) {
      if (id === editMode) {
        showToast("edit mode is open", "error");
        return false;
      } 
      return true;
    }
    return editMode !== null ? (showToast("edit mode is open", "error"), false) : true;
  }


  const handleDeleteAll = () => {
    const updatedRows = rows.filter(row => row.checked === false);
    setRows(updatedRows);
  }
  


  return (
    <div className="App">
      <Navbar />
      <SearchBar 
        sendFilteredRows={handleFilteredRows}
        search={search}
        checkNotNull={checkNotNull}
      />

      <Table
        rows={filteredRows}
        deleteRow={handleDeleteRow}
        onSubmit={handleSubmit}
        onChange={handleCheckBoxChange}
        handleEdit={handleEdit}
        checkEditModeOpen={checkEditModeOpen}
        showToast={showToast}
      />


      <div className="data">
        <div>Tasks left: {rows.length - rows.filter(row => row.checked).length}</div>
        <div>Tasks you have completed: {rows.filter(row => row.checked).length}</div>
      </div>



      {/* <Buttons /> */}

      <div className="buttons"> 
        <button onClick={() => handleCheckAll(true)}>check all</button>
        <button onClick={() => handleCheckAll(false)}>uncheck all</button>
        <button onClick={handleDeleteAll}>deleted all checked</button>

      </div>

      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Slide}
      />

      



    </div>
  );
}

export default App;
