import { ChangeEventHandler, FC } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField } from "@mui/material";

interface SearchBarProps {
  sendFilteredRows: (search: string) => void;
  search: string;
}

export const SearchBar: FC<SearchBarProps> = ({ sendFilteredRows, search }) => {

  const onSearch: ChangeEventHandler<HTMLInputElement> = (event) => {
    sendFilteredRows(event.target.value);
  }

  return (
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
  )
};