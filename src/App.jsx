import React, { useState, useEffect } from 'react';
import KivexToolbar from './components/KivexToolbar';
import DentalWebsite from './DentalWebsite';

export default function App() {
  // Determine if running inside the preview iframe or as a standalone website
  const [isEmbedded, setIsEmbedded] = useState(false);
  const [activeMode, setActiveMode] = useState('fullscreen');
  const [isToolbarVisible, setIsToolbarVisible] = useState(true);

  useEffect(() => {
    const isFrame = window.self !== window.top;
    const urlParams = new URLSearchParams(window.location.search);
    const hasEmbeddedParam = urlParams.get('embedded') === '1';

    if (isFrame || hasEmbeddedParam) {
      setIsEmbedded(true);
    }
  }, []);

  // When embedded inside the iframe, render strictly the target Dental Website
  if (isEmbedded) {
    return <DentalWebsite />;
  }

  // Standalone top window: Render KIVEX Preview Application Wrapper
  return (
    <div className="relative w-full h-screen flex flex-col overflow-hidden bg-[#0F172A] font-sans">
      {/* KIVEX Preview Toolbar */}
      {isToolbarVisible && (
        <KivexToolbar
          activeMode={activeMode}
          onModeChange={(mode) => setActiveMode(mode)}
          onCloseToolbar={() => setIsToolbarVisible(false)}
        />
      )}

      {/* Floating KIVEX Reopen Control when toolbar is hidden */}
      {!isToolbarVisible && (
        <button
          onClick={() => setIsToolbarVisible(true)}
          title="Reopen KIVEX Technology preview toolbar"
          aria-label="Reopen KIVEX Technology preview toolbar"
          className="fixed bottom-5 right-5 z-[9999] flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#F5EFE5] text-[#2D5FC7] border-2 border-[#2D5FC7] shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer group"
        >
          <div className="w-5 h-5 rounded-full bg-[#2D5FC7] text-[#E8B62A] flex items-center justify-center font-black text-xs">
            K
          </div>
          <span className="font-extrabold text-xs tracking-wider text-[#2D5FC7]">
            KIVEX <span className="font-semibold text-[#E8B62A]">Preview</span>
          </span>
        </button>
      )}

      {/* Preview Workspace Area */}
      <div className={`relative flex-1 w-full overflow-auto flex items-center justify-center ${
        activeMode === 'fullscreen' ? 'bg-[#F8FAFC]' : 'bg-[#0B132B] p-2 sm:p-6'
      }`}>
        {/* Real Viewport Device Presentation */}
        {activeMode === 'phone' && (
          <div className="relative w-[390px] h-[820px] max-h-[96vh] rounded-[44px] border-[10px] border-slate-900 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] overflow-hidden bg-black flex flex-col animate-in fade-in zoom-in-95 duration-200">
            {/* Top Phone Notch / Dynamic Pill */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-900 rounded-b-xl z-30 pointer-events-none flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-slate-800/80 mr-2" />
              <div className="w-8 h-1.5 rounded-full bg-slate-800/60" />
            </div>

            {/* Iframe providing genuine 390px mobile viewport */}
            <iframe
              src="/?embedded=1"
              title="KIVEX Phone Viewport (390px)"
              className="w-full h-full border-0 bg-white"
            />
          </div>
        )}

        {activeMode === 'tablet' && (
          <div className="relative w-[768px] h-[940px] max-h-[96vh] rounded-[32px] border-[12px] border-slate-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] overflow-hidden bg-black flex flex-col animate-in fade-in zoom-in-95 duration-200">
            {/* Front Camera Dot */}
            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-slate-700 z-30 pointer-events-none" />

            {/* Iframe providing genuine 768px tablet viewport */}
            <iframe
              src="/?embedded=1"
              title="KIVEX Tablet Viewport (768px)"
              className="w-full h-full border-0 bg-white"
            />
          </div>
        )}

        {activeMode === 'pc' && (
          <div className="relative w-full max-w-[1280px] h-[840px] max-h-[96vh] rounded-2xl border border-slate-700 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] overflow-hidden bg-white flex flex-col animate-in fade-in zoom-in-95 duration-200">
            {/* Desktop Mock Browser Header */}
            <div className="h-9 bg-slate-100 border-b border-slate-200 px-4 flex items-center justify-between select-none">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              </div>
              <div className="px-5 py-0.5 rounded-md bg-white border border-slate-200 text-[11px] font-mono text-slate-500 max-w-xs truncate">
                https://dentalcare-clinic-demo.com/
              </div>
              <div className="w-10" />
            </div>

            {/* Iframe providing genuine 1280px desktop viewport */}
            <iframe
              src="/?embedded=1"
              title="KIVEX PC Viewport (1280px)"
              className="w-full flex-1 border-0 bg-white"
            />
          </div>
        )}

        {activeMode === 'fullscreen' && (
          <div className="w-full h-full">
            {/* Natural Viewport without artificial device frame */}
            <iframe
              src="/?embedded=1"
              title="KIVEX Fullscreen Viewport (100%)"
              className="w-full h-full border-0 bg-white"
            />
          </div>
        )}
      </div>
    </div>
  );
}
