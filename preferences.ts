import { toFashionPreferences, toPreferencesWithDescriptors } from "./utils.ts";

// Shape of user preferences in CDP
export type ExplicitPreference = {
    value: string;
    categoryId: number;
}

// Introduce a type for grouping preferences into generic categories
interface FocusCateogryGrouping {
    categoryId: number; // Lower level and generic category id i.e. Women's Pants
    name: string; // Name of the category i.e. Women's Pants
    categoryIds: number[]; // List of category ids that belong to this category
}

// Extend FocusCateogryGrouping for Fashion use case
interface FashionFocusCategoryGrouping extends FocusCateogryGrouping {
    // add gender to avoid string parsing of name in base
    // useful for grouping data in the UI
    gender: string;
    type: string; // Type of clothing i.e. Pants, Shirt
}

// Introduce a new type for focus category preferences
interface FocusCategoryPreference {
    cateogryId: number;
    categoryName: string;
    value: string;
}

// Extend FocusCategoryPreference for Fashion use case
export interface FashionPreference extends FocusCategoryPreference {
    gender: string;
    descriptor?: string;
    type: string;
};

// User preferences in CDP
const userPreferences: ExplicitPreference[] = [
    { value: 'large,tall|medium', categoryId: 1 },
    { value: 'medium', categoryId: 2 },
    { value: 'small', categoryId: 3 },
    { value: '32,waist', categoryId: 4 },
    { value: '34,waist', categoryId: 5 },
    { value: '36,inseam', categoryId: 6 },
    { value: '38', categoryId: 7 },
    { value: 'large', categoryId: 10 },
    { value: 'medium', categoryId: 9 },
];

// Fashion Category Groupings maintained by humans
// Imagine this comes from a config
export const fashionCategories: FashionFocusCategoryGrouping[] = [
    { categoryIds: [1, 2, 3], name: `Men's Pants`, gender: 'men', type: 'pants', categoryId: 10 },
    { categoryIds: [4, 5, 6, 7, 8], name: `Women's Pants`, gender: 'women', type: 'pants', categoryId: 20 },
    { categoryIds: [9, 10], name: `Men's Shirts`, gender: 'men', type: 'shirt', categoryId: 30 },
];

function resolveFashionPreferences(): FashionPreference[] {
    return userPreferences.reduce(toFashionPreferences, []).reduce(toPreferencesWithDescriptors, []);
}

function resolveFashionPreferencesByType(): Record<string, FashionPreference[]> {
    return resolveFashionPreferences()
    .reduce((acc, preference) => {
        if (!acc[preference.type]) {
            acc[preference.type] = [];
        }
        acc[preference.type].push(preference);
        return acc;
    }, {} as Record<string, FashionPreference[]>)
}

function resolveFashionPreferencesByTypeAndGender() {
    return Object.entries(resolveFashionPreferencesByType())
    .reduce((acc, [type, preferences]) => {
        acc[type] = preferences.reduce((genderAcc, preference) => {
            if (!genderAcc[preference.gender]) {
                genderAcc[preference.gender] = [];
            }
            genderAcc[preference.gender].push(preference);
            return genderAcc;
        }, {} as Record<string, FashionPreference[]>);
        return acc;
    }, {} as Record<string, Record<string, FashionPreference[]>>)
}

// Imaginary GraphQL resolvers on Stashplex
export const resolvers = {
    Query: {
        preferences: () => userPreferences,
        fashionCategories: () => fashionCategories,
        fashionPreferences: () => resolveFashionPreferences(),
        fashionPreferencesByType: () => resolveFashionPreferencesByType(),
        fashionPrefrencesByTypeAndGender: () => resolveFashionPreferencesByTypeAndGender()
    },
}