import { Link, usePage } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';
import { usePageTransition } from '@/hooks/use-anime';

export default function AuthSplitLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    const { name } = usePage().props;
    const containerRef = usePageTransition<HTMLDivElement>(title, {
        duration: 550,
        yOffset: 20,
    });

    return (
        <div ref={containerRef} className="relative grid h-dvh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0 will-change-[opacity,transform]">

            <div className="relative flex h-full flex-col bg-white pt-8 pb-8 px-4 sm:px-8">
                <div className="flex-1 flex flex-col justify-center mx-auto w-full sm:w-[350px] space-y-6">
                    <Link
                        href={home()}
                        className="mx-auto flex flex-col items-center justify-center"
                    >
                        {/* Placeholder for the logo from the design */}
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 shadow-sm border border-primary/20">
                            <div className="h-4 w-4 rounded-full bg-primary"></div>
                        </div>
                    </Link>
                    <div className="flex flex-col items-center text-center gap-2">
                        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">{title}</h1>
                        <p className="text-sm text-gray-500">
                            {description}
                        </p>
                    </div>
                    {children}
                </div>
                <div className="absolute bottom-6 left-8 text-sm text-gray-500">
                    &copy; Untitled UI 2077
                </div>
            </div>
            <div className="relative hidden h-full flex-col bg-muted lg:flex">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-purple-300 to-purple-600">
                    <img 
                        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" 
                        alt="Abstract background" 
                        className="h-full w-full object-cover opacity-80 mix-blend-overlay"
                    />
                </div>
            </div>
        </div>
    );
}

