import styled from "@emotion/styled";
import React from "react";

const ImageStyled = styled("img")({
    width: "100%",
    height: "100%",
    objectFit: "contain",
    overflow: "hidden",
});

const Image = ({ src }) => {
    return <React.Fragment>{src && <ImageStyled src={src} />}</React.Fragment>;
};

export default Image;
