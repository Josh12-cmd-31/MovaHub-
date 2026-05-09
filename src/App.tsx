/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import { Navbar, Hero, ToolCard, ArticleCard, Newsletter, Footer, ArticleReader, AIToolViewer } from "./components";
import { AI_TOOLS, ARTICLES, CATEGORIES, Article, AITool } from "./data";
import { Zap, TrendingUp, DollarSign, Cpu, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedTool, setSelectedTool] = useState<AITool | null>(null);

  const filteredArticles = activeCategory === "All" 
    ? ARTICLES 
    : ARTICLES.filter(a => a.category.toLowerCase().includes(activeCategory.toLowerCase()));

  const scrollToTools = () => {
    const el = document.getElementById('ai-tools');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative">
      <AnimatePresence>
        {selectedArticle && (
          <ArticleReader 
            article={selectedArticle} 
            onClose={() => setSelectedArticle(null)} 
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedTool && (
          <AIToolViewer 
            tool={selectedTool} 
            onClose={() => setSelectedTool(null)} 
          />
        )}
      </AnimatePresence>

      {/* Reading Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[60] origin-left"
        style={{ scaleX }}
      />

      <Navbar />
      
      <main>
        {/* Updated Hero to use scrollToTools */}
        <section className="relative pt-40 pb-20 overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] -z-10" />

          <div className="max-w-7xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-4">
                THE FUTURE OF DIGITAL WEALTH
              </span>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight max-w-4xl mx-auto">
                Discover AI Tools & Smart Ways to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Make Money Online</span>
              </h1>
              <p className="text-slate-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
                Learn, grow, and earn using the latest AI and technology. Join 50,000+ creators and freelancers staying ahead of the curve.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-slate-200 transition-all w-full sm:w-auto">
                  Explore Articles
                </button>
                <button 
                  onClick={scrollToTools}
                  className="px-8 py-3 bg-white/5 border border-white/10 text-white font-bold rounded-lg hover:bg-white/10 transition-all w-full sm:w-auto"
                >
                  AI Tools Directory
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Ad Placement Area 1 */}
        <section className="py-12 max-w-7xl mx-auto px-6">
          <div className="w-full h-32 glass border-dashed border-white/10 rounded-2xl flex items-center justify-center text-white/20 text-xs font-bold uppercase tracking-[0.3em]">
            Top Leaderboard Advertisement Slot
          </div>
        </section>

        {/* Trending AI Tools */}
        <section id="ai-tools" className="py-24 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-end justify-between mb-8 gap-6">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-blue-400 mb-2">Market pulse</h3>
                <h2 className="text-3xl md:text-5xl font-bold">Trending AI Tools</h2>
              </div>
              <button className="text-xs text-slate-500 hover:text-white transition-colors flex items-center gap-2">
                View All Directory <ArrowRight size={14} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {AI_TOOLS.map((tool) => (
                <ToolCard 
                  key={tool.id} 
                  tool={tool} 
                  onClick={() => setSelectedTool(tool)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Make Money Online */}
        <section className="py-24 px-6 bg-white/[0.01]">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-sm font-bold uppercase tracking-wider text-purple-400 mb-6">Wealth creation</h3>
            <h2 className="text-3xl md:text-5xl font-bold mb-12">Make Money Online</h2>
            
            <ArticleCard 
              article={ARTICLES[0]} 
              featured 
              onClick={() => setSelectedArticle(ARTICLES[0])}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {ARTICLES.slice(1, 4).map((article) => (
                <ArticleCard 
                  key={article.id} 
                  article={article} 
                  onClick={() => setSelectedArticle(article)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Ad Placement Area 2 */}
        <section className="py-12 max-w-7xl mx-auto px-6">
          <div className="w-full h-24 bg-gradient-to-r from-blue-900/10 to-transparent border border-dashed border-white/5 rounded-2xl flex items-center justify-center text-white/20 text-xs font-bold uppercase tracking-[0.3em]">
            Middle Content Ad Placement
          </div>
        </section>

        {/* Tech & Gadgets News */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-sm font-bold uppercase tracking-wider text-blue-400 mb-6">Latest Updates</h3>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
              <h2 className="text-3xl md:text-5xl font-bold">Tech & AI Trends</h2>
              
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 justify-end">
                {["All", ...CATEGORIES.slice(0, 4)].map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-widest transition-all border ${
                      activeCategory === cat 
                      ? "bg-blue-600 border-blue-600 text-white" 
                      : "bg-white/5 border-white/10 text-slate-500 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <ArticleCard 
                  key={article.id} 
                  article={article} 
                  onClick={() => setSelectedArticle(article)}
                />
              ))}
            </div>
          </div>
        </section>

        <Newsletter />
      </main>

      <Footer />

      {/* Floating Action / Social Sharing Sidebar (Mock) */}
      <div className="fixed left-6 bottom-40 z-40 hidden xl:flex flex-col gap-4">
        {['t', 'i', 'f'].map(icon => (
          <motion.div 
            key={icon}
            whileHover={{ x: 5 }}
            className="w-12 h-12 glass rounded-2xl flex items-center justify-center opacity-40 hover:opacity-100 transition-all cursor-pointer"
          >
            <div className="w-4 h-4 bg-white rounded-sm" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

