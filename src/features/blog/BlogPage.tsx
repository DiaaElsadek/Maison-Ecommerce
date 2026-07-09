import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { cn } from '@/lib/utils';
import { BLOG_POSTS } from '@/data/blog-posts';

export function BlogPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  
  const categories = ['All', ...Array.from(new Set(BLOG_POSTS.map((p) => p.category)))];
  const filtered = activeCategory === 'All' ? BLOG_POSTS : BLOG_POSTS.filter((p) => p.category === activeCategory);
  const featured = BLOG_POSTS.find((p) => p.featured);

  return (
    <div>
      {/* Hero */}
      <div className="bg-foreground py-16 px-6 text-center">
        <p className="label-mono text-primary-foreground/40 mb-4">MAISON Journal</p>
        <h1 className="text-6xl text-primary-foreground font-display">
          Notes on<br />
          <span className="italic">craft & culture.</span>
        </h1>
      </div>

      {/* Featured */}
      {featured && (
        <div className="max-w-screen-xl mx-auto px-6 py-16">
          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center cursor-pointer group"
            onClick={() => navigate('#')}
          >
            <div className="overflow-hidden bg-secondary" style={{ aspectRatio: '16/10' }}>
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div>
              <p className="label-mono text-accent mb-4">
                {featured.category} · Featured
              </p>
              <h2 className="text-4xl text-foreground mb-4 group-hover:text-accent transition-colors font-display">
                {featured.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">{featured.excerpt}</p>
              <p className="label-mono text-muted-foreground mb-6">
                {featured.author} · {featured.date} · {featured.readTime} read
              </p>
              <Button variant="outline" size="sm">
                Read Article <ArrowRight className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Articles grid */}
      <div className="max-w-screen-xl mx-auto px-6 pb-16">
        <div className="flex items-center gap-6 mb-10 border-b border-border pb-4">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={cn(
                'label-mono pb-4 -mb-4 border-b-2 transition-colors',
                activeCategory === c
                  ? 'border-foreground text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              )}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filtered.map((post) => (
            <article
              key={post.id}
              className="group cursor-pointer"
              onClick={() => navigate('#')}
            >
              <div className="overflow-hidden bg-secondary mb-4" style={{ aspectRatio: '16/10' }}>
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="label-mono text-accent mb-2">{post.category}</p>
              <h3 className="text-xl text-foreground mb-3 group-hover:text-accent transition-colors font-display">
                {post.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {post.excerpt}
              </p>
              <p className="label-mono text-muted-foreground">
                {post.author} · {post.date} · {post.readTime} read
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
