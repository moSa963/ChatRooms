import { Box, styled } from "@mui/system";
import React, { Fragment } from "react";

const StyledIframe = styled("iframe")({
    width: "100%",
    height: "100%",
    border: 0,
});

const Youtube = ({ src }) => {
    const id = React.useMemo(() => src && getId(src), [src]);

    if (!id) return <Fragment></Fragment>;

    return (
        <Box sx={{ width: "100%", overflow: "hidden", aspectRatio: "16/9" }}>
            <StyledIframe
                src={`https://www.youtube-nocookie.com/embed/${id}`}
            ></StyledIframe>
        </Box>
    );
};

const getId = (url) => {
    const regExp =
        /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return match && match[2].length === 11 ? match[2] : null;
};

export default Youtube;
