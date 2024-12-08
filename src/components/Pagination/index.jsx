import React, { useMemo } from "react";
import PaginationItem from "./components/PaginationItem";

const PAGE_STEP = 1;

const Pagination = ({ page, limit = 0, total = 0, onChangePagination }) => {
    const totalPage = useMemo(() => {
        if (!limit || !total) {
            return 1;
        }
        return Math.ceil(Number(total) / Number(limit)) || 1;
    }, [total, limit]);

    const pageList = useMemo(() => {
        let start = page - PAGE_STEP;
        let end = page + PAGE_STEP;

        if (start <= 0) {
            start = 1;
            end = page + PAGE_STEP * 2;
            if (end > totalPage) {
                end = totalPage;
            }
        }

        if (end > totalPage) {
            end = totalPage;

            start = page - PAGE_STEP * 2;
            if (start <= 0) {
                start = 1;
            }
        }
        const list = [];

        for (let index = start; index <= end; index += PAGE_STEP) {
            list.push(index);
        }

        return list;
    }, [page, totalPage]);

    const onClickItem = (e, pageChange) => {
        e?.preventDefault();
        onChangePagination?.(pageChange);
    };

    const onPrev = (e) => {
        e?.preventDefault();
        if (page > 1) {
            onChangePagination?.(page - 1);
        }
    };
    const onNext = (e) => {
        e?.preventDefault();
        if (page < totalPage) {
            onChangePagination?.(page + 1);
        }
    };
    const onFirst = (e) => {
        e?.preventDefault();
        onChangePagination?.(1);
    };
    const onLast = (e) => {
        e?.preventDefault();
        onChangePagination?.(totalPage);
    };

    return (
        <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
                <PaginationItem isDisable={pageList[0] === page} typeButton="prev" onClick={onPrev}>
                    <span aria-hidden="true">
                        <i className="icon-long-arrow-left" />
                    </span>{" "}
                    Prev{" "}
                </PaginationItem>
                <PaginationItem isDisable={pageList[0] === page} onClick={onFirst}>
                    First
                </PaginationItem>
                {pageList?.length > 0 &&
                    pageList?.map((item, index) => {
                        return (
                            <PaginationItem
                                key={item?.id || new Date().getTime() + index}
                                isActive={page === item}
                                onClick={(e) => {
                                    onClickItem(e, item);
                                }}
                            >
                                {item}
                            </PaginationItem>
                        );
                    })}

                <li
                    className="page-item-total"
                    style={{ paddingRight: 5 }}
                >{`of ${totalPage} `}</li>
                <PaginationItem isDisable={pageList[pageList.length - 1] === page} onClick={onLast}>
                    {" "}
                    Last
                </PaginationItem>
                <PaginationItem
                    typeButton="next"
                    isDisable={pageList[pageList.length - 1] === page}
                    onClick={onNext}
                >
                    {" "}
                    Next{" "}
                    <span aria-hidden="true">
                        <i className="icon-long-arrow-right" />
                    </span>
                </PaginationItem>
            </ul>
        </nav>
    );
};

export default Pagination;
