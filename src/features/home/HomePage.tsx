import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { ProductCard } from '@/components/product/ProductCard';
import { StarRating } from '@/components/brand/StarRating';
import { TrustBar } from '@/components/layout/TrustBar';
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '@/lib/api/products';
import { CATEGORIES } from '@/data/categories';
import { BLOG_POSTS } from '@/data/blog-posts';
import { Skeleton } from '@/app/components/ui/skeleton';
import { RecentlyViewedCarousel } from '@/features/recentlyViewed/RecentlyViewedCarousel';

export function HomePage() {
  const navigate = useNavigate();
  
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['home-products'],
    queryFn: () => productsApi.getAllProducts(8)
  });

  const newArrivals = products.slice(0, 4);
  const bestsellers = products.slice(4, 8);

  return (
    <div>
      {/* Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[90vh]">
        <div className="bg-foreground flex flex-col justify-center px-10 lg:px-16 xl:px-24 py-20 order-2 lg:order-1">
          <motion.p
            className="text-xs tracking-[0.3em] uppercase text-primary-foreground/50 mb-6 font-mono-brand"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Autumn Winter 2025
          </motion.p>
          <motion.h1
            className="text-5xl xl:text-7xl text-primary-foreground leading-[1.05] mb-8 font-display"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="italic font-normal">The art of</span>
            <br />
            <span className="font-semibold">considered</span>
            <br />
            <span className="font-semibold">dressing.</span>
          </motion.h1>
          <motion.p
            className="text-sm text-primary-foreground/60 max-w-xs leading-relaxed mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
          >
            Each piece crafted in partnership with the finest European ateliers. No logo. No
            compromise.
          </motion.p>
          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
          >
            <Button variant="accent" size="lg" onClick={() => navigate('/shop/Women')}>
              Explore Women <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-primary-foreground border-primary-foreground/30 hover:border-primary-foreground"
              onClick={() => navigate('/shop/Men')}
            >
              Shop Men
            </Button>
          </motion.div>
        </div>
        <div className="relative overflow-hidden order-1 lg:order-2 h-64 lg:h-auto">
          <img
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&h=1400&fit=crop&auto=format"
            alt="MAISON Autumn Winter 2025 campaign"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-foreground/20" />
        </div>
      </section>

      {/* Trust bar */}
      <TrustBar />

      {/* New Arrivals */}
      <section className="max-w-screen-xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2 font-mono-brand">
              Just arrived
            </p>
            <h2 className="text-4xl text-foreground font-display">New Arrivals</h2>
          </div>
          <button
            onClick={() => navigate('/shop')}
            className="flex items-center gap-2 text-xs tracking-[0.12em] uppercase text-muted-foreground hover:text-foreground transition-colors font-mono-brand"
          >
            View All <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="aspect-[4/5] w-full" />)
          ) : (
            newArrivals.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))
          )}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-screen-xl mx-auto px-6 pb-20">
        <div className="mb-10">
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2 font-mono-brand">
            Browse by
          </p>
          <h2 className="text-4xl text-foreground font-display">Collections</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <motion.button
              key={cat.id}
              onClick={() => navigate(`/shop/${cat.id}`)}
              className="group relative overflow-hidden text-left bg-secondary"
              style={{ aspectRatio: '3/4' }}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-5">
                <p className="text-white text-xs tracking-[0.2em] uppercase mb-1 font-mono-brand">
                  {cat.count} pieces
                </p>
                <p className="text-white text-xl font-medium font-display">{cat.name}</p>
                <p className="text-white/70 text-xs mt-1">{cat.tagline}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <section className="bg-secondary py-20">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2 font-mono-brand">
                Customer favourites
              </p>
              <h2 className="text-4xl text-foreground font-display">Bestsellers</h2>
            </div>
            <button
              onClick={() => navigate('/shop')}
              className="flex items-center gap-2 text-xs tracking-[0.12em] uppercase text-muted-foreground hover:text-foreground transition-colors font-mono-brand"
            >
              View All <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="aspect-[4/5] w-full" />)
            ) : (
              bestsellers.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Recently Viewed */}
      <RecentlyViewedCarousel />

      {/* Brand Story */}
      <section className="max-w-screen-xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=900&fit=crop&auto=format"
              alt="MAISON atelier"
              className="w-full object-cover"
              style={{ aspectRatio: '4/5' }}
            />
            <div className="absolute -bottom-4 -right-4 bg-accent text-accent-foreground p-6 w-48">
              <p className="text-3xl font-semibold font-display">2011</p>
              <p className="text-xs mt-1 tracking-[0.1em] uppercase font-mono-brand">
                Founded in Paris
              </p>
            </div>
          </div>
          <div className="lg:pl-8">
            <p className="text-xs tracking-[0.2em] uppercase text-accent mb-4 font-mono-brand">
              Our philosophy
            </p>
            <h2 className="text-4xl xl:text-5xl text-foreground leading-tight mb-8 font-display">
              Made once.<br />
              <span className="italic">Made right.</span>
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                MAISON was founded on a single conviction: that the fashion industry had forgotten
                how to make things properly. We set out to prove that it was possible to build a
                modern brand without compromising on craft, material, or integrity.
              </p>
              <p>
                Every piece in our collection is made in partnership with family-owned workshops — in
                Italy, France, Scotland, and Portugal — whose knowledge is passed down through
                generations, not manufactured in a handbook.
              </p>
              <p>We never put our name on anything we would not wear ourselves.</p>
            </div>
            <Button variant="outline" size="md" className="mt-10" onClick={() => navigate('/blog')}>
              Read Our Story <ArrowRight className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-foreground py-20">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.2em] uppercase text-primary-foreground/40 mb-2 font-mono-brand">
              What our customers say
            </p>
            <h2 className="text-4xl text-primary-foreground font-display">Worn with conviction.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10">
            {[
              {
                quote:
                  'The overcoat is simply the best thing I have ever owned. Worn every day for two winters and it looks better than when I bought it.',
                name: 'Charlotte H.',
                loc: 'London',
              },
              {
                quote:
                  'MAISON understands something that most brands have forgotten: that quality is felt, not advertised. Each piece is an education in what clothing can be.',
                name: 'Thomas V.',
                loc: 'Paris',
              },
              {
                quote:
                  'I bought the cashmere scarf as a treat to myself. Three years later it is still the most-complimented thing I own. That is the best investment I ever made.',
                name: 'Amara K.',
                loc: 'New York',
              },
            ].map((t) => (
              <div key={t.name} className="bg-foreground p-10">
                <StarRating rating={5} size="md" />
                <blockquote className="text-primary-foreground/80 mt-6 mb-6 leading-relaxed font-display">
                  <span className="text-xl italic">&ldquo;{t.quote}&rdquo;</span>
                </blockquote>
                <p className="text-xs text-primary-foreground/50 tracking-[0.12em] uppercase font-mono-brand">
                  {t.name} · {t.loc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog preview */}
      <section className="max-w-screen-xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2 font-mono-brand">
              From the journal
            </p>
            <h2 className="text-4xl text-foreground font-display">Notes on craft.</h2>
          </div>
          <button
            onClick={() => navigate('/blog')}
            className="flex items-center gap-2 text-xs tracking-[0.12em] uppercase text-muted-foreground hover:text-foreground transition-colors font-mono-brand"
          >
            All Articles <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.slice(0, 3).map((post) => (
            <article
              key={post.id}
              className="group cursor-pointer"
              onClick={() => navigate('/blog')}
            >
              <div
                className="overflow-hidden mb-4 bg-secondary"
                style={{ aspectRatio: '16/10' }}
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="text-xs tracking-[0.15em] uppercase text-accent mb-2 font-mono-brand">
                {post.category}
              </p>
              <h3 className="text-lg text-foreground mb-2 group-hover:text-accent transition-colors font-display">
                {post.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{post.excerpt}</p>
              <p className="text-xs text-muted-foreground mt-3 font-mono-brand">
                {post.date} · {post.readTime} read
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
