import {
    FacebookShareButton,
    InstapaperShareButton,
    LinkedinShareButton,
    PinterestShareButton,
    TwitterShareButton,
} from "react-share";
import styled from "styled-components";

const StyledLink = styled.a`
    padding: 0 10px;
`;

const ShareLink = ({
    path = window.location.href,
    label,
    type,
    media,
    children,
    className = "",
}) => {
    switch (type) {
        case "Twitter":
            return (
                <TwitterShareButton url={path}>
                    <StyledLink
                        href="#"
                        className={`social-icon ${className}`}
                        title={label}
                        target="_blank"
                    >
                        {children}
                    </StyledLink>
                </TwitterShareButton>
            );
        case "Instagram":
            return (
                <InstapaperShareButton url={path}>
                    <StyledLink
                        href="#"
                        className={`social-icon ${className}`}
                        title={label}
                        target="_blank"
                    >
                        {children}
                    </StyledLink>
                </InstapaperShareButton>
            );
        case "Printerest":
            return (
                <PinterestShareButton url={path} description="" media={media}>
                    <StyledLink
                        href="#"
                        className={`social-icon ${className}`}
                        title={label}
                        target="_blank"
                    >
                        {children}
                    </StyledLink>
                </PinterestShareButton>
            );
        case "Linkedin":
            return (
                <LinkedinShareButton url={path}>
                    <StyledLink
                        href="#"
                        className={`social-icon ${className}`}
                        title={label}
                        target="_blank"
                    >
                        {children}
                    </StyledLink>
                </LinkedinShareButton>
            );
        default:
            return (
                <FacebookShareButton url={path}>
                    <StyledLink
                        href="#"
                        className={`social-icon ${className}`}
                        title={label}
                        target="_blank"
                    >
                        {children}
                    </StyledLink>
                </FacebookShareButton>
            );
    }
};

export default ShareLink;
