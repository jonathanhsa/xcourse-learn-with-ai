import { Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { dashboard } from '@/routes';
import { useStagger } from '@/hooks/use-anime';
import { Sparkles, BookOpen, Clock, Award, ArrowUpRight } from 'lucide-react';
import { animateHoverEnter, animateHoverLeave } from '@/lib/anime';

export default function Dashboard() {
    const containerRef = useStagger<HTMLDivElement>(
        '.dashboard-anime-card',
        [],
        {
            duration: 600,
            staggerMs: 80,
            yOffset: 20,
            delay: 50,
        },
    );

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        animateHoverEnter(e.currentTarget, -3, 1.01);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        animateHoverLeave(e.currentTarget);
    };

    return (
        <>
            <Head title="Dashboard" />
            <div
                ref={containerRef}
                className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4"
            >
                {/* Metric Summary Cards */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className="dashboard-anime-card relative flex aspect-video cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-sidebar-border/70 bg-card p-5 shadow-xs transition-shadow hover:shadow-md"
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                                Active Courses
                            </span>
                            <div className="flex size-8 items-center justify-center rounded-xl bg-[#F4EFE6] text-[#5C4033] dark:bg-[#36322E]">
                                <BookOpen className="size-4" />
                            </div>
                        </div>
                        <div>
                            <p className="text-3xl font-bold tracking-tight text-foreground">
                                4 Courses
                            </p>
                            <p className="mt-1 flex items-center gap-1 text-xs font-medium text-emerald-600">
                                <ArrowUpRight className="size-3.5" />
                                <span>2 exams coming up this week</span>
                            </p>
                        </div>
                    </div>

                    <div
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className="dashboard-anime-card relative flex aspect-video cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-sidebar-border/70 bg-card p-5 shadow-xs transition-shadow hover:shadow-md"
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                                Study Time
                            </span>
                            <div className="flex size-8 items-center justify-center rounded-xl bg-[#F4EFE6] text-[#7A5230] dark:bg-[#36322E]">
                                <Clock className="size-4" />
                            </div>
                        </div>
                        <div>
                            <p className="text-3xl font-bold tracking-tight text-foreground">
                                12.5 hrs
                            </p>
                            <p className="mt-1 text-xs font-medium text-muted-foreground">
                                Goal: 15 hrs / week (83% reached)
                            </p>
                        </div>
                    </div>

                    <div
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className="dashboard-anime-card relative flex aspect-video cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-sidebar-border/70 bg-card p-5 shadow-xs transition-shadow hover:shadow-md"
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                                Mastery Score
                            </span>
                            <div className="flex size-8 items-center justify-center rounded-xl bg-[#F4EFE6] text-[#8B5E3C] dark:bg-[#36322E]">
                                <Award className="size-4" />
                            </div>
                        </div>
                        <div>
                            <p className="text-3xl font-bold tracking-tight text-foreground">
                                92%
                            </p>
                            <p className="mt-1 flex items-center gap-1 text-xs font-medium text-[#5C4033]">
                                <Sparkles className="size-3.5" />
                                <span>Top 5% in your cohort</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Content Workspace Preview */}
                <div className="dashboard-anime-card relative min-h-[50vh] flex-1 overflow-hidden rounded-2xl border border-sidebar-border/70 bg-card p-6 shadow-xs">
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <h3 className="text-base font-semibold text-foreground">
                                Recent Study Activities
                            </h3>
                            <p className="text-xs text-muted-foreground">
                                Continue where you left off
                            </p>
                        </div>
                    </div>
                    <div className="relative flex h-64 items-center justify-center overflow-hidden rounded-xl border border-dashed border-border/60">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/10 dark:stroke-neutral-100/10" />
                        <div className="relative z-10 text-center">
                            <p className="text-sm font-semibold text-foreground">
                                Ready to start studying?
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Generate notes or start a practice quiz
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
