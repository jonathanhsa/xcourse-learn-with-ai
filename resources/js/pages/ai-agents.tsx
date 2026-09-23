import { Head } from '@inertiajs/react';
import { Bot } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { PromptInputBox } from '@/components/ui/ai-prompt-box';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'AI Agents',
        href: '/ai-agents',
    },
];

export default function AiAgents() {
    const handleSendMessage = (message: string, files?: File[]) => {
        console.log('Sending message:', message);
        console.log('Attached files:', files);
        // Here you would implement your actual AI backend logic
    };

    return (
        <>
            <Head title="AI Agents" />
            <div className="flex h-full flex-col p-4 md:p-6 pb-20">
                <div className="flex-1 w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center space-y-6">
                    <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center shadow-sm border border-primary/20">
                        <Bot className="size-8 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">Sparky AI Tutor</h1>
                        <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
                            Ask me anything about your courses, let me summarize your materials, or generate a practice quiz for you.
                        </p>
                    </div>
                </div>

                <div className="w-full max-w-3xl mx-auto mt-auto pt-8">
                    <PromptInputBox 
                        onSend={handleSendMessage} 
                        placeholder="Ask Sparky a question or type '/' for commands..."
                    />
                    <p className="text-xs text-center text-muted-foreground/70 mt-3">
                        Sparky AI can make mistakes. Consider verifying critical information.
                    </p>
                </div>
            </div>
        </>
    );
}

AiAgents.layout = {
    breadcrumbs,
};
