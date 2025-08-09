import { useState } from "react";
import { TextField, Button, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const SearchBar = ({ searchHandler }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleClear = () => {
    setSearchValue("");
  };

  return (
    <div className="bg-gradient-to-r from-blue-400 to-cyan-300 p-4 rounded-full shadow-lg max-w-xl mx-auto">
      <form
        onSubmit={searchHandler}
        className="flex flex-col sm:flex-row items-center gap-3 w-full"
      >
        <TextField
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          variant="outlined"
          placeholder="Search by city..."
          name="city"
          size="small"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon className="text-gray-500" />
              </InputAdornment>
            ),
            endAdornment: searchValue && (
              <InputAdornment position="end">
                <IconButton onClick={handleClear} size="small">
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            backgroundColor: "white",
            borderRadius: "9999px",
            transition: "all 0.3s ease-in-out",
            "& fieldset": { border: "none" },
            "&:hover": { boxShadow: "0 0 8px rgba(0,0,0,0.15)" },
            "& .Mui-focused": {
              boxShadow: "0 0 10px rgba(0,0,0,0.2)",
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            borderRadius: "9999px",
            px: 3,
            py: 1,
            fontWeight: 500,
            textTransform: "none",
            background: "linear-gradient(45deg, #ff9a9e, #fad0c4)",
            color: "#333",
            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0 6px 15px rgba(0,0,0,0.25)",
              background: "linear-gradient(45deg, #ff9a9e, #fad0c4)",
            },
            "&:active": {
              transform: "scale(0.97)",
            },
          }}
        >
          Search
        </Button>
      </form>
    </div>
  );
};

export default SearchBar;
