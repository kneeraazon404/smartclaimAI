'use client'

import dynamic from 'next/dynamic'

// Lazy-load ChatWidget (and its heavy deps: react-markdown, remark-gfm, @ai-sdk/react)
// ssr: false is valid here because this is a Client Component.
const ChatWidget = dynamic(() => import('./ChatWidget'), { ssr: false })

export default function ChatWidgetLoader() {
  return <ChatWidget />
}
