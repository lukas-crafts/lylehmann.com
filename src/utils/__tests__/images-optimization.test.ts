import { describe, it, expect, vi } from 'vitest';

// Mock astro:assets before importing the module under test
vi.mock('astro:assets', () => ({
  getImage: vi.fn(),
}));

import { getImagesOptimized } from '../images-optimization';

describe('getImagesOptimized', () => {
  it('should use imageSizes when width is smaller than smallest deviceSize', async () => {
    const transformMock = vi.fn().mockResolvedValue([]);
    const image = { src: 'img.jpg', width: 100, height: 100, format: 'jpg' };

    await getImagesOptimized(
      image,
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
