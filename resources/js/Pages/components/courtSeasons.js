export const seasons = {
    summer: "Leto",
    winter: "Zima",
};

// Courts are open in summer and covered in winter
export const courtTypeTitles = {
    summer: {
        hard: "Otvoren beton",
        gravel: "Šljaka",
    },
    winter: {
        hard_indoor: "Zatvoren beton",
        gravel_indoor: "Zatvorena šljaka",
    },
};

export const priceTitles = {
    morning: "Cena - početak dana",
    afternoon: "kraj dana",
    weekend: "vikend",
};

// Fills in every season/key so the inputs always have something to bind to,
// fields with nothing saved start at the default
const seasonalValues = (data, keysFor, defaultValue) => {
    const result = {};
    for (const season in seasons) {
        result[season] = {};
        for (const key of keysFor(season)) {
            result[season][key] = data?.[season]?.[key] ?? defaultValue;
        }
    }
    return result;
};

// Choices for the number of courts of each type
export const courtCountOptions = Array.from({ length: 21 }, (_, i) => String(i));

// Counts are kept as strings, the dropdown treats a numeric 0 as empty
export const courtTypesForm = (data = null) => {
    const values = seasonalValues(data, (season) => Object.keys(courtTypeTitles[season]), 0);
    for (const season in values) {
        for (const key in values[season]) {
            values[season][key] = String(values[season][key]);
        }
    }
    return values;
};

// A price of 0 is saved as not set, so it stays hidden on the courts pages
export const pricesForm = (data = null) => seasonalValues(data, () => Object.keys(priceTitles), 0);
