import { describe, it, expect, vi } from 'vitest';
import { countFaqs, suggestFaqs, topUpBackfillForSlug } from './faq-underfilled-helpers.mjs';

describe('FAQ Underfilled Helpers', () => {
  const mockContentIndex = {
    'slug-1': { title: 'Post 1', faqs: [{ q: 'Q1', a: 'A1' }] },
    'slug-2': { title: 'Post 2', faqs: [] }
  };
  const mockExtra = {};
  const mockBackfill = {
    'slug-2': [{ q: 'Backfill Q', a: 'Backfill A' }]
  };

  it('counts FAQs correctly across sources', () => {
    expect(countFaqs('slug-1', mockContentIndex, mockExtra, mockBackfill)).toBe(1);
    expect(countFaqs('slug-2', mockContentIndex, mockExtra, mockBackfill)).toBe(1);
  });

  it('suggests FAQs based on title and category', () => {
    const suggestions = suggestFaqs({ title: 'Seguro Auto em Guarulhos', category: 'Auto' });
    expect(suggestions.length).toBeGreaterThan(0);
    expect(suggestions[0].q).toContain('Auto');
    expect(suggestions[0].a).toContain('Seguro Auto em Guarulhos');
  });

  it('tops up backfill to reach target', () => {
    const existing = [{ q: 'Q1', a: 'A1' }];
    const suggestions = [
      { q: 'Q1', a: 'A1' }, // duplicate
      { q: 'Q2', a: 'A2' },
      { q: 'Q3', a: 'A3' }
    ];
    
    const { next, added, shortfall } = topUpBackfillForSlug({
      existing,
      suggestions,
      currentCount: 1,
      target: 2
    });

    expect(added).toBe(1);
    expect(next.length).toBe(2);
    expect(next[1].q).toBe('Q2');
    expect(shortfall).toBe(0);
  });
});
