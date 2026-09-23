import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import type { BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { usePageTransition } from '@/hooks/use-anime';

export default function AppLayout({
    breadcrumbs = [],
    children,
}: {
    breadcrumbs?: BreadcrumbItem[];
    children: React.ReactNode;
}) {
    const { url } = usePage();
    const containerRef = usePageTransition<HTMLDivElement>(url, {
        duration: 500,
        yOffset: 16,
    });

    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs}>
            <div
                ref={containerRef}
                key={url}
                className="h-full w-full will-change-[opacity,transform]"
            >
                {children}
            </div>
        </AppLayoutTemplate>
    );
}
