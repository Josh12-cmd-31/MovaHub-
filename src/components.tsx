import { motion } from "motion/react";
import { Search, Menu, X, Zap, ArrowRight, Bell, Type, Sun, Moon, Coffee, Maximize2, Minimize2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import { AITool, Article } from "./data";
import { subscribeToNewsletter } from "./lib/firebase";
import { Link } from "react-router-dom";

export const NewsletterModal: React.FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || selectedCategories.length === 0) return;

    setStatus("loading");
    try {
      await subscribeToNewsletter(email, selectedCategories);
      setStatus("success");
      setTimeout(() => {
        onClose();
        setStatus("idle");
        setEmail("");
        setSelectedCategories([]);
      }, 3000);
    } catch (error) {
      console.error("Subscription failed:", error);
      setStatus("error");
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6"
    >
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={onClose} />
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="relative w-full max-w-xl glass border border-white/10 rounded-2xl p-8 md:p-12 overflow-hidden"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Bell className="text-blue-500" size={32} />
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">Customized AI Intelligence</h2>
          <p className="text-slate-400">Select the topics you want to master. We'll send you curated assets and tools based on your choice.</p>
        </div>

        {status === "success" ? (
          <div className="bg-blue-600/20 border border-blue-500/50 rounded-xl p-8 text-center">
            <Zap className="text-blue-400 mx-auto mb-4" size={40} />
            <h3 className="text-xl font-bold text-white mb-2">Welcome to the Inner Circle</h3>
            <p className="text-slate-400">Your preferences have been saved. Your first curated update is on its way.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Choose your interests</label>
              <div className="grid grid-cols-2 gap-3">
                {["AI Tools", "Make Money", "Tech Trends", "Tutorials", "Business", "Gadgets"].map(cat => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => toggleCategory(cat)}
                    className={`px-4 py-3 rounded-lg text-xs font-bold transition-all border ${
                      selectedCategories.includes(cat)
                      ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20"
                      : "bg-white/5 border-white/10 text-slate-400 hover:border-white/20"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full bg-black/50 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
                disabled={status === "loading"}
              />
              <button 
                type="submit"
                disabled={status === "loading" || selectedCategories.length === 0}
                className="w-full py-4 bg-white text-black font-black uppercase tracking-widest rounded-xl hover:bg-blue-500 hover:text-white transition-all disabled:opacity-50"
              >
                {status === "loading" ? "Processing..." : "Subscribe & Personalize"}
              </button>
              {selectedCategories.length === 0 && (
                <p className="text-[9px] text-center text-slate-600 uppercase font-bold tracking-tighter">Please select at least one category</p>
              )}
            </div>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
};

export const Navbar: React.FC<{ onJoinNewsletter?: () => void }> = ({ onJoinNewsletter }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-4 glass border-b border-white/10" : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center text-sm font-bold shadow-lg shadow-blue-500/20">
              <Zap className="text-white fill-current" size={16} />
            </div>
            <span className="text-2xl font-black tracking-tighter text-white">
              MOVA<span className="text-blue-500">HUB</span>
            </span>
          </motion.div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-6 text-sm font-medium text-slate-400">
            <Link to="/tools" className="hover:text-blue-400 transition-colors">AI Tools</Link>
            <Link to="/make-money" className="hover:text-purple-400 transition-colors">Make Money</Link>
            <Link to="/tech-trends" className="hover:text-blue-400 transition-colors">Tech Trends</Link>
            <Link to="/tutorials" className="hover:text-emerald-400 transition-colors">Tutorials</Link>
            <Link to="/about" className="hover:text-white transition-colors">About</Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white/5 border border-white/10 rounded-full px-4 py-1.5 flex items-center gap-2 text-sm text-slate-400 w-48">
              <Search size={14} />
              Search tools...
            </div>
            <button 
              onClick={onJoinNewsletter}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest transition-colors"
            >
              Join Pro
            </button>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 glass border-b border-white/10 py-8 px-6 flex flex-col gap-6 md:hidden text-center"
        >
          <Link to="/tools" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-white uppercase tracking-widest">AI Tools</Link>
          <Link to="/make-money" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-purple-400 uppercase tracking-widest">Make Money</Link>
          <Link to="/tech-trends" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-blue-400 uppercase tracking-widest">Tech Trends</Link>
          <Link to="/tutorials" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-emerald-400 uppercase tracking-widest">Tutorials</Link>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-white uppercase tracking-widest">About Us</Link>
          <button 
            onClick={() => {
              setMobileMenuOpen(false);
              onJoinNewsletter?.();
            }}
            className="btn-primary w-full mt-4"
          >
            Join Newsletter
          </button>
        </motion.div>
      )}
    </nav>
  );
};

export const Hero: React.FC<{ onExplore?: () => void, onLearn?: () => void }> = ({ onExplore, onLearn }) => {
  return (
    <section className="relative pt-40 pb-20 overflow-hidden">
      {/* Background Glows */}
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
            <button 
              onClick={onExplore}
              className="px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-slate-200 transition-all w-full sm:w-auto"
            >
              Explore Articles
            </button>
            <button 
              onClick={onLearn}
              className="px-8 py-3 bg-white/5 border border-white/10 text-white font-bold rounded-lg hover:bg-white/10 transition-all w-full sm:w-auto"
            >
              AI Tools Directory
            </button>
          </div>
        </motion.div>

        {/* Featured Logos/Social Proof */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-20 pt-10 border-t border-white/5"
        >
          <p className="text-xs font-semibold text-white/30 uppercase tracking-[0.2em] mb-8">
            Empowering creators globally
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-40 grayscale contrast-125">
            {["OpenAI", "Google AI", "Anthropic", "Stability AI", "Mistral"].map(logo => (
              <span key={logo} className="text-xl font-display font-bold tracking-tighter italic">{logo}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

interface ToolCardProps {
  tool: AITool;
  onClick?: () => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool, onClick }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="bg-white/5 border border-white/10 rounded-xl overflow-hidden flex flex-col h-full group transition-all hover:bg-white/10 cursor-pointer"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={tool.image} 
          alt={tool.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span className="px-2 py-0.5 bg-blue-600 text-white text-[10px] font-bold rounded uppercase tracking-tighter">
            {tool.category}
          </span>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-white font-semibold text-base mb-2 group-hover:text-blue-400 transition-colors">{tool.name}</h3>
        <p className="text-slate-400 text-xs mb-4 flex-grow line-clamp-2">{tool.description}</p>
        <button className="text-blue-400 font-bold text-[11px] tracking-widest uppercase flex items-center gap-2 group-hover:gap-3 transition-all">
          Explore Now <ArrowRight size={12} />
        </button>
      </div>
    </motion.div>
  );
};

export const AIToolViewer: React.FC<{ tool: AITool, onClose: () => void }> = ({ tool, onClose }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-slate-950"
    >
      <div className="max-w-4xl mx-auto px-6 py-24 relative">
        <button 
          onClick={onClose}
          className="fixed top-8 right-8 w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-white/10 transition-colors z-10"
        >
          <X size={24} />
        </button>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/20">
            <img src={tool.image} alt={tool.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-blue-400 font-bold text-xs uppercase tracking-[0.2em] mb-4">{tool.category}</span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 uppercase tracking-tighter">{tool.name}</h1>
            <p className="text-white/60 text-lg mb-8 uppercase font-bold tracking-widest">Pricing: {tool.pricing}</p>
            <div className="flex flex-wrap gap-4 mb-8">
              <a href={tool.url} target="_blank" rel="noreferrer" className="btn-primary flex items-center gap-2">
                Visit Official Site <Zap size={16} />
              </a>
              <button className="btn-outline">Save to Favorites</button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-widest underline decoration-blue-500 underline-offset-8">Deep Dive</h3>
            <p className="text-slate-300 text-lg leading-relaxed mb-8">{tool.detailedDescription}</p>
            
            <div className="my-12 p-8 bg-white/5 border border-dashed border-white/10 rounded-2xl">
              <span className="text-[10px] font-bold text-slate-600 block mb-4 tracking-widest uppercase">Expert Recommendation</span>
              <p className="text-sm text-slate-400 mb-6 italic">Looking for a tailored AI solution for your agency? Check out our sponsored partner for white-label automation tools.</p>
              <button className="text-blue-400 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors">Learn More &rarr;</button>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Key Advantages</h4>
              <ul className="space-y-4">
                {tool.pros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-400">
                    <Zap className="text-blue-500 shrink-0" size={14} />
                    {pro}
                  </li>
                ))}
              </ul>
            </div>

            <div className="h-64 bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-white/5 rounded-2xl flex items-center justify-center text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em] text-center px-6">
              Exclusive Side Hustle Opportunity
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export const ArticleCard: React.FC<ArticleCardProps & { onClick?: () => void }> = ({ article, featured = false, onClick }) => {
  if (featured) {
    return (
      <motion.div 
        whileHover={{ y: -2 }}
        onClick={onClick}
        className="bg-white/5 border border-white/10 rounded-xl overflow-hidden grid md:grid-cols-2 group min-h-[400px] cursor-pointer shadow-lg shadow-black/40"
      >
        <div className="relative h-64 md:h-auto overflow-hidden">
          <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent text-white" />
          <span className="absolute bottom-4 left-4 bg-purple-600 text-[10px] font-bold px-2 py-0.5 rounded">FEATURED</span>
        </div>
        <div className="p-8 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-blue-400 font-bold text-xs uppercase tracking-widest">{article.category}</span>
            {article.subCategory && (
              <>
                <span className="text-slate-600">/</span>
                <span className="text-purple-400 font-bold text-xs uppercase tracking-widest">{article.subCategory}</span>
              </>
            )}
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight group-hover:text-purple-400 transition-colors">{article.title}</h2>
          <p className="text-slate-400 text-sm mb-6 leading-relaxed line-clamp-3">{article.excerpt}</p>
          
          {article.tags && (
            <div className="flex flex-wrap gap-2 mb-6">
              {article.tags.slice(0, 3).map(tag => (
                <span key={tag} className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[9px] text-slate-500 uppercase font-bold tracking-widest">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[10px] text-slate-500 uppercase font-bold tracking-widest">
              <span>{article.author}</span>
              <span>•</span>
              <span>{article.date}</span>
            </div>
            <button className="text-xs text-white font-bold underline underline-offset-4 hover:text-purple-400 transition-colors">Read Article</button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="group cursor-pointer flex flex-col"
    >
      <div className="relative h-48 rounded-xl overflow-hidden mb-4 bg-slate-800">
        <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute top-3 left-3 flex gap-2">
          <div className="px-2 py-0.5 bg-slate-900/80 backdrop-blur rounded text-[9px] uppercase font-bold tracking-widest border border-white/10">
            {article.category}
          </div>
          {article.subCategory && (
            <div className="px-2 py-0.5 bg-blue-600/80 backdrop-blur rounded text-[9px] uppercase font-bold tracking-widest border border-white/10">
              {article.subCategory}
            </div>
          )}
        </div>
      </div>
      <h3 className="text-base font-bold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
        {article.title}
      </h3>
      <p className="text-slate-400 text-xs mb-4 line-clamp-2 leading-relaxed">{article.excerpt}</p>
      <div className="flex items-center gap-2 text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-auto">
        <span>{article.author}</span>
        <span>•</span>
        <span>{article.date}</span>
      </div>
    </motion.div>
  );
};

export const Newsletter: React.FC<{ onOpenModal?: () => void }> = ({ onOpenModal }) => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-white/10 rounded-xl p-8 md:p-16 relative overflow-hidden">
          <div className="relative z-10 text-center">
            <h3 className="text-white font-bold mb-3 text-2xl flex items-center justify-center gap-3">
              <Bell className="text-blue-400" size={24} />
              Join the Inner Circle
            </h3>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed">
              Get the top 3 AI tools and 1 side hustle idea delivered to your inbox every Friday.
            </p>
            
            <button 
              onClick={onOpenModal}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-4 px-12 rounded-full transition-all uppercase tracking-[0.2em] shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95"
            >
              Configure & Subscribe
            </button>

            <p className="mt-8 text-[10px] text-slate-500 uppercase tracking-widest">
              Join 50,000+ top creators & freelancers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export const AdSenseInArticle: React.FC = () => {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense injection error:", e);
    }
  }, []);

  return (
    <div className="my-16 overflow-hidden">
      <ins 
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center" }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-8445167187375756"
        data-ad-slot="8734560665"
      ></ins>
    </div>
  );
};

export const ArticleReader: React.FC<{ article: Article, onClose: () => void, onNewsletterOpen?: () => void }> = ({ article, onClose, onNewsletterOpen }) => {
  const [fontSize, setFontSize] = useState<"sm" | "md" | "lg" | "xl">("md");
  const [theme, setTheme] = useState<"dark" | "light" | "sepia">("dark");
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadingProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getFontSizeClass = () => {
    switch (fontSize) {
      case "sm": return "text-base";
      case "md": return "text-lg md:text-xl";
      case "lg": return "text-xl md:text-2xl";
      case "xl": return "text-2xl md:text-3xl font-medium";
      default: return "text-lg md:text-xl";
    }
  };

  const getThemeClass = () => {
    switch (theme) {
      case "light": return "bg-white text-slate-900";
      case "sepia": return "bg-[#f4ecd8] text-[#5b4636]";
      case "dark": return "bg-slate-950 text-slate-300";
      default: return "bg-slate-950 text-slate-300";
    }
  };

  const invertedTextClass = theme === "light" || theme === "sepia" ? "text-slate-800" : "text-white";
  const labelClass = theme === "light" || theme === "sepia" ? "text-slate-500" : "text-slate-500";

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`min-h-screen transition-colors duration-500 ${getThemeClass()}`}
    >
      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-blue-600 z-[110] transition-all duration-300" style={{ width: `${readingProgress}%` }} />

      {/* Reader Controls Toolbar */}
      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[110] p-2 rounded-2xl border border-white/10 backdrop-blur-xl flex items-center gap-4 shadow-2xl ${
        theme === "dark" ? "bg-slate-900/80" : "bg-black/10 border-black/5"
      }`}>
        <div className="flex items-center gap-1 border-r border-white/10 pr-4">
          <button 
            onClick={() => setFontSize("sm")}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${fontSize === "sm" ? "bg-blue-600 text-white" : "hover:bg-white/5 text-slate-400"}`}
          >
            <span className="text-xs font-bold uppercase">A</span>
          </button>
          <button 
            onClick={() => setFontSize("md")}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${fontSize === "md" ? "bg-blue-600 text-white" : "hover:bg-white/5 text-slate-400"}`}
          >
            <span className="text-sm font-bold uppercase">A</span>
          </button>
          <button 
            onClick={() => setFontSize("lg")}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${fontSize === "lg" ? "bg-blue-600 text-white" : "hover:bg-white/5 text-slate-400"}`}
          >
            <span className="text-base font-bold uppercase">A</span>
          </button>
          <button 
            onClick={() => setFontSize("xl")}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${fontSize === "xl" ? "bg-blue-600 text-white" : "hover:bg-white/5 text-slate-400"}`}
          >
            <Type size={16} />
          </button>
        </div>

        <div className="flex items-center gap-1">
          <button 
            onClick={() => setTheme("light")}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${theme === "light" ? "bg-white text-blue-600" : "hover:bg-white/5 text-slate-400"}`}
            title="Light Theme"
          >
            <Sun size={18} />
          </button>
          <button 
            onClick={() => setTheme("sepia")}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${theme === "sepia" ? "bg-[#e5d9bb] text-[#5b4636]" : "hover:bg-white/5 text-slate-400"}`}
            title="Sepia Mode"
          >
            <Coffee size={18} />
          </button>
          <button 
            onClick={() => setTheme("dark")}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${theme === "dark" ? "bg-blue-600 text-white" : "hover:bg-white/5 text-slate-400"}`}
            title="Dark Mode"
          >
            <Moon size={18} />
          </button>
        </div>

        <div className="border-l border-white/10 pl-4">
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center"
            title="Exit Reader"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-24 relative">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-12 text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="px-3 py-1 bg-blue-600/20 text-blue-400 text-xs font-bold rounded uppercase tracking-widest">
                {article.category}
              </span>
              {article.subCategory && (
                <>
                  <span className="text-slate-700">/</span>
                  <span className="px-3 py-1 bg-purple-600/20 text-purple-400 text-xs font-bold rounded uppercase tracking-widest">
                    {article.subCategory}
                  </span>
                </>
              )}
            </div>
            
            <h1 className={`text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tighter ${invertedTextClass}`}>
              {article.title}
            </h1>

            {article.tags && (
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {article.tags.map(tag => (
                  <span key={tag} className="text-[10px] text-slate-500 hover:text-blue-500 transition-colors cursor-pointer font-bold uppercase tracking-widest border border-slate-500/20 px-2 py-1 rounded">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center justify-center gap-4 text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">
              <span>By {article.author}</span>
              <span className="opacity-30">•</span>
              <span>{article.date}</span>
              <span className="opacity-30">•</span>
              <span className="text-blue-500">8 Minute Deep Dive</span>
            </div>
          </div>

          <div className="aspect-video rounded-3xl overflow-hidden mb-16 shadow-2xl relative group">
            <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
              <p className="text-white font-medium italic text-sm">Visual asset generated by MovaHub Labs AI.</p>
            </div>
          </div>

          <div className={`transition-all duration-300 ${fontSize === 'xl' ? 'max-w-3xl mx-auto' : ''}`}>
            {article.content?.split('\n\n').map((para, i) => {
              if (para.includes('[AD_SLOT_IN_ARTICLE]')) {
                return (
                  <AdSenseInArticle key={i} />
                );
              }
              return (
                <p key={i} className={`${getFontSizeClass()} leading-loose mb-10 selection:bg-blue-600/30 transition-[font-size] duration-300 font-serif`}>
                  {para}
                </p>
              );
            })}
            
            <div className="my-20 p-12 glass rounded-3xl border border-white/10 text-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl -z-10 group-hover:bg-blue-500/20 transition-all" />
              <h4 className={`text-2xl font-bold mb-4 ${invertedTextClass}`}>Was this insight helpful?</h4>
              <p className="text-slate-400 text-sm mb-10 max-w-md mx-auto">Our mission is to empower the next billion digital entrepreneurs with pure, actionable intelligence.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold uppercase tracking-widest hover:scale-105 transition-all">Yes, very helpful</button>
                <button className="px-6 py-2 bg-white/5 text-slate-400 rounded-lg text-xs font-bold uppercase tracking-widest hover:text-white transition-all">Could be better</button>
              </div>
            </div>
          </div>

          <div className="mt-24 pt-12 border-t border-white/10">
             <Newsletter onOpenModal={onNewsletterOpen} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-8">
              <Zap className="text-primary fill-current" size={32} />
              <span className="text-3xl font-display font-bold tracking-tighter">MOVA<span className="gradient-text">HUB</span></span>
            </div>
            <p className="text-white/50 leading-relaxed mb-8">
              Empowering the next generation of digital entrepreneurs through the power of AI and emerging tech.
            </p>
            <div className="flex gap-4">
              {['Twitter', 'Instagram', 'YouTube', 'LinkedIn'].map(social => (
                <div key={social} className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-white/10 cursor-pointer transition-colors">
                  <span className="sr-only">{social}</span>
                  <div className="w-4 h-4 bg-white/40 rounded-sm" />
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-8">Company</h4>
            <ul className="flex flex-col gap-4 text-white/50 text-sm">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Editorial Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sponsorships</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-8">Legal</h4>
            <ul className="flex flex-col gap-4 text-white/50 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><Link to="/article/8" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-8">Categories</h4>
            <ul className="grid grid-cols-2 gap-4 text-white/50 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">AI Tools</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Tutorials</a></li>
              <li><a href="#" className="hover:text-white transition-colors">News</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Business</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Freelancing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Gadgets</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-white/5 text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">
          <p>© 2026 MOVAHUB MEDIA GROUP. ALL RIGHTS RESERVED.</p>
          <p>BUILT FOR THE AGENTS OF THE FUTURE.</p>
        </div>
      </div>
    </footer>
  );
};
