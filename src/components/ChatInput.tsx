import { Send } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSendMessage, disabled }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [message]);

  return (
    <form onSubmit={handleSubmit} className="relative flex items-end gap-2 bg-white border border-brand-900/5 rounded-[1.5rem] p-2 academic-shadow focus-within:border-brand-900/20 transition-all">
      <textarea
        ref={textareaRef}
        rows={1}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="How can I help you today?"
        className="flex-1 bg-transparent border-none focus:ring-0 resize-none py-2 px-3 text-brand-900 placeholder:text-slate-300 text-sm font-light"
        disabled={disabled}
      />
      <button
        type="submit"
        disabled={!message.trim() || disabled}
        className="bg-brand-900 hover:bg-brand-600 disabled:bg-slate-100 disabled:text-slate-300 text-white p-3 rounded-xl transition-all active:scale-95 shrink-0 shadow-lg shadow-brand-900/10"
      >
        <Send size={18} />
      </button>
    </form>
  );
}
