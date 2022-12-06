import React from "react";
import RedditPost from "../File/RedditPost";
import Youtube from "../File/Youtube";

const AttachmentLink = ({ title }) => {
    const links = React.useMemo(() => getLinks(title), [title]);

    for (var i = 0; i < links.length; ++i) {
        for (var j = 0; j < linkMatch.length; ++j) {
            if (links[i].match(linkMatch[j].rge))
                return linkMatch[j].component(links[i]);
        }
    }

    return <React.Fragment></React.Fragment>;
};

const getLinks = (title) => {
    const reg =
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/g;

    return title.match(reg) || [];
};

const linkMatch = [
    {
        rge: /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w-]+\?v=|embed\/|v\/)?)([\w-]+)(\S+)?$/,
        component: (src) => <Youtube src={src} />,
    },
    {
        rge: /^.*(reddit.com\/r)\/([^#&?/]+)\/(comments)\/([^#&?/]+)\/([^#&?/]+).*/,
        component: (src) => <RedditPost src={src} />,
    },
];

export default AttachmentLink;
