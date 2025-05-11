import { describe, expect, it } from 'vitest';
import { resolvers } from './preferences';

describe('Preference Resolvers', () => {
    it('should resolve fashion preferences', () => {
        const fashionPreferences = resolvers.Query.fashionPreferences();
        expect(fashionPreferences).toMatchSnapshot();
    });
    it('should resolve all focus category groups', () => {
        const allFocusCategoryGroups = resolvers.Query.allFocusCategoryPreferences();
        expect(allFocusCategoryGroups).toMatchSnapshot();
    });
    it('should resolve electronics preferences', () => {
        const electronicsPreferences = resolvers.Query.electronicsPreferences();
        expect(electronicsPreferences).toMatchSnapshot();
    });
});
