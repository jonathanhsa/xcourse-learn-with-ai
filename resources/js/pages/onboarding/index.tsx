import { Head, router } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { animate, animateStagger, animateClickPop } from '@/lib/anime';
import {
    ArrowLeft,
    Check,
    Smile,
    GraduationCap,
    Lightbulb,
    Target,
} from 'lucide-react';

export default function Onboarding() {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        name: '',
        major: '',
        learning_method: '',
        study_goal: '',
    });

    const stepContainerRef = useRef<HTMLDivElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);

    const steps = [
        {
            id: 'name',
            question: 'First things first, who are you?',
            subtitle: 'What should we call you?',
            type: 'text',
            placeholder: 'Your nickname or full name',
        },
        {
            id: 'major',
            question: 'What is your major?',
            subtitle: "We'll tailor your content to your field of study.",
            type: 'text',
            placeholder: 'e.g. Computer Science, Medicine, Law',
        },
        {
            id: 'learning_method',
            question: 'How do you prefer to learn?',
            subtitle: 'Pick the style that works best for you.',
            type: 'options',
            options: [
                'Visual (Videos & Diagrams)',
                'Reading & Note-taking',
                'Interactive Quizzes',
                'Audio & Lectures',
            ],
        },
        {
            id: 'study_goal',
            question: "What's your study goal?",
            subtitle: 'How many hours can you commit per week?',
            type: 'options',
            options: [
                'Light (1-3 hours)',
                'Moderate (4-7 hours)',
                'Intense (8-14 hours)',
                'Hardcore (15+ hours)',
            ],
        },
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
            const optionBtns = stepContainerRef.current.querySelectorAll(
                '.onboarding-option-btn',
            );
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

    const handleOptionSelect = (
        e: React.MouseEvent<HTMLButtonElement>,
        option: string,
    ) => {
        animateClickPop(e.currentTarget);
        setFormData({ ...formData, [steps[step].id]: option });
    };

    const currentStepData = steps[step];

    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background font-sans text-foreground selection:bg-primary/20">
            <Head title="Welcome to xcourse" />

            {/* Top Navigation & Progress Bar */}
            <div className="absolute top-0 left-0 z-50 w-full">
                <div className="h-1.5 w-full bg-border/40">
                    <div
                        ref={progressBarRef}
                        className="h-full rounded-r-full bg-foreground"
                        style={{
                            width: `${((step + 1) / steps.length) * 100}%`,
                        }}
                    />
                </div>

                <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
                    {step > 0 ? (
                        <button
                            onClick={prevStep}
                            className="inline-flex items-center gap-1.5 rounded-lg p-2 text-xs font-semibold text-muted-foreground transition-colors hover:bg-black/5 hover:text-foreground"
                        >
                            <ArrowLeft className="h-3.5 w-3.5" />
                            <span>Back</span>
                        </button>
                    ) : (
                        <div />
                    )}
                    <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                        Step {step + 1} of {steps.length}
                    </span>
                </div>
            </div>

            {/* Dynamic Step Content Container */}
            <div className="relative flex w-full max-w-2xl items-center justify-center px-6">
                <div
                    ref={stepContainerRef}
                    key={currentStepData.id}
                    className="flex w-full flex-col items-center justify-center text-center will-change-[opacity,transform]"
                >
                    <style>{`
                        @keyframes floatIcon {
                            0%, 100% { transform: translateY(0); }
                            50% { transform: translateY(-12px); }
                        }
                        @keyframes wiggleIcon {
                            0%, 100% { transform: rotate(-12deg); }
                            50% { transform: rotate(12deg); }
                        }
                        @keyframes glowPulseIcon {
                            0%, 100% { opacity: 1; filter: drop-shadow(0 0 12px rgba(92, 64, 51, 0.4)); }
                            50% { opacity: 0.5; filter: drop-shadow(0 0 2px rgba(92, 64, 51, 0.1)); }
                        }
                    `}</style>
                    <div className="mb-4 flex h-24 items-center justify-center">
                        {currentStepData.id === 'name' && (
                            <Smile
                                className="h-16 w-16 text-primary drop-shadow-sm"
                                strokeWidth={1.5}
                                style={{
                                    animation:
                                        'wiggleIcon 2.5s ease-in-out infinite',
                                }}
                            />
                        )}
                        {currentStepData.id === 'major' && (
                            <GraduationCap
                                className="h-16 w-16 text-primary drop-shadow-sm"
                                strokeWidth={1.5}
                                style={{
                                    animation:
                                        'floatIcon 3s ease-in-out infinite',
                                }}
                            />
                        )}
                        {currentStepData.id === 'learning_method' && (
                            <Lightbulb
                                className="h-16 w-16 text-primary"
                                strokeWidth={1.5}
                                style={{
                                    animation:
                                        'glowPulseIcon 2s ease-in-out infinite',
                                }}
                            />
                        )}
                        {currentStepData.id === 'study_goal' && (
                            <Target
                                className="h-16 w-16 text-primary drop-shadow-sm"
                                strokeWidth={1.5}
                                style={{ animation: 'spin 8s linear infinite' }}
                            />
                        )}
                    </div>

                    <h2 className="mb-3 font-heading text-3xl font-medium tracking-tight md:text-5xl">
                        {currentStepData.question}
                    </h2>
                    <p className="mb-8 max-w-md text-base text-muted-foreground md:text-lg">
                        {currentStepData.subtitle}
                    </p>

                    {currentStepData.type === 'text' && (
                        <div className="w-full max-w-md">
                            <input
                                type="text"
                                autoFocus
                                placeholder={currentStepData.placeholder}
                                value={
                                    formData[
                                        currentStepData.id as keyof typeof formData
                                    ]
                                }
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        [currentStepData.id]: e.target.value,
                                    })
                                }
                                onKeyDown={handleKeyDown}
                                className="w-full rounded-2xl border border-border/60 bg-white p-4 text-center text-xl shadow-sm transition-all focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none md:text-2xl"
                            />
                        </div>
                    )}

                    {currentStepData.type === 'options' && (
                        <div className="grid w-full max-w-lg grid-cols-1 gap-3.5 sm:grid-cols-2">
                            {currentStepData.options?.map((opt) => {
                                const isSelected =
                                    formData[
                                        currentStepData.id as keyof typeof formData
                                    ] === opt;
                                return (
                                    <button
                                        key={opt}
                                        onClick={(e) =>
                                            handleOptionSelect(e, opt)
                                        }
                                        className={`onboarding-option-btn flex items-center justify-between rounded-2xl border p-4 text-left font-medium transition-colors transition-shadow duration-200 ${
                                            isSelected
                                                ? 'border-foreground bg-foreground text-background shadow-md ring-2 ring-foreground/20'
                                                : 'border-border/60 bg-white text-foreground hover:border-primary/50 hover:shadow-xs'
                                        }`}
                                    >
                                        <span className="text-sm">{opt}</span>
                                        {isSelected && (
                                            <Check className="h-4 w-4 shrink-0 text-background" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom Actions */}
            <div className="fixed bottom-10 left-0 z-50 flex w-full justify-center px-6">
                <Button
                    size="lg"
                    onClick={(e) => {
                        animateClickPop(e.currentTarget);
                        nextStep();
                    }}
                    disabled={!isCurrentStepValid()}
                    className="rounded-full bg-foreground px-10 py-6 text-base font-semibold text-background shadow-lg transition-all duration-300 hover:bg-foreground/90 hover:shadow-xl disabled:opacity-40 disabled:hover:opacity-40"
                >
                    {step === steps.length - 1 ? 'Complete Setup' : 'Continue'}
                </Button>
            </div>
        </div>
    );
}

// Ensure layout is totally bypassed
Onboarding.layout = (page: any) => <>{page}</>;
