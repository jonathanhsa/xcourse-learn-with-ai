import { Head, router } from '@inertiajs/react';
import { SignInPage, GlassInputWrapper, Testimonial } from '@/components/ui/sign-in';
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
        <p className="animate-element animate-delay-900 text-center text-sm text-muted-foreground mt-4">
            Remember your account? <a href="#" onClick={(e) => { e.preventDefault(); router.visit(login()); }} className="text-violet-400 hover:underline transition-colors">Log In</a>
        </p>
    );

    return (
        <div className="bg-background text-foreground min-h-screen page-transition-enter">
            <Head title="Forgot Account?" />
            
            <SignInPage
                title={<span className="font-light text-foreground tracking-tighter">Forgot Account?</span>}
                description="Enter your email to receive a recovery link."
                heroImageSrc="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
                footer={footer}
            >
                <form className="space-y-4" onSubmit={handleReset}>
                    <div className="animate-element animate-delay-300">
                        <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                        <GlassInputWrapper>
                            <input name="email" type="email" required placeholder="Enter your email address" className="w-full bg-transparent text-sm p-4 rounded-2xl focus:outline-none" />
                        </GlassInputWrapper>
                    </div>

                    <button type="submit" className="animate-element animate-delay-400 w-full rounded-2xl bg-primary py-4 font-medium text-primary-foreground hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 mt-2">
                        Send Recovery Link
                    </button>
                </form>
            </SignInPage>

            {status && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 mb-4 text-center text-sm font-medium text-green-600 bg-green-50 p-2 rounded shadow z-50">
                    {status}
                </div>
            )}
        </div>
    );
}

ForgotPassword.layout = (page: any) => page;
