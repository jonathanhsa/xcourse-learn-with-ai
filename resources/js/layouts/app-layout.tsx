import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import type { BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';

export default function AppLayout({
    breadcrumbs = [],
    children,
}: {
    breadcrumbs?: BreadcrumbItem[];
    children: React.ReactNode;
}) {
    const { url } = usePage();
    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs}>
            <div key={url} className="page-transition-enter h-full w-full">
                {children}
            </div>
        </AppLayoutTemplate>
    );
}
