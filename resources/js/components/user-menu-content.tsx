import { Link, router } from '@inertiajs/react';
import { LogOut, Settings, Users } from 'lucide-react';
import {
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { UserInfo } from '@/components/user-info';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { logout, login } from '@/routes';
import { edit } from '@/routes/profile';
import type { User } from '@/types';

type Props = {
    user: User;
};

export function UserMenuContent({ user }: Props) {
    const cleanup = useMobileNavigation();

    const handleLogout = () => {
        cleanup();
        router.post(logout.url());
    };

    const handleChangeAccount = () => {
        cleanup();
        router.post(logout.url(), { redirect_to: login.url() });
    };

    return (
        <>
            <DropdownMenuGroup>
                <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                        <UserInfo user={user} showEmail={true} />
                    </div>
                </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem
                    render={
                        <Link
                            className="flex w-full cursor-pointer items-center"
                            href={edit.url()}
                            prefetch
                            onClick={cleanup}
                        />
                    }
                >
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={handleChangeAccount}
                    className="flex w-full cursor-pointer items-center"
                >
                    <Users className="mr-2 h-4 w-4" />
                    Change Account
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
                onClick={handleLogout}
                className="flex w-full cursor-pointer items-center text-red-600 focus:bg-red-50 focus:text-red-600 dark:focus:bg-red-950/40"
                data-test="logout-button"
            >
                <LogOut className="mr-2 h-4 w-4" />
                Log out
            </DropdownMenuItem>
        </>
    );
}
