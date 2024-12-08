import moment from "moment";

export const formatDate = (date, format = "DD/MM/YYYY") => {
    if (!!!date) {
        return "";
    }
    return moment(date).format(format);
};

export const formatCurrency = (data, type = "en-US") => {
    if (isNaN(data) || !data) {
        return 0;
    }
    return data?.toLocaleString(type, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
};
