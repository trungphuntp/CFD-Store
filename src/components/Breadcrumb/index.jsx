import React from "react";

const Breadcrumb = ({ children }) => {
    return (
        <nav aria-label="breadcrumb" className="breadcrumb-nav mb-2">
            <div className="container">
                <ol className="breadcrumb">{children}</ol>
            </div>
        </nav>
    );
};

const BreadcrumbItem = ({ children, isActive = false }) => {
    return <li className={`breadcrumb-item ${isActive ? "active" : ""}`}>{children}</li>;
};
// compound component
Breadcrumb.Item = BreadcrumbItem;

export default Breadcrumb;
