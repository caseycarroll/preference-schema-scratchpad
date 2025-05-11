import { ExplicitPreference, fashionCategories, FashionPreference } from "./preferences.ts";

function toFashionPreferences(acc, userPreference: ExplicitPreference) {
    const category = fashionCategories.find((category) =>
        category.categoryIds.includes(userPreference.categoryId)
    );
    if(!category) {
        console.warn(`Category not found for categoryId: ${userPreference.categoryId}`);
        return acc;
    }
    acc.push({
        ...userPreference,
        categoryId: category.categoryId,
        categoryName: category.name,
        gender: category.gender,
        type: category.type,
    });
    return acc;
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
        

export { toFashionPreferences, toPreferencesWithDescriptors };