import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Send } from "lucide-react";
import { format } from "date-fns";

// Types
interface User {
  id: string;
  name: string;
  imageUrl: string;
}

interface Message {
  id: string;
  content: string;
  createdAt: string;
  isRead: boolean;
  senderId: string;
  receiverId: string;
  sender?: User;
  receiver?: User;
}

interface Conversation {
  id: string;
  participants: User[];
  lastMessage: Message;
  unreadCount: number;
}

export default function MessagesList() {
  const { isAuthenticated, token } = useAuth();
  const navigate = useNavigate();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Mock user data
  const mockCurrentUser: User = {
    id: "user1",
    name: "Alex Turner",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
  };

  // Mock data for development
  const mockConversations: Conversation[] = [
    {
      id: "conv1",
      participants: [
        mockCurrentUser,
        {
          id: "user2",
          name: "James Wilson",
          imageUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61"
        }
      ],
      lastMessage: {
        id: "msg1",
        content: "Hey, I'm interested in your Fender Stratocaster. Is it still available?",
        createdAt: "2023-11-20T14:30:00Z",
        isRead: false,
        senderId: "user2",
        receiverId: "user1"
      },
      unreadCount: 2
    },
    {
      id: "conv2",
      participants: [
        mockCurrentUser,
        {
          id: "user3",
          name: "Rhythm Room Owner",
          imageUrl: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79"
        }
      ],
      lastMessage: {
        id: "msg2",
        content: "Your booking for November 25th has been confirmed. We look forward to having you!",
        createdAt: "2023-11-18T09:15:00Z",
        isRead: true,
        senderId: "user3",
        receiverId: "user1"
      },
      unreadCount: 0
    },
    {
      id: "conv3",
      participants: [
        mockCurrentUser,
        {
          id: "user4",
          name: "Sarah Williams",
          imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
        }
      ],
      lastMessage: {
        id: "msg3",
        content: "Thanks for signing up for the Piano Masterclass! Please arrive 15 minutes early to get settled.",
        createdAt: "2023-11-17T16:45:00Z",
        isRead: true,
        senderId: "user4",
        receiverId: "user1"
      },
      unreadCount: 0
    }
  ];

  const mockMessages: Record<string, Message[]> = {
    conv1: [
      {
        id: "msg1-1",
        content: "Hi there! I saw your listing for the Fender Stratocaster and I'm very interested.",
        createdAt: "2023-11-20T14:25:00Z",
        isRead: true,
        senderId: "user2",
        receiverId: "user1"
      },
      {
        id: "msg1-2",
        content: "Is it still available? And would you be open to some negotiation on the price?",
        createdAt: "2023-11-20T14:30:00Z",
        isRead: false,
        senderId: "user2",
        receiverId: "user1"
      },
      {
        id: "msg1-3",
        content: "Also, I'm curious about the condition of the fretboard and if it comes with any accessories.",
        createdAt: "2023-11-20T14:32:00Z",
        isRead: false,
        senderId: "user2",
        receiverId: "user1"
      }
    ],
    conv2: [
      {
        id: "msg2-1",
        content: "Hi, I'd like to book your Rhythm Room for my band practice on November 25th from 6-9PM.",
        createdAt: "2023-11-18T08:45:00Z",
        isRead: true,
        senderId: "user1",
        receiverId: "user3"
      },
      {
        id: "msg2-2",
        content: "That time slot is available! Would you like me to reserve it for you?",
        createdAt: "2023-11-18T09:00:00Z",
        isRead: true,
        senderId: "user3",
        receiverId: "user1"
      },
      {
        id: "msg2-3",
        content: "Yes please, that would be great!",
        createdAt: "2023-11-18T09:05:00Z",
        isRead: true,
        senderId: "user1",
        receiverId: "user3"
      },
      {
        id: "msg2-4",
        content: "Your booking for November 25th has been confirmed. We look forward to having you!",
        createdAt: "2023-11-18T09:15:00Z",
        isRead: true,
        senderId: "user3",
        receiverId: "user1"
      }
    ],
    conv3: [
      {
        id: "msg3-1",
        content: "Welcome to the Piano Masterclass! I'm excited to have you join us.",
        createdAt: "2023-11-17T16:30:00Z",
        isRead: true,
        senderId: "user4",
        receiverId: "user1"
      },
      {
        id: "msg3-2",
        content: "Thank you! I'm looking forward to it. Should I bring anything specific to the class?",
        createdAt: "2023-11-17T16:35:00Z",
        isRead: true,
        senderId: "user1",
        receiverId: "user4"
      },
      {
        id: "msg3-3",
        content: "Just your enthusiasm! All materials will be provided. We have keyboards for everyone.",
        createdAt: "2023-11-17T16:40:00Z",
        isRead: true,
        senderId: "user4",
        receiverId: "user1"
      },
      {
        id: "msg3-4",
        content: "Thanks for signing up for the Piano Masterclass! Please arrive 15 minutes early to get settled.",
        createdAt: "2023-11-17T16:45:00Z",
        isRead: true,
        senderId: "user4",
        receiverId: "user1"
      }
    ]
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: "/messages" } });
      return;
    }

    const fetchConversations = async () => {
      setLoading(true);
      try {
        // In a real app, we would fetch from the API
        // const response = await fetch(`${import.meta.env.VITE_API_URL}/messages/conversations`, {
        //   headers: { Authorization: `Bearer ${token}` },
        // });
        // const data = await response.json();
        // setConversations(data);
        
        // Using mock data for now
        setTimeout(() => {
          setConversations(mockConversations);
          setLoading(false);
          
          // Set first conversation as active by default
          if (mockConversations.length > 0) {
            setActiveConversation(mockConversations[0].id);
            setMessages(mockMessages[mockConversations[0].id]);
          }
        }, 500);
      } catch (error) {
        console.error("Error fetching conversations:", error);
        setError("Failed to load conversations. Please try again later.");
        setLoading(false);
      }
    };

    fetchConversations();
  }, [isAuthenticated, navigate, token]);

  const handleSendMessage = () => {
    if (!activeConversation || !newMessage.trim()) return;

    const message: Message = {
      id: `new-${Date.now()}`,
      content: newMessage,
      createdAt: new Date().toISOString(),
      isRead: true,
      senderId: mockCurrentUser.id,
      receiverId: getOtherParticipant(activeConversation).id
    };

    // Add message to current conversation
    setMessages((current) => [...current, message]);

    // Update last message in conversation list
    setConversations((current) =>
      current.map((conv) =>
        conv.id === activeConversation
          ? { ...conv, lastMessage: message }
          : conv
      )
    );

    // Clear input
    setNewMessage("");
  };

  const selectConversation = (conversationId: string) => {
    setActiveConversation(conversationId);
    setMessages(mockMessages[conversationId]);
    
    // Mark messages as read
    const updatedMessages = mockMessages[conversationId].map((msg) => ({
      ...msg,
      isRead: true
    }));
    mockMessages[conversationId] = updatedMessages;
    
    // Update unread count
    setConversations((current) =>
      current.map((conv) =>
        conv.id === conversationId
          ? { ...conv, unreadCount: 0 }
          : conv
      )
    );
  };

  const getOtherParticipant = (conversationId: string): User => {
    const conversation = conversations.find((c) => c.id === conversationId);
    if (!conversation) return { id: "", name: "", imageUrl: "" };
    
    return conversation.participants.find((p) => p.id !== mockCurrentUser.id) || 
      { id: "", name: "", imageUrl: "" };
  };

  const filteredConversations = searchTerm
    ? conversations.filter((conv) =>
        getOtherParticipant(conv.id).name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        conv.lastMessage.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : conversations;

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-center">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
          <p className="mt-2 text-gray-600">
            Communicate with venue owners, instructors, and marketplace sellers
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
            <TabsTrigger value="venues">Venues</TabsTrigger>
            <TabsTrigger value="schools">Schools</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <Card className="shadow-none">
              <div className="grid grid-cols-1 lg:grid-cols-3 h-[70vh]">
                {/* Conversations List */}
                <div className="border-r border-gray-200 h-full">
                  <CardHeader className="px-4 py-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search conversations..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </CardHeader>
                  <div className="overflow-y-auto h-[calc(70vh-5rem)]">
                    {filteredConversations.length === 0 ? (
                      <div className="px-4 py-10 text-center text-gray-500">
                        {searchTerm
                          ? "No conversations match your search"
                          : "No conversations yet"}
                      </div>
                    ) : (
                      filteredConversations.map((conversation) => {
                        const otherUser = getOtherParticipant(conversation.id);
                        const isActive = activeConversation === conversation.id;
                        return (
                          <div
                            key={conversation.id}
                            className={`px-4 py-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                              isActive ? "bg-blue-50" : ""
                            }`}
                            onClick={() => selectConversation(conversation.id)}
                          >
                            <div className="flex items-center">
                              <Avatar className="h-10 w-10 mr-3">
                                <AvatarImage src={otherUser.imageUrl} alt={otherUser.name} />
                                <AvatarFallback>{otherUser.name[0]}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <p className="text-sm font-medium truncate">
                                    {otherUser.name}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {format(new Date(conversation.lastMessage.createdAt), "p")}
                                  </p>
                                </div>
                                <p
                                  className={`text-xs truncate mt-1 ${
                                    conversation.unreadCount > 0 ? "font-semibold" : "text-gray-500"
                                  }`}
                                >
                                  {conversation.lastMessage.content}
                                </p>
                              </div>
                              {conversation.unreadCount > 0 && (
                                <Badge className="ml-2">{conversation.unreadCount}</Badge>
                              )}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
                
                {/* Messages Area */}
                <div className="lg:col-span-2 h-full flex flex-col">
                  {activeConversation ? (
                    <>
                      <CardHeader className="border-b border-gray-200 px-6 py-4">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage 
                              src={getOtherParticipant(activeConversation).imageUrl} 
                              alt={getOtherParticipant(activeConversation).name} 
                            />
                            <AvatarFallback>
                              {getOtherParticipant(activeConversation).name[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">
                              {getOtherParticipant(activeConversation).name}
                            </CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                        {messages.map((message) => {
                          const isCurrentUser = message.senderId === mockCurrentUser.id;
                          return (
                            <div
                              key={message.id}
                              className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} mb-4`}
                            >
                              <div
                                className={`max-w-[75%] px-4 py-2 rounded-lg ${
                                  isCurrentUser
                                    ? "bg-blue-600 text-white"
                                    : "bg-white border border-gray-200"
                                }`}
                              >
                                <p className="text-sm">{message.content}</p>
                                <p
                                  className={`text-xs mt-1 ${
                                    isCurrentUser ? "text-blue-100" : "text-gray-500"
                                  }`}
                                >
                                  {format(new Date(message.createdAt), "p")}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      
                      <CardContent className="border-t border-gray-200 p-4">
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleSendMessage();
                          }}
                          className="flex space-x-2"
                        >
                          <Input
                            placeholder="Type a message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                          />
                          <Button type="submit" disabled={!newMessage.trim()}>
                            <Send className="h-4 w-4 mr-2" />
                            Send
                          </Button>
                        </form>
                      </CardContent>
                    </>
                  ) : (
                    <div className="flex-1 flex items-center justify-center bg-gray-50">
                      <div className="text-center">
                        <h3 className="text-lg font-medium text-gray-900 mb-1">
                          Select a conversation
                        </h3>
                        <p className="text-gray-500">
                          Choose a conversation from the list to start messaging
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </TabsContent>
          
          {/* These tabs would have filtered content in a real app */}
          <TabsContent value="marketplace">
            <Card className="shadow-none">
              <CardHeader>
                <CardTitle>Marketplace Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  This tab would show only your marketplace-related conversations.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="venues">
            <Card className="shadow-none">
              <CardHeader>
                <CardTitle>Venue Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  This tab would show only your jam pad and studio-related conversations.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="schools">
            <Card className="shadow-none">
              <CardHeader>
                <CardTitle>Music School Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  This tab would show only your music school and instructor-related conversations.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}