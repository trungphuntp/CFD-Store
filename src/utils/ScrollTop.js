const ScrollTop = (e) => {
    e?.preventDefault();
    $("html, body").animate(
        {
            scrollTop: 0,
        },
        600
    );
};
export default ScrollTop;
