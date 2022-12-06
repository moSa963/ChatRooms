import { Box } from "@mui/material";
import React from "react";

const Attachment = ({ flip, children, scroll, onVisibleChange }) => {
    const ref = React.useRef(null);

    React.useEffect(() => {
        if (!(scroll && ref.current)) return;

        var b = ref.current.getBoundingClientRect();

        onVisibleChange &&
            onVisibleChange(b.bottom >= scroll.top && b.top <= scroll.bottom);
    }, [scroll, ref, onVisibleChange]);

    return (
        <Box
            sx={{
                direction: !flip ? "ltr" : "rtl",
                alignSelf: flip ? "end" : "start",
                resize: "horizontal",
                overflow: "hidden",
                userSelect: "none",
                width: 250,
                maxWidth: "100%",
                minWidth: 50,
            }}
            ref={ref}
        >
            {children}
        </Box>
    );
};

export default Attachment;
