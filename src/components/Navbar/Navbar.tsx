import { FC } from "react";
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import './Navbar.css';

export const Navbar: FC = () => (
  <nav className="jumbotron jumbotron-fluid bg-info text-light">
    <h1 className='title'> 
          <FactCheckOutlinedIcon sx={{ fontSize: 50 }}/>
        Todo list
      </h1>
  </nav>
);
