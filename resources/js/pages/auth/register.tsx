import { Head, router } from '@inertiajs/react';
import { SignInPage, GlassInputWrapper, Testimonial } from '@/components/ui/sign-in';
import { store } from '@/routes/register';
import { login } from '@/routes';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

type Props = {
    passwordRules: string;
};

export default function Register({ passwordRules }: Props) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());
        
        router.post(store.url(), data);
    };

    const footer = (
        <p className="animate-element animate-delay-900 text-center text-sm text-muted-foreground mt-4">
            Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); router.visit(login()); }} className="text-violet-400 hover:underline transition-colors">Log In</a>
        </p>
    );

    return (
        <div className="bg-background text-foreground min-h-screen page-transition-enter">
            <Head title="Create an account" />
            
            <SignInPage
                title={<span className="font-light text-foreground tracking-tighter">Create Account</span>}
                description="Join us and start your journey today"
                heroImageSrc="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
                footer={footer}
            >
                <form className="space-y-4" onSubmit={handleRegister}>
                    <div className="auth-anime-item">
                        <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                        <GlassInputWrapper>
                            <input name="email" type="email" required placeholder="Enter your email address" className="w-full bg-transparent text-sm p-4 rounded-2xl focus:outline-none" />
                        </GlassInputWrapper>
                    </div>

                    <div className="auth-anime-item">
                        <label className="text-sm font-medium text-muted-foreground">Password</label>
                        <GlassInputWrapper>
                            <div className="relative">
                                <input name="password" required type={showPassword ? 'text' : 'password'} placeholder="Create a password" className="w-full bg-transparent text-sm p-4 pr-12 rounded-2xl focus:outline-none" />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-3 flex items-center">
                                    {showPassword ? <EyeOff className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" /> : <Eye className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />}
                                </button>
                            </div>
                        </GlassInputWrapper>
                    </div>

                    <div className="auth-anime-item">
                        <label className="text-sm font-medium text-muted-foreground">Confirm Password</label>
                        <GlassInputWrapper>
                            <div className="relative">
                                <input name="password_confirmation" required type={showConfirmPassword ? 'text' : 'password'} placeholder="Confirm your password" className="w-full bg-transparent text-sm p-4 pr-12 rounded-2xl focus:outline-none" />
                                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-3 flex items-center">
                                    {showConfirmPassword ? <EyeOff className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" /> : <Eye className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />}
                                </button>
                            </div>
                        </GlassInputWrapper>
                    </div>

                    <button 
                        type="submit" 
                        className="auth-anime-item w-full rounded-2xl bg-primary py-4 font-medium text-primary-foreground hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 mt-2"
                    >
                        Create Account
                    </button>
                </form>
            </SignInPage>
        </div>
    );
}

Register.layout = (page: any) => page;
