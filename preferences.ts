import { toFashionPreferences, toPreferencesWithDescriptors } from "./utils.js";

// Shape of user preferences in CDP
export type ExplicitPreference = {
    value: string;
    leafCat: number;
}

// Introduce a type for grouping preferences into generic categories
interface FocusCateogryGroup {
    categoryId: number; // Lower level and generic category id i.e. Women's Pants
    name: string; // Name of the category i.e. Women's Pants
    categoryIds: number[]; // List of category ids that belong to this category
}

// Introduce a new type for focus category preferences
interface FocusCategoryPreference {
    value: string;
    focusCategoryGroup: FocusCateogryGroup;
}

// Extend FocusCateogryGrouping for Fashion use case
interface FashionFocusCategoryGroup extends FocusCateogryGroup {
    // add gender to avoid string parsing of name in base
    // useful for grouping data in the UI
    gender: 'all' | 'men' | 'women';
    type: string; // Type of clothing i.e. Pants, Shirt
}

// Extend FocusCategoryPreference for Fashion use case
export interface FashionPreference extends FocusCategoryPreference {
    descriptor?: string;
    focusCategoryGroup: FashionFocusCategoryGroup;
};

// User preferences in CDP
const userPreferences: ExplicitPreference[] = [
    { value: 'large,tall|medium', leafCat: 1 },
    { value: 'medium', leafCat: 2 },
    { value: 'small', leafCat: 3 },
    { value: '32,waist', leafCat: 4 },
    { value: '34,waist', leafCat: 5 },
    { value: '36,inseam', leafCat: 6 },
    { value: '38', leafCat: 7 },
    { value: 'large', leafCat: 10 },
    { value: 'medium', leafCat: 9 },
    // Question: Does brand have a leafCat?
    { value: 'adidas', leafCat: 11 },
];

// Fashion Category Groupings maintained by humans
// Imagine this comes from a config
export const fashionCategories: FashionFocusCategoryGroup[] = [
    { categoryIds: [1, 2, 3], name: `Men's Pants`, gender: 'men', type: 'pants', categoryId: 10 },
    { categoryIds: [4, 5, 6, 7, 8], name: `Women's Pants`, gender: 'women', type: 'pants', categoryId: 20 },
    { categoryIds: [9, 10], name: `Men's Shirts`, gender: 'men', type: 'shirt', categoryId: 30 },
    { categoryIds: [11], name: `Brands`, gender: 'all', type: 'brands', categoryId: 40 },
];

function resolveFashionPreferences(): FashionPreference[] {
    return userPreferences.reduce(toFashionPreferences, []).reduce(toPreferencesWithDescriptors, []);
}

// Imaginary GraphQL resolvers on Stashplex
export const resolvers = {
    Query: {
        preferences: () => userPreferences,
        fashionCategories: () => fashionCategories,
        fashionPreferences: () => resolveFashionPreferences(),
    },
}