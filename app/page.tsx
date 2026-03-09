'use client';

import Link from "next/link";
import { ArrowRight, CheckCircle, ShieldCheck, Zap, MessageSquare, X } from "lucide-react";
import { useChat } from '@ai-sdk/react';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatSize, setChatSize] = useState({ width: 400, height: 600 });
  const [input, setInput] = useState('');
  const { messages, sendMessage } = useChat();

  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const startW = chatSize.width;
    const startH = chatSize.height;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = startX - moveEvent.clientX;
      const deltaY = startY - moveEvent.clientY;

      const newWidth = Math.max(300, Math.min(startW + deltaX, window.innerWidth - 32));
      const newHeight = Math.max(400, Math.min(startH + deltaY, window.innerHeight - 100));

      setChatSize({ width: newWidth, height: newHeight });
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  return (
    <div className="flex flex-col w-full bg-white dark:bg-gray-950 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative w-full pt-20 pb-32 flex flex-col items-center justify-center text-center px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-emerald-50 dark:from-emerald-900/20 via-white dark:via-gray-950 to-white dark:to-gray-950 -z-10" />

        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6 max-w-4xl">
          Elevate Your Wound Care with{" "}
          <span className="text-emerald-600 dark:text-emerald-500">
            SmartClaimAI
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl leading-relaxed">
          Instantly evaluate wound checklists against the latest clinical
          standards and CMS Medicare LCD guidelines. Secure, rapid, and fiercely
          accurate.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/evaluate"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-md font-semibold text-white bg-emerald-600 rounded-full hover:bg-emerald-700 active:bg-emerald-800 shadow-lg shadow-emerald-500/30 transition-all duration-200"
          >
            Start an Evaluation
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-24 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose SmartClaimAI?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our platform is designed by clinicians and engineers to streamline
              the claim evaluation process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: Zap,
                title: "Instant AI Analysis",
                description:
                  "Drop your clinical notes directly into our wizard. The AI engine processes the data within seconds, immediately flagging discrepancies or missing information.",
              },
              {
                icon: ShieldCheck,
                title: "CMS Compliant",
                description:
                  "Built strictly around CMS Medicare LCD Novitas guidelines for Skin Substitutes and CTPs. Ensure your documentation is watertight before submission.",
              },
              {
                icon: CheckCircle,
                title: "Actionable Feedback",
                description:
                  "Don't just get a pass or fail. Receive precise UI highlighting and clinical reasoning for exactly what requirement was missed.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center mb-6 text-emerald-600 dark:text-emerald-400">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Chat Modal */}
      {isChatOpen && (
        <div 
          style={{ width: chatSize.width, height: chatSize.height }}
          className="fixed bottom-24 right-4 sm:right-6 min-w-[300px] min-h-[400px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-8rem)] bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden transition-opacity duration-300 transform origin-bottom-right"
        >
          {/* Top-Left Resize Handle */}
          <div 
            onMouseDown={handleResizeStart}
            className="absolute top-0 left-0 w-6 h-6 cursor-nwse-resize z-50 flex items-start justify-start p-1.5"
            title="Drag to resize"
          >
            <div className="w-2.5 h-2.5 border-t-2 border-l-2 border-gray-400 dark:border-gray-600 rounded-tl-[2px]" />
          </div>

          <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 pl-8">
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white">SmartClaimAI Assistant</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Ask me anything about wound care evaluation</p>
            </div>
            <button 
              onClick={() => setIsChatOpen(false)}
              className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white dark:bg-gray-950">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 dark:text-gray-400 mt-10">
                <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>Hi! How can I help you today?</p>
              </div>
            )}
            
            {messages.map(message => (
              <div 
                key={message.id} 
                className={`whitespace-pre-wrap p-3 rounded-2xl max-w-[85%] ${
                  message.role === 'user' 
                    ? 'bg-emerald-600 text-white ml-auto rounded-br-sm' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 mr-auto rounded-bl-sm border border-gray-200 dark:border-gray-700'
                }`}
              >
                {message.parts.map((part, i) => {
                  switch (part.type) {
                    case 'text':
                      return (
                        <div key={`${message.id}-${i}`} className="prose dark:prose-invert max-w-none text-sm leading-relaxed prose-pre:bg-gray-900 prose-pre:text-gray-100 dark:prose-pre:bg-black/50 prose-a:text-emerald-600 dark:prose-a:text-emerald-400 break-words">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {part.text}
                          </ReactMarkdown>
                        </div>
                      );
                    case 'tool-weather':
                    case 'tool-convertFahrenheitToCelsius':
                      return (
                        <pre key={`${message.id}-${i}`} className="mt-2 bg-black/10 dark:bg-black/30 p-2 rounded text-xs overflow-x-auto">
                          {JSON.stringify(part, null, 2)}
                        </pre>
                      );
                  }
                })}
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950">
            <form
              className="flex items-center gap-2"
              onSubmit={e => {
                e.preventDefault();
                sendMessage({ text: input });
                setInput('');
              }}
            >
              <input
                className="flex-1 p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white transition-shadow"
                value={input}
                placeholder="Message SmartClaimAI..."
                onChange={e => setInput(e.currentTarget.value)}
              />
              <button 
                type="submit"
                disabled={!input.trim()}
                className="p-3 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Send message"
              >
                <Zap className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Action Button for Chat */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 p-4 bg-emerald-600 text-white rounded-full shadow-lg hover:bg-emerald-700 hover:scale-105 active:scale-95 transition-all duration-200 z-50 group flex items-center justify-center border-4 border-white dark:border-gray-950"
        aria-label="Toggle Chat"
      >
        {isChatOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageSquare className="w-6 h-6" />
        )}
      </button>
    </div>
  );
}
