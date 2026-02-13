import { describe, it, expect, vi } from 'vitest';

// Mock astro:assets before importing the module under test
vi.mock('astro:assets', () => ({
  getImage: vi.fn(),
}));

import { getImagesOptimized, getSizes } from '../images-optimization';

describe('getSizes', () => {
  it('should return undefined if width or layout is missing', () => {
    expect(getSizes(undefined, 'fixed')).toBeUndefined();
    expect(getSizes(100, undefined)).toBeUndefined();
  });

  it('should return fixed size for fixed layout', () => {
    expect(getSizes(100, 'fixed')).toBe('100px');
  });

  it('should return fullWidth size for fullWidth layout', () => {
    expect(getSizes(100, 'fullWidth')).toBe('100vw');
  });

  it('should return constrained size for constrained layout', () => {
    expect(getSizes(100, 'constrained')).toBe('(min-width: 100px) 100px, 100vw');
  });

  it('should return undefined for other layouts', () => {
    expect(getSizes(100, 'cover' as any)).toBeUndefined();
  });
});

describe('getImagesOptimized', () => {
// ... existing tests
  it('should use imageSizes when width is smaller than smallest deviceSize', async () => {
    const transformMock = vi.fn().mockResolvedValue([]);
    const image = { src: 'img.jpg', width: 100, height: 100, format: 'jpeg' as const };

    await getImagesOptimized(
      image as any,
      { width: 100 },
      transformMock
    );

    const breakpoints = transformMock.mock.calls[0][1];

    // After fix: should include imageSizes (16, 32...) that are < doubleWidth (200)
    // imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
    // Filtered < 200: 16, 32, 48, 64, 96, 128
    // Plus 100 and 200

    expect(breakpoints).toEqual([16, 32, 48, 64, 96, 100, 128, 200]);

    // Should NOT contain 256 (larger than 200)
    expect(breakpoints).not.toContain(256);
  });
});
