import { Head, router } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { animate, animateStagger, animateClickPop } from '@/lib/anime';
import { ArrowLeft, Check } from 'lucide-react';

export default function Onboarding() {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        name: '',
        major: '',
        learning_method: '',
        study_goal: ''
    });

    const stepContainerRef = useRef<HTMLDivElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);

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

    // Trigger Anime.js animation whenever step changes
    useEffect(() => {
        // Animate the active step container
        if (stepContainerRef.current) {
            animate(stepContainerRef.current, {
                opacity: [0, 1],
                translateY: [24, 0],
                scale: [0.97, 1],
                duration: 500,
                ease: 'outCubic',
            });

            // Stagger options if present
            const optionBtns = stepContainerRef.current.querySelectorAll('.onboarding-option-btn');
            if (optionBtns.length > 0) {
                animateStagger(optionBtns, {
                    duration: 450,
                    staggerMs: 70,
                    yOffset: 16,
                    delay: 150,
                });
            }
        }

        // Animate progress bar with Anime.js
        if (progressBarRef.current) {
            const targetPct = ((step + 1) / steps.length) * 100;
            animate(progressBarRef.current, {
                width: `${targetPct}%`,
                duration: 600,
                ease: 'outExpo',
            });
        }
    }, [step]);

    const nextStep = () => {
        if (step < steps.length - 1) {
            setStep(step + 1);
        } else {
            router.post('/onboarding', formData);
        }
    };

    const prevStep = () => {
        if (step > 0) {
            setStep(step - 1);
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

    const handleOptionSelect = (e: React.MouseEvent<HTMLButtonElement>, option: string) => {
        animateClickPop(e.currentTarget);
        setFormData({ ...formData, [steps[step].id]: option });
    };

    const currentStepData = steps[step];

    return (
        <div className="min-h-screen bg-background text-foreground font-sans flex flex-col items-center justify-center overflow-hidden relative selection:bg-primary/20">
            <Head title="Welcome to xcourse" />

            {/* Top Navigation & Progress Bar */}
            <div className="absolute top-0 left-0 w-full z-50">
                <div className="w-full h-1.5 bg-border/40">
                    <div 
                        ref={progressBarRef}
                        className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-r-full"
                        style={{ width: `${((step + 1) / steps.length) * 100}%` }}
                    />
                </div>
                
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                    {step > 0 ? (
                        <button 
                            onClick={prevStep}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-black/5"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            <span>Back</span>
                        </button>
                    ) : (
                        <div />
                    )}
                    <span className="text-xs font-semibold text-muted-foreground tracking-wider uppercase">
                        Step {step + 1} of {steps.length}
                    </span>
                </div>
            </div>

            {/* Dynamic Step Content Container */}
            <div className="w-full max-w-2xl px-6 relative flex items-center justify-center">
                <div 
                    ref={stepContainerRef} 
                    key={currentStepData.id}
                    className="w-full flex flex-col items-center justify-center text-center will-change-[opacity,transform]"
                >
                    <h2 className="text-3xl md:text-5xl font-heading font-medium tracking-tight mb-3">
                        {currentStepData.question}
                    </h2>
                    <p className="text-muted-foreground text-base md:text-lg mb-8 max-w-md">
                        {currentStepData.subtitle}
                    </p>

                    {currentStepData.type === 'text' && (
                        <div className="w-full max-w-md">
                            <input
                                type="text"
                                autoFocus
                                placeholder={currentStepData.placeholder}
                                value={formData[currentStepData.id as keyof typeof formData]}
                                onChange={(e) => setFormData({ ...formData, [currentStepData.id]: e.target.value })}
                                onKeyDown={handleKeyDown}
                                className="w-full bg-white border border-border/60 text-center text-xl md:text-2xl p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary shadow-sm transition-all"
                            />
                        </div>
                    )}

                    {currentStepData.type === 'options' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full max-w-lg">
                            {currentStepData.options?.map((opt) => {
                                const isSelected = formData[currentStepData.id as keyof typeof formData] === opt;
                                return (
                                    <button
                                        key={opt}
                                        onClick={(e) => handleOptionSelect(e, opt)}
                                        className={`onboarding-option-btn p-4 rounded-2xl border text-left font-medium transition-all duration-200 flex items-center justify-between ${
                                            isSelected
                                            ? 'bg-foreground text-background border-foreground shadow-md ring-2 ring-foreground/20'
                                            : 'bg-white text-foreground border-border/60 hover:border-primary/50 hover:shadow-xs'
                                        }`}
                                    >
                                        <span className="text-sm">{opt}</span>
                                        {isSelected && <Check className="w-4 h-4 text-background shrink-0" />}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom Actions */}
            <div className="fixed bottom-10 left-0 w-full flex justify-center px-6 z-50">
                <Button 
                    size="lg"
                    onClick={(e) => {
                        animateClickPop(e.currentTarget);
                        nextStep();
                    }}
                    disabled={!isCurrentStepValid()}
                    className="rounded-full px-10 py-6 text-base font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg hover:shadow-xl hover:opacity-95 transition-all duration-300 disabled:opacity-40 disabled:hover:opacity-40"
                >
                    {step === steps.length - 1 ? "Complete Setup" : "Continue"}
                </Button>
            </div>
        </div>
    );
}

// Ensure layout is totally bypassed
Onboarding.layout = (page: any) => <>{page}</>;



