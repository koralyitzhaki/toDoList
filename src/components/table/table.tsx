import React, { FC, useState } from "react";
import { TableRow } from "../../types";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { pink } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import { Checkbox, TextField } from "@mui/material";
import "./table.css";

interface TableProps {
  rows: TableRow[];
  deleteRow: (targetIndex: number) => void;
  onSubmit: (newRow: TableRow) => void;
}

export const Table: FC<TableProps> = ({ rows, deleteRow, onSubmit}) => {
  const [formState, setFormState] = useState({
    status: false,
    task: "",
  });

  const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      task: e.target.value,
    });
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
    if (!validateForm()) return;
    onSubmit(formState);
    setFormState({
      ...formState,
      task: "",
    });
  };


  const [editMode, setEditMode] = useState<number | null>(null);

  const handelInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handelChange(e);
  }

  const handEditClick = (id: number) => {
    if (editMode === null)
      setEditMode(id);
    else
      setEditMode(null);
  }




  return (
    <table className="table">
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            <td>
              <Checkbox />
            </td>
            <td className="expand" contentEditable={index === editMode} onBlur={() => handelInput}>{row.task}</td>
            <td className="action" onClick={() => deleteRow(index)}>
              <HighlightOffIcon sx={{ color: pink[500] }} />
            </td>
            <td className="action" onClick={() => handEditClick(index)}>
              <EditIcon color="disabled"/>
            </td>
          </tr>
        ))}
        <td colSpan={2} className="task-td">
          <TextField
            onChange={handelChange}
            className="AddTaskBar"
            value={formState.task}
            fullWidth
            slotProps={{
              input: {
                placeholder: "Task...",
              },
            }}
          />
        </td>

        <td colSpan={2} className="task">
          <button onClick={handelSubmit}>ADD</button>
        </td>
      </tbody>
      {error && <label>{error}</label>}
    </table>
  );
};
