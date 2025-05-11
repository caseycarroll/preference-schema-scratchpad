import { describe, expect, it } from 'vitest';
import { resolvers } from './preferences';

describe('Preference Resolvers', () => {
    it('should resolve fashion preferences', () => {
        const fashionPreferences = resolvers.Query.fashionPreferences();
        expect(fashionPreferences).toMatchSnapshot();
    });
    it('should resolve fashion preferences by type', () => {
        const fashionPreferencesByType = resolvers.Query.fashionPreferencesByType();
        expect(fashionPreferencesByType).toMatchSnapshot();
    });
    it('should resolve fashion preferences by type and gender', () => {
        const fashionPreferencesByTypeAndGender = resolvers.Query.fashionPrefrencesByTypeAndGender();
        expect(fashionPreferencesByTypeAndGender).toMatchSnapshot();  
    });
});
