import { motion } from 'motion/react';
import { User, Bot, ThumbsUp, ThumbsDown } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import ReactMarkdown from 'react-markdown';
import { useState } from 'react';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface MessageBubbleProps {
  message: string;
  isUser: boolean;
  onFeedback?: (rating: 'up' | 'down') => void;
}

export default function MessageBubble({ message, isUser, onFeedback }: MessageBubbleProps) {
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);

  const handleFeedback = (rating: 'up' | 'down') => {
    if (feedback === rating) {
      setFeedback(null);
    } else {
      setFeedback(rating);
      onFeedback?.(rating);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex w-full gap-4 mb-4",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      <div className={cn(
        "w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 shadow-sm",
        isUser ? "bg-accent-600 text-white" : "bg-brand-900 text-white"
      )}>
        {isUser ? <User size={16} className="sm:w-5 sm:h-5" /> : <Bot size={16} className="sm:w-5 sm:h-5" />}
      </div>
      
      <div className={cn(
        "flex flex-col gap-3 max-w-[90%] sm:max-w-[85%]",
        isUser ? "items-end" : "items-start"
      )}>
        <div className={cn(
          "px-4 py-2 rounded-[1.5rem] text-sm leading-relaxed academic-shadow",
          isUser 
            ? "bg-brand-900 text-white rounded-tr-none" 
            : "bg-white border border-brand-900/5 text-slate-700 rounded-tl-none"
        )}>
          <div className={cn(
            "markdown-content",
            isUser ? "text-white" : "text-slate-700 font-light"
          )}>
            <ReactMarkdown
              components={{
                p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
                ul: ({ children }) => <ul className="list-disc ml-5 mb-2 space-y-1">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal ml-5 mb-2 space-y-1">{children}</ol>,
                li: ({ children }) => <li>{children}</li>,
                strong: ({ children }) => <strong className="font-bold text-brand-900">{children}</strong>,
              }}
            >
              {message}
            </ReactMarkdown>
          </div>
        </div>

        {!isUser && (
          <div className="flex items-center gap-4 ml-2">
            <button 
              onClick={() => handleFeedback('up')}
              className={cn(
                "p-2 rounded-xl transition-all",
                feedback === 'up' ? "bg-brand-900 text-white" : "text-slate-300 hover:text-brand-900 hover:bg-brand-900/5"
              )}
              title="Helpful"
            >
              <ThumbsUp size={14} />
            </button>
            <button 
              onClick={() => handleFeedback('down')}
              className={cn(
                "p-2 rounded-xl transition-all",
                feedback === 'down' ? "bg-red-500 text-white" : "text-slate-300 hover:text-red-500 hover:bg-red-50"
              )}
              title="Not helpful"
            >
              <ThumbsDown size={14} />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
