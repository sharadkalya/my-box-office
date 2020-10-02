export const getYears = (increasing = false) => {
    const year = 1940;
    let currentYear = new Date().getFullYear();
    const years = [];

    while (currentYear >= year) {
        years.push(currentYear);
        currentYear -= 1;
    }
    if (increasing) {
        return years.reverse();
    }
    return years;
};
