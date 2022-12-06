import { Box, styled } from "@mui/system";
import React, { Fragment } from "react";
import { useThemeMode } from "../../contexts/ThemeContext";

const StyledIframe = styled("iframe")({
    width: "100%",
    height: "100%",
    border: 0,
});

const RedditPost = ({ src }) => {
    const id = React.useMemo(() => src && getId(src), [src]);
    const { mode } = useThemeMode();

    if (!id) return <Fragment></Fragment>;

    return (
        <Box
            sx={{
                width: "100%",
                overflow: "hidden",
                aspectRatio: "1.21",
                maxWidth: 640,
            }}
        >
            <StyledIframe
                src={`https://www.redditmedia.com/r/${id?.at(
                    0
                )}/comments/${id?.at(1)}/${id?.at(
                    3
                )}/?ref_source=embed&amp;ref=share&amp;embed=true${
                    mode !== "light" && "&amp;theme=dark"
                }`}
                sandbox="allow-scripts allow-same-origin allow-popups"
            ></StyledIframe>
        </Box>
    );
};

const getId = (url) => {
    const regExp =
        /^.*(reddit.com\/r)\/([^#&?/]+)\/(comments)\/([^#&?/]+)\/([^#&?/]+).*/;
    const match = url.match(regExp);

    return match ? [match[2], match[4], match[5]] : null;
};

export default RedditPost;
