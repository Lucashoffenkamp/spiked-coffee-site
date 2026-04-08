/*
 * Journal Page — Spiked Coffee
 * Design: Editorial blog with long-form articles.
 * Cormorant Garamond display, Jost body. Lodge aesthetic.
 * Index view shows post cards; clicking opens full article.
 */
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Calendar, Clock, Coffee } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

const ease = [0.22, 1, 0.36, 1] as const;

/* ── Blog Post Data ── */
const posts = [
  {
    id: "visiting-tala",
    title: "A Morning at Tala",
    subtitle: "Inside the roastery that started it all for us",
    date: "March 2026",
    readTime: "5 min read",
    category: "Roaster Visit",
    coverImage: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop",
    excerpt: "We drove up to Libertyville on a Tuesday morning — the kind of morning where the fog sits low over the lake and the whole town smells like wet grass and possibility.",
    content: [
      "We drove up to Libertyville on a Tuesday morning — the kind of morning where the fog sits low over the lake and the whole town smells like wet grass and possibility. Tala's roastery sits in a quiet industrial park just off Milwaukee Avenue, the kind of place you'd drive past a hundred times without noticing. But once you step inside, everything changes.",
      "The first thing that hits you is the smell. Not the burnt, aggressive coffee smell you get at chain shops — this is something softer. Sweeter. Like toasted almonds and brown sugar hanging in warm air. The Probat roaster sits in the center of the room like a cast-iron altar, and when it's running, the whole building hums with purpose.",
      "We sat down with the team over cups of their Amoret blend — the espresso that would eventually become the anchor of our menu. They talked about sourcing trips to Guatemala, about the farmer named Carlos whose family has been growing coffee for three generations, about how a single degree of temperature change during roasting can turn a good cup into a transcendent one.",
      "What struck us most wasn't the technical expertise — though that was impressive. It was the care. Every decision at Tala is made with intention. The bags are designed to be beautiful. The labels tell stories. The coffee is roasted in small batches because that's the only way to do it right.",
      "When we left that morning, we knew two things: Tala would be our first partner, and we'd never look at a bag of coffee the same way again. The relationship between roaster and café isn't transactional — it's a conversation. And with Tala, that conversation started with a simple question: 'What does sweet, beautiful coffee mean to you?'",
      "For us, the answer was Spiked Coffee."
    ],
  },
  {
    id: "what-is-micro-lot",
    title: "What Is a Micro-Lot?",
    subtitle: "The small-batch revolution changing specialty coffee",
    date: "February 2026",
    readTime: "4 min read",
    category: "Coffee Education",
    coverImage: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&auto=format&fit=crop",
    excerpt: "You'll see the term on bags, on menus, in conversations between baristas who speak in a language that can feel like a secret code. But micro-lot coffee is simpler than it sounds.",
    content: [
      "You'll see the term on bags, on menus, in conversations between baristas who speak in a language that can feel like a secret code. But micro-lot coffee is simpler than it sounds — and understanding it will change the way you taste your morning cup.",
      "A micro-lot is a small, specific harvest from a single farm — sometimes from a single plot within that farm. While commercial coffee is blended from thousands of sources to create a consistent (read: generic) flavor, micro-lot coffee celebrates the unique character of one place, one season, one farmer's work.",
      "Think of it like wine. A mass-produced table wine blends grapes from dozens of vineyards to hit a predictable flavor profile. A single-vineyard reserve, on the other hand, tastes like the specific hillside where those grapes grew — the soil, the altitude, the morning fog. Micro-lot coffee works the same way.",
      "The quantities are small — sometimes just a few hundred pounds from a harvest. That scarcity is part of the appeal, but it's not about exclusivity for its own sake. It's about traceability. When you drink a micro-lot coffee, you can often trace it back to the exact farm, the exact processing method, even the exact week it was picked.",
      "At Spiked Coffee, our partner Chromatic specializes in micro-lots. Their Gamut blend rotates with the seasons, featuring coffees from emerging origins that most people will never encounter. One month it might be a washed Ethiopian Yirgacheffe with jasmine and bergamot notes. The next, a honey-processed Costa Rican with stone fruit and brown sugar.",
      "The beauty of micro-lot coffee is that it turns your daily ritual into an exploration. Every bag is a new place, a new story, a new reason to pay attention to what's in your cup. And once you start paying attention, there's no going back."
    ],
  },
  {
    id: "first-market-recap",
    title: "Our First Farmers Market",
    subtitle: "What we learned pouring coffee for strangers",
    date: "January 2026",
    readTime: "6 min read",
    category: "Market Recap",
    coverImage: "https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=800&auto=format&fit=crop",
    excerpt: "We showed up at 5:30 AM with a folding table, a hand grinder, two thermoses, and the kind of nervous energy that comes from doing something you've only ever talked about.",
    content: [
      "We showed up at 5:30 AM with a folding table, a hand grinder, two thermoses, and the kind of nervous energy that comes from doing something you've only ever talked about. The Libertyville Farmers Market opens at 7, but the vendors start setting up in the dark — and that first morning, we were the first ones there.",
      "Our setup was humble. A hand-lettered sign that Dylan's girlfriend painted the night before. Sample cups we'd ordered from Amazon two days earlier. Three bags of Tala's Amoret blend, a pour-over dripper, and a kettle we'd heated at home and wrapped in towels to keep warm. Professional? Not exactly. Authentic? Absolutely.",
      "The first person to stop was a woman walking her golden retriever. She asked what we were doing, and Lucas launched into the whole pitch — the dual concept, the roaster partnerships, the vision for a brick-and-mortar. She listened politely, took a sample cup, and said, 'This is really good coffee.' That was it. No grand revelation. Just a simple acknowledgment that what we'd made was worth stopping for.",
      "By 9 AM, we'd served about forty cups and had a dozen conversations that would shape everything that came next. A local restaurant owner asked if we'd ever considered catering. A woman who runs a yoga studio wanted to know about wholesale. A teenager asked if we had an Instagram (we didn't yet — we made one that afternoon).",
      "The biggest lesson from that first market wasn't about coffee at all. It was about showing up. About putting something imperfect into the world and letting people respond to it. We didn't have a truck. We didn't have a brand. We had good coffee and a willingness to stand in the cold and talk to strangers about why it mattered.",
      "Three markets later, we had a following. Six markets later, we had a waitlist for our email newsletter. And somewhere in between, Spiked Coffee stopped being an idea and started being a thing. A real, tangible, coffee-scented thing that people looked forward to on Saturday mornings.",
      "We still think about that first market every time we set up. The nervous energy never fully goes away — it just transforms into something more like gratitude. Gratitude for the people who stop, who taste, who ask questions, who come back the next week and bring a friend."
    ],
  },
];

/* ── Fade-in wrapper ── */
function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/* ── Post Card ── */
function PostCard({ post, index, onClick }: { post: typeof posts[0]; index: number; onClick: () => void }) {
  return (
    <FadeIn delay={0.1 + index * 0.1}>
      <article
        className="group cursor-pointer"
        onClick={onClick}
      >
        {/* Cover image */}
        <div className="relative overflow-hidden mb-6 aspect-[16/10]">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-espresso/10 group-hover:bg-espresso/5 transition-colors duration-500" />
          <div className="absolute top-4 left-4">
            <span className="inline-block px-3 py-1.5 bg-cream/90 backdrop-blur-sm font-body text-[10px] tracking-[0.15em] uppercase text-espresso-light/60 font-light">
              {post.category}
            </span>
          </div>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center gap-1.5">
            <Calendar size={11} strokeWidth={1.5} className="text-espresso-light/35" />
            <span className="font-body text-[10px] tracking-[0.15em] uppercase text-espresso-light/40 font-light">
              {post.date}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={11} strokeWidth={1.5} className="text-espresso-light/35" />
            <span className="font-body text-[10px] tracking-[0.15em] uppercase text-espresso-light/40 font-light">
              {post.readTime}
            </span>
          </div>
        </div>

        {/* Title & excerpt */}
        <h3 className="font-display text-2xl lg:text-3xl font-light text-espresso tracking-wide mb-2 group-hover:text-terracotta transition-colors duration-300">
          {post.title}
        </h3>
        <p className="font-accent text-sm text-espresso-light/45 italic mb-3">
          {post.subtitle}
        </p>
        <p className="font-body text-sm text-espresso-light/55 font-light leading-relaxed line-clamp-2">
          {post.excerpt}
        </p>

        {/* Read more */}
        <div className="mt-4 flex items-center gap-2 font-body text-[10px] tracking-[0.2em] uppercase text-espresso-light/40 group-hover:text-terracotta transition-colors duration-300 font-light">
          Read Article
          <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </article>
    </FadeIn>
  );
}

/* ── Full Article View ── */
function ArticleView({ post, onBack }: { post: typeof posts[0]; onBack: () => void }) {
  return (
    <div className="min-h-screen bg-cream">
      <ScrollProgress />
      <Navigation />

      {/* Hero */}
      <section className="relative h-[50vh] lg:h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-espresso/50 via-espresso/30 to-espresso/60" />
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-end px-6 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease }}
            className="text-center max-w-3xl"
          >
            <span className="inline-block px-3 py-1.5 border border-cream/20 font-body text-[10px] tracking-[0.2em] uppercase text-cream/70 font-light mb-4">
              {post.category}
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light tracking-[0.08em] text-cream leading-[1.05] mb-3">
              {post.title}
            </h1>
            <p className="font-accent text-lg text-cream/60 italic">
              {post.subtitle}
            </p>
            <div className="flex items-center justify-center gap-4 mt-6">
              <span className="font-body text-xs text-cream/40 font-light tracking-wide">{post.date}</span>
              <span className="text-cream/20">&middot;</span>
              <span className="font-body text-xs text-cream/40 font-light tracking-wide">{post.readTime}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Body */}
      <section className="py-16 lg:py-24 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Back button */}
          <FadeIn>
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 mb-12 font-body text-xs tracking-[0.15em] uppercase text-espresso-light/50 hover:text-espresso transition-colors duration-300 font-light group"
            >
              <ArrowLeft size={14} className="transition-transform duration-300 group-hover:-translate-x-1" />
              Back to Journal
            </button>
          </FadeIn>

          {/* Content paragraphs */}
          {post.content.map((paragraph, i) => (
            <FadeIn key={i} delay={0.05 * i}>
              {i === 0 ? (
                <p className="font-body text-base lg:text-lg text-espresso-light/75 font-light leading-[2] mb-8 first-letter:font-display first-letter:text-5xl first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-espresso first-letter:leading-none">
                  {paragraph}
                </p>
              ) : (
                <p className="font-body text-base lg:text-lg text-espresso-light/75 font-light leading-[2] mb-8">
                  {paragraph}
                </p>
              )}
            </FadeIn>
          ))}

          {/* End mark */}
          <FadeIn delay={0.3}>
            <div className="flex items-center justify-center gap-4 mt-16 mb-12">
              <div className="w-12 h-px bg-espresso/10" />
              <Coffee size={16} strokeWidth={1.5} className="text-espresso-light/25" />
              <div className="w-12 h-px bg-espresso/10" />
            </div>
          </FadeIn>

          {/* Back to journal */}
          <FadeIn delay={0.4}>
            <div className="text-center">
              <button
                onClick={onBack}
                className="inline-flex items-center gap-2 font-body text-xs tracking-[0.2em] uppercase text-espresso-light/50 hover:text-espresso transition-colors duration-300 font-light group"
              >
                <ArrowLeft size={14} className="transition-transform duration-300 group-hover:-translate-x-1" />
                Back to Journal
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ── Main Page ── */
export default function Journal() {
  const [activePost, setActivePost] = useState<string | null>(null);

  const selectedPost = posts.find((p) => p.id === activePost);

  if (selectedPost) {
    return (
      <ArticleView
        post={selectedPost}
        onBack={() => {
          setActivePost(null);
          window.scrollTo(0, 0);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <ScrollProgress />
      <Navigation />

      {/* ── Hero Section ── */}
      <section className="pt-32 lg:pt-40 pb-16 lg:pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-forest/60" />
              <span className="font-body text-xs tracking-[0.3em] uppercase text-forest/60 font-light">
                Stories &amp; Dispatches
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-light tracking-[0.08em] text-espresso leading-[1.05] mb-6">
              The <span className="font-accent italic">Journal</span>
            </h1>

            <p className="font-body text-base lg:text-lg text-espresso-light/55 font-light leading-relaxed max-w-2xl">
              Notes from the road. Roaster visits, coffee education, market recaps, and the stories behind every cup we pour.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Post Grid ── */}
      <section className="px-6 pb-24 lg:pb-32">
        <div className="max-w-5xl mx-auto">
          {/* Featured post (first) */}
          <div className="mb-20">
            <FadeIn>
              <article
                className="group cursor-pointer grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center"
                onClick={() => {
                  setActivePost(posts[0].id);
                  window.scrollTo(0, 0);
                }}
              >
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={posts[0].coverImage}
                    alt={posts[0].title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-espresso/10 group-hover:bg-espresso/5 transition-colors duration-500" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-block px-3 py-1.5 bg-cream/90 backdrop-blur-sm font-body text-[10px] tracking-[0.15em] uppercase text-espresso-light/60 font-light">
                      {posts[0].category}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 mb-4">
                    <span className="inline-block px-2.5 py-1 bg-terracotta/10 font-body text-[10px] tracking-[0.15em] uppercase text-terracotta/70 font-light">
                      Latest
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mb-3">
                    <span className="font-body text-[10px] tracking-[0.15em] uppercase text-espresso-light/40 font-light">
                      {posts[0].date}
                    </span>
                    <span className="font-body text-[10px] tracking-[0.15em] uppercase text-espresso-light/40 font-light">
                      {posts[0].readTime}
                    </span>
                  </div>
                  <h2 className="font-display text-3xl lg:text-4xl font-light text-espresso tracking-wide mb-2 group-hover:text-terracotta transition-colors duration-300">
                    {posts[0].title}
                  </h2>
                  <p className="font-accent text-base text-espresso-light/45 italic mb-4">
                    {posts[0].subtitle}
                  </p>
                  <p className="font-body text-sm text-espresso-light/55 font-light leading-relaxed mb-6">
                    {posts[0].excerpt}
                  </p>
                  <div className="flex items-center gap-2 font-body text-[10px] tracking-[0.2em] uppercase text-espresso-light/40 group-hover:text-terracotta transition-colors duration-300 font-light">
                    Read Article
                    <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </article>
            </FadeIn>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-espresso/5 mb-16" />

          {/* Remaining posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 lg:gap-x-16">
            {posts.slice(1).map((post, i) => (
              <PostCard
                key={post.id}
                post={post}
                index={i}
                onClick={() => {
                  setActivePost(post.id);
                  window.scrollTo(0, 0);
                }}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
