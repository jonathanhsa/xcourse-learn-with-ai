import { Link } from '@inertiajs/react';
import { 
    BookOpen, FolderGit2, LayoutGrid, 
    Sparkles, Calendar, TrendingUp, Library, 
    Brain, Settings, Layers 
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: typeof dashboard === 'function' ? (dashboard as any).url?.() || dashboard() : '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'AI Agents',
        href: '/ai-agents',
        icon: Sparkles,
    },
    {
        title: 'Study Calendar',
        href: '#calendar',
        icon: Calendar,
    },
    {
        title: 'Track Record',
        href: '#analytics',
        icon: TrendingUp,
    },
    {
        title: 'Material Repository',
        href: '#repository',
        icon: Library,
    },
    {
        title: 'Quizzes & Flashcards',
        href: '#practice',
        icon: Brain,
    },
    {
        title: 'Focus Sessions',
        href: '#focus',
        icon: Layers,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton 
                            size="lg" 
                            render={<Link href={typeof dashboard === 'function' ? (dashboard as any).url?.() || dashboard() : '/dashboard'} prefetch />}
                        >
                            <AppLogo />
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
