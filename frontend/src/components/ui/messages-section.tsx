"use client"










import { useEffect, useRef, useState } from "react"

interface Message {
  id: number
  role: "user" | "assistant"
  content: string
}

// Example messages - in a real app these would come from your chat state/API

export function MessagesSection({prompt}) {
  const [messages,addMessage]= useState([
  
    {
      id: 2,
      role: "assistant",
      content: "I'll help you create a modern landing page. What's your startup about?",
    },
    {
      id: 3,
      role: "user",
      content: "It's an AI-powered productivity tool",
    },
  ])
  const AddMessage=(prompt)=>{
    const obj={id:4,role:"user",content:"prompt"}
    addMessage((prevValue)=>{return [...prevValue,obj]})
  }
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [])

  return (
    <div ref={scrollRef} className="h-[400px] overflow-y-auto rounded-lg border border-gray-800 bg-gray-900/50 p-4">
      <div className="space-y-4" style={{color:"white"}}>
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}>
            <div
              className={`rounded-lg px-4 py-2 max-w-[80%] ${
                message.role === "assistant" ? "bg-gray-800" : "bg-violet-600 text-white"
              }`}
            >
              <p className="text-sm">{message.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

