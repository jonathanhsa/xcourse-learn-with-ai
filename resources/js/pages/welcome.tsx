import { Head, Link, usePage } from '@inertiajs/react';
import { login, register, dashboard } from '@/routes';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { 
    CalendarCheck, Mic, FileText, Calendar, 
    MonitorPlay, MessageSquare, Image as ImageIcon, Headphones, PlaySquare,
    Layers, Target, Gamepad2, FileQuestion, FileCheck,
    Puzzle, LayoutGrid, Sparkles, ArrowRight, CheckCircle2, Star, TrendingUp
} from 'lucide-react';
import { 
    animateStagger, 
    animateFloat, 
    animateClickPop, 
    animatePageEntrance,
    animateCounter 
} from '@/lib/anime';

export default function Welcome() {
    const { auth } = usePage().props;
    const [isScrolled, setIsScrolled] = useState(false);

    const heroRef = useRef<HTMLDivElement>(null);
    const previewRef = useRef<HTMLDivElement>(null);
    const floatCard1Ref = useRef<HTMLDivElement>(null);
    const floatCard2Ref = useRef<HTMLDivElement>(null);
    const floatCard3Ref = useRef<HTMLDivElement>(null);
    const stat1Ref = useRef<HTMLSpanElement>(null);
    const stat2Ref = useRef<HTMLSpanElement>(null);
    const stat3Ref = useRef<HTMLSpanElement>(null);
    const featureGridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Anime.js initial animations
    useEffect(() => {
        // Hero entrance stagger
        if (heroRef.current) {
            const heroItems = heroRef.current.querySelectorAll('.hero-anime-item');
            animateStagger(heroItems, {
                duration: 750,
                staggerMs: 90,
                yOffset: 30,
                scale: 0.96,
                delay: 100,
            });
        }

        // Platform preview entrance
        if (previewRef.current) {
            animatePageEntrance(previewRef.current, {
                duration: 850,
                yOffset: 40,
                scale: 0.95,
                delay: 450,
            });
        }

        // Subtle ambient floating cards
        let anim1: any;
        let anim2: any;
        let anim3: any;

        if (floatCard1Ref.current) {
            anim1 = animateFloat(floatCard1Ref.current, {
                yDistance: 10,
                rotate: 2,
                duration: 3400,
                delay: 0,
            });
        }
        if (floatCard2Ref.current) {
            anim2 = animateFloat(floatCard2Ref.current, {
                yDistance: 12,
                rotate: -2.5,
                duration: 4000,
                delay: 400,
            });
        }
        if (floatCard3Ref.current) {
            anim3 = animateFloat(floatCard3Ref.current, {
                yDistance: 8,
                rotate: 1.5,
                duration: 3600,
                delay: 800,
            });
        }

        // Stats counters
        if (stat1Ref.current) {
            animateCounter(stat1Ref.current, 0, 98, { duration: 1600, suffix: '%' });
        }
        if (stat2Ref.current) {
            animateCounter(stat2Ref.current, 0, 50, { duration: 1800, suffix: 'K+' });
        }
        if (stat3Ref.current) {
            animateCounter(stat3Ref.current, 0, 4.9, { duration: 1400, suffix: '/5', round: false });
        }

        // Feature grid entrance
        if (featureGridRef.current) {
            const cards = featureGridRef.current.querySelectorAll('.feature-card-item');
            animateStagger(cards, {
                duration: 650,
                staggerMs: 80,
                yOffset: 25,
                delay: 600,
            });
        }

        return () => {
            if (anim1 && typeof anim1.revert === 'function') anim1.revert();
            if (anim2 && typeof anim2.revert === 'function') anim2.revert();
            if (anim3 && typeof anim3.revert === 'function') anim3.revert();
        };
    }, []);

    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        animateClickPop(e.currentTarget);
    };

    return (
        <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden selection:bg-[#E0D6C8]">
            <Head title="xcourse - Learning that adapts to you" />
            
            {/* Navbar */}
            <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none px-4 md:px-0">
                <header 
                    className={`pointer-events-auto flex items-center justify-between overflow-hidden bg-white/75 backdrop-blur-xl border border-border/40 shadow-sm transition-all duration-700 ease-in-out ${
                        isScrolled 
                        ? 'w-full max-w-full h-16 rounded-none mt-0 px-6 md:px-12 border-b' 
                        : 'w-full max-w-5xl h-14 rounded-[32px] mt-6 px-6'
                    }`}
                >
                    <div className="flex items-center gap-3 font-semibold text-lg tracking-tight">
                        <div className="size-8 rounded-[10px] bg-primary text-primary-foreground flex items-center justify-center font-bold shadow-sm transition-transform hover:scale-105">x</div>
                        <span className="font-bold tracking-tight">xcourse</span>
                    </div>

                    <div className="hidden md:flex items-center gap-1">
                        <div className="group relative">
                            <button className="bg-transparent hover:bg-black/5 text-muted-foreground group-hover:text-foreground text-sm font-medium h-9 px-4 py-2 rounded-md transition-colors flex items-center gap-1">
                                Features
                            </button>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                <div className="w-[850px] p-6 grid grid-cols-4 gap-8 bg-background/95 backdrop-blur-3xl rounded-2xl shadow-2xl border border-border/30">
                                    {/* Column 1: Organize */}
                                    <div className="flex flex-col space-y-5">
                                        <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Organize</h4>
                                        <div className="flex flex-col space-y-4">
                                            <a href="#" className="group/item flex items-start gap-3 transition-transform hover:translate-x-1 duration-200">
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EAE4D9] text-[#7A5230] transition-colors group-hover/item:bg-[#E0D6C8]">
                                                    <CalendarCheck className="h-4 w-4" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm font-semibold text-foreground leading-none">Study Plan</p>
                                                    <p className="text-xs text-muted-foreground leading-snug">Build our personalized study schedule</p>
                                                </div>
                                            </a>
                                            <a href="#" className="group/item flex items-start gap-3 transition-transform hover:translate-x-1 duration-200">
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-yellow-100 text-yellow-600 transition-colors group-hover/item:bg-yellow-200">
                                                    <Mic className="h-4 w-4" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm font-semibold text-foreground leading-none">Record Lecture</p>
                                                    <p className="text-xs text-muted-foreground leading-snug">Capture and generate notes</p>
                                                </div>
                                            </a>
                                            <a href="#" className="group/item flex items-start gap-3 transition-transform hover:translate-x-1 duration-200">
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-yellow-100 text-yellow-600 transition-colors group-hover/item:bg-yellow-200">
                                                    <FileText className="h-4 w-4" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm font-semibold text-foreground leading-none">Notes</p>
                                                    <p className="text-xs text-muted-foreground leading-snug">Enhance notes with AI</p>
                                                </div>
                                            </a>
                                            <a href="#" className="group/item flex items-start gap-3 transition-transform hover:translate-x-1 duration-200">
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EAE4D9] text-[#7A5230] transition-colors group-hover/item:bg-[#E0D6C8]">
                                                    <Calendar className="h-4 w-4" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm font-semibold text-foreground leading-none">Calendar</p>
                                                    <p className="text-xs text-muted-foreground leading-snug">Plan studying with AI</p>
                                                </div>
                                            </a>
                                        </div>
                                    </div>

                                    {/* Column 2: Learn */}
                                    <div className="flex flex-col space-y-5">
                                        <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Learn</h4>
                                        <div className="flex flex-col space-y-4">
                                            <a href="#" className="group/item flex items-start gap-3 transition-transform hover:translate-x-1 duration-200">
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EAE4D9] text-[#7A5230] transition-colors group-hover/item:bg-[#E0D6C8]">
                                                    <MonitorPlay className="h-4 w-4" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm font-semibold text-foreground leading-none">Tutor Me</p>
                                                    <p className="text-xs text-muted-foreground leading-snug">Get 1-on-1 help from AI Tutor</p>
                                                </div>
                                            </a>
                                            <a href="#" className="group/item flex items-start gap-3 transition-transform hover:translate-x-1 duration-200">
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EAE4D9] text-[#8B5E3C] transition-colors group-hover/item:bg-primary/20">
                                                    <MessageSquare className="h-4 w-4" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm font-semibold text-foreground leading-none">Text Sparky</p>
                                                    <p className="text-xs text-muted-foreground leading-snug">Study with Sparky right in chat</p>
                                                </div>
                                            </a>
                                            <a href="#" className="group/item flex items-start gap-3 transition-transform hover:translate-x-1 duration-200">
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EAE4D9] text-[#7A5230] transition-colors group-hover/item:bg-[#E0D6C8]">
                                                    <ImageIcon className="h-4 w-4" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm font-semibold text-foreground leading-none">Sparky Visuals</p>
                                                    <p className="text-xs text-muted-foreground leading-snug">Visual explanations of concepts</p>
                                                </div>
                                            </a>
                                            <a href="#" className="group/item flex items-start gap-3 transition-transform hover:translate-x-1 duration-200">
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EAE4D9] text-[#7A5230] transition-colors group-hover/item:bg-[#E0D6C8]">
                                                    <Headphones className="h-4 w-4" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm font-semibold text-foreground leading-none">Audio Recap</p>
                                                    <p className="text-xs text-muted-foreground leading-snug">Listen to summaries of lectures</p>
                                                </div>
                                            </a>
                                        </div>
                                    </div>

                                    {/* Column 3: Practice & Test */}
                                    <div className="flex flex-col space-y-5">
                                        <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Practice &amp; Test</h4>
                                        <div className="flex flex-col space-y-4">
                                            <a href="#" className="group/item flex items-start gap-3 transition-transform hover:translate-x-1 duration-200">
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-600 transition-colors group-hover/item:bg-green-200">
                                                    <Layers className="h-4 w-4" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm font-semibold text-foreground leading-none">Flashcards</p>
                                                    <p className="text-xs text-muted-foreground leading-snug">Auto-generated smart cards</p>
                                                </div>
                                            </a>
                                            <a href="#" className="group/item flex items-start gap-3 transition-transform hover:translate-x-1 duration-200">
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover/item:bg-primary/20">
                                                    <Target className="h-4 w-4" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm font-semibold text-foreground leading-none">QuizFetch</p>
                                                    <p className="text-xs text-muted-foreground leading-snug">Adaptive quizzes</p>
                                                </div>
                                            </a>
                                            <a href="#" className="group/item flex items-start gap-3 transition-transform hover:translate-x-1 duration-200">
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-600 transition-colors group-hover/item:bg-green-200">
                                                    <Gamepad2 className="h-4 w-4" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm font-semibold text-foreground leading-none">Arcade</p>
                                                    <p className="text-xs text-muted-foreground leading-snug">Learn through gamified loops</p>
                                                </div>
                                            </a>
                                            <a href="#" className="group/item flex items-start gap-3 transition-transform hover:translate-x-1 duration-200">
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover/item:bg-primary/20">
                                                    <FileCheck className="h-4 w-4" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm font-semibold text-foreground leading-none">Practice Tests</p>
                                                    <p className="text-xs text-muted-foreground leading-snug">Simulate full-length exams</p>
                                                </div>
                                            </a>
                                        </div>
                                    </div>

                                    {/* Column 4: Customize */}
                                    <div className="flex flex-col space-y-5">
                                        <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Customize</h4>
                                        <div className="flex flex-col space-y-4">
                                            <a href="#" className="group/item flex items-start gap-3 transition-transform hover:translate-x-1 duration-200">
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition-colors group-hover/item:bg-gray-200">
                                                    <Puzzle className="h-4 w-4" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm font-semibold text-foreground leading-none">Plugins</p>
                                                    <p className="text-xs text-muted-foreground leading-snug">Customize how Sparky teaches</p>
                                                </div>
                                            </a>
                                            <a href="#" className="group/item flex items-start gap-3 transition-transform hover:translate-x-1 duration-200">
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition-colors group-hover/item:bg-gray-200">
                                                    <LayoutGrid className="h-4 w-4" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm font-semibold text-foreground leading-none flex items-center gap-2">
                                                        Mini Apps
                                                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-yellow-200 text-yellow-800">NEW</span>
                                                    </p>
                                                    <p className="text-xs text-muted-foreground leading-snug">Explore interactive study apps</p>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-2 hover:bg-black/5 rounded-md">Educators &amp; Enterprise</a>
                        <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-2 hover:bg-black/5 rounded-md">About</a>
                    </div>

                    <div className="flex items-center gap-4">
                        {auth.user ? (
                            <Link href={dashboard()}>
                                <Button 
                                    onClick={handleButtonClick}
                                    className="rounded-full px-5 font-semibold bg-foreground text-background hover:bg-foreground/90 transition-all duration-300"
                                >
                                    Dashboard
                                </Button>
                            </Link>
                        ) : (
                            <>
                                <Link href={login()} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden sm:block">
                                    Login
                                </Link>
                                <Link href={register()}>
                                    <Button 
                                        onClick={handleButtonClick}
                                        className="rounded-full px-5 font-semibold bg-foreground text-background hover:bg-foreground/90 transition-all duration-300 shadow-sm"
                                    >
                                        Start for Free
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                </header>
            </div>

            {/* Hero Section */}
            <main className="pt-36 md:pt-44 pb-20 px-6 flex flex-col items-center text-center">
                <div ref={heroRef} className="max-w-4xl flex flex-col items-center">
                    {/* Badge removed as requested */}

                    <h1 className="hero-anime-item text-6xl md:text-8xl font-heading font-medium tracking-tight text-foreground mb-6 leading-[1.08]">
                        Learning that <br />
                        <span className="italic font-serif bg-gradient-to-r from-[#8B5E3C] via-[#A0522D] to-[#6B4C3A] bg-clip-text text-transparent">adapts to you</span>
                    </h1>
                    
                    <p className="hero-anime-item text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                        The trusted AI learning platform for students. xcourse evolves your course materials into interactive, digestible content you'll actually love to learn from.
                    </p>

                    <div className="hero-anime-item flex items-center gap-4 flex-wrap justify-center">
                        <Link href={register()}>
                            <Button 
                                onClick={handleButtonClick}
                                size="lg" 
                                className="rounded-full text-base px-8 h-14 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 bg-gradient-to-r from-[#7A5230] to-[#5C4033] hover:opacity-95 text-white"
                            >
                                <span>Try for free</span>
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </Link>
                        <Link href={login()}>
                            <Button 
                                variant="outline" 
                                size="lg" 
                                className="rounded-full text-base px-7 h-14 font-semibold bg-white/80 backdrop-blur-md border-border/80 hover:bg-white transition-all duration-300"
                            >
                                See how it works
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Animated Interactive Platform Preview with Floating Cards */}
                <div 
                    ref={previewRef}
                    className="w-full max-w-5xl mt-20 relative h-[360px] md:h-[580px] rounded-[2.5rem] bg-gradient-to-b from-white/90 to-white/60 backdrop-blur-xl border border-white/60 shadow-2xl overflow-hidden flex items-center justify-center p-8"
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#8B5E3C]/5 via-[#5C4033]/5 to-[#A0522D]/5"></div>
                    
                    {/* Background grid pattern */}
                    <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>

                    {/* Central Mock Platform Workspace */}
                    <div className="relative z-10 w-full max-w-2xl bg-white/90 rounded-2xl shadow-xl border border-border/60 p-6 md:p-8 backdrop-blur-2xl">
                        <div className="flex items-center justify-between pb-4 border-b border-border/40">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                <span className="ml-2 text-xs font-semibold text-muted-foreground">Biology 101 - Cellular Respiration</span>
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#F4EFE6] text-[#5C4033]">Active Session</span>
                        </div>
                        
                        <div className="mt-5 space-y-4">
                            <div className="p-3.5 rounded-xl bg-white/50 border border-[#E0D6C8]/80 flex items-start gap-3 text-left">
                                <Sparkles className="w-5 h-5 text-[#7A5230] shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-xs font-bold text-[#36322E]">Sparky AI Summary</p>
                                    <p className="text-xs text-[#36322E]/80 mt-1 leading-relaxed">
                                        Synthesized 3 lecture recordings into 8 key takeaways and 15 adaptive quiz questions.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-3 text-left">
                                <div className="p-3 rounded-xl bg-muted/40 border border-border/30">
                                    <span className="text-[11px] text-muted-foreground font-medium">Concept Mastery</span>
                                    <p className="text-lg font-bold text-foreground mt-0.5">87%</p>
                                    <div className="w-full h-1.5 rounded-full bg-muted mt-2 overflow-hidden">
                                        <div className="h-full bg-emerald-500 rounded-full w-[87%]"></div>
                                    </div>
                                </div>
                                <div className="p-3 rounded-xl bg-muted/40 border border-border/30">
                                    <span className="text-[11px] text-muted-foreground font-medium">Flashcards Mastered</span>
                                    <p className="text-lg font-bold text-foreground mt-0.5">24 / 28</p>
                                    <div className="w-full h-1.5 rounded-full bg-muted mt-2 overflow-hidden">
                                        <div className="h-full bg-[#5C4033] rounded-full w-[85%]"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Floating Element 1 - AI Tutor Dialogue (Anime.js animated) */}
                    <div 
                        ref={floatCard1Ref} 
                        className="absolute top-8 left-6 md:left-12 z-20 hidden sm:flex items-center gap-3 bg-white/95 rounded-2xl shadow-xl border border-white/80 p-3.5 backdrop-blur-xl max-w-xs text-left"
                    >
                        <div className="size-9 rounded-xl bg-gradient-to-tr from-[#7A5230] to-[#5C4033] flex items-center justify-center text-white shrink-0 shadow-xs">
                            <Sparkles className="w-4 h-4" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-foreground">Sparky AI Tutor</p>
                            <p className="text-[11px] text-muted-foreground leading-snug">"Great job! Ready for a quick 3-question quiz?"</p>
                        </div>
                    </div>

                    {/* Floating Element 2 - Practice Score Card (Anime.js animated) */}
                    <div 
                        ref={floatCard2Ref} 
                        className="absolute bottom-10 right-6 md:right-12 z-20 hidden sm:flex items-center gap-3 bg-white/95 rounded-2xl shadow-xl border border-white/80 p-4 backdrop-blur-xl text-left"
                    >
                        <div className="size-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="flex items-center gap-1.5">
                                <span className="text-xs font-bold text-foreground">Exam Simulation</span>
                                <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-bold">Passed</span>
                            </div>
                            <p className="text-[11px] text-muted-foreground mt-0.5">Score: 94/100 (+12% improvement)</p>
                        </div>
                    </div>

                    {/* Floating Element 3 - Study Streak Badge (Anime.js animated) */}
                    <div 
                        ref={floatCard3Ref} 
                        className="absolute top-12 right-10 z-20 hidden md:flex items-center gap-2.5 bg-white/95 rounded-full shadow-lg border border-white/80 py-2 px-4 backdrop-blur-xl"
                    >
                        <TrendingUp className="w-4 h-4 text-orange-500" />
                        <span className="text-xs font-bold text-foreground">🔥 7-Day Study Streak!</span>
                    </div>
                </div>

                {/* Animated Stats Section (Anime.js Counters) */}
                <div className="w-full max-w-4xl mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-border/40 shadow-xs text-center">
                        <span ref={stat1Ref} className="text-4xl font-bold font-heading text-foreground">0%</span>
                        <p className="text-sm text-muted-foreground mt-1 font-medium">Higher Exam Retention</p>
                    </div>
                    <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-border/40 shadow-xs text-center">
                        <span ref={stat2Ref} className="text-4xl font-bold font-heading text-foreground">0K+</span>
                        <p className="text-sm text-muted-foreground mt-1 font-medium">Students Learning Smarter</p>
                    </div>
                    <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-border/40 shadow-xs text-center">
                        <span ref={stat3Ref} className="text-4xl font-bold font-heading text-foreground">0/5</span>
                        <p className="text-sm text-muted-foreground mt-1 font-medium">Student Satisfaction Score</p>
                    </div>
                </div>

                {/* Highlights Feature Cards (Staggered Anime.js) */}
                <div ref={featureGridRef} className="w-full max-w-5xl mt-24 text-left">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-heading font-medium tracking-tight mb-3">
                            Supercharge your study workflow
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                            Everything you need to turn notes and slides into active recall and top grades.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="feature-card-item bg-white rounded-3xl p-7 border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                            <div className="size-12 rounded-2xl bg-[#EAE4D9] text-[#7A5230] flex items-center justify-center mb-5">
                                <CalendarCheck className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-2">Smart Study Plan</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Automatically plans your revision timetable around your exams and daily available hours.
                            </p>
                        </div>

                        <div className="feature-card-item bg-white rounded-3xl p-7 border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                            <div className="size-12 rounded-2xl bg-[#E0D6C8] text-[#5C4033] flex items-center justify-center mb-5">
                                <Layers className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-2">Instant Flashcards &amp; Quizzes</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Upload PDFs, recordings, or notes to get spaced-repetition flashcards and mock exams in seconds.
                            </p>
                        </div>

                        <div className="feature-card-item bg-white rounded-3xl p-7 border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                            <div className="size-12 rounded-2xl bg-[#EAE4D9] text-[#8B5E3C] flex items-center justify-center mb-5">
                                <MonitorPlay className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-2">24/7 AI Tutor Support</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Ask tough questions, get simplified analogies, and understand complex equations step by step.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}




