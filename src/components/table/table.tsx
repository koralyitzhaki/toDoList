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
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';


interface TableProps {
  rows: TableRow[];
  deleteRow: (id: number) => void;
  onSubmit: (newRow: TableRow) => void;
  onChange: (id: number) => void;
  handleEdit: (editedRowValue: string, rowId: number) => void;
  checkEditModeOpen: (id?: number) => boolean;
  showToast: (message: string, id: string) => void;
}

const getLargestId = (id: number) => {
  return id + 1;
}
let largestId = getLargestId(3);

export const Table: FC<TableProps> = ({ rows, deleteRow, onSubmit, onChange, handleEdit, checkEditModeOpen, showToast }) => {

  const [formState, setFormState] = useState<TableRow>({
    id: largestId,
    checked: false,
    task: "",
  });
  console.log(rows);

  const checkNotNull = () => {
    if (updatedRow.trim() === "") {
      showToast("can not save an empty task", "error")
      return false;
    } 
    return true;
  }
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // if (checkNotNull()) {

      setFormState({
        ...formState,
        task: e.target.value,
      });
    // }
  };

  const validateForm = () => {
    if (formState.task.trim() === "") {
      showToast("Task is required", "error");
      return false;
    }
    return true;
  };

  const handelSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    largestId = getLargestId(largestId);
    if (!validateForm()) return;  
    onSubmit(formState);
    showToast("Task added", "success");
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
      showToast("Task added", "success");
      setFormState({
        ...formState,
        id: largestId,
        checked: false,
        task: "",
      });
    }
  }


  
  const [editMode, setEditMode] = useRecoilState(editModeStore);
  const [updatedRow, setUpdatedRow] = useState<string>("-");

  const handleEditChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUpdatedRow(e.target.value);
  }


  const handleEditClick = (id: number) => {
    if(rows.find(row => row.id === id)?.checked === true) {
      showToast("can not edit when checked", "error")
      return;
    }

    if (editMode === id) {
      if (!checkNotNull()) return;  
      handleEdit(updatedRow, id);
      setUpdatedRow("");
      setEditMode(null); 
      showToast("Task edited", "success");
      
    } else if (editMode === null) {
      setUpdatedRow(rows.find(row => row.id === id)?.task!);
      setEditMode(id);

    } else if (editMode !== id) {
      if (!checkNotNull()) return;  
      handleEdit(updatedRow, editMode);
      setEditMode(id);
      setUpdatedRow(rows.find(row => row.id === id)?.task!);
    }
  }


  const handleCancelClick = () => {
    setEditMode(null); 
    showToast("Task", "success");
  }





  const handleClose = (e: React.KeyboardEvent<HTMLDivElement>, id: number) => {
    if (e.key === "Enter") {
        if (!checkNotNull()) return;  
        handleEdit(updatedRow, id);
        setUpdatedRow(rows.find(row => row.id === id)?.task!);
        setEditMode(null);
        showToast("Task edited", "success");
    }
  }

  const handleCheck= (id: number): boolean => {
    if (checkEditModeOpen(id)) {
      onChange(id);
    }
    return (id !== editMode);
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
           
            <td className="expand edit">
              <TextField value={editMode === row.id ? updatedRow : row.task} className={divClasses(row)}
                onKeyDown={(event) => handleClose(event, row.id)} disabled={row.id !== editMode} 
                onChange={(event) => handleEditChange(event)} 
                slotProps={{
                  input: {
                    endAdornment: (
                      <td className="action exitIconCon" onClick={handleCancelClick}>
                        {editMode !== null && row.id === editMode ? 
                        <HighlightOffIcon color="error"/> : ""}
                      </td>
                    ),
                  },
                }}>             
              </TextField>
            </td>

            <td className="action" onClick={() => deleteRow(row.id)}>
              <DeleteOutlineIcon sx={{ color: pink[500] }} />
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
    </table>
    
  );
};
