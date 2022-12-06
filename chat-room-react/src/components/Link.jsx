import { styled } from "@mui/system";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

const StyledLink = styled(RouterLink)({});

const Link = ({ children, to, variant }) => {
    return (
        <StyledLink to={to} sx={{ ":hover": { color: "primary.dark" } }}>
            {children}
        </StyledLink>
    );
};

export default Link;
