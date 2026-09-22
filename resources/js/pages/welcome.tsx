import { Head, Link, usePage } from '@inertiajs/react';
import { login, register, dashboard } from '@/routes';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
    CalendarCheck, Mic, FileText, Calendar, 
    MonitorPlay, MessageSquare, Image as ImageIcon, Headphones, PlaySquare,
    Layers, Target, Gamepad2, FileQuestion, FileCheck,
    Puzzle, LayoutGrid
} from 'lucide-react';

export default function Welcome() {
    const { auth } = usePage().props;
    const [isScrolled, setIsScrolled] = useState(false);

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

    return (
        <div className="min-h-[200vh] bg-[#F5F5F7] text-foreground font-sans overflow-x-hidden">
            <Head title="xcourse - Learning that adapts to you" />
            
            {/* Navbar */}
            <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none px-4 md:px-0">
                <header 
                    className={`pointer-events-auto flex items-center justify-between overflow-hidden bg-white/70 backdrop-blur-xl border border-border/40 shadow-sm transition-all duration-700 ease-in-out ${
                        isScrolled 
                        ? 'w-full max-w-full h-16 rounded-none mt-0 px-6 md:px-12' 
                        : 'w-full max-w-5xl h-14 rounded-[32px] mt-6 px-6'
                    }`}
                >
                    <div className="flex items-center gap-3 font-semibold text-lg tracking-tight">
                        <div className="size-8 rounded-[10px] bg-primary text-primary-foreground flex items-center justify-center font-bold shadow-sm">x</div>
                        xcourse
                    </div>

                    <div className="hidden md:flex items-center gap-1">
                        <div className="group relative">
                            <button className="bg-transparent hover:bg-black/5 text-muted-foreground group-hover:text-foreground text-sm font-medium h-9 px-4 py-2 rounded-md transition-colors">
                                Features
                            </button>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                <div className="w-[850px] p-6 grid grid-cols-4 gap-8 bg-[#F5F5F7]/95 backdrop-blur-3xl rounded-2xl shadow-2xl border border-border/30">
                                    {/* Column 1: Organize */}
                                    <div className="flex flex-col space-y-5">
                                        <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Organize</h4>
                                        <div className="flex flex-col space-y-4">
                                            <a href="#" className="group/item flex items-start gap-3">
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-100 text-purple-600 transition-colors group-hover/item:bg-purple-200">
                                                    <CalendarCheck className="h-4 w-4" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm font-semibold text-foreground leading-none">Study Plan</p>
                                                    <p className="text-xs text-muted-foreground leading-snug">Build our personalized study schedule</p>
                                                </div>
                                            </a>
                                            <a href="#" className="group/item flex items-start gap-3">
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-yellow-100 text-yellow-600 transition-colors group-hover/item:bg-yellow-200">
                                                    <Mic className="h-4 w-4" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm font-semibold text-foreground leading-none">Record Lecture</p>
                                                    <p className="text-xs text-muted-foreground leading-snug">Capture and generate enhanced notes from your lectures</p>
                                                </div>
                                            </a>
                                            <a href="#" className="group/item flex items-start gap-3">
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-yellow-100 text-yellow-600 transition-colors group-hover/item:bg-yellow-200">
                                                    <FileText className="h-4 w-4" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm font-semibold text-foreground leading-none">Notes</p>
                                                    <p className="text-xs text-muted-foreground leading-snug">Enhance your notes and material with AI</p>
                                                </div>
                                            </a>
                                            <a href="#" className="group/item flex items-start gap-3">
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-100 text-purple-600 transition-colors group-hover/item:bg-purple-200">
                                                    <Calendar className="h-4 w-4" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm font-semibold text-foreground leading-none">Calendar</p>
                                                    <p className="text-xs text-muted-foreground leading-snug">Plan out your studying with AI</p>
                                                </div>
                                            </a>
                                        </div>
                                    </div>

                                    {/* Column 2: Learn */}
                                    <div className="flex flex-col space-y-5">
                                        <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Learn</h4>
                                        <div className="flex flex-col space-y-4">
                                            <a href="#" className="group/item flex items-start gap-3">
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-100 text-purple-600 transition-colors group-hover/item:bg-purple-200">
                                                    <MonitorPlay className="h-4 w-4" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm font-semibold text-foreground leading-none">Tutor Me</p>
                                                    <p className="text-xs text-muted-foreground leading-snug">Get 1-on-1 help from your AI Tutor</p>
                                                </div>
                                            </a>
                                            <a href="#" className="group/item flex items-start gap-3">
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-pink-100 text-pink-600 transition-colors group-hover/item:bg-pink-200">
                                                    <MessageSquare className="h-4 w-4" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm font-semibold text-foreground leading-none">Text Sparky</p>
                                                    <p className="text-xs text-muted-foreground leading-snug">Study with Sparky right from iMessage</p>
                                                </div>
                                            </a>
                                            <a href="#" className="group/item flex items-start gap-3">
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-100 text-purple-600 transition-colors group-hover/item:bg-purple-200">
                                                    <ImageIcon className="h-4 w-4" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm font-semibold text-foreground leading-none">Sparky Visuals</p>
                                                    <p className="text-xs text-muted-foreground leading-snug">See visual explanations of your material</p>
                                                </div>
                                            </a>
                                            <a href="#" className="group/item flex items-start gap-3">
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-100 text-purple-600 transition-colors group-hover/item:bg-purple-200">
                                                    <Headphones className="h-4 w-4" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm font-semibold text-foreground leading-none">Audio Recap</p>
                                                    <p className="text-xs text-muted-foreground leading-snug">Listen to summaries of your material</p>
                                                </div>
                                            </a>
                                            <a href="#" className="group/item flex items-start gap-3">
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-pink-100 text-pink-600 transition-colors group-hover/item:bg-pink-200">
                                                    <PlaySquare className="h-4 w-4" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm font-semibold text-foreground leading-none">Explainer Video</p>
                                                    <p className="text-xs text-muted-foreground leading-snug">Watch AI-generated learning videos</p>
                                                </div>
                                            </a>
                                        </div>
                                    </div>

                                    {/* Column 3: Practice & Test */}
                                    <div className="flex flex-col space-y-5">
                                        <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Practice &amp; Test</h4>
                                        <div className="flex flex-col space-y-4">
                                            <a href="#" className="group/item flex items-start gap-3">
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-600 transition-colors group-hover/item:bg-green-200">
                                                    <Layers className="h-4 w-4" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm font-semibold text-foreground leading-none">Flashcards</p>
                                                    <p className="text-xs text-muted-foreground leading-snug">Practice with automatically generated flashcards</p>
                                                </div>
                                            </a>
                                            <a href="#" className="group/item flex items-start gap-3">
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600 transition-colors group-hover/item:bg-blue-200">
                                                    <Target className="h-4 w-4" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm font-semibold text-foreground leading-none">QuizFetch</p>
                                                    <p className="text-xs text-muted-foreground leading-snug">Auto-generated quizzes from your material</p>
                                                </div>
                                            </a>
                                            <a href="#" className="group/item flex items-start gap-3">
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-600 transition-colors group-hover/item:bg-green-200">
                                                    <Gamepad2 className="h-4 w-4" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm font-semibold text-foreground leading-none">Arcade</p>
                                                    <p className="text-xs text-muted-foreground leading-snug">Learn through interactive games</p>
                                                </div>
                                            </a>
                                            <a href="#" className="group/item flex items-start gap-3">
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600 transition-colors group-hover/item:bg-blue-200">
                                                    <FileQuestion className="h-4 w-4" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm font-semibold text-foreground leading-none">Exam-Specific Questions</p>
                                                    <p className="text-xs text-muted-foreground leading-snug">Practice with real exam formats</p>
                                                </div>
                                            </a>
                                            <a href="#" className="group/item flex items-start gap-3">
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600 transition-colors group-hover/item:bg-blue-200">
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
                                            <a href="#" className="group/item flex items-start gap-3">
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition-colors group-hover/item:bg-gray-200">
                                                    <Puzzle className="h-4 w-4" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm font-semibold text-foreground leading-none">Plugins</p>
                                                    <p className="text-xs text-muted-foreground leading-snug">Shape the way Sparky teaches you</p>
                                                </div>
                                            </a>
                                            <a href="#" className="group/item flex items-start gap-3">
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition-colors group-hover/item:bg-gray-200">
                                                    <LayoutGrid className="h-4 w-4" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm font-semibold text-foreground leading-none flex items-center gap-2">
                                                        Mini Apps
                                                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-yellow-200 text-yellow-800">NEW</span>
                                                    </p>
                                                    <p className="text-xs text-muted-foreground leading-snug">Explore interactive study apps or build your own</p>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-2 hover:bg-black/5 rounded-md">Educators & Enterprise</a>
                        <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-2 hover:bg-black/5 rounded-md">About</a>
                    </div>

                    <div className="flex items-center gap-4">
                        {auth.user ? (
                            <Link href={dashboard()}>
                                <Button className="rounded-full px-5 font-semibold bg-foreground text-background hover:bg-foreground/90 transition-all duration-300">Dashboard</Button>
                            </Link>
                        ) : (
                            <>
                                <Link href={login()} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden sm:block">
                                    Login
                                </Link>
                                <Link href={register()}>
                                    <Button className="rounded-full px-5 font-semibold bg-foreground text-background hover:bg-foreground/90 transition-all duration-300">Start for Free</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </header>
            </div>

            {/* Hero Section */}
            <main className="page-transition-enter pt-40 md:pt-48 pb-20 px-6 flex flex-col items-center text-center">
                <div className="max-w-4xl animate-element animate-delay-100 flex flex-col items-center">
                    <h1 className="text-6xl md:text-8xl font-heading font-medium tracking-tight text-foreground mb-6 leading-[1.1]">
                        Learning that <br />
                        <span className="italic font-serif text-foreground/90">adapts to you</span>
                    </h1>
                    
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                        The trusted AI learning platform for students. xcourse evolves your course materials into content you'll actually like to learn from.
                    </p>

                    <Link href={register()}>
                        <Button size="lg" className="rounded-full text-base px-8 h-14 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            Try for free
                        </Button>
                    </Link>
                </div>

                {/* Decorative Elements */}
                <div className="w-full max-w-5xl mt-24 relative h-[300px] md:h-[600px] rounded-[2rem] bg-white border border-border/50 shadow-xl overflow-hidden animate-element animate-delay-300 flex items-center justify-center">
                     <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10"></div>
                     <span className="relative z-10 text-muted-foreground font-medium text-lg">Interactive Platform Preview</span>
                     
                     {/* Floating mock elements for visual interest */}
                     <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-2xl shadow-lg opacity-80 rotate-[-5deg] blur-[1px]"></div>
                     <div className="absolute bottom-20 right-20 w-48 h-32 bg-white rounded-2xl shadow-lg opacity-80 rotate-[5deg] blur-[1px]"></div>
                </div>
            </main>
        </div>
    );
}
