export const MESSAGE = {
    required: "Please enter your information",
    email: "Please enter your email with true format",
    phone: "Please enter your phone  with true format",
    policy: "Please agree with our policy",
    minPassword: "Password must be at least 6 characters",
};

export const REGEX = {
    email: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    phone: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
};
