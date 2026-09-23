import { Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { dashboard } from '@/routes';
import { useStagger } from '@/hooks/use-anime';
import { Sparkles, BookOpen, Clock, Award, ArrowUpRight } from 'lucide-react';
import { animateHoverEnter, animateHoverLeave } from '@/lib/anime';

export default function Dashboard() {
    const containerRef = useStagger<HTMLDivElement>('.dashboard-anime-card', [], {
        duration: 600,
        staggerMs: 80,
        yOffset: 20,
        delay: 50,
    });

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        animateHoverEnter(e.currentTarget, -3, 1.01);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        animateHoverLeave(e.currentTarget);
    };

    return (
        <>
            <Head title="Dashboard" />
            <div ref={containerRef} className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Metric Summary Cards */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div 
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className="dashboard-anime-card relative aspect-video overflow-hidden rounded-2xl border border-sidebar-border/70 bg-card p-5 flex flex-col justify-between shadow-xs transition-shadow hover:shadow-md cursor-pointer"
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Active Courses</span>
                            <div className="size-8 rounded-xl bg-[#F4EFE6] dark:bg-[#36322E] text-[#5C4033] flex items-center justify-center">
                                <BookOpen className="size-4" />
                            </div>
                        </div>
                        <div>
                            <p className="text-3xl font-bold tracking-tight text-foreground">4 Courses</p>
                            <p className="text-xs text-emerald-600 font-medium flex items-center gap-1 mt-1">
                                <ArrowUpRight className="size-3.5" />
                                <span>2 exams coming up this week</span>
                            </p>
                        </div>
                    </div>

                    <div 
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className="dashboard-anime-card relative aspect-video overflow-hidden rounded-2xl border border-sidebar-border/70 bg-card p-5 flex flex-col justify-between shadow-xs transition-shadow hover:shadow-md cursor-pointer"
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Study Time</span>
                            <div className="size-8 rounded-xl bg-[#F4EFE6] dark:bg-[#36322E] text-[#7A5230] flex items-center justify-center">
                                <Clock className="size-4" />
                            </div>
                        </div>
                        <div>
                            <p className="text-3xl font-bold tracking-tight text-foreground">12.5 hrs</p>
                            <p className="text-xs text-muted-foreground font-medium mt-1">
                                Goal: 15 hrs / week (83% reached)
                            </p>
                        </div>
                    </div>

                    <div 
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className="dashboard-anime-card relative aspect-video overflow-hidden rounded-2xl border border-sidebar-border/70 bg-card p-5 flex flex-col justify-between shadow-xs transition-shadow hover:shadow-md cursor-pointer"
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Mastery Score</span>
                            <div className="size-8 rounded-xl bg-[#F4EFE6] dark:bg-[#36322E] text-[#8B5E3C] flex items-center justify-center">
                                <Award className="size-4" />
                            </div>
                        </div>
                        <div>
                            <p className="text-3xl font-bold tracking-tight text-foreground">92%</p>
                            <p className="text-xs text-[#5C4033] font-medium flex items-center gap-1 mt-1">
                                <Sparkles className="size-3.5" />
                                <span>Top 5% in your cohort</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Content Workspace Preview */}
                <div className="dashboard-anime-card relative min-h-[50vh] flex-1 overflow-hidden rounded-2xl border border-sidebar-border/70 bg-card p-6 shadow-xs">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="text-base font-semibold text-foreground">Recent Study Activities</h3>
                            <p className="text-xs text-muted-foreground">Continue where you left off</p>
                        </div>
                    </div>
                    <div className="relative h-64 overflow-hidden rounded-xl border border-dashed border-border/60 flex items-center justify-center">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/10 dark:stroke-neutral-100/10" />
                        <div className="relative z-10 text-center">
                            <p className="text-sm font-semibold text-foreground">Ready to start studying?</p>
                            <p className="text-xs text-muted-foreground mt-1">Generate notes or start a practice quiz</p>
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

