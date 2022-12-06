import { CircularProgress, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import request from "../util/Request";
import SearchBar from "./SearchBar";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const List = ({ url, generator, noSearch, flexDirection = "", row }) => {
    const [data, setData] = React.useState([]);
    const [next, setNext] = React.useState(false);
    const [key, setKey] = React.useState("");
    const [processing, setProcessing] = React.useState(false);

    React.useEffect(() => {
        if (!url) return;

        var u = url + (url?.includes("?") ? `&key=${key}` : `?key=${key}`);

        getData(u, setData, setNext, setProcessing);
    }, [url, key]);

    const handleLoad = () => {
        next && getData(next, setData, setNext, setProcessing, true);
    };

    return (
        <Box sx={{ flex: 1, width: "100%", flexDirection: flexDirection }}>
            {!noSearch && (
                <SearchBar mb={2} onSearch={(v) => setKey(v)} sticky />
            )}

            {next !== false && data.length === 0 && (
                <Box sx={{ width: "100%", textAlign: "center" }}>
                    <Typography>There is no data</Typography>
                </Box>
            )}

            <Box
                sx={{
                    display: "flex",
                    flexDirection: row ? "row" : "column",
                    flexWrap: "wrap",
                    justifyContent: "space-around",
                }}
            >
                {generator([data, setData])}
            </Box>

            {next && !processing && (
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <IconButton onClick={handleLoad} size="small">
                        <AddCircleOutlineIcon />
                    </IconButton>
                </Box>
            )}

            {processing && (
                <Box sx={{ width: "100%", textAlign: "center" }}>
                    <CircularProgress />
                </Box>
            )}
        </Box>
    );
};

const getData = async (url, setData, setNext, setProcessing, append) => {
    setProcessing(true);

    const res = await request(url);

    if (res.ok) {
        const js = await res.json();
        append ? setData((data) => [...data, ...js.data]) : setData(js.data);
        setNext(js.links.next);
    }
    setProcessing(false);
};

export default List;
