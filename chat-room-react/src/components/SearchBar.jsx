import { Button, InputBase, Paper } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ onSearch, mb = 0, sticky }) => {
    const [input, setInput] = React.useState("");

    return (
        <Paper
            sx={{
                mb: mb,
                flex: 1,
                width: "100%",
                borderRadius: 2,
                display: "flex",
                overflow: "hidden",
                position: sticky && "sticky",
                top: 0,
                zIndex: 2,
            }}
        >
            <InputBase
                onKeyUp={(e) =>
                    e.key === "Enter" && onSearch && onSearch(input)
                }
                value={input}
                onChange={(e) => setInput(e.currentTarget.value)}
                placeholder="Search..."
                sx={{ width: "100%", px: 2 }}
            />
            <Button onClick={() => onSearch && onSearch(input)}>
                <SearchIcon />
            </Button>
        </Paper>
    );
};

export default SearchBar;
