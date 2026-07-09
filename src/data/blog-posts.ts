import type { BlogPost } from '@/types';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: 'The Case for Buying Less, Better',
    excerpt:
      'On the philosophy of considered consumption \u2014 why owning fewer, better things changes the way you dress, think, and move through the world.',
    category: 'Essays',
    author: 'Elara Voss',
    date: '14 January 2025',
    readTime: '8 min',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&h=500&fit=crop&auto=format',
    featured: true,
  },
  {
    id: 'b2',
    title: 'Inside Our Florentine Atelier',
    excerpt:
      'A rare visit to the workshop where every MAISON leather good is made by hand, beginning to end, by one craftsperson.',
    category: 'Craft',
    author: 'Mateo Ricci',
    date: '3 December 2024',
    readTime: '12 min',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=500&fit=crop&auto=format',
  },
  {
    id: 'b3',
    title: 'How to Build a Wardrobe That Lasts',
    excerpt:
      'The twelve pieces that form the foundation of a wardrobe built for twenty years, not two seasons.',
    category: 'Style',
    author: 'Nadia Chen',
    date: '18 November 2024',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=500&fit=crop&auto=format',
  },
  {
    id: 'b4',
    title: 'The Language of Cashmere',
    excerpt:
      'Not all cashmere is equal. We explain what grade, ply, and origin mean \u2014 and why they matter more than price.',
    category: 'Materials',
    author: 'Elara Voss',
    date: '2 October 2024',
    readTime: '10 min',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&h=500&fit=crop&auto=format',
  },
];
