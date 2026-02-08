import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SidebarItem = ({ icon, label, id, activePage, setActivePage }) => (
  <button
    onClick={() => setActivePage(id)}
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 group ${activePage === id
        ? 'bg-[#D4AF37]/10 text-[#D4AF37]'
        : 'text-zinc-400 hover:bg-zinc-800 hover:text-white hover:translate-x-1'
      }`}
  >
    <div className={`w-5 h-5 transition-transform duration-300 ${activePage === id ? 'text-[#D4AF37] scale-110' : 'text-zinc-500 group-hover:text-white'}`}>
      {icon}
    </div>
    <span className="font-medium tracking-wide text-sm">{label}</span>
    {activePage === id && (
      <motion.div
        layoutId="activeGlow"
        className="absolute left-0 w-1 h-8 bg-[#D4AF37] rounded-r-full shadow-[0_0_10px_rgba(212,175,55,0.5)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
    )}
  </button>
);

const StatusBadge = ({ status }) => {
  const styles = {
    New: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    Negotiation: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    Closed: 'bg-green-500/10 text-green-400 border-green-500/20',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
      {status}
    </span>
  );
};

const TemplateCard = ({ title, text, showToast }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    showToast("Template copied to clipboard");
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-800 rounded-xl p-6 hover:border-[#D4AF37]/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-zinc-100 font-semibold text-lg">{title}</h3>
        <div className="h-8 w-8 rounded-full bg-zinc-950 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37]/10 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
        </div>
      </div>
      <div className="bg-zinc-950/50 rounded-lg p-4 mb-6 flex-grow border border-zinc-800/50">
        <p className="text-zinc-400 text-sm italic leading-relaxed">"{text}"</p>
      </div>

      <motion.button
        onClick={handleCopy}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          backgroundColor: copied ? "rgba(24, 24, 27, 0.5)" : "#D4AF37",
          color: copied ? "#D4AF37" : "#000000",
          borderColor: copied ? "#D4AF37" : "transparent",
          boxShadow: copied ? "0 0 20px rgba(212, 175, 55, 0.3)" : "0 10px 15px -3px rgba(212, 175, 55, 0.1)"
        }}
        transition={{ duration: 0.2 }}
        className="w-full py-2.5 px-4 rounded-lg text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 border shadow-lg"
      >
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span
              key="copied"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2"
            >
              Copied ✓
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              Copy Template
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

// Skeletons
const DashboardSkeleton = () => (
  <div className="space-y-8 animate-pulse">
    <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-xl">
      <div className="h-8 bg-zinc-800 rounded w-1/2 mb-4"></div>
      <div className="h-4 bg-zinc-800 rounded w-full mb-2"></div>
      <div className="h-4 bg-zinc-800 rounded w-3/4"></div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 h-40">
          <div className="h-10 w-10 bg-zinc-800 rounded-lg mb-4"></div>
          <div className="h-4 bg-zinc-800 rounded w-1/3 mb-2"></div>
          <div className="h-8 bg-zinc-800 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  </div>
);

const LeadsSkeleton = () => (
  <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden animate-pulse">
    <div className="border-b border-zinc-800 p-4">
      <div className="grid grid-cols-5 gap-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-4 bg-zinc-800 rounded w-3/4"></div>
        ))}
      </div>
    </div>
    <div className="p-4 space-y-6">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="grid grid-cols-5 gap-4">
          <div className="h-4 bg-zinc-800 rounded w-full"></div>
          <div className="h-4 bg-zinc-800 rounded w-full"></div>
          <div className="h-4 bg-zinc-800 rounded w-full"></div>
          <div className="h-6 bg-zinc-800 rounded-full w-20"></div>
          <div className="h-4 bg-zinc-800 rounded w-full"></div>
        </div>
      ))}
    </div>
  </div>
);

const ListingsSkeleton = () => (
  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 animate-pulse">
    <div className="mb-8">
      <div className="h-8 bg-zinc-800 rounded w-1/4 mb-2"></div>
      <div className="h-4 bg-zinc-800 rounded w-1/3"></div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 bg-zinc-800 rounded w-1/4"></div>
          <div className="h-12 bg-zinc-800 rounded w-full"></div>
        </div>
      ))}
    </div>
    <div className="h-12 bg-zinc-800 rounded w-full mb-8"></div>
  </div>
);

const FollowupsSkeleton = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-pulse">
    {[1, 2, 3].map((i) => (
      <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 h-64">
        <div className="flex justify-between mb-4">
          <div className="h-6 bg-zinc-800 rounded w-1/3"></div>
          <div className="h-8 w-8 bg-zinc-800 rounded-full"></div>
        </div>
        <div className="h-32 bg-zinc-800 rounded mb-6"></div>
        <div className="h-10 bg-zinc-800 rounded w-full"></div>
      </div>
    ))}
  </div>
);

const Toast = ({ message, onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: -20, x: 20 }}
    animate={{ opacity: 1, y: 0, x: 0 }}
    exit={{ opacity: 0, y: -20, x: 20 }}
    className="fixed top-6 right-6 z-50 bg-zinc-900 border border-[#D4AF37] rounded-xl shadow-2xl shadow-black/50 p-4 flex items-center space-x-3 min-w-[300px]"
  >
    <div className="h-8 w-8 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
    </div>
    <div>
      <h4 className="text-[#D4AF37] font-bold text-sm">Success</h4>
      <p className="text-zinc-300 text-xs">{message}</p>
    </div>
  </motion.div>
);

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 }
};

const App = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [generatedListing, setGeneratedListing] = useState('');
  const [toast, setToast] = useState(null);

  const leads = [
    { name: 'John Smith', phone: '+971-55-123-4567', interest: 'Downtown Penthouse', status: 'New', lastContact: 'Today' },
    { name: 'Sarah Khan', phone: '+971-50-987-6543', interest: 'Palm Jumeirah Villa', status: 'Negotiation', lastContact: 'Yesterday' },
    { name: 'Ahmed Al-Farsi', phone: '+971-52-456-7890', interest: 'Business Bay Apartment', status: 'Closed', lastContact: '2 days ago' },
  ];

  const templates = [
    {
      title: 'New Inquiry',
      text: "Hi {{name}}, thank you for your interest in our luxury properties. I’d be happy to share exclusive options that match your preferences."
    },
    {
      title: 'Follow-up',
      text: "Just checking in to see if you had any questions about the property we discussed. Let me know when it’s a good time to connect."
    },
    {
      title: 'Negotiation',
      text: "We have some flexibility on this property and I’d love to discuss the next steps with you."
    }
  ];

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [activePage]);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (message) => {
    setToast(message);
  };

  const handleGenerate = () => {
    setGeneratedListing("Experience elevated living in this stunning 3-bedroom residence located in the heart of Downtown Dubai. Designed for discerning buyers, this home features premium finishes, panoramic city views, and world-class amenities.");
    showToast("Listing generated successfully");
  };

  const handleCopyListing = () => {
    navigator.clipboard.writeText(generatedListing);
    showToast("Listing description copied");
  };

  const getPageTitle = () => {
    switch (activePage) {
      case 'dashboard': return { title: 'Dashboard', subtitle: 'Welcome back, Agent' };
      case 'leads': return { title: 'Leads', subtitle: 'Manage your high-value prospects' };
      case 'listings': return { title: 'AI Listing Generator', subtitle: 'Create high-converting luxury property descriptions' };
      case 'followups': return { title: 'Automated Follow-ups', subtitle: 'Close more deals with timely communication' };
      case 'scheduler': return { title: 'Scheduler', subtitle: 'Manage your appointments' };
      default: return { title: 'Dashboard', subtitle: 'Welcome back, Agent' };
    }
  };

  const { title, subtitle } = getPageTitle();

  const renderContent = () => {
    if (loading) {
      switch (activePage) {
        case 'dashboard': return <DashboardSkeleton />;
        case 'leads': return <LeadsSkeleton />;
        case 'listings': return <ListingsSkeleton />;
        case 'followups': return <FollowupsSkeleton />;
        case 'scheduler': return <div className="h-96 bg-zinc-900 border border-zinc-800 rounded-xl animate-pulse"></div>;
        default: return <DashboardSkeleton />;
      }
    }

    switch (activePage) {
      case 'dashboard': return (
        <div className="space-y-8">
          <div className="p-8 bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-xl hover:shadow-lg transition-all duration-300">
            <h2 className="text-2xl font-bold text-zinc-100 mb-4">Welcome back to Dubai Luxury Real Estate Hub</h2>
            <p className="text-zinc-400 max-w-2xl leading-relaxed">
              Your central command for managing high-end property dealings in Dubai.
              Use the sidebar to track leads, generate exclusive listings, and automate your client follow-ups.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-800 rounded-xl p-6 hover:border-[#D4AF37]/30 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <div className="h-10 w-10 bg-zinc-950 rounded-lg mb-4 flex items-center justify-center text-[#D4AF37]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                  </svg>
                </div>
                <h3 className="text-zinc-400 text-sm font-medium">Metric {i}</h3>
                <p className="text-2xl font-bold text-zinc-100 mt-1">2,34{i}</p>
                <p className="text-xs text-green-500 mt-2 flex items-center">
                  ▲ 12% <span className="text-zinc-600 ml-1">vs last month</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      );
      case 'leads': return (
        <div className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="py-4 px-6 text-[#D4AF37] font-medium text-sm tracking-wider">Name</th>
                <th className="py-4 px-6 text-[#D4AF37] font-medium text-sm tracking-wider">Phone</th>
                <th className="py-4 px-6 text-[#D4AF37] font-medium text-sm tracking-wider">Property Interest</th>
                <th className="py-4 px-6 text-[#D4AF37] font-medium text-sm tracking-wider">Status</th>
                <th className="py-4 px-6 text-[#D4AF37] font-medium text-sm tracking-wider">Last Contacted</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {leads.map((lead, index) => (
                <tr key={index} className="hover:bg-zinc-800/50 transition-colors duration-200">
                  <td className="py-4 px-6 text-zinc-100 font-medium">{lead.name}</td>
                  <td className="py-4 px-6 text-zinc-400">{lead.phone}</td>
                  <td className="py-4 px-6 text-zinc-300">{lead.interest}</td>
                  <td className="py-4 px-6">
                    <StatusBadge status={lead.status} />
                  </td>
                  <td className="py-4 px-6 text-zinc-500 text-sm">{lead.lastContact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      case 'listings': return (
        <div className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-zinc-100">Property Details</h2>
            <p className="text-zinc-500 text-sm">Input details to generate a description</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Inputs */}
            <div className="space-y-2">
              <label className="text-sm text-zinc-400 font-medium">Property Type</label>
              <input type="text" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all" placeholder="e.g. Penthouse" />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-zinc-400 font-medium">Location</label>
              <input type="text" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all" placeholder="e.g. Downtown Dubai" />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-zinc-400 font-medium">Bedrooms</label>
              <input type="number" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all" placeholder="e.g. 3" />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-zinc-400 font-medium">Amenities</label>
              <input type="text" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all" placeholder="e.g. Pool, Gym, Concierge" />
            </div>
          </div>

          <button
            onClick={handleGenerate}
            className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B4941F] hover:from-[#C4A027] hover:to-[#A4840F] text-black font-bold py-3 px-6 rounded-lg shadow-lg shadow-[#D4AF37]/20 transition-all duration-300 hover:scale-105 uppercase tracking-widest text-sm"
          >
            Generate Listing
          </button>

          {generatedListing && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 p-6 bg-zinc-950 border border-zinc-800 rounded-lg relative"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-[#D4AF37] rounded-l-lg"></div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-[#D4AF37] font-medium text-sm uppercase tracking-wider">Generated Description</h3>
                <button
                  onClick={handleCopyListing}
                  className="text-xs text-zinc-500 hover:text-white flex items-center gap-1 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                  Copy
                </button>
              </div>
              <p className="text-zinc-300 leading-relaxed font-serif italic">
                "{generatedListing}"
              </p>
            </motion.div>
          )}
        </div>
      );
      case 'followups': return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {templates.map((template, index) => (
            <TemplateCard key={index} title={template.title} text={template.text} showToast={showToast} />
          ))}
        </div>
      );
      case 'scheduler': return (
        <div className="flex flex-col items-center justify-center h-96 bg-zinc-950 border border-zinc-800 rounded-xl border-dashed">
          <div className="h-16 w-16 bg-zinc-900 rounded-full flex items-center justify-center mb-4 text-[#D4AF37]">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          </div>
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Scheduler Coming Soon</h3>
          <p className="text-zinc-500">Integration with calendar API is in progress.</p>
        </div>
      );
      default: return null;
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-zinc-100 font-sans overflow-hidden">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      </AnimatePresence>

      {/* Sidebar - Fixed Width */}
      <aside className="w-64 bg-zinc-900/80 backdrop-blur-xl border-r border-zinc-800 flex flex-col relative z-20">
        {/* App Name */}
        <div className="h-20 flex items-center px-6 border-b border-zinc-800">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#D4AF37] to-[#8C7323] rounded-sm shadow-lg shadow-[#D4AF37]/20"></div>
            <h1 className="text-lg font-bold tracking-tight text-zinc-100 leading-tight">
              Dubai Luxury <br />
              <span className="text-[#D4AF37]">Real Estate Hub</span>
            </h1>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-4 py-6 space-y-1 relative">
          <SidebarItem
            label="Dashboard"
            id="dashboard"
            activePage={activePage}
            setActivePage={setActivePage}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            }
          />
          <SidebarItem
            label="Leads"
            id="leads"
            activePage={activePage}
            setActivePage={setActivePage}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            }
          />
          <SidebarItem
            label="Listings"
            id="listings"
            activePage={activePage}
            setActivePage={setActivePage}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
                <line x1="9" y1="22" x2="9" y2="2"></line>
                <path d="M5 12h4"></path>
                <path d="M5 17h4"></path>
                <path d="M5 7h4"></path>
              </svg>
            }
          />
          <SidebarItem
            label="Follow-ups"
            id="followups"
            activePage={activePage}
            setActivePage={setActivePage}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            }
          />
          <SidebarItem
            label="Scheduler"
            id="scheduler"
            activePage={activePage}
            setActivePage={setActivePage}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            }
          />
        </nav>

        {/* User Profile Snippet */}
        <div className="p-4 border-t border-zinc-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[#D4AF37] font-bold">
              JD
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-100">John Doe</p>
              <p className="text-xs text-zinc-500">Premium Agent</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col bg-transparent relative overflow-hidden">
        {/* Subtle Background Gradient Accents */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Header Content */}
        <header className="h-20 flex items-center justify-between px-8 border-b border-zinc-800/50 backdrop-blur-sm z-10 transition-all duration-300">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-zinc-500 text-sm mt-0.5">{subtitle}</p>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-zinc-400 hover:text-white transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </button>
            <button className="bg-[#D4AF37] hover:bg-[#b5952f] text-black text-sm font-bold py-2 px-4 rounded-lg shadow-lg shadow-[#D4AF37]/20 transition-all duration-300 hover:scale-105">
              + New Lead
            </button>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-auto p-8 z-10 space-y-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="h-full"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default App;
