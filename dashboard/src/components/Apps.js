import React, { useState, useContext } from "react";
import GeneralContext from "./GeneralContext";

const appsList = [
  {
    name: "Console",
    category: "Reports",
    desc: "Comprehensive portfolio reporting, taxation tools, analytics, and historical trade statistics.",
    tag: "Official",
    color: "#4184f3",
    bgColor: "rgba(65, 132, 243, 0.1)",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>
  },
  {
    name: "Kite Connect API",
    category: "Trading",
    desc: "Build full-fledged trading algorithms and customized trading software using REST APIs.",
    tag: "Developer",
    color: "#ff9800",
    bgColor: "rgba(255, 152, 0, 0.1)",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
  },
  {
    name: "Sensibull",
    category: "Trading",
    desc: "India's largest options trading platform. Analyze strategy builder, track F&O data, and trade options.",
    tag: "Partner",
    color: "#e91e63",
    bgColor: "rgba(233, 30, 99, 0.1)",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
  },
  {
    name: "Streak",
    category: "Trading",
    desc: "Create, backtest, and deploy algorithmic trading strategies without writing any code.",
    tag: "Partner",
    color: "#9c27b0",
    bgColor: "rgba(156, 39, 176, 0.1)",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
  },
  {
    name: "GoldenPi",
    category: "Investments",
    desc: "Direct investments in corporate bonds, debentures, and high-yielding debt securities online.",
    tag: "Bonds",
    color: "#009688",
    bgColor: "rgba(0, 150, 136, 0.1)",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg>
  },
  {
    name: "Coin",
    category: "Investments",
    desc: "Invest in direct mutual funds online commission-free, delivered directly to your demat account.",
    tag: "Official",
    color: "#4caf50",
    bgColor: "rgba(76, 175, 80, 0.1)",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
  }
];

const categories = ["All", "Reports", "Trading", "Investments"];

const Apps = () => {
  const { activeApps, toggleApp } = useContext(GeneralContext);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState(null);

  const handleLaunchApp = (appName) => {
    setNotification({ text: `Authenticating security keys...`, type: "loading" });

    setTimeout(() => {
      setNotification({ text: `Launching ${appName} client...`, type: "loading" });

      setTimeout(() => {
        setNotification({ text: `Launched ${appName} successfully! 🚀`, type: "success" });

        setTimeout(() => {
          setNotification(null);
        }, 2000);
      }, 1200);
    }, 1000);
  };

  const filteredApps = appsList.filter(app => {
    const matchesCategory = selectedCategory === "All" || app.category === selectedCategory;
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) || app.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px", fontFamily: "'Outfit', sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderBottom: "1px solid #e2e8f0", paddingBottom: "20px", marginBottom: "24px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h2 style={{ fontSize: "1.8rem", fontWeight: "600", color: "#0f172a", margin: "0 0 8px 0" }}>App Directory</h2>
          <p style={{ color: "#64748b", margin: 0, fontSize: "0.95rem" }}>Integrate powerful trading tools and platforms.</p>
        </div>
        <div>
          <input 
            type="text" 
            placeholder="Search integrations..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ padding: "12px 20px", borderRadius: "8px", border: "1px solid #cbd5e1", width: "280px", fontSize: "0.95rem", outline: "none", backgroundColor: "#f8fafc" }}
          />
        </div>
      </div>

      <div style={{ display: "flex", gap: "10px", marginBottom: "24px", flexWrap: "wrap" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: "8px 16px",
              borderRadius: "20px",
              border: "1px solid",
              borderColor: selectedCategory === cat ? "#0f172a" : "#e2e8f0",
              backgroundColor: selectedCategory === cat ? "#0f172a" : "#fff",
              color: selectedCategory === cat ? "#fff" : "#64748b",
              fontWeight: "500",
              fontSize: "0.9rem",
              cursor: "pointer",
              transition: "all 0.2s"
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {notification && (
        <div style={{ padding: "12px 20px", backgroundColor: "#f0fdf4", color: "#166534", borderRadius: "8px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px", border: "1px solid #bbf7d0" }}>
           <span>{notification.text}</span>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {filteredApps.map((app, index) => {
          const isActive = (activeApps || []).includes(app.name);
          return (
            <div 
              key={index} 
              style={{ 
                display: "flex", 
                alignItems: "center", 
                padding: "24px", 
                backgroundColor: "#fff", 
                borderRadius: "12px", 
                border: "1px solid #e2e8f0",
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.05)"}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = "none"}
            >
              
              <div style={{ 
                width: "64px", 
                height: "64px", 
                borderRadius: "16px", 
                backgroundColor: app.bgColor, 
                border: "none",
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                color: app.color,
                marginRight: "24px",
                flexShrink: 0
              }}>
                {app.icon}
              </div>

              <div style={{ flex: 1, paddingRight: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "6px" }}>
                  <h3 style={{ margin: 0, fontSize: "1.15rem", color: "#0f172a", fontWeight: "600" }}>{app.name}</h3>
                  <span style={{ fontSize: "0.75rem", padding: "4px 8px", backgroundColor: "#f1f5f9", color: "#64748b", borderRadius: "6px", fontWeight: "600" }}>{app.category}</span>
                  {isActive && <span style={{ fontSize: "0.75rem", padding: "4px 8px", backgroundColor: "#dcfce7", color: "#166534", borderRadius: "6px", fontWeight: "600" }}>Installed</span>}
                </div>
                <p style={{ margin: 0, color: "#64748b", fontSize: "0.9rem", lineHeight: "1.5" }}>{app.desc}</p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px", minWidth: "120px" }}>
                {isActive ? (
                  <>
                    <button 
                      onClick={() => handleLaunchApp(app.name)}
                      style={{ padding: "10px 16px", backgroundColor: "#0f172a", color: "#fff", border: "none", borderRadius: "8px", fontSize: "0.9rem", fontWeight: "600", cursor: "pointer", transition: "opacity 0.2s" }}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = "0.9"}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
                    >
                      Open App
                    </button>
                    <button
                      onClick={() => toggleApp(app.name)}
                      style={{ padding: "8px", backgroundColor: "transparent", color: "#ef4444", border: "none", fontSize: "0.85rem", fontWeight: "600", cursor: "pointer" }}
                      onMouseEnter={(e) => e.currentTarget.style.textDecoration = "underline"}
                      onMouseLeave={(e) => e.currentTarget.style.textDecoration = "none"}
                    >
                      Uninstall
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => toggleApp(app.name)}
                    style={{ padding: "10px 16px", backgroundColor: "#fff", color: "#0f172a", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "0.9rem", fontWeight: "600", cursor: "pointer", transition: "all 0.2s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#f8fafc"; e.currentTarget.style.borderColor = "#94a3b8"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#fff"; e.currentTarget.style.borderColor = "#cbd5e1"; }}
                  >
                    Install
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Apps;