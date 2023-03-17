export const kelvinToCelsius = (kelvin) => {
    const result = +kelvin - 273.15;
    return result;
};

export const fahrenheitToCelsius = (fahrenheit) => {
    const result = (+fahrenheit - 32) * 5 / 9;
    return result;
};

export const convertTime = (time) => {
    const dateFormat = new Date(time);
    return dateFormat;
};

export const capitalize = (str) => {
    let strArr = str.split(" ");
    strArr.forEach((word, index) => {
        strArr[index] = word.slice(0, 1).toUpperCase() + word.slice(1);
    });
    const newArr = strArr.join(" ");
    return newArr;
};