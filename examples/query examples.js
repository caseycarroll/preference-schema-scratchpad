// queries all categories across focuses
`query allFocusCategories() {
    focusCategories: [FocusCategory]
}`

// queries users fashion preferences from data shape:
// {
//     "categoryId": 1,
//     "descriptor": "tall",
//     "focusCategoryGroup": {
//       "categoryId": 10,
//       "categoryIds": [
//         1,
//         2,
//         3,
//       ],
//       "gender": "men",
//       "name": "Men's Pants",
//       "type": "pants",
//     },
//     "value": "large",
//   },

`query userFashionPreferences() {
    fashionPreferences: {
        value,
        descriptor,
        focusCategoryGroup: {
            ...on FashionFocusCategoryGroup {
                name,
                gender,
                type
            }
        }
    }
}`
// returns
// fashionPreferences: [
//   {
//     "value": "large",
//     "descriptor": "tall",
//     "focusCategoryGroup": {
//       "gender": "men",
//       "name": "Men's Pants",
//       "type": "pants",
//     },
//   }, ...
// ]
