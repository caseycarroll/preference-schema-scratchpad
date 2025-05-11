import { describe, expect, it } from 'vitest';
import { resolvers } from './preferences';

describe('Preference Resolvers', () => {
    it('should resolve fashion preferences', () => {
        const fashionPreferences = resolvers.Query.fashionPreferences();
        expect(fashionPreferences).toMatchSnapshot();
    });
});
