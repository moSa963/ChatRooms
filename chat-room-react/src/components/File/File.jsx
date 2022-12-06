import React from "react";
import Image from "./Image";
import Video from "./Video";
import Audio from "./Audio";
import UnknownFile from "./UnknownFile";

const AttachmentFile = ({ src, name, type, paused }) => {
    if (type.startsWith("image")) return <Image src={src} />;

    if (type.startsWith("video"))
        return <Video src={src} type={type} paused={paused} />;

    if (type.startsWith("audio"))
        return <Audio src={src} type={type} paused={paused} />;

    return <UnknownFile name={name} src={src} />;
};

export default AttachmentFile;
