import { Head, router } from '@inertiajs/react';
import {
    SignInPage,
    GlassInputWrapper,
    Testimonial,
} from '@/components/ui/sign-in';
import { email } from '@/routes/password';
import { login } from '@/routes';

export default function ForgotPassword({ status }: { status?: string }) {
    const handleReset = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());

        router.post(email.url(), data);
    };

    const footer = (
        <p className="animate-element animate-delay-900 mt-4 text-center text-sm text-muted-foreground">
            Remember your account?{' '}
            <a
                href="#"
                onClick={(e) => {
                    e.preventDefault();
                    router.visit(login());
                }}
                className="text-violet-400 transition-colors hover:underline"
            >
                Log In
            </a>
        </p>
    );

    return (
        <div className="page-transition-enter min-h-screen bg-background text-foreground">
            <Head title="Forgot Account?" />

            <SignInPage
                title={
                    <span className="font-light tracking-tighter text-foreground">
                        Forgot Account?
                    </span>
                }
                description="Enter your email to receive a recovery link."
                heroImageSrc="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
                footer={footer}
            >
                <form className="space-y-4" onSubmit={handleReset}>
                    <div className="auth-anime-item">
                        <label className="text-sm font-medium text-muted-foreground">
                            Email Address
                        </label>
                        <GlassInputWrapper>
                            <input
                                name="email"
                                type="email"
                                required
                                placeholder="Enter your email address"
                                className="w-full rounded-2xl bg-transparent p-4 text-sm focus:outline-none"
                            />
                        </GlassInputWrapper>
                    </div>

                    <button
                        type="submit"
                        className="auth-anime-item mt-2 w-full rounded-2xl bg-primary py-4 font-medium text-primary-foreground transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 hover:bg-primary/90 hover:shadow-md"
                    >
                        Send Recovery Link
                    </button>
                </form>
            </SignInPage>

            {status && (
                <div className="absolute top-4 left-1/2 z-50 mb-4 -translate-x-1/2 rounded bg-green-50 p-2 text-center text-sm font-medium text-green-600 shadow">
                    {status}
                </div>
            )}
        </div>
    );
}

ForgotPassword.layout = (page: any) => page;
