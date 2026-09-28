import { Head, router, usePage } from '@inertiajs/react';
import { SignInPage, Testimonial } from '@/components/ui/sign-in';
import { store } from '@/routes/login';
import { register } from '@/routes';
import { request } from '@/routes/password';

type Props = {
    status?: string;
    canResetPassword: boolean;
};

export default function Login({ status, canResetPassword }: Props) {
    const { errors } = usePage().props;

    const handleSignIn = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());

        // Map rememberMe to remember for Laravel
        const payload = {
            email: data.email,
            password: data.password,
            remember: data.rememberMe === 'on' ? true : false,
        };

        router.post(store.url(), payload);
    };

    const handleGoogleSignIn = () => {
        window.location.href = '/auth/google'; // Adjust if there's a specific route
    };

    const handleResetPassword = () => {
        router.visit(request());
    };

    const handleCreateAccount = () => {
        router.visit(register());
    };

    return (
        <div className="page-transition-enter h-[100dvh] overflow-hidden bg-background text-foreground">
            <Head title="Welcome back" />

            <SignInPage
                heroImageSrc="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
                onSignIn={handleSignIn}
                onGoogleSignIn={handleGoogleSignIn}
                onResetPassword={
                    canResetPassword ? handleResetPassword : undefined
                }
                onCreateAccount={handleCreateAccount}
                errors={errors}
            />

            {status && (
                <div className="absolute top-4 left-1/2 mb-4 -translate-x-1/2 rounded bg-green-50 p-2 text-center text-sm font-medium text-green-600 shadow">
                    {status}
                </div>
            )}
        </div>
    );
}

// Remove the explicit layout so the SignInPage can use the full viewport on its own
// since it renders `h-[100dvh] w-[100dvw]` inside.
Login.layout = (page: any) => page;
