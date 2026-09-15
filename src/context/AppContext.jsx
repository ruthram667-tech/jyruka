import React, { createContext, useContext, useState } from 'react';
import { INITIAL_CHATS, FREELANCERS } from '../data/mockData';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [userRole, setUserRole] = useState('client'); // 'client' | 'freelancer'
  const [savedFreelancerIds, setSavedFreelancerIds] = useState(['fl-1', 'fl-3']);
  const [savedJobIds, setSavedJobIds] = useState(['job-1']);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [chats, setChats] = useState(INITIAL_CHATS);
  const [activeChatId, setActiveChatId] = useState('chat-1');
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      title: 'Elena Rostova submitted a milestone',
      time: '15m ago',
      read: false,
      type: 'milestone',
    },
    {
      id: 'notif-2',
      title: '3 new proposals on "Web3 DEX Interface"',
      time: '1h ago',
      read: false,
      type: 'proposal',
    },
    {
      id: 'notif-3',
      title: 'Escrow deposit confirmed: $8,500 held safely',
      time: '3h ago',
      read: true,
      type: 'payment',
    },
  ]);

  const toggleSaveFreelancer = (id) => {
    setSavedFreelancerIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleSaveJob = (id) => {
    setSavedJobIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  const sendMessage = (chatId, text) => {
    if (!text.trim()) return;
    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: 'me',
      text,
      time: 'Just now',
    };

    setChats(prev =>
      prev.map(c => {
        if (c.id === chatId) {
          return {
            ...c,
            lastMessage: text,
            lastMessageTime: 'Just now',
            messages: [...c.messages, newMsg],
          };
        }
        return c;
      })
    );

    // Simulated reply after 1.5 seconds
    setTimeout(() => {
      const replies = [
        "Sounds great! I'll update the project repository with these details.",
        "Got it! Let me review this and push an update in our staging branch.",
        "Awesome, thanks for the quick clarification! Working on it right away.",
        "Perfect. I'll make sure the milestone deliverables reflect this.",
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      const replyMsg = {
        id: `msg-${Date.now() + 1}`,
        sender: 'other',
        text: randomReply,
        time: 'Just now',
      };

      setChats(prev =>
        prev.map(c => {
          if (c.id === chatId) {
            return {
              ...c,
              lastMessage: randomReply,
              lastMessageTime: 'Just now',
              messages: [...c.messages, replyMsg],
            };
          }
          return c;
        })
      );
    }, 1500);
  };

  return (
    <AppContext.Provider
      value={{
        userRole,
        setUserRole,
        savedFreelancerIds,
        toggleSaveFreelancer,
        savedJobIds,
        toggleSaveJob,
        searchModalOpen,
        setSearchModalOpen,
        notifications,
        markAllNotificationsRead,
        unreadNotificationsCount,
        chats,
        activeChatId,
        setActiveChatId,
        sendMessage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
