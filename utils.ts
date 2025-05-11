import { type ExplicitPreference, type FashionPreference, type FocusCategoryPreference } from "./preferences.js";

function toFocusCategoryPreferences(focusCateogryGroups) {
    return function (acc: any, userPreference: ExplicitPreference) {
        const category = focusCateogryGroups.find((category) =>
            category.categoryIds.includes(userPreference.leafCat)
        );
        if (!category) {
            console.warn(`Category not found for leafCat: ${userPreference.leafCat}`);
            return acc;
        }
        acc.push({
            ...userPreference,
            focusCategoryGroup: category
        });
        return acc;
    }
}



function toPreferencesWithDescriptors(acc, userPreference: FashionPreference) {
    userPreference.value.split('|').forEach((deliminitedValue) => {
        const [value, ...rest] = deliminitedValue.split(',');
        const fashionPreference = {
            ...userPreference,
            value,
            descriptor: rest.join(',') || undefined,
        };
        acc.push(fashionPreference);
    });
    return acc;
}


export { toFocusCategoryPreferences, toPreferencesWithDescriptors };