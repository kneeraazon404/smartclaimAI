'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageSquare, X, Zap } from 'lucide-react'
import { useChat } from '@ai-sdk/react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function ChatWidget() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [chatSize, setChatSize] = useState({ width: 400, height: 600 })
  const [input, setInput] = useState('')
  const { messages, sendMessage } = useChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (isChatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isChatOpen])

  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault()
    const startX = e.clientX
    const startY = e.clientY
    const startW = chatSize.width
    const startH = chatSize.height

    const onMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = startX - moveEvent.clientX
      const deltaY = startY - moveEvent.clientY
      setChatSize({
        width: Math.max(300, Math.min(startW + deltaX, window.innerWidth - 32)),
        height: Math.max(400, Math.min(startH + deltaY, window.innerHeight - 100)),
      })
    }

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  return (
    <>
      {isChatOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="SmartClaimAI Assistant"
          style={{ width: chatSize.width, height: chatSize.height }}
          className="fixed bottom-24 right-4 sm:right-6 min-w-[300px] min-h-[400px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-8rem)] bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden transition-opacity duration-300"
        >
          {/* Top-Left Resize Handle */}
          <div
            onMouseDown={handleResizeStart}
            role="separator"
            aria-label="Drag to resize chat"
            className="absolute top-0 left-0 w-6 h-6 cursor-nwse-resize z-50 flex items-start justify-start p-1.5"
          >
            <div className="w-2.5 h-2.5 border-t-2 border-l-2 border-gray-400 dark:border-gray-600 rounded-tl-[2px]" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 pl-8">
            <div>
              <h2 className="font-bold text-gray-900 dark:text-white">SmartClaimAI Assistant</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">Ask me anything about wound care evaluation</p>
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          {/* Messages */}
          <div
            role="log"
            aria-live="polite"
            aria-label="Chat messages"
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-white dark:bg-gray-950"
          >
            {messages.length === 0 && (
              <div className="text-center text-gray-500 dark:text-gray-400 mt-10">
                <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-20" aria-hidden="true" />
                <p>Hi! How can I help you today?</p>
              </div>
            )}

            {messages.map((message) => (
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
                        <div
                          key={`${message.id}-${i}`}
                          className="prose dark:prose-invert max-w-none text-sm leading-relaxed prose-pre:bg-gray-900 prose-pre:text-gray-100 dark:prose-pre:bg-black/50 prose-a:text-emerald-600 dark:prose-a:text-emerald-400 break-words"
                        >
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {part.text}
                          </ReactMarkdown>
                        </div>
                      )
                    default:
                      return null
                  }
                })}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950">
            <form
              className="flex items-center gap-2"
              onSubmit={(e) => {
                e.preventDefault()
                if (input.trim()) {
                  sendMessage({ text: input })
                  setInput('')
                }
              }}
            >
              <label htmlFor="chat-input" className="sr-only">
                Message SmartClaimAI
              </label>
              <input
                id="chat-input"
                className="flex-1 p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white transition-shadow"
                value={input}
                placeholder="Message SmartClaimAI..."
                onChange={(e) => setInput(e.currentTarget.value)}
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="p-3 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                aria-label="Send message"
              >
                <Zap className="w-5 h-5" aria-hidden="true" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 p-4 bg-emerald-600 text-white rounded-full shadow-lg hover:bg-emerald-700 hover:scale-105 active:scale-95 transition-all duration-200 z-50 flex items-center justify-center border-4 border-white dark:border-gray-950 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        aria-label={isChatOpen ? 'Close chat' : 'Open chat'}
        aria-expanded={isChatOpen}
      >
        {isChatOpen ? (
          <X className="w-6 h-6" aria-hidden="true" />
        ) : (
          <MessageSquare className="w-6 h-6" aria-hidden="true" />
        )}
      </button>
    </>
  )
}
