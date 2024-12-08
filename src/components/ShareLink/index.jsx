import {
    FacebookShareButton,
    InstapaperShareButton,
    PinterestShareButton,
    TwitterShareButton,
} from "react-share";

const ShareLink = ({ path = window.location.href, label, type, media, children }) => {
    switch (type) {
        case "Twitter":
            return (
                <TwitterShareButton url={path}>
                    <a href="#" className="social-icon" title={label} target="_blank">
                        {children}
                    </a>
                </TwitterShareButton>
            );
        case "Instagram":
            return (
                <InstapaperShareButton url={path}>
                    <a href="#" className="social-icon" title={label} target="_blank">
                        {children}
                    </a>
                </InstapaperShareButton>
            );
        case "Printerest":
            return (
                <PinterestShareButton url={path} description="" media={media}>
                    <a href="#" className="social-icon" title={label} target="_blank">
                        {children}
                    </a>
                </PinterestShareButton>
            );
        default:
            return (
                <FacebookShareButton url={path}>
                    <a href="#" className="social-icon" title={label} target="_blank">
                        {children}
                    </a>
                </FacebookShareButton>
            );
    }
};

export default ShareLink;
