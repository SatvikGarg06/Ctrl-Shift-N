"use client"


export function PromptInput({changePrompt,prompt,genrateResponse,addmessage}) {
  
  return (
    <div className="relative" >
      <textarea
        placeholder="Ask me anything..."
        className="min-h-[100px] w-full resize-none rounded-lg border border-gray-800 bg-gray-900/50 p-4 pr-20 text-gray-100 placeholder-gray-400 focus:border-violet-600 focus:outline-none focus:ring-1 focus:ring-violet-600"
        onChange={(e)=>{changePrompt(e.target.value)
        }}
      />
      <div className="absolute bottom-3 right-3 flex items-center gap-2">
        <button className="rounded-lg p-2 text-gray-400 hover:bg-gray-800 hover:text-white">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
            />
          </svg>
          <span className="sr-only">Attach file</span>
        </button>
        <button onClick={()=>{genrateResponse(prompt)
          addmessage(prompt)
          changePrompt('')
          alert('Your website will be generated shortly. Please wait')
        }} className="rounded-lg bg-violet-600 p-2 text-white hover:bg-violet-500">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
          <span className="sr-only" >Send message</span>
        </button>
      </div>
    </div>
  )
} 
