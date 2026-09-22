import { Head, Link, usePage } from '@inertiajs/react';
import { login, register, dashboard } from '@/routes';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

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

                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
                        <a href="#" className="hover:text-foreground transition-colors">Features</a>
                        <a href="#" className="hover:text-foreground transition-colors">Educators & Enterprise</a>
                        <a href="#" className="hover:text-foreground transition-colors">About</a>
                    </nav>

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
                    <h1 className="text-6xl md:text-8xl font-medium tracking-tight text-foreground mb-6 leading-[1.1]">
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
