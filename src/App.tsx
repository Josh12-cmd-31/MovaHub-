/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useSpring } from "motion/react";
import { Navbar, Hero, ToolCard, ArticleCard, Newsletter, Footer, ArticleReader, AIToolViewer, NewsletterModal, AdSenseInArticle, DisplayAd } from "./components";
import { AI_TOOLS, ARTICLES, CATEGORIES, Article, AITool } from "./data";
import { Zap, TrendingUp, DollarSign, Cpu, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate, useLocation, Link } from "react-router-dom";

function HomePage({ onNewsletterOpen }: { onNewsletterOpen?: () => void }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();

  const filteredArticles = activeCategory === "All" 
    ? ARTICLES 
    : ARTICLES.filter(a => a.category.toLowerCase().includes(activeCategory.toLowerCase()));

  const scrollToTools = () => {
    const el = document.getElementById('ai-tools');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToArticles = () => {
    const el = document.getElementById('tech-trends');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Hero onExplore={scrollToArticles} onLearn={scrollToTools} />
      
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
            <Link to="/tools" className="text-xs text-slate-500 hover:text-white transition-colors flex items-center gap-2">
              View All Directory <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {AI_TOOLS.map((tool) => (
              <ToolCard 
                key={tool.id} 
                tool={tool} 
                onClick={() => navigate(`/tool/${tool.id}`)}
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
            onClick={() => navigate(`/article/${ARTICLES[0].id}`)}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {ARTICLES.slice(1, 4).map((article) => (
              <ArticleCard 
                key={article.id} 
                article={article} 
                onClick={() => navigate(`/article/${article.id}`)}
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
      <section id="tech-trends" className="py-24 px-6">
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
                onClick={() => navigate(`/article/${article.id}`)}
              />
            ))}
          </div>
        </div>
      </section>

      <Newsletter onOpenModal={onNewsletterOpen} />
    </>
  );
}

function ArticlePage({ onNewsletterOpen }: { onNewsletterOpen?: () => void }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = ARTICLES.find(a => a.id === id);

  if (!article) return <div className="pt-40 text-center">Article not found</div>;

  return <ArticleReader article={article} onClose={() => navigate(-1)} onNewsletterOpen={onNewsletterOpen} />;
}

function ToolPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const tool = AI_TOOLS.find(t => t.id === id);

  if (!tool) return <div className="pt-40 text-center">Tool not found</div>;

  return <AIToolViewer tool={tool} onClose={() => navigate(-1)} />;
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AIToolsPage({ onNewsletterOpen }: { onNewsletterOpen?: () => void }) {
  const navigate = useNavigate();
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">AI Tools Directory</h1>
        <p className="text-slate-400 text-lg mb-12 max-w-2xl">The ultimate collection of the world's best AI software, curated for creators, hackers, and entrepreneurs.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {AI_TOOLS.map((tool) => (
            <ToolCard 
              key={tool.id} 
              tool={tool} 
              onClick={() => navigate(`/tool/${tool.id}`)}
            />
          ))}
        </div>
      </div>
      <Newsletter onOpenModal={onNewsletterOpen} />
    </div>
  );
}

function TechTrendsPage({ onNewsletterOpen }: { onNewsletterOpen?: () => void }) {
  const navigate = useNavigate();
  const techArticles = ARTICLES.filter(a => a.category === 'Tech News' || a.category === 'Gadgets');
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-blue-400">Tech & AI Trends</h1>
        <p className="text-slate-400 text-lg mb-12 max-w-2xl">Stay ahead of the curve with the latest breakthroughs in artificial intelligence, hardware, and the digital economy.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {techArticles.map((article) => (
            <ArticleCard 
              key={article.id} 
              article={article} 
              onClick={() => navigate(`/article/${article.id}`)}
            />
          ))}
        </div>
      </div>
      <Newsletter onOpenModal={onNewsletterOpen} />
    </div>
  );
}

function MakeMoneyPage({ onNewsletterOpen }: { onNewsletterOpen?: () => void }) {
  const navigate = useNavigate();
  const moneyArticles = ARTICLES.filter(a => a.category === 'Make Money' || a.category === 'Online Business');
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-purple-400">Make Money Online</h1>
        <p className="text-slate-400 text-lg mb-12 max-w-2xl">Blueprints for the new digital gold rush. From AI side hustles to autonomous agencies.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {moneyArticles.map((article) => (
            <ArticleCard 
              key={article.id} 
              article={article} 
              onClick={() => navigate(`/article/${article.id}`)}
            />
          ))}
        </div>
      </div>
      <Newsletter onOpenModal={onNewsletterOpen} />
    </div>
  );
}

function TutorialsPage({ onNewsletterOpen }: { onNewsletterOpen?: () => void }) {
  const navigate = useNavigate();
  const tutorials = ARTICLES.filter(a => a.category === 'Tutorials');
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-emerald-400">AI Tutorials</h1>
        <p className="text-slate-400 text-lg mb-12 max-w-2xl">Level up your skills with step-by-step guides on mastering prompt engineering, automation, and AI workflows.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutorials.map((article) => (
            <ArticleCard 
              key={article.id} 
              article={article} 
              onClick={() => navigate(`/article/${article.id}`)}
            />
          ))}
        </div>
      </div>
      <Newsletter onOpenModal={onNewsletterOpen} />
    </div>
  );
}

function AboutPage() {
  const aboutArticle = ARTICLES.find(a => a.id === '7');
  const tosArticle = ARTICLES.find(a => a.id === '8');

  if (!aboutArticle) return <div className="pt-40 text-center">About content not found</div>;

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-8">{aboutArticle.title}</h1>
          <div className="aspect-video w-full rounded-2xl overflow-hidden mb-12">
            <img 
              src={aboutArticle.image} 
              alt={aboutArticle.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="prose prose-invert max-w-none">
            {aboutArticle.content.split('\n\n').map((para, i) => {
              if (para === '[AD_SLOT_IN_ARTICLE]') {
                return (
                  <AdSenseInArticle key={i} />
                );
              }
              return (
                <p key={i} className="text-slate-300 text-lg leading-relaxed mb-6">
                  {para}
                </p>
              );
            })}
          </div>

          {tosArticle && (
            <div className="mt-16 p-8 glass rounded-2xl border border-white/10">
              <h3 className="text-xl font-bold mb-4">Legal & Transparency</h3>
              <p className="text-slate-400 mb-6 font-medium">To learn more about our commitment to user safety and data privacy, please review our terms.</p>
              <Link 
                to={`/article/${tosArticle.id}`}
                className="inline-flex items-center gap-2 text-blue-400 font-bold hover:text-white transition-colors"
              >
                View Terms of Service <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen relative">
        <NewsletterModal isOpen={isNewsletterModalOpen} onClose={() => setIsNewsletterModalOpen(false)} />
        {/* Reading Progress Bar */}
        <motion.div 
          className="fixed top-0 left-0 right-0 h-1 bg-primary z-[60] origin-left"
          style={{ scaleX }}
        />

        <Navbar onJoinNewsletter={() => setIsNewsletterModalOpen(true)} />
        
        <main>
          <Routes>
            <Route path="/" element={<HomePage onNewsletterOpen={() => setIsNewsletterModalOpen(true)} />} />
            <Route path="/tools" element={<AIToolsPage onNewsletterOpen={() => setIsNewsletterModalOpen(true)} />} />
            <Route path="/tech-trends" element={<TechTrendsPage onNewsletterOpen={() => setIsNewsletterModalOpen(true)} />} />
            <Route path="/make-money" element={<MakeMoneyPage onNewsletterOpen={() => setIsNewsletterModalOpen(true)} />} />
            <Route path="/tutorials" element={<TutorialsPage onNewsletterOpen={() => setIsNewsletterModalOpen(true)} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/article/:id" element={<ArticlePage onNewsletterOpen={() => setIsNewsletterModalOpen(true)} />} />
            <Route path="/tool/:id" element={<ToolPage />} />
          </Routes>
        </main>

        <DisplayAd />
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
    </Router>
  );
}


