import { Head, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Onboarding() {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        name: '',
        major: '',
        learning_method: '',
        study_goal: ''
    });

    const steps = [
        {
            id: 'name',
            question: "First things first, who are you?",
            subtitle: "What should we call you?",
            type: 'text',
            placeholder: 'Your nickname or full name'
        },
        {
            id: 'major',
            question: "What is your major?",
            subtitle: "We'll tailor your content to your field of study.",
            type: 'text',
            placeholder: 'e.g. Computer Science, Medicine, Law'
        },
        {
            id: 'learning_method',
            question: "How do you prefer to learn?",
            subtitle: "Pick the style that works best for you.",
            type: 'options',
            options: ['Visual (Videos & Diagrams)', 'Reading & Note-taking', 'Interactive Quizzes', 'Audio & Lectures']
        },
        {
            id: 'study_goal',
            question: "What's your study goal?",
            subtitle: "How many hours can you commit per week?",
            type: 'options',
            options: ['Light (1-3 hours)', 'Moderate (4-7 hours)', 'Intense (8-14 hours)', 'Hardcore (15+ hours)']
        }
    ];

    const nextStep = () => {
        if (step < steps.length - 1) {
            setStep(step + 1);
        } else {
            router.post('/onboarding', formData);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (isCurrentStepValid()) nextStep();
        }
    };

    const isCurrentStepValid = () => {
        const currentKey = steps[step].id as keyof typeof formData;
        return formData[currentKey].trim().length > 0;
    };

    return (
        <div className="min-h-screen bg-[#F5F5F7] text-foreground font-sans flex flex-col items-center justify-center overflow-hidden relative">
            <Head title="Welcome to xcourse" />

            {/* Progress Bar */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-border/40">
                <div 
                    className="h-full bg-primary transition-all duration-700 ease-in-out"
                    style={{ width: `${((step + 1) / steps.length) * 100}%` }}
                />
            </div>

            <div className="w-full max-w-2xl px-6 relative h-[400px] flex items-center justify-center">
                {steps.map((s, index) => {
                    const isActive = index === step;
                    const isPast = index < step;
                    const isFuture = index > step;
                    
                    let transformClass = "translate-y-0 opacity-100 scale-100 pointer-events-auto z-10";
                    if (isPast) transformClass = "-translate-y-12 opacity-0 scale-95 pointer-events-none z-0";
                    if (isFuture) transformClass = "translate-y-12 opacity-0 scale-95 pointer-events-none z-0";

                    return (
                        <div 
                            key={s.id} 
                            className={`absolute inset-0 w-full h-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col items-center justify-center text-center ${transformClass}`}
                        >
                            <h2 className="text-3xl md:text-5xl font-heading font-medium tracking-tight mb-3">
                                {s.question}
                            </h2>
                            <p className="text-muted-foreground text-lg mb-10">
                                {s.subtitle}
                            </p>

                            {s.type === 'text' && (
                                <input
                                    type="text"
                                    autoFocus={isActive}
                                    placeholder={s.placeholder}
                                    value={formData[s.id as keyof typeof formData]}
                                    onChange={(e) => setFormData({ ...formData, [s.id]: e.target.value })}
                                    onKeyDown={handleKeyDown}
                                    className="w-full max-w-md bg-white border border-border/50 text-center text-xl md:text-2xl p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm transition-all"
                                />
                            )}

                            {s.type === 'options' && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
                                    {s.options?.map((opt) => (
                                        <button
                                            key={opt}
                                            onClick={() => {
                                                setFormData({ ...formData, [s.id]: opt });
                                            }}
                                            className={`p-4 rounded-2xl border text-left font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${
                                                formData[s.id as keyof typeof formData] === opt
                                                ? 'bg-foreground text-background border-foreground shadow-md'
                                                : 'bg-white text-foreground border-border/50 hover:border-border'
                                            }`}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Bottom Actions */}
            <div className="fixed bottom-10 left-0 w-full flex justify-center px-6 transition-all duration-500 delay-300 z-50">
                <Button 
                    size="lg"
                    onClick={nextStep}
                    disabled={!isCurrentStepValid()}
                    className="rounded-full px-12 py-6 text-lg font-semibold bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:hover:translate-y-0"
                >
                    {step === steps.length - 1 ? "Let's Begin" : "Continue"}
                </Button>
            </div>
        </div>
    );
}

// Ensure layout is totally bypassed in case app.tsx routing fails
Onboarding.layout = (page: any) => <>{page}</>;
