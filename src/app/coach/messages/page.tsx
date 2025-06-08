'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { 
  MagnifyingGlassIcon,
  PlusIcon,
  PaperAirplaneIcon,
  EllipsisVerticalIcon,
  XMarkIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';

interface Message {
  id: string;
  content: string;
  sender: 'coach' | 'athlete';
  timestamp: string;
  read: boolean;
}

interface Conversation {
  id: string;
  athleteName: string;
  athleteInitials: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  messages: Message[];
}

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [showCompose, setShowCompose] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock conversations data
  const conversations: Conversation[] = [
    {
      id: '1',
      athleteName: 'Sarah Johnson',
      athleteInitials: 'SJ',
      lastMessage: 'Thanks for the form correction on deadlifts!',
      timestamp: '2 hours ago',
      unreadCount: 0,
      messages: [
        {
          id: '1',
          content: 'Hey coach! I had a question about my deadlift form. The video you sent was helpful but I\'m still not sure about the hip hinge.',
          sender: 'athlete',
          timestamp: '8:30 AM',
          read: true
        },
        {
          id: '2',
          content: 'Great question! The key is to push your hips back first before bending your knees. Think about reaching back to touch a wall behind you with your glutes. Here\'s a helpful cue: "Hips back, chest proud."',
          sender: 'coach',
          timestamp: '9:15 AM',
          read: true
        },
        {
          id: '3',
          content: 'That makes so much sense! I tried it this morning and felt the difference immediately. Thanks for the form correction on deadlifts!',
          sender: 'athlete',
          timestamp: '2 hours ago',
          read: true
        }
      ]
    },
    {
      id: '2',
      athleteName: 'Mike Wilson',
      athleteInitials: 'MW',
      lastMessage: 'Should I increase the weight or reps first?',
      timestamp: '1 day ago',
      unreadCount: 2,
      messages: [
        {
          id: '4',
          content: 'Coach, I completed this week\'s workout and it felt really good! I think I\'m ready to progress.',
          sender: 'athlete',
          timestamp: 'Yesterday 6:00 PM',
          read: true
        },
        {
          id: '5',
          content: 'Should I increase the weight or reps first?',
          sender: 'athlete',
          timestamp: '1 day ago',
          read: false
        }
      ]
    },
    {
      id: '3',
      athleteName: 'Emily Davis',
      athleteInitials: 'ED',
      lastMessage: 'Perfect! See you at 6 AM sharp 💪',
      timestamp: '3 days ago',
      unreadCount: 0,
      messages: [
        {
          id: '6',
          content: 'Hi! Can we reschedule tomorrow\'s session to 6 AM instead of 7?',
          sender: 'athlete',
          timestamp: '3 days ago',
          read: true
        },
        {
          id: '7',
          content: '6 AM works perfectly! I\'ll have the gym ready.',
          sender: 'coach',
          timestamp: '3 days ago',
          read: true
        },
        {
          id: '8',
          content: 'Perfect! See you at 6 AM sharp 💪',
          sender: 'athlete',
          timestamp: '3 days ago',
          read: true
        }
      ]
    },
    {
      id: '4',
      athleteName: 'James Brown',
      athleteInitials: 'JB',
      lastMessage: 'Any tips for recovery between sessions?',
      timestamp: '1 week ago',
      unreadCount: 1,
      messages: [
        {
          id: '9',
          content: 'Any tips for recovery between sessions?',
          sender: 'athlete',
          timestamp: '1 week ago',
          read: false
        }
      ]
    }
  ];

  const selectedConv = conversations.find(c => c.id === selectedConversation);
  const filteredConversations = conversations.filter(conv => 
    conv.athleteName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;
    
    // In a real app, this would send to the backend
    console.log('Sending message:', newMessage);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <DashboardLayout title="">
      <div className="h-screen bg-gray-50 flex">
        {/* Conversations Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
              <button 
                onClick={() => setShowCompose(true)}
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
              >
                <PlusIcon className="h-5 w-5" />
              </button>
            </div>
            
            {/* Search */}
            <div className="relative">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-all ${
                  selectedConversation === conversation.id ? 'bg-blue-50 border-r-4 border-r-blue-600' : ''
                }`}
                onClick={() => setSelectedConversation(conversation.id)}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">{conversation.athleteInitials}</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {conversation.athleteName}
                      </p>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                        {conversation.unreadCount > 0 && (
                          <span className="bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {conversation.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 truncate mt-1">
                      {conversation.lastMessage}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 flex flex-col">
          {selectedConv ? (
            <>
              {/* Thread Header */}
              <div className="bg-white border-b border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">{selectedConv.athleteInitials}</span>
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">{selectedConv.athleteName}</h2>
                      <p className="text-sm text-gray-500">Active athlete</p>
                    </div>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <EllipsisVerticalIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {selectedConv.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'coach' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                      message.sender === 'coach' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 text-gray-900'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'coach' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="bg-white border-t border-gray-200 p-4">
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                      rows={2}
                    />
                  </div>
                  <button
                    onClick={sendMessage}
                    disabled={!newMessage.trim()}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center"
                  >
                    <PaperAirplaneIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* No Conversation Selected */
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <UserCircleIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a conversation</h3>
                <p className="text-gray-600">Choose a conversation from the sidebar to start messaging your athletes.</p>
              </div>
            </div>
          )}
        </div>

        {/* Compose Modal */}
        {showCompose && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">New Message</h3>
                <button
                  onClick={() => setShowCompose(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>Select an athlete...</option>
                    {conversations.map(conv => (
                      <option key={conv.id} value={conv.id}>{conv.athleteName}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    placeholder="Type your message..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    rows={4}
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowCompose(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
} 