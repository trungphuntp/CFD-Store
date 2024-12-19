export const TYPE_MODAL = {
    login: "login",
    register: "register",
};

export const SORT_TYPE = {
    popular: {
        value: "popular",
        label: "Most Popular",
        queryStringType: { orderBy: "price", order: undefined },
    },
    pricetohight: {
        value: "pricetohight",
        label: "Price Low To High",
        queryStringType: { orderBy: "price", order: "1" },
    },
    pricetolow: {
        value: "pricetolow",
        label: "Price High To Low",
        queryStringType: { orderBy: "price", order: "-1" },
    },
    newest: {
        value: "newest",
        label: "Newest",
        queryStringType: { orderBy: "createdAt", order: "-1" },
    },
    rating: {
        value: "rating",
        label: "Most Rated",
        queryStringType: { orderBy: "rating", order: "-1" },
    },
};
export const SHOPPING_TYPE = [
    {
        value: "free",
        label: "Free Shipping",
        price: 0,
    },
    {
        value: "standart",
        label: "Standart ",
        price: 10,
    },
    {
        value: "express",
        label: "Express ",
        price: 20,
    },
];
