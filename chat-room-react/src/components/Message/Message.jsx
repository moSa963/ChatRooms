import React from "react";
import MessageBase from "./MessageBase";
import Attachment from "./Attachment";
import MessageTitle from "./MessageTitle";
import { APP_URL } from "../../util/Request";
import File from "../File/File";
import AttachmentLink from "./AttachmentLink";

const Message = ({ message, right, scroll, manageMessage }) => {
    const [visible, setVisible] = React.useState(false);

    return (
        <MessageBase
            message={message}
            right={right}
            manageMessage={manageMessage}
        >
            {message?.title !== "" && (
                <MessageTitle title={message?.title} right={right} />
            )}

            <Attachment
                flip={right}
                scroll={scroll}
                onVisibleChange={setVisible}
            >
                {message?.src && (
                    <File
                        name={message?.name}
                        paused={!visible}
                        src={
                            message.src.startsWith("api")
                                ? APP_URL + message.src
                                : message.src
                        }
                        type={message.mime_type}
                    />
                )}
                {!message?.src && <AttachmentLink title={message?.title} />}
            </Attachment>
        </MessageBase>
    );
};

export default Message;
