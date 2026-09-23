import { Link, usePage, router } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';
import { usePageTransition } from '@/hooks/use-anime';
import { OriginButton } from '@/components/ui/origin-button';
import { ChevronLeft } from 'lucide-react';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    const { url } = usePage();
    const containerRef = usePageTransition<HTMLDivElement>(url, {
        duration: 550,
        yOffset: 20,
    });

    const handleBack = () => {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            router.visit(home());
        }
    };

    return (
        <div ref={containerRef} key={url} className="relative flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10 will-change-[opacity,transform]">

            {/* Back Button */}
            <div className="absolute left-6 top-6 md:left-10 md:top-10">
                <OriginButton 
                    onClick={handleBack} 
                    className="!h-12 !w-12 !rounded-full !px-0"
                    aria-label="Go back"
                >
                    <ChevronLeft className="size-5" />
                </OriginButton>
            </div>

            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-4">
                        <Link
                            href={home()}
                            className="flex flex-col items-center gap-2 font-medium"
                        >
                            <div className="mb-1 flex h-9 w-9 items-center justify-center rounded-md">
                                <AppLogoIcon className="size-9 fill-current text-[var(--foreground)] dark:text-white" />
                            </div>
                            <span className="sr-only">{title}</span>
                        </Link>

                        <div className="space-y-2 text-center">
                            <h1 className="text-xl font-medium">{title}</h1>
                            <p className="text-center text-sm text-muted-foreground">
                                {description}
                            </p>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}

