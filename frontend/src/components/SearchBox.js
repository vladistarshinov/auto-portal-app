import React, { useState } from "react";
import { Form, Button } from "bootstrap-4-react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <Paper
      component="form"
      sx={{ p: "0 4px", display: "flex", alignItems: "center", width: 300 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        type="text"
        name="q"
        placeholder="Поиск ..."
        onChange={(e) => setKeyword(e.target.value)}
        inputProps={{ "aria-label": "search products" }}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton
        type="submit"
        sx={{ p: "10px" }}
        aria-label="search"
        onClick={submitHandler}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBox;
