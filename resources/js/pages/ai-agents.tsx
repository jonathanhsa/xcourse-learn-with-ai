import { Head } from '@inertiajs/react';
import {
    Bot,
    User,
    FileText,
    ImageIcon,
    Plus,
    MessageSquare,
    Trash2,
    Menu,
    X,
} from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { PromptInputBox } from '@/components/ui/ai-prompt-box';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';
import { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { animate } from '@/lib/anime';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'AI Agents',
        href: '/ai-agents',
    },
];

interface Message {
    id: string;
    role: 'user' | 'model';
    content: string;
    files?: { name: string; type: string }[];
}

interface ChatSession {
    id: string;
    title: string;
    interactionId?: string;
    updatedAt: number;
    messages: Message[];
}

function ChatMessage({ msg }: { msg: Message }) {
    const elRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (elRef.current) {
            animate(elRef.current, {
                opacity: [0, 1],
                translateY: [24, 0],
                scale: [0.95, 1],
                duration: 450,
                ease: 'outCubic',
            });
        }
    }, []);

    const isUser = msg.role === 'user';

    return (
        <div
            ref={elRef}
            className={`mb-6 flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}
        >
            <div
                className={`flex max-w-[85%] gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
                {/* Avatar */}
                <div
                    className={`mt-1 flex size-8 shrink-0 items-center justify-center rounded-full ${isUser ? 'bg-primary/10' : 'border border-primary/20 bg-primary/10 shadow-sm'}`}
                >
                    {isUser ? (
                        <User className="size-4 text-primary" />
                    ) : (
                        <Bot className="size-4 text-primary" />
                    )}
                </div>

                {/* Bubble Content Container */}
                <div
                    className={`flex flex-col gap-1.5 ${isUser ? 'items-end' : 'items-start'} max-w-full overflow-hidden`}
                >
                    {/* Files Preview */}
                    {msg.files && msg.files.length > 0 && (
                        <div
                            className={`mb-1 flex flex-wrap gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}
                        >
                            {msg.files.map((f, i) => (
                                <div
                                    key={i}
                                    className="flex max-w-[240px] items-center gap-3 rounded-xl border border-border/60 bg-secondary/80 px-3 py-2 text-sm text-secondary-foreground shadow-sm backdrop-blur-sm"
                                >
                                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-background/50">
                                        {f.type.startsWith('image/') ? (
                                            <ImageIcon className="size-4 text-blue-500" />
                                        ) : (
                                            <FileText className="size-4 text-red-500" />
                                        )}
                                    </div>
                                    <div className="flex flex-col overflow-hidden">
                                        <span className="truncate text-xs font-medium">
                                            {f.name}
                                        </span>
                                        <span className="text-[10px] text-muted-foreground uppercase">
                                            {f.type.split('/')[1] || 'FILE'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Bubble */}
                    {msg.content && (
                        <div
                            className={`rounded-2xl px-5 py-3.5 leading-relaxed whitespace-pre-wrap shadow-sm ${
                                isUser
                                    ? 'rounded-tr-sm bg-primary text-primary-foreground'
                                    : 'rounded-tl-sm border border-border/60 bg-white text-foreground'
                            }`}
                        >
                            {msg.content}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// Initialize the Google Gen AI client with the key from Vite env
const aiClient = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export default function AiAgents() {
    const [sessions, setSessions] = useState<ChatSession[]>([]);
    const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [interactionId, setInteractionId] = useState<string | undefined>(
        undefined,
    );
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    // Load sessions from local storage on mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedSessions = localStorage.getItem('ai-chat-sessions');
            if (storedSessions) {
                try {
                    const parsed = JSON.parse(storedSessions) as ChatSession[];
                    // Sort by updatedAt descending
                    parsed.sort((a, b) => b.updatedAt - a.updatedAt);
                    setSessions(parsed);

                    // Set the most recent session as active if exists
                    if (parsed.length > 0) {
                        setActiveSessionId(parsed[0].id);
                        setMessages(parsed[0].messages || []);
                        setInteractionId(parsed[0].interactionId);
                    }
                } catch (e) {
                    console.error('Failed to parse sessions', e);
                }
            }

            // Check for pending AI query from other pages
            const pendingQuery = localStorage.getItem('ai-pending-query');
            if (pendingQuery) {
                localStorage.removeItem('ai-pending-query');
                setTimeout(() => {
                    handleNewChat();
                    // Small delay to allow state reset before sending
                    setTimeout(() => {
                        handleSendMessage(pendingQuery);
                    }, 50);
                }, 100);
            }
        }
    }, []);

    const saveSession = (
        sessionId: string,
        newMessages: Message[],
        newInteractionId?: string,
    ) => {
        setSessions((prev) => {
            const existingSessionIndex = prev.findIndex(
                (s) => s.id === sessionId,
            );
            let updatedSessions = [...prev];

            const firstUserMessage =
                newMessages.find((m) => m.role === 'user')?.content || '';
            const generatedTitle = firstUserMessage
                ? firstUserMessage.slice(0, 30) +
                  (firstUserMessage.length > 30 ? '...' : '')
                : 'New Chat';

            if (existingSessionIndex >= 0) {
                updatedSessions[existingSessionIndex] = {
                    ...updatedSessions[existingSessionIndex],
                    messages: newMessages,
                    interactionId: newInteractionId,
                    updatedAt: Date.now(),
                    // Update title if it was default
                    title:
                        updatedSessions[existingSessionIndex].title ===
                            'New Chat' && generatedTitle !== 'New Chat'
                            ? generatedTitle
                            : updatedSessions[existingSessionIndex].title,
                };
            } else {
                updatedSessions.push({
                    id: sessionId,
                    title: generatedTitle,
                    interactionId: newInteractionId,
                    updatedAt: Date.now(),
                    messages: newMessages,
                });
            }

            // Re-sort
            const sorted = updatedSessions.sort(
                (a, b) => b.updatedAt - a.updatedAt,
            );
            if (typeof window !== 'undefined') {
                localStorage.setItem(
                    'ai-chat-sessions',
                    JSON.stringify(sorted),
                );
            }
            return sorted;
        });
    };

    const handleNewChat = () => {
        setActiveSessionId(null);
        setMessages([]);
        setInteractionId(undefined);
        if (window.innerWidth < 768) {
            setIsSidebarOpen(false);
        }
    };

    const handleDeleteSession = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setSessions((prev) => {
            const updated = prev.filter((s) => s.id !== id);
            if (typeof window !== 'undefined') {
                localStorage.setItem(
                    'ai-chat-sessions',
                    JSON.stringify(updated),
                );
            }
            if (activeSessionId === id) {
                if (updated.length > 0) {
                    setActiveSessionId(updated[0].id);
                    setMessages(updated[0].messages);
                    setInteractionId(updated[0].interactionId);
                } else {
                    setActiveSessionId(null);
                    setMessages([]);
                    setInteractionId(undefined);
                }
            }
            return updated;
        });
    };

    const handleSelectSession = (id: string) => {
        setActiveSessionId(id);
        const session = sessions.find((s) => s.id === id);
        if (session) {
            setMessages(session.messages || []);
            setInteractionId(session.interactionId);
        }
        if (window.innerWidth < 768) {
            setIsSidebarOpen(false);
        }
    };

    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const result = reader.result as string;
                const base64 = result.split(',')[1];
                resolve(base64);
            };
            reader.onerror = (error) => reject(error);
        });
    };

    const handleSendMessage = async (message: string, files?: File[]) => {
        if ((!message.trim() && (!files || files.length === 0)) || isLoading)
            return;

        const currentSessionId = activeSessionId || Date.now().toString();
        if (!activeSessionId) {
            setActiveSessionId(currentSessionId);
        }

        const userMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: message,
            files: files?.map((f) => ({ name: f.name, type: f.type })),
        };
        const newMessages = [...messages, userMsg];
        setMessages(newMessages);
        setIsLoading(true);
        saveSession(currentSessionId, newMessages, interactionId);

        try {
            let inputContent: any = message;

            // If files exist, we format the input as a Step[] multi-part array
            if (files && files.length > 0) {
                const contentParts: any[] = [
                    {
                        type: 'text',
                        text: message || 'Can you analyze this file?',
                    },
                ];
                for (const file of files) {
                    const base64Data = await fileToBase64(file);
                    if (file.type.startsWith('image/')) {
                        contentParts.push({
                            type: 'image',
                            data: base64Data,
                            mime_type: file.type,
                        });
                    } else if (file.type === 'application/pdf') {
                        contentParts.push({
                            type: 'document',
                            data: base64Data,
                            mime_type: file.type,
                        });
                    }
                }

                inputContent = [
                    {
                        type: 'user_input',
                        content: contentParts,
                    },
                ];
            }

            // Using the new Interactions API from @google/genai SDK
            const interaction = await aiClient.interactions.create({
                model: 'gemini-3.8-flash',
                input: inputContent,
                previous_interaction_id: interactionId,
            });

            if (interaction.output_text) {
                const finalMessages = [
                    ...newMessages,
                    {
                        id: (Date.now() + 1).toString(),
                        role: 'model',
                        content: interaction.output_text,
                    },
                ] as Message[];

                setMessages(finalMessages);
                setInteractionId(interaction.id);
                saveSession(currentSessionId, finalMessages, interaction.id);
            }
        } catch (error) {
            console.error('Chat error:', error);
            const finalMessages = [
                ...newMessages,
                {
                    id: (Date.now() + 1).toString(),
                    role: 'model',
                    content:
                        'Oops, I encountered an error connecting to my brain. Please try again!',
                },
            ] as Message[];
            setMessages(finalMessages);
            saveSession(currentSessionId, finalMessages, interactionId);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Head title="AI Agents" />
            <div className="relative flex h-[calc(100vh-64px)] overflow-hidden">
                {/* Mobile Sidebar Overlay */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 z-40 bg-black/20 md:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                {/* History Sidebar */}
                <div
                    className={`absolute top-0 left-0 z-50 flex h-full w-64 flex-col border-r border-border/60 bg-muted/30 transition-transform duration-300 ease-in-out md:static ${isSidebarOpen ? 'translate-x-0 bg-background md:bg-transparent' : '-translate-x-full md:translate-x-0'} `}
                >
                    <div className="border-b border-border/60 p-4">
                        <Button
                            onClick={handleNewChat}
                            className="w-full justify-start"
                            variant="default"
                        >
                            <Plus className="mr-2 size-4" />
                            New Chat
                        </Button>
                    </div>

                    <div className="flex-1 space-y-1 overflow-y-auto p-3">
                        <div className="mb-3 px-1 text-xs font-semibold tracking-wider text-muted-foreground/70 uppercase">
                            Recents
                        </div>
                        {sessions.length === 0 ? (
                            <div className="mt-4 p-4 text-center text-sm text-muted-foreground">
                                No recent chats
                            </div>
                        ) : (
                            sessions.map((session) => (
                                <div
                                    key={session.id}
                                    onClick={() =>
                                        handleSelectSession(session.id)
                                    }
                                    className={`group relative flex cursor-pointer items-center rounded-md px-3 py-2.5 text-sm transition-colors ${
                                        activeSessionId === session.id
                                            ? 'bg-secondary font-medium text-secondary-foreground'
                                            : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                                    } `}
                                >
                                    <MessageSquare className="mr-3 size-4 shrink-0" />
                                    <div className="flex-1 truncate pr-6">
                                        {session.title || 'New Chat'}
                                    </div>
                                    <button
                                        onClick={(e) =>
                                            handleDeleteSession(session.id, e)
                                        }
                                        className={`absolute right-2 rounded-md p-1.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive focus:opacity-100 ${activeSessionId === session.id ? 'opacity-100' : ''} `}
                                    >
                                        <Trash2 className="size-3.5" />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Main Chat Area */}
                <div className="relative flex h-full min-w-0 flex-1 flex-col bg-background">
                    {/* Header for mobile to open sidebar */}
                    <div className="sticky top-0 z-10 flex shrink-0 items-center border-b border-border/60 bg-background/95 p-4 backdrop-blur md:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsSidebarOpen(true)}
                            className="mr-2 -ml-2"
                        >
                            <Menu className="size-5" />
                        </Button>
                        <span className="truncate text-sm font-semibold">
                            {activeSessionId
                                ? sessions.find((s) => s.id === activeSessionId)
                                      ?.title
                                : 'New Chat'}
                        </span>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 pb-0 md:p-6">
                        {messages.length === 0 ? (
                            <div className="mx-auto flex h-full w-full max-w-4xl flex-col items-center justify-center space-y-6 text-center">
                                <div className="flex size-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 shadow-sm">
                                    <Bot className="size-8 text-primary" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold tracking-tight text-foreground">
                                        Sparky AI Tutor
                                    </h1>
                                    <p className="mx-auto mt-2 max-w-lg text-muted-foreground">
                                        Ask me anything about your courses, let
                                        me summarize your materials, or generate
                                        a practice quiz for you.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="mx-auto mb-4 flex w-full max-w-3xl flex-col pt-4 md:pt-0">
                                {messages.map((msg) => (
                                    <ChatMessage key={msg.id} msg={msg} />
                                ))}

                                {isLoading && (
                                    <div className="mb-6 flex w-full justify-start">
                                        <div className="flex max-w-[85%] flex-row gap-3">
                                            <div className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/10 shadow-sm">
                                                <Bot className="size-4 text-primary" />
                                            </div>
                                            <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm border border-border/60 bg-white px-5 py-4 shadow-sm">
                                                <div
                                                    className="size-2 animate-bounce rounded-full bg-primary/50"
                                                    style={{
                                                        animationDelay: '0ms',
                                                    }}
                                                ></div>
                                                <div
                                                    className="size-2 animate-bounce rounded-full bg-primary/50"
                                                    style={{
                                                        animationDelay: '150ms',
                                                    }}
                                                ></div>
                                                <div
                                                    className="size-2 animate-bounce rounded-full bg-primary/50"
                                                    style={{
                                                        animationDelay: '300ms',
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} className="h-4" />
                            </div>
                        )}
                    </div>

                    <div className="mx-auto w-full max-w-3xl shrink-0 bg-background p-4 pt-2 md:p-6">
                        <PromptInputBox
                            onSend={handleSendMessage}
                            placeholder="Ask Sparky a question or type '/' for commands..."
                        />
                        <p className="mt-3 text-center text-[11px] text-muted-foreground/70 md:text-xs">
                            Sparky AI can make mistakes. Consider verifying
                            critical information.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

AiAgents.layout = {
    breadcrumbs,
};
