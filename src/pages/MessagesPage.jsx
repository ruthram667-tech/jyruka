import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Send,
  Paperclip,
  Search,
  MoreVertical,
  CheckCheck,
  ArrowLeft,
  Circle,
  ExternalLink,
} from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import { useApp } from '../context/AppContext';

export default function MessagesPage() {
  const { chats, activeChatId, setActiveChatId, sendMessage } = useApp();
  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileThreadOpen, setMobileThreadOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const activeChat = chats.find((c) => c.id === activeChatId) || chats[0];

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(activeChat.id, inputText);
    setInputText('');
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat?.messages]);

  const filteredChats = chats.filter((c) =>
    c.participant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageTransition className="p-4 sm:p-6 max-w-7xl mx-auto h-[calc(100vh-5rem)]">
      <div className="h-full rounded-3xl overflow-hidden bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border shadow-xl grid grid-cols-1 md:grid-cols-12">
        {/* Left Pane: Conversation List */}
        <div
          className={`h-full border-r border-slate-200 dark:border-dark-border flex flex-col md:col-span-5 lg:col-span-4 ${
            mobileThreadOpen ? 'hidden md:flex' : 'flex'
          }`}
        >
          {/* Header & Search */}
          <div className="p-4 border-b border-slate-100 dark:border-dark-border space-y-3">
            <h2 className="font-extrabold text-lg text-slate-900 dark:text-white">
              Direct Messages
            </h2>
            <div className="relative">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search conversations..."
                className="w-full pl-9 pr-3 py-2 bg-slate-100 dark:bg-dark-surface rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 border border-slate-200/60 dark:border-dark-border focus:outline-none"
              />
            </div>
          </div>

          {/* Conversation Items */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-dark-border">
            {filteredChats.map((c) => {
              const isActive = c.id === activeChat.id;
              return (
                <div
                  key={c.id}
                  onClick={() => {
                    setActiveChatId(c.id);
                    setMobileThreadOpen(true);
                  }}
                  className={`p-4 flex items-start gap-3.5 cursor-pointer transition-colors ${
                    isActive
                      ? 'bg-brand-50/60 dark:bg-brand-950/30'
                      : 'hover:bg-slate-50 dark:hover:bg-dark-surface/50'
                  }`}
                >
                  <div className="relative shrink-0">
                    <img
                      src={c.participant.avatar}
                      alt={c.participant.name}
                      className="w-11 h-11 rounded-full object-cover"
                    />
                    {c.participant.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-dark-card rounded-full" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <h4 className="font-bold text-xs text-slate-900 dark:text-white truncate">
                        {c.participant.name}
                      </h4>
                      <span className="text-[10px] text-slate-400 shrink-0">
                        {c.lastMessageTime}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-dark-muted truncate">
                      {c.lastMessage}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Pane: Active Chat Thread */}
        <div
          className={`h-full flex flex-col md:col-span-7 lg:col-span-8 ${
            !mobileThreadOpen ? 'hidden md:flex' : 'flex'
          }`}
        >
          {/* Thread Header */}
          <div className="p-4 border-b border-slate-100 dark:border-dark-border flex items-center justify-between bg-slate-50/50 dark:bg-dark-card/50">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileThreadOpen(false)}
                className="md:hidden p-1.5 text-slate-400 hover:text-slate-700"
              >
                <ArrowLeft size={18} />
              </button>

              <div className="relative">
                <img
                  src={activeChat.participant.avatar}
                  alt={activeChat.participant.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                {activeChat.participant.online && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-dark-card rounded-full" />
                )}
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    {activeChat.participant.name}
                  </h3>
                  <Link
                    to={`/freelancer/${activeChat.participant.id}`}
                    title="View Profile"
                    className="text-slate-400 hover:text-brand-500"
                  >
                    <ExternalLink size={13} />
                  </Link>
                </div>
                <div className="text-[11px] text-slate-400">
                  {activeChat.participant.role} •{' '}
                  <span className="text-emerald-500 font-medium">Online</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to={`/freelancer/${activeChat.participant.id}`}
                className="hidden sm:inline-flex px-3 py-1.5 rounded-xl border border-slate-200 dark:border-dark-border text-xs font-semibold hover:bg-slate-100 dark:hover:bg-dark-surface transition-colors"
              >
                View Profile
              </Link>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/30 dark:bg-[#070a12]/30">
            {activeChat.messages.map((m) => {
              const isMe = m.sender === 'me';
              return (
                <div
                  key={m.id}
                  className={`flex items-end gap-2.5 ${isMe ? 'justify-end' : 'justify-start'}`}
                >
                  {!isMe && (
                    <img
                      src={activeChat.participant.avatar}
                      alt="Avatar"
                      className="w-7 h-7 rounded-full object-cover mb-1"
                    />
                  )}

                  <div
                    className={`max-w-xs sm:max-w-md px-4 py-3 rounded-2xl text-xs leading-relaxed shadow-sm ${
                      isMe
                        ? 'bg-brand-500 text-white rounded-br-xs'
                        : 'bg-white dark:bg-dark-surface text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-dark-border rounded-bl-xs'
                    }`}
                  >
                    <p>{m.text}</p>
                    <span
                      className={`text-[9px] block text-right mt-1 ${
                        isMe ? 'text-brand-100' : 'text-slate-400'
                      }`}
                    >
                      {m.time}
                    </span>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <form
            onSubmit={handleSend}
            className="p-3 sm:p-4 border-t border-slate-100 dark:border-dark-border flex items-center gap-2 bg-white dark:bg-dark-card"
          >
            <button
              type="button"
              className="p-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-dark-surface rounded-xl transition-colors"
              title="Attach files"
            >
              <Paperclip size={18} />
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message to Elena... (Press Enter to send)"
              className="flex-1 px-4 py-2.5 bg-slate-100 dark:bg-dark-surface rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-brand-500"
            />

            <button
              type="submit"
              className="p-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl shadow-md transition-colors"
              title="Send Message"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </PageTransition>
  );
}
