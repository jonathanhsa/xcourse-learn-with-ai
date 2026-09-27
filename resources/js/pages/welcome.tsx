import { Head, Link, usePage } from '@inertiajs/react';
import { login, register, dashboard } from '@/routes';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
    CalendarCheck,
    Mic,
    FileText,
    Calendar,
    MonitorPlay,
    MessageSquare,
    Image as ImageIcon,
    Headphones,
    PlaySquare,
    Layers,
    Target,
    Gamepad2,
    FileQuestion,
    FileCheck,
    Puzzle,
    LayoutGrid,
    Sparkles,
    ArrowRight,
    CheckCircle2,
    Star,
    TrendingUp,
} from 'lucide-react';
import {
    animateStagger,
    animateFloat,
    animateClickPop,
    animatePageEntrance,
    animateCounter,
} from '@/lib/anime';

function Typewriter({ words }: { words: string[] }) {
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [blink, setBlink] = useState(true);

    // Blinking cursor
    useEffect(() => {
        const timeout = setTimeout(() => setBlink((prev) => !prev), 500);
        return () => clearTimeout(timeout);
    }, [blink]);

    useEffect(() => {
        if (index >= words.length) {
            setIndex(0);
            return;
        }

        if (subIndex === words[index].length + 1 && !isDeleting) {
            const timeout = setTimeout(() => setIsDeleting(true), 3000);
            return () => clearTimeout(timeout);
        }

        if (subIndex === 0 && isDeleting) {
            setIsDeleting(false);
            setIndex((prev) => (prev + 1) % words.length);
            return;
        }

        const timeout = setTimeout(() => {
            setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
        }, isDeleting ? 40 : 120);

        return () => clearTimeout(timeout);
    }, [subIndex, index, isDeleting, words]);

    return (
        <>
            {words[index].substring(0, subIndex)}
            <span className={`${blink ? 'opacity-100' : 'opacity-0'} font-sans not-italic inline-block`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#8B5E3C" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="h-[0.9em] w-auto translate-y-[0.15em] ml-1">
                    <path d="M 8 4 h 1 a 3 3 0 0 1 3 3 a 3 3 0 0 1 3 -3 h 1" />
                    <path d="M 12 7 v 10" />
                    <path d="M 8 20 h 1 a 3 3 0 0 0 3 -3 a 3 3 0 0 0 3 3 h 1" />
                </svg>
            </span>
        </>
    );
}

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
            const heroItems =
                heroRef.current.querySelectorAll('.hero-anime-item');
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
            animateCounter(stat1Ref.current, 0, 98, {
                duration: 1600,
                suffix: '%',
            });
        }
        if (stat2Ref.current) {
            animateCounter(stat2Ref.current, 0, 50, {
                duration: 1800,
                suffix: 'K+',
            });
        }
        if (stat3Ref.current) {
            animateCounter(stat3Ref.current, 0, 4.9, {
                duration: 1400,
                suffix: '/5',
                round: false,
            });
        }

        // Feature grid entrance
        if (featureGridRef.current) {
            const cards =
                featureGridRef.current.querySelectorAll('.feature-card-item');
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
        <div className="min-h-screen overflow-x-hidden bg-background font-sans text-foreground selection:bg-[#E0D6C8]">
            <Head title="xcourse - Learning that adapts to you" />

            {/* Navbar */}
            <div className="pointer-events-none fixed top-0 right-0 left-0 z-50 flex justify-center px-4 md:px-0">
                <header
                    className={`pointer-events-auto flex items-center justify-between overflow-hidden border border-border/40 bg-white/75 shadow-sm backdrop-blur-xl transition-all duration-700 ease-in-out ${
                        isScrolled
                            ? 'mt-0 h-16 w-full max-w-full rounded-none border-b px-6 md:px-12'
                            : 'mt-6 h-14 w-full max-w-5xl rounded-[32px] px-6'
                    }`}
                >
                    <div className="flex items-center gap-3 text-lg font-semibold tracking-tight">
                        <div className="flex size-8 items-center justify-center rounded-[10px] bg-primary font-bold text-primary-foreground shadow-sm transition-transform hover:scale-105">
                            x
                        </div>
                        <span className="font-bold tracking-tight">
                            xcourse
                        </span>
                    </div>

                    <div className="hidden items-center gap-1 md:flex">
                        <div className="group relative">
                            <button className="flex h-9 items-center gap-1 rounded-md bg-transparent px-4 py-2 text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground hover:bg-black/5">
                                Features
                            </button>
                            <div className="invisible absolute top-full left-1/2 z-50 -translate-x-1/2 pt-4 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                                <div className="grid w-[850px] grid-cols-4 gap-8 rounded-2xl border border-border/30 bg-background/95 p-6 shadow-2xl backdrop-blur-3xl">
                                    {/* Column 1: Organize */}
                                    <div className="flex flex-col space-y-5">
                                        <h4 className="text-[11px] font-bold tracking-widest text-muted-foreground uppercase">
                                            Organize
                                        </h4>
                                        <div className="flex flex-col space-y-4">
                                            <a
                                                href="#"
                                                className="group/item flex items-start gap-3 transition-transform duration-200 hover:translate-x-1"
                                            >
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EAE4D9] text-[#7A5230] transition-colors group-hover/item:bg-[#E0D6C8]">
                                                    <CalendarCheck className="h-4 w-4" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm leading-none font-semibold text-foreground">
                                                        Study Plan
                                                    </p>
                                                    <p className="text-xs leading-snug text-muted-foreground">
                                                        Build our personalized
                                                        study schedule
                                                    </p>
                                                </div>
                                            </a>
                                            <a
                                                href="#"
                                                className="group/item flex items-start gap-3 transition-transform duration-200 hover:translate-x-1"
                                            >
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-yellow-100 text-yellow-600 transition-colors group-hover/item:bg-yellow-200">
                                                    <Mic className="h-4 w-4" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm leading-none font-semibold text-foreground">
                                                        Record Lecture
                                                    </p>
                                                    <p className="text-xs leading-snug text-muted-foreground">
                                                        Capture and generate
                                                        notes
                                                    </p>
                                                </div>
                                            </a>
                                            <a
                                                href="#"
                                                className="group/item flex items-start gap-3 transition-transform duration-200 hover:translate-x-1"
                                            >
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-yellow-100 text-yellow-600 transition-colors group-hover/item:bg-yellow-200">
                                                    <FileText className="h-4 w-4" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm leading-none font-semibold text-foreground">
                                                        Notes
                                                    </p>
                                                    <p className="text-xs leading-snug text-muted-foreground">
                                                        Enhance notes with AI
                                                    </p>
                                                </div>
                                            </a>
                                            <a
                                                href="#"
                                                className="group/item flex items-start gap-3 transition-transform duration-200 hover:translate-x-1"
                                            >
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EAE4D9] text-[#7A5230] transition-colors group-hover/item:bg-[#E0D6C8]">
                                                    <Calendar className="h-4 w-4" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm leading-none font-semibold text-foreground">
                                                        Calendar
                                                    </p>
                                                    <p className="text-xs leading-snug text-muted-foreground">
                                                        Plan studying with AI
                                                    </p>
                                                </div>
                                            </a>
                                        </div>
                                    </div>

                                    {/* Column 2: Learn */}
                                    <div className="flex flex-col space-y-5">
                                        <h4 className="text-[11px] font-bold tracking-widest text-muted-foreground uppercase">
                                            Learn
                                        </h4>
                                        <div className="flex flex-col space-y-4">
                                            <a
                                                href="#"
                                                className="group/item flex items-start gap-3 transition-transform duration-200 hover:translate-x-1"
                                            >
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EAE4D9] text-[#7A5230] transition-colors group-hover/item:bg-[#E0D6C8]">
                                                    <MonitorPlay className="h-4 w-4" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm leading-none font-semibold text-foreground">
                                                        Tutor Me
                                                    </p>
                                                    <p className="text-xs leading-snug text-muted-foreground">
                                                        Get 1-on-1 help from AI
                                                        Tutor
                                                    </p>
                                                </div>
                                            </a>
                                            <a
                                                href="#"
                                                className="group/item flex items-start gap-3 transition-transform duration-200 hover:translate-x-1"
                                            >
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EAE4D9] text-[#8B5E3C] transition-colors group-hover/item:bg-primary/20">
                                                    <MessageSquare className="h-4 w-4" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm leading-none font-semibold text-foreground">
                                                        Text Sparky
                                                    </p>
                                                    <p className="text-xs leading-snug text-muted-foreground">
                                                        Study with Sparky right
                                                        in chat
                                                    </p>
                                                </div>
                                            </a>
                                            <a
                                                href="#"
                                                className="group/item flex items-start gap-3 transition-transform duration-200 hover:translate-x-1"
                                            >
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EAE4D9] text-[#7A5230] transition-colors group-hover/item:bg-[#E0D6C8]">
                                                    <ImageIcon className="h-4 w-4" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm leading-none font-semibold text-foreground">
                                                        Sparky Visuals
                                                    </p>
                                                    <p className="text-xs leading-snug text-muted-foreground">
                                                        Visual explanations of
                                                        concepts
                                                    </p>
                                                </div>
                                            </a>
                                            <a
                                                href="#"
                                                className="group/item flex items-start gap-3 transition-transform duration-200 hover:translate-x-1"
                                            >
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EAE4D9] text-[#7A5230] transition-colors group-hover/item:bg-[#E0D6C8]">
                                                    <Headphones className="h-4 w-4" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm leading-none font-semibold text-foreground">
                                                        Audio Recap
                                                    </p>
                                                    <p className="text-xs leading-snug text-muted-foreground">
                                                        Listen to summaries of
                                                        lectures
                                                    </p>
                                                </div>
                                            </a>
                                        </div>
                                    </div>

                                    {/* Column 3: Practice & Test */}
                                    <div className="flex flex-col space-y-5">
                                        <h4 className="text-[11px] font-bold tracking-widest text-muted-foreground uppercase">
                                            Practice &amp; Test
                                        </h4>
                                        <div className="flex flex-col space-y-4">
                                            <a
                                                href="#"
                                                className="group/item flex items-start gap-3 transition-transform duration-200 hover:translate-x-1"
                                            >
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-600 transition-colors group-hover/item:bg-green-200">
                                                    <Layers className="h-4 w-4" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm leading-none font-semibold text-foreground">
                                                        Flashcards
                                                    </p>
                                                    <p className="text-xs leading-snug text-muted-foreground">
                                                        Auto-generated smart
                                                        cards
                                                    </p>
                                                </div>
                                            </a>
                                            <a
                                                href="#"
                                                className="group/item flex items-start gap-3 transition-transform duration-200 hover:translate-x-1"
                                            >
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover/item:bg-primary/20">
                                                    <Target className="h-4 w-4" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm leading-none font-semibold text-foreground">
                                                        QuizFetch
                                                    </p>
                                                    <p className="text-xs leading-snug text-muted-foreground">
                                                        Adaptive quizzes
                                                    </p>
                                                </div>
                                            </a>
                                            <a
                                                href="#"
                                                className="group/item flex items-start gap-3 transition-transform duration-200 hover:translate-x-1"
                                            >
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-600 transition-colors group-hover/item:bg-green-200">
                                                    <Gamepad2 className="h-4 w-4" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm leading-none font-semibold text-foreground">
                                                        Arcade
                                                    </p>
                                                    <p className="text-xs leading-snug text-muted-foreground">
                                                        Learn through gamified
                                                        loops
                                                    </p>
                                                </div>
                                            </a>
                                            <a
                                                href="#"
                                                className="group/item flex items-start gap-3 transition-transform duration-200 hover:translate-x-1"
                                            >
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover/item:bg-primary/20">
                                                    <FileCheck className="h-4 w-4" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm leading-none font-semibold text-foreground">
                                                        Practice Tests
                                                    </p>
                                                    <p className="text-xs leading-snug text-muted-foreground">
                                                        Simulate full-length
                                                        exams
                                                    </p>
                                                </div>
                                            </a>
                                        </div>
                                    </div>

                                    {/* Column 4: Customize */}
                                    <div className="flex flex-col space-y-5">
                                        <h4 className="text-[11px] font-bold tracking-widest text-muted-foreground uppercase">
                                            Customize
                                        </h4>
                                        <div className="flex flex-col space-y-4">
                                            <a
                                                href="#"
                                                className="group/item flex items-start gap-3 transition-transform duration-200 hover:translate-x-1"
                                            >
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition-colors group-hover/item:bg-gray-200">
                                                    <Puzzle className="h-4 w-4" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm leading-none font-semibold text-foreground">
                                                        Plugins
                                                    </p>
                                                    <p className="text-xs leading-snug text-muted-foreground">
                                                        Customize how Sparky
                                                        teaches
                                                    </p>
                                                </div>
                                            </a>
                                            <a
                                                href="#"
                                                className="group/item flex items-start gap-3 transition-transform duration-200 hover:translate-x-1"
                                            >
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition-colors group-hover/item:bg-gray-200">
                                                    <LayoutGrid className="h-4 w-4" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="flex items-center gap-2 text-sm leading-none font-semibold text-foreground">
                                                        Mini Apps
                                                        <span className="rounded bg-yellow-200 px-1.5 py-0.5 text-[9px] font-bold text-yellow-800">
                                                            NEW
                                                        </span>
                                                    </p>
                                                    <p className="text-xs leading-snug text-muted-foreground">
                                                        Explore interactive
                                                        study apps
                                                    </p>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <a
                            href="#"
                            className="rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-black/5 hover:text-foreground"
                        >
                            Educators &amp; Enterprise
                        </a>
                        <a
                            href="#"
                            className="rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-black/5 hover:text-foreground"
                        >
                            About
                        </a>
                    </div>

                    <div className="flex items-center gap-4">
                        {auth.user ? (
                            <Link href={dashboard()}>
                                <Button
                                    onClick={handleButtonClick}
                                    className="rounded-full bg-foreground px-5 font-semibold text-background transition-all duration-300 hover:bg-foreground/90"
                                >
                                    Dashboard
                                </Button>
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={login()}
                                    className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:block"
                                >
                                    Login
                                </Link>
                                <Link href={register()}>
                                    <Button
                                        onClick={handleButtonClick}
                                        className="rounded-full bg-foreground px-5 font-semibold text-background shadow-sm transition-all duration-300 hover:bg-foreground/90"
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
            <main className="flex flex-col items-center px-6 pt-36 pb-20 text-center md:pt-44">
                <div
                    ref={heroRef}
                    className="flex max-w-4xl flex-col items-center"
                >
                    {/* Badge removed as requested */}

                    <h1 className="hero-anime-item mb-6 font-heading text-6xl leading-[1.08] font-medium tracking-tight text-foreground md:text-8xl">
                        Learning that <br />
                        <span className="bg-gradient-to-r from-[#8B5E3C] via-[#A0522D] to-[#6B4C3A] bg-clip-text font-serif text-transparent italic">
                            <Typewriter words={[
                                "adapts to you",
                                "grows with you",
                                "makes you smarter",
                                "saves you time",
                                "keeps you engaged",
                                "boosts your grades",
                                "understands you"
                            ]} />
                        </span>
                    </h1>

                    <p className="hero-anime-item mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                        The trusted AI learning platform for students. xcourse
                        evolves your course materials into interactive,
                        digestible content you'll actually love to learn from.
                    </p>

                    <div className="hero-anime-item flex flex-wrap items-center justify-center gap-4">
                        <Link href={register()}>
                            <Button
                                onClick={handleButtonClick}
                                size="lg"
                                className="flex h-14 items-center gap-2 rounded-full bg-gradient-to-r from-[#7A5230] to-[#5C4033] px-8 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:opacity-95 hover:shadow-xl"
                            >
                                <span>Try for free</span>
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                        <Link href={login()}>
                            <Button
                                variant="outline"
                                size="lg"
                                className="h-14 rounded-full border-border/80 bg-white/80 px-7 text-base font-semibold backdrop-blur-md transition-all duration-300 hover:bg-white"
                            >
                                See how it works
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Animated Interactive Platform Preview with Floating Cards */}
                <div
                    ref={previewRef}
                    className="relative mt-20 flex h-[360px] w-full max-w-5xl items-center justify-center overflow-hidden rounded-[2.5rem] border border-white/60 bg-gradient-to-b from-white/95 to-white/80 p-8 shadow-2xl md:h-[580px]"
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#8B5E3C]/5 via-[#5C4033]/5 to-[#A0522D]/5"></div>

                    {/* Background grid pattern */}
                    <div className="absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.03]"></div>

                    {/* Central Mock Platform Workspace */}
                    <div className="relative z-10 w-full max-w-2xl rounded-2xl border border-border/60 bg-white p-6 shadow-xl md:p-8">
                        <div className="flex items-center justify-between border-b border-border/40 pb-4">
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-red-400"></div>
                                <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                                <div className="h-3 w-3 rounded-full bg-green-400"></div>
                                <span className="ml-2 text-xs font-semibold text-muted-foreground">
                                    Biology 101 - Cellular Respiration
                                </span>
                            </div>
                            <span className="rounded-full bg-[#F4EFE6] px-2 py-0.5 text-[10px] font-bold tracking-wider text-[#5C4033] uppercase">
                                Active Session
                            </span>
                        </div>

                        <div className="mt-5 space-y-4">
                            <div className="flex items-start gap-3 rounded-xl border border-[#E0D6C8]/80 bg-white/50 p-3.5 text-left">
                                <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-[#7A5230]" />
                                <div>
                                    <p className="text-xs font-bold text-[#36322E]">
                                        Sparky AI Summary
                                    </p>
                                    <p className="mt-1 text-xs leading-relaxed text-[#36322E]/80">
                                        Synthesized 3 lecture recordings into 8
                                        key takeaways and 15 adaptive quiz
                                        questions.
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 text-left">
                                <div className="rounded-xl border border-border/30 bg-muted/40 p-3">
                                    <span className="text-[11px] font-medium text-muted-foreground">
                                        Concept Mastery
                                    </span>
                                    <p className="mt-0.5 text-lg font-bold text-foreground">
                                        87%
                                    </p>
                                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                                        <div className="h-full w-[87%] rounded-full bg-emerald-500"></div>
                                    </div>
                                </div>
                                <div className="rounded-xl border border-border/30 bg-muted/40 p-3">
                                    <span className="text-[11px] font-medium text-muted-foreground">
                                        Flashcards Mastered
                                    </span>
                                    <p className="mt-0.5 text-lg font-bold text-foreground">
                                        24 / 28
                                    </p>
                                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                                        <div className="h-full w-[85%] rounded-full bg-[#5C4033]"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Floating Element 1 - AI Tutor Dialogue (Anime.js animated) */}
                    <div
                        ref={floatCard1Ref}
                        className="absolute top-8 left-6 z-20 hidden max-w-xs items-center gap-3 rounded-2xl border border-white/80 bg-white p-3.5 text-left shadow-xl sm:flex md:left-12"
                    >
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-[#7A5230] to-[#5C4033] text-white shadow-xs">
                            <Sparkles className="h-4 w-4" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-foreground">
                                Sparky AI Tutor
                            </p>
                            <p className="text-[11px] leading-snug text-muted-foreground">
                                "Great job! Ready for a quick 3-question quiz?"
                            </p>
                        </div>
                    </div>

                    {/* Floating Element 2 - Practice Score Card (Anime.js animated) */}
                    <div
                        ref={floatCard2Ref}
                        className="absolute right-6 bottom-10 z-20 hidden items-center gap-3 rounded-2xl border border-white/80 bg-white p-4 text-left shadow-xl sm:flex md:right-12"
                    >
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                            <CheckCircle2 className="h-5 w-5" />
                        </div>
                        <div>
                            <div className="flex items-center gap-1.5">
                                <span className="text-xs font-bold text-foreground">
                                    Exam Simulation
                                </span>
                                <span className="py-0.2 rounded bg-emerald-100 px-1.5 text-[10px] font-bold text-emerald-800">
                                    Passed
                                </span>
                            </div>
                            <p className="mt-0.5 text-[11px] text-muted-foreground">
                                Score: 94/100 (+12% improvement)
                            </p>
                        </div>
                    </div>

                    {/* Floating Element 3 - Study Streak Badge (Anime.js animated) */}
                    <div
                        ref={floatCard3Ref}
                        className="absolute top-12 right-10 z-20 hidden items-center gap-2.5 rounded-full border border-white/80 bg-white px-4 py-2 shadow-lg md:flex"
                    >
                        <TrendingUp className="h-4 w-4 text-orange-500" />
                        <span className="text-xs font-bold text-foreground">
                            🔥 7-Day Study Streak!
                        </span>
                    </div>
                </div>

                {/* Animated Stats Section (Anime.js Counters) */}
                <div className="mt-16 grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="rounded-2xl border border-border/40 bg-white/90 p-6 text-center shadow-xs">
                        <span
                            ref={stat1Ref}
                            className="font-heading text-4xl font-bold text-foreground"
                        >
                            0%
                        </span>
                        <p className="mt-1 text-sm font-medium text-muted-foreground">
                            Higher Exam Retention
                        </p>
                    </div>
                    <div className="rounded-2xl border border-border/40 bg-white/90 p-6 text-center shadow-xs">
                        <span
                            ref={stat2Ref}
                            className="font-heading text-4xl font-bold text-foreground"
                        >
                            0K+
                        </span>
                        <p className="mt-1 text-sm font-medium text-muted-foreground">
                            Students Learning Smarter
                        </p>
                    </div>
                    <div className="rounded-2xl border border-border/40 bg-white/90 p-6 text-center shadow-xs">
                        <span
                            ref={stat3Ref}
                            className="font-heading text-4xl font-bold text-foreground"
                        >
                            0/5
                        </span>
                        <p className="mt-1 text-sm font-medium text-muted-foreground">
                            Student Satisfaction Score
                        </p>
                    </div>
                </div>

                {/* Highlights Feature Cards (Staggered Anime.js) */}
                <div
                    ref={featureGridRef}
                    className="mt-24 w-full max-w-5xl text-left"
                >
                    <div className="mb-12 text-center">
                        <h2 className="mb-3 font-heading text-3xl font-medium tracking-tight md:text-5xl">
                            Supercharge your study workflow
                        </h2>
                        <p className="mx-auto max-w-xl text-lg text-muted-foreground">
                            Everything you need to turn notes and slides into
                            active recall and top grades.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <div className="feature-card-item rounded-3xl border border-border/50 bg-white p-7 shadow-sm transition-shadow hover:shadow-md">
                            <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-[#EAE4D9] text-[#7A5230]">
                                <CalendarCheck className="h-6 w-6" />
                            </div>
                            <h3 className="mb-2 text-xl font-bold text-foreground">
                                Smart Study Plan
                            </h3>
                            <p className="text-sm leading-relaxed text-muted-foreground">
                                Automatically plans your revision timetable
                                around your exams and daily available hours.
                            </p>
                        </div>

                        <div className="feature-card-item rounded-3xl border border-border/50 bg-white p-7 shadow-sm transition-shadow hover:shadow-md">
                            <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-[#E0D6C8] text-[#5C4033]">
                                <Layers className="h-6 w-6" />
                            </div>
                            <h3 className="mb-2 text-xl font-bold text-foreground">
                                Instant Flashcards &amp; Quizzes
                            </h3>
                            <p className="text-sm leading-relaxed text-muted-foreground">
                                Upload PDFs, recordings, or notes to get
                                spaced-repetition flashcards and mock exams in
                                seconds.
                            </p>
                        </div>

                        <div className="feature-card-item rounded-3xl border border-border/50 bg-white p-7 shadow-sm transition-shadow hover:shadow-md">
                            <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-[#EAE4D9] text-[#8B5E3C]">
                                <MonitorPlay className="h-6 w-6" />
                            </div>
                            <h3 className="mb-2 text-xl font-bold text-foreground">
                                24/7 AI Tutor Support
                            </h3>
                            <p className="text-sm leading-relaxed text-muted-foreground">
                                Ask tough questions, get simplified analogies,
                                and understand complex equations step by step.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
