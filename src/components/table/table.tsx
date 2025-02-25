import React, { ChangeEvent, FC, useState } from "react";
import { TableRow } from "../../types";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { pink } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import { Checkbox, TextField } from "@mui/material";
import "./table.css";
import { SaveAs } from "@mui/icons-material";
import classNames from "classnames";
import editModeStore from "../../atoms/editMode.store";
import { useRecoilState } from "recoil";
import { Slide, ToastContainer } from 'react-toastify';


interface TableProps {
  rows: TableRow[];
  deleteRow: (id: number) => void;
  onSubmit: (newRow: TableRow) => void;
  onChange: (id: number) => void;
  handleEdit: (editedRowValue: string, rowId: number) => void;
  checkNotNull: () => boolean;
}

const getLargestId = (id: number) => {
  return id + 1;
}
let largestId = getLargestId(3);

export const Table: FC<TableProps> = ({ rows, deleteRow, onSubmit, onChange, handleEdit, checkNotNull }) => {

  const [formState, setFormState] = useState<TableRow>({
    id: largestId,
    checked: false,
    task: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (checkNotNull()) {
      setFormState({
        ...formState,
        task: e.target.value,
      });
    }
  };

  const [error, setError] = useState("");

  const validateForm = () => {
    if (formState.task === "") {
      setError("Task is required");
      return false;
    } else {
      setError("");
      return true;
    }
  };

  const handelSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    largestId = getLargestId(largestId);
    if (!validateForm()) return;  
    onSubmit(formState);
    setFormState({
      ...formState,
      id: largestId,
      checked: false,
      task: "",
    });
  };

  const handelSubmitEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      largestId = getLargestId(largestId);
      if (!validateForm()) return;
      onSubmit(formState);
      setFormState({
        ...formState,
        id: largestId,
        checked: false,
        task: "",
      });
    }
  }





  // const [editMode, setEditMode] = useState<number | null>(null);
  const [editMode, setEditMode] = useRecoilState(editModeStore);


  const handleEditChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: number) => {
    handleEdit(e.target.value, id);
  }


  const handleEditClick = (id: number) => {
    if (checkNotNull()) {
      if (rows.find(row => row.id === id)?.checked === false) {
        setEditMode(id);
      } 
      if (editMode === id) {
        setEditMode(null);
      }
    }
  }


  const handleClose = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      if (checkNotNull()) {
        setEditMode(null);
      }
    }
  }

  const handleCheck= (id: number): boolean => {
    if (id !== editMode) {
      onChange(id);
    }

    return true;
  }

  const divClasses = (row: TableRow) => classNames({
    "editing": editMode !== null && row.id === editMode,
    "expand": true,
    "checked": row.checked === true
  })



  return (
    <table className="table">
      <tbody>
        {rows.map((row, _) => (
          <tr key={row.id}>
            <td>
              <Checkbox key={row.id} checked={row.checked} onClick={() => handleCheck(row.id)}/>
            </td>
            <td className="expand">
              <TextField value={row.task} className={divClasses(row)}
              onKeyDown={handleClose} disabled={row.id !== editMode} onChange={(event) => handleEditChange(event, row.id)} />
            </td>
            
            <td className="action" onClick={() => deleteRow(row.id)}>
              <HighlightOffIcon sx={{ color: pink[500] }} />
            </td>
            <td className="action" onClick={() => handleEditClick(row.id)}>
              {editMode !== null && row.id === editMode ? 
              <SaveAs color="success"/> : 
              <EditIcon color="disabled"/>}
            </td>
          </tr>
        ))}
        <tr>
          <td colSpan={2} className="task-td expand">
            <TextField
              onChange={handleChange}
              className="AddTaskBar"
              value={formState.task}
              fullWidth
              slotProps={{
                input: {
                  placeholder: "Task...",
                },
              }}
              onKeyDown={handelSubmitEnter}
            />
          </td>

          <td colSpan={2} className="task">
            <button onClick={handelSubmit}>ADD</button>
          </td>
        </tr>
      </tbody>
      {error && <label>{error}</label>}
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

    </table>

    
  );
};
