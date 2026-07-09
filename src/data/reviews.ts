import type { Review } from '@/types';

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    author: 'Charlotte H.',
    rating: 5,
    date: '12 November 2024',
    title: 'The coat I have been searching for',
    body: 'I have been looking for the perfect overcoat for three years. The weight, the drape, the colour \u2014 everything is exactly right. Worth every penny.',
    verified: true,
    helpful: 24,
  },
  {
    id: 'r2',
    author: 'James M.',
    rating: 5,
    date: '8 October 2024',
    title: 'Exceptional craftsmanship',
    body: 'You can feel the quality the moment you pick it up. The stitching is perfect, the lining is beautiful. I wore it to three different events and received a compliment at each one.',
    verified: true,
    helpful: 18,
  },
  {
    id: 'r3',
    author: 'Amara K.',
    rating: 4,
    date: '3 September 2024',
    title: 'Beautiful but size up',
    body: 'Stunning piece. The cashmere is unlike anything from other brands. I would suggest sizing up \u2014 I usually wear a medium and it was quite snug through the shoulders.',
    verified: true,
    helpful: 31,
  },
  {
    id: 'r4',
    author: 'Thomas V.',
    rating: 5,
    date: '17 August 2024',
    title: 'Genuinely timeless',
    body: 'I bought this in camel and it goes with everything I own. The construction is impressive \u2014 proper handstitching throughout. Five stars without hesitation.',
    verified: true,
    helpful: 12,
  },
];
