import { Head, useForm } from '@inertiajs/react';
import { SignInPage } from '@/components/ui/sign-in';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { logout } from '@/routes';
import { send } from '@/routes/verification';
import { MailCheck } from 'lucide-react';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm();

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(send.url());
    };

    const handleLogout = (e: React.MouseEvent) => {
        e.preventDefault();
        post(logout.url());
    };

    return (
        <div className="page-transition-enter h-[100dvh] overflow-hidden bg-background text-foreground">
            <Head title="Verify Email" />

            <SignInPage
                title="Check your inbox"
                description="We've sent a verification link to your email address. Please click the link to verify your account so you can continue setting up your profile."
                heroImageSrc="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2564&auto=format&fit=crop"
                footer={null}
                hideBackButton={true}
            >
                {status === 'verification-link-sent' && (
                    <div className="auth-anime-item mb-6 rounded-2xl bg-green-50 p-4 border border-green-100 flex items-start gap-3">
                        <MailCheck className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                        <p className="text-sm font-medium text-green-800 leading-relaxed">
                            A new verification link has been sent to the email address you provided during registration.
                        </p>
                    </div>
                )}

                <form onSubmit={submit} className="auth-anime-item space-y-5">
                    <Button 
                        disabled={processing} 
                        type="submit"
                        className="w-full rounded-2xl bg-primary h-14 text-base font-semibold text-primary-foreground transition-transform hover:scale-[0.98] active:scale-95 shadow-md"
                    >
                        {processing && <Spinner className="mr-2" />}
                        Resend verification email
                    </Button>

                    <div className="text-center mt-6">
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors underline-offset-4 hover:underline"
                        >
                            Log out instead
                        </button>
                    </div>
                </form>
            </SignInPage>
        </div>
    );
}

// Remove explicit layout to allow full viewport usage
VerifyEmail.layout = (page: any) => page;
