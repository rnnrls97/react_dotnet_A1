export const toDateTime = (date?: string) => {
    if (!date) {
        return "";
    }
    return new Date(date).toLocaleString("pt-BR");
};