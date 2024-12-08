// about
const ABOUT_PATH = "/about-us";

// Blog
const BLOG_PATH = "/blog";

// cart
const CART_PATH = "/cart";

// checkout
const CHECKOUT_PATH = "/checkout";

// Contact
const CONTACT_PATH = "/contact-us";

// dashboard
const DASHBOARD_PATH = "/dashboard";

// faq
const FAQ_PATH = "/faq";

// Payment method
const PAYMENT_PATH = "/payment-method";

// privacy
const PRIVACY_PATH = "/privacy";

// product
const PRODUCTS_PATH = "/products";

// returns
const RETURNS_PATH = "/returns";

// shipping
const SHIPPING_PATH = "/shipping";

export const PATH = {
    INDEX: "/",
    ABOUT: ABOUT_PATH,
    BLOG: {
        INDEX: BLOG_PATH,
        DETAIL: BLOG_PATH + "/:blogSlug",
    },
    CART: CART_PATH,
    CHECKOUT: {
        INDEX: CHECKOUT_PATH,
        SUCCESS: "/checkout-success",
    },
    PRODUCTS: {
        INDEX: PRODUCTS_PATH,
        DETAIL: PRODUCTS_PATH + "/:productSlug",
    },
    DASHBOARD: {
        INDEX: DASHBOARD_PATH,
        ODER: DASHBOARD_PATH + "/my-orders",
        ADDRESS: DASHBOARD_PATH + "/my-address",
        WISHLIST: DASHBOARD_PATH + "/my-wishlist",
    },

    CONTACT: CONTACT_PATH,
    FAQ: FAQ_PATH,
    PAYMENT: PAYMENT_PATH,
    PRIVACY: PRIVACY_PATH,
    RETURNS: RETURNS_PATH,
    SHIPPING: SHIPPING_PATH,
};
