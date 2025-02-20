import React, { FC, useState } from "react";
// import { TableRow } from "../../types";
import "./table.css";

interface ButtonsProps {
  // rows: TableRow[];
  deleteRow: (id: number) => void;
}

// export const Buttons: FC<ButtonsProps> = ({ rows, deleteRow }) => {


//   return (
//     <div className="buttons"> 
//       <button onClick={() => handleCheckAll(true)}>check all</button>
//       <button onClick={() => handleCheckAll(false)}>uncheck all</button>
//     </div>
//   );
// };
