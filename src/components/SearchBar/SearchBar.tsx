import { FC } from "react";
import './SearchBar.css'
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField } from "@mui/material";

export const SearchBar: FC = () => (
    <TextField className="SearchBar" fullWidth
            slotProps={{
              input: {
                placeholder:
                "Search...",
                endAdornment:
                  <InputAdornment position="end">
                      <SearchIcon />
                  </InputAdornment>
              }, 
            }}
          />
);
