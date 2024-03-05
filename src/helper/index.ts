export const generateUniqueId = (): string => {
    const timestamp = Date.now().toString();
    const timestampDigits = timestamp.substring(timestamp.length - 4);

    const randomNum = Math.floor(Math.random() * 100)
        .toString()
        .padStart(2, "0");

    const uniqueId = timestampDigits + randomNum;

    return uniqueId;
};
