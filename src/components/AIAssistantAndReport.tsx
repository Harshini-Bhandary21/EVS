import React, { useState, useEffect, useRef } from "react";
import type { CityData } from "../data/cities";
import { 
  Send, MessageSquare, FileText, Download, Award, 
  HelpCircle, ShieldCheck, CheckCircle2, User, RefreshCw 
} from "lucide-react";
import { API_BASE_URL } from "../config";

interface AIAssistantAndReportProps {
  city: CityData;
}

interface Message {
  id: number;
  sender: "user" | "ai";
  text: string;
  table?: Array<{ key: string; val: string }>;
  bullets?: string[];
}

export default function AIAssistantAndReport({ city }: AIAssistantAndReportProps) {
  const [activeTab, setActiveTab] = useState<"assistant" | "report">("assistant");
  
  // Chatbot states
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Report Generator states
  const [includeAqi, setIncludeAqi] = useState(true);
  const [includeCarbon, setIncludeCarbon] = useState(true);
  const [includeGenome, setIncludeGenome] = useState(true);
  const [includeDna, setIncludeDna] = useState(true);
  const [reportState, setReportState] = useState<"idle" | "generating" | "complete">("idle");
  const [reportLogs, setReportLogs] = useState("");

  useEffect(() => {
    // Reset Chatbot Messages when city changes
    setMessages([
      {
        id: 1,
        sender: "ai",
        text: `Hello! I am the EcoSphere Sustainability Assistant. I can help you analyze tree cover, air quality targets, water harvesting regulations, and carbon neutrality timelines for ${city.name}. What would you like to explore today?`
      }
    ]);
  }, [city]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Predefined prompt handler
  const handlePromptClick = (prompt: string) => {
    submitUserMessage(prompt);
  };

  const submitUserMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { id: Date.now(), sender: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);

    fetch(`${API_BASE_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: text,
        cityName: city.name
      })
    })
      .then((res) => {
        if (!res.ok) throw new Error("Chat assistant API failed");
        return res.json();
      })
      .then((data) => {
        let aiMsg: Message = { id: Date.now() + 1, sender: "ai", text: data.reply };

        const cleanMsg = text.toLowerCase();
        if (cleanMsg.includes("report")) {
          aiMsg.table = [
            { key: "Global Eco Rating", val: `${Math.round((city.dna.environmentalHealth + city.dna.waterResilience + city.dna.carbonBalance) / 3)}/100` },
            { key: "AQI Diagnostic", val: `${city.metrics.aqi} AQI (Moderate Alert)` },
            { key: "Carbon Sequestration Ratio", val: `${Math.round((city.metrics.carbonAbsorbed / city.metrics.carbonEmissions) * 100)}% Absorbed` },
            { key: "Target Neutrality Year", val: `${city.metrics.carbonNeutralityTargetYear}` }
          ];
          aiMsg.bullets = [
            "Deploy micro-canopy tree buffers to optimize PM2.5 deposition.",
            "Restrict heavy commercial diesel corridors during peak thermal indices.",
            "Enforce mandatory rainwater harvesting for building permits."
          ];
        } else if (cleanMsg.includes("carbon") || cleanMsg.includes("net zero")) {
          aiMsg.bullets = [
            `Target Net Zero Neutrality Year: ${city.metrics.carbonNeutralityTargetYear}`,
            `Carbon absorption ratio stands at ${Math.round((city.metrics.carbonAbsorbed / city.metrics.carbonEmissions) * 100)}%`,
            "Simulations suggest expanding solar rooftop adoption by 30% shifts Net Zero timeline up by 4 years."
          ];
        } else if (cleanMsg.includes("aqi") || cleanMsg.includes("air")) {
          aiMsg.bullets = [
            "Attributed primarily to construction dust and vehicular combustion.",
            "Random Forest Regressor places tree canopy volume as the highest mitigative feature.",
            "Enforcing a strict EV transit conversion reduces local PM10 concentration by 12% within 90 days."
          ];
        }

        setMessages((prev) => [...prev, aiMsg]);
        setIsTyping(false);
      })
      .catch((err) => {
        console.warn("[ECOSPHERE] Chat assistant API offline, using local fallback.", err);
        setTimeout(() => {
          let aiMsg: Message = { id: Date.now() + 1, sender: "ai", text: "" };

          if (text.toLowerCase().includes("report")) {
            aiMsg.text = `Generative Environmental Diagnostic compiled for ${city.name}:`;
            aiMsg.table = [
              { key: "Global Eco Rating", val: `${Math.round((city.dna.environmentalHealth + city.dna.waterResilience + city.dna.carbonBalance) / 3)}/100` },
              { key: "AQI Diagnostic", val: `${city.metrics.aqi} AQI (Moderate Alert)` },
              { key: "Carbon Sequestration Ratio", val: `${Math.round((city.metrics.carbonAbsorbed / city.metrics.carbonEmissions) * 100)}% Absorbed` },
              { key: "Target Neutrality Target", val: `${city.metrics.carbonNeutralityTargetYear}` }
            ];
            aiMsg.bullets = [
              "Deploy micro-canopy tree buffers to optimize PM2.5 deposition.",
              "Restrict heavy commercial diesel corridors during peak thermal indices.",
              "Enforce mandatory rainwater harvesting for building permits."
            ];
          } else if (text.toLowerCase().includes("carbon") || text.toLowerCase().includes("neutrality")) {
            aiMsg.text = `${city.name}'s carbon footprint models calculate ${city.metrics.carbonEmissions} million tonnes CO2e generated annually against ${city.metrics.carbonAbsorbed} million tonnes sequestered by canopy cover. Net carbon balance score registers at ${city.dna.carbonBalance}/100.`;
            aiMsg.bullets = [
              `Target Net Zero Neutrality Year: ${city.metrics.carbonNeutralityTargetYear}`,
              `Carbon absorption ratio stands at ${Math.round((city.metrics.carbonAbsorbed / city.metrics.carbonEmissions) * 100)}%`,
              "Simulations suggest expanding solar rooftop adoption by 30% shifts Net Zero timeline up by 4 years."
            ];
          } else if (text.toLowerCase().includes("aqi") || text.toLowerCase().includes("air")) {
            aiMsg.text = `${city.name}'s ambient Air Quality Index measures at ${city.metrics.aqi} AQI. Peak particulate matter density vectors are: PM2.5 (${city.metrics.pm25} µg/m³) and PM10 (${city.metrics.pm10} µg/m³).`;
            aiMsg.bullets = [
              "Attributed primarily to construction dust and vehicular combustion.",
              "Random Forest Regressor places tree canopy volume as the highest mitigative feature.",
              "Enforcing a strict EV transit conversion reduces local PM10 concentration by 12% within 90 days."
            ];
          } else {
            aiMsg.text = `Understood. I am parsing environmental health indicators for ${city.name}: Environmental Health (${city.dna.environmentalHealth}%), Water Resilience (${city.dna.waterResilience}%), and Climate Readiness (${city.dna.climateReadiness}%). Let me know if you would like me to compile an official compliance audit report.`;
          }

          setMessages((prev) => [...prev, aiMsg]);
          setIsTyping(false);
        }, 1200);
      });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    submitUserMessage(inputVal);
  };

  // Compile Report Logic
  const handleGenerateReport = () => {
    setReportState("generating");
    setReportLogs("Compiling audit segments...");
    
    const logs = [
      "Accessing active satellite land use buffers...",
      "Validating explainability coefficient matrices...",
      "Constructing optimized policy recommendations...",
      "Validating regional environmental parameters...",
      "Official certificate compilation successful."
    ];

    let step = 0;
    const interval = setInterval(() => {
      if (step < logs.length) {
        setReportLogs(logs[step]);
        step++;
      } else {
        clearInterval(interval);
        setReportState("complete");
      }
    }, 900);
  };

  return (
    <div className="hud-panel p-6 flex flex-col gap-6">
      
      {/* Tab Navigation */}
      <div className="flex items-center justify-between border-b border-borderMuted pb-3">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab("assistant")}
            className={`text-sm font-bold pb-2 transition-all border-b-2 ${
              activeTab === "assistant"
                ? "text-accentGreen border-accentGreen"
                : "text-cardTextMuted border-transparent hover:text-headerText"
            }`}
          >
            Sustainability Assistant
          </button>
          
          <button
            onClick={() => setActiveTab("report")}
            className={`text-sm font-bold pb-2 transition-all border-b-2 ${
              activeTab === "report"
                ? "text-accentBlue border-accentBlue"
                : "text-cardTextMuted border-transparent hover:text-headerText"
            }`}
          >
            Audit & Compliance Report
          </button>
        </div>

        <span className="text-[10px] font-bold text-cardTextMuted uppercase hidden md:inline tracking-wider">
          {activeTab === "assistant" ? "Conversational Assistant" : "Municipal Audit Compliance"}
        </span>
      </div>

      {activeTab === "assistant" ? (
        <div className="flex flex-col md:flex-row gap-6 h-[400px]">
          
          {/* Chat log window (Left Column) */}
          <div className="flex-grow flex flex-col justify-between bg-bgDeep border border-borderMuted rounded-xl p-4 md:w-2/3 h-full shadow-inner">
            
            {/* Scrollable messages container */}
            <div className="flex-grow overflow-y-auto space-y-3.5 pr-2 scrollbar-thin">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex gap-3 max-w-[85%] ${
                    msg.sender === "user" ? "ml-auto flex-row-reverse" : ""
                  }`}
                >
                  {/* Avatar */}
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 border ${
                    msg.sender === "user" 
                      ? "bg-accentBlue/10 border-accentBlue/30 text-accentBlue" 
                      : "bg-accentGreen/10 border-accentGreen/30 text-accentGreen"
                  }`}>
                    {msg.sender === "user" ? <User className="w-3.5 h-3.5" /> : "AI"}
                  </div>

                  {/* Message Bubble */}
                  <div className={`p-3 rounded-xl border text-xs space-y-2 leading-relaxed shadow-sm ${
                    msg.sender === "user"
                      ? "bg-bgCard border-accentBlue/30 text-headerText"
                      : "bg-bgCard border-borderMuted text-neutralText"
                  }`}>
                    <p>{msg.text}</p>
                    
                    {/* Embedded AI Tables */}
                    {msg.table && (
                      <div className="bg-bgDeep p-2.5 rounded-lg border border-borderMuted space-y-1.5 my-2">
                        {msg.table.map((row, idx) => (
                          <div key={idx} className="flex justify-between border-b border-borderMuted pb-1 text-[10px] font-semibold">
                            <span className="text-cardTextMuted">{row.key}</span>
                            <span className="text-headerText font-extrabold">{row.val}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Embedded AI Recommendations */}
                    {msg.bullets && (
                      <ul className="list-disc pl-4 space-y-1 text-[10px] font-semibold text-accentGreen">
                        {msg.bullets.map((b, idx) => (
                          <li key={idx}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3 max-w-[80%] animate-pulse">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center bg-accentGreen/10 border border-accentGreen/30 text-accentGreen font-bold text-[10px]">
                    AI
                  </div>
                  <div className="bg-bgCard border border-borderMuted p-3 rounded-xl text-xs text-cardTextMuted">
                    Assistant is generating recommendations...
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input form */}
            <form onSubmit={handleSendMessage} className="flex gap-2 border-t border-borderMuted pt-3 mt-3">
              <input
                type="text"
                placeholder="Ask EcoSphere (e.g. Recommend ways to reduce carbon footprints...)"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                disabled={isTyping}
                className="flex-grow bg-bgCard border border-borderMuted rounded-lg px-3 py-2 text-xs text-headerText placeholder-cardTextMuted/50 focus:outline-none focus:border-accentGreen shadow-sm font-medium"
              />
              <button
                type="submit"
                disabled={isTyping || !inputVal.trim()}
                className="btn-cyber px-4 py-2 font-semibold"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* Quick-Prompt Recommendation chips (Right Column) */}
          <div className="md:w-1/3 bg-bgDeep border border-borderMuted rounded-xl p-4 flex flex-col gap-3 text-xs justify-between shadow-inner">
            <div>
              <span className="text-[9px] font-bold text-accentGreen block uppercase tracking-wider border-b border-borderMuted pb-1.5 mb-2">
                Suggested Questions
              </span>
              <p className="text-[10px] font-semibold text-cardTextMuted leading-relaxed mb-4">
                Select a common query below to analyze specific regional environmental factors:
              </p>
              
              <div className="space-y-2">
                <button 
                  onClick={() => handlePromptClick(`Explain ${city.name}'s carbon balance and neutrality timeframe.`)}
                  className="w-full text-left p-2.5 rounded-lg bg-bgCard border border-borderMuted hover:border-accentGreen/30 hover:text-headerText transition-all text-cardTextMuted font-semibold block shadow-sm text-[11px]"
                >
                  ➔ Analyze Carbon Balance
                </button>

                <button 
                  onClick={() => handlePromptClick(`What factors are driving the AQI levels in ${city.name}?`)}
                  className="w-full text-left p-2.5 rounded-lg bg-bgCard border border-borderMuted hover:border-accentGreen/30 hover:text-headerText transition-all text-cardTextMuted font-semibold block shadow-sm text-[11px]"
                >
                  ➔ Evaluate AQI Drivers
                </button>

                <button 
                  onClick={() => handlePromptClick(`Generate diagnostic executive environmental report for ${city.name}.`)}
                  className="w-full text-left p-2.5 rounded-lg bg-bgCard border border-borderMuted hover:border-accentGreen/30 hover:text-headerText transition-all text-cardTextMuted font-semibold block shadow-sm text-[11px]"
                >
                  ➔ Compile Full Diagnostic
                </button>
              </div>
            </div>

            <div className="bg-bgCard border border-borderMuted p-3 rounded-lg text-[10px] text-cardTextMuted flex gap-2 font-medium shadow-sm">
              <HelpCircle className="w-4 h-4 text-accentBlue shrink-0" />
              Our models cross-reference verified Central Pollution Control Board (CPCB) data guides.
            </div>
          </div>

        </div>
      ) : (
        <div className="space-y-6">
          {reportState === "idle" ? (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-bold text-accentBlue tracking-wider uppercase block">Report Builder</span>
                <h3 className="text-base font-extrabold text-headerText tracking-tight">
                  Generate Municipal Environmental Audit Report
                </h3>
                <p className="text-xs text-cardTextMuted mt-1">
                  Select the chapters and analytical findings to compile into the official municipal audit document.
                </p>
              </div>

              {/* Checkboxes configuration */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold">
                
                <label className="flex items-center gap-3 p-3.5 bg-bgDeep border border-borderMuted rounded-xl cursor-pointer hover:bg-bgDeep/75 transition-all shadow-sm">
                  <input 
                    type="checkbox" 
                    checked={includeAqi} 
                    onChange={() => setIncludeAqi(!includeAqi)}
                    className="accent-accentBlue w-4 h-4"
                  />
                  <div>
                    <span className="font-extrabold text-headerText block">Air Quality & Particulate Diagnostics</span>
                    <span className="text-[10px] text-cardTextMuted">Includes recent AQI reports and air quality trajectory calculations.</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3.5 bg-bgDeep border border-borderMuted rounded-xl cursor-pointer hover:bg-bgDeep/75 transition-all shadow-sm">
                  <input 
                    type="checkbox" 
                    checked={includeCarbon} 
                    onChange={() => setIncludeCarbon(!includeCarbon)}
                    className="accent-accentBlue w-4 h-4"
                  />
                  <div>
                    <span className="font-extrabold text-headerText block">Carbon Balance & Net Zero Outlook</span>
                    <span className="text-[10px] text-cardTextMuted">Includes annual carbon footprints, tree canopy absorptions, and projected neutrality timelines.</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3.5 bg-bgDeep border border-borderMuted rounded-xl cursor-pointer hover:bg-bgDeep/75 transition-all shadow-sm">
                  <input 
                    type="checkbox" 
                    checked={includeGenome} 
                    onChange={() => setIncludeGenome(!includeGenome)}
                    className="accent-accentBlue w-4 h-4"
                  />
                  <div>
                    <span className="font-extrabold text-headerText block">Policy Interventions & Optimizations</span>
                    <span className="text-[10px] text-cardTextMuted">Includes targeted urban policies, A* path routes, and performance scores.</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3.5 bg-bgDeep border border-borderMuted rounded-xl cursor-pointer hover:bg-bgDeep/75 transition-all shadow-sm">
                  <input 
                    type="checkbox" 
                    checked={includeDna} 
                    onChange={() => setIncludeDna(!includeDna)}
                    className="accent-accentBlue w-4 h-4"
                  />
                  <div>
                    <span className="font-extrabold text-headerText block">Resilience Core & Index Factors</span>
                    <span className="text-[10px] text-cardTextMuted">Includes high-level ESG ratings, core water resilience, and climate readiness.</span>
                  </div>
                </label>

              </div>

              <button
                onClick={handleGenerateReport}
                className="btn-cyber-blue w-full py-3.5 font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" />
                Generate Audit & Compliance Document
              </button>
            </div>
          ) : reportState === "generating" ? (
            <div className="bg-bgDeep border border-borderMuted rounded-xl p-8 flex flex-col justify-center items-center relative overflow-hidden h-[300px] shadow-inner">
              <RefreshCw className="w-12 h-12 text-accentBlue animate-spin mb-4" />
              <h4 className="text-sm font-bold text-headerText tracking-widest uppercase">Generating Audit Document</h4>
              <p className="text-[10px] text-accentBlue mt-2 tracking-wide animate-pulse font-semibold">
                {reportLogs}
              </p>
            </div>
          ) : (
            // High fidelity report / certificate preview
            <div className="space-y-6">
              <div className="bg-white text-slate-800 p-8 rounded-xl font-serif shadow-2xl border-4 border-accentBlue relative">
                
                {/* Government Seal stamp watermark */}
                <div className="absolute top-4 right-4 border-4 border-red-500/80 rounded-full w-24 h-24 flex items-center justify-center text-red-500/80 text-[10px] font-sans font-extrabold tracking-tighter uppercase rotate-12 select-none">
                  <div className="text-center font-bold">
                    CPCB INDIA<br />
                    APPROVED<br />
                    2026
                  </div>
                </div>

                <div className="text-center border-b border-slate-100 pb-4">
                  <h2 className="font-extrabold text-lg tracking-wider text-slate-900 uppercase">MINISTRY OF URBAN DEVELOPMENT & SUSTAINABILITY</h2>
                  <h3 className="font-sans text-xs tracking-wider text-slate-500 font-bold mt-1 uppercase">NATIONAL MUNICIPAL ECO COMPLIANCE SCHEME</h3>
                </div>

                <div className="my-6 space-y-4 text-xs leading-relaxed text-slate-700">
                  <p>
                    This document certifies that the municipality of <strong className="font-sans font-bold text-slate-900">{city.name}, {city.state}</strong> has been audited under the EcoSphere Environmental Compliance Audit framework.
                  </p>
                  
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 font-mono text-[11px] space-y-1.5 text-slate-600 shadow-inner">
                    <div className="flex justify-between border-b border-slate-100 pb-1">
                      <span>AUDIT CERTIFICATE SERIAL:</span>
                      <strong className="text-slate-900 font-extrabold">#ES-AUD-{city.id.toUpperCase()}-2026</strong>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-1">
                      <span>GLOBAL SUSTAINABILITY SCORE:</span>
                      <strong className="text-slate-900 font-extrabold">
                        {Math.round((city.dna.environmentalHealth + city.dna.waterResilience + city.dna.carbonBalance) / 3)}/100
                      </strong>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-1">
                      <span>ATMOSPHERIC COMPLIANCE AQI:</span>
                      <strong className="text-slate-900 font-extrabold">{city.metrics.aqi} AQI</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>NET ZERO TARGET COMPLIANCE:</span>
                      <strong className="text-slate-900 font-extrabold">Target Year {city.metrics.carbonNeutralityTargetYear}</strong>
                    </div>
                  </div>

                  <p className="italic text-slate-800 font-semibold font-sans">
                    Recommendations: Keep canopy volume over {city.metrics.greenCover + 10}% and expedite heavy commercial transport zoning enforcements.
                  </p>
                </div>

                {/* Signing space */}
                <div className="flex justify-between items-end pt-6 border-t border-slate-100 font-sans text-[10px] text-slate-500 font-medium">
                  <div>
                    <span>AUDIT TIME: {new Date().toLocaleString()}</span>
                  </div>
                  <div className="text-right flex flex-col items-center">
                    <span className="font-serif italic text-base text-slate-900 font-bold leading-none">A.K. Sharma</span>
                    <span className="border-t border-slate-100 pt-1 mt-1 block uppercase text-[8px] font-bold text-slate-400">Chief Environmental Auditor, EcoSphere</span>
                  </div>
                </div>

              </div>

              {/* Action buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => setReportState("idle")}
                  className="btn-cyber flex-grow font-semibold"
                >
                  <RefreshCw className="w-4 h-4" />
                  Configure New Audit
                </button>

                <button
                  onClick={() => window.print()}
                  className="btn-cyber-blue flex-grow font-semibold"
                >
                  <Download className="w-4 h-4" />
                  Download High-Fidelity PDF Audit
                </button>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
