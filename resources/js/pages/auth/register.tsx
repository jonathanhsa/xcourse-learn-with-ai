import { Head, router, usePage } from '@inertiajs/react';
import {
    SignInPage,
    GlassInputWrapper,
    Testimonial,
} from '@/components/ui/sign-in';
import { store } from '@/routes/register';
import { login } from '@/routes';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

type Props = {
    passwordRules: string;
};

export default function Register({ passwordRules }: Props) {
    const { errors } = usePage().props;
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());

        router.post(store.url(), data);
    };

    const footer = (
        <p className="animate-element animate-delay-900 mt-4 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
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
        <div className="page-transition-enter h-[100dvh] overflow-hidden bg-background text-foreground">
            <Head title="Create an account" />

            <SignInPage
                title={
                    <span className="font-light tracking-tighter text-foreground">
                        Create Account
                    </span>
                }
                description="Join us and start your journey today"
                heroImageSrc="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
                footer={footer}
                errors={errors}
            >
                <form className="space-y-4" onSubmit={handleRegister} noValidate>
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
                        {errors?.email && (
                            <p className="mt-1.5 ml-1 text-sm text-red-500">{errors.email}</p>
                        )}
                    </div>

                    <div className="auth-anime-item">
                        <label className="text-sm font-medium text-muted-foreground">
                            Password
                        </label>
                        <GlassInputWrapper>
                            <div className="relative">
                                <input
                                    name="password"
                                    required
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Create a password"
                                    className="w-full rounded-2xl bg-transparent p-4 pr-12 text-sm focus:outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute inset-y-0 right-3 flex items-center"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-muted-foreground transition-colors hover:text-foreground" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-muted-foreground transition-colors hover:text-foreground" />
                                    )}
                                </button>
                            </div>
                        </GlassInputWrapper>
                        {errors?.password && (
                            <p className="mt-1.5 ml-1 text-sm text-red-500">{errors.password}</p>
                        )}
                    </div>

                    <div className="auth-anime-item">
                        <label className="text-sm font-medium text-muted-foreground">
                            Confirm Password
                        </label>
                        <GlassInputWrapper>
                            <div className="relative">
                                <input
                                    name="password_confirmation"
                                    required
                                    type={
                                        showConfirmPassword
                                            ? 'text'
                                            : 'password'
                                    }
                                    placeholder="Confirm your password"
                                    className="w-full rounded-2xl bg-transparent p-4 pr-12 text-sm focus:outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword,
                                        )
                                    }
                                    className="absolute inset-y-0 right-3 flex items-center"
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="h-5 w-5 text-muted-foreground transition-colors hover:text-foreground" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-muted-foreground transition-colors hover:text-foreground" />
                                    )}
                                </button>
                            </div>
                        </GlassInputWrapper>
                        {errors?.password_confirmation && (
                            <p className="mt-1.5 ml-1 text-sm text-red-500">{errors.password_confirmation}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="auth-anime-item mt-2 w-full rounded-2xl bg-primary py-4 font-medium text-primary-foreground transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 hover:bg-primary/90 hover:shadow-md"
                    >
                        Create Account
                    </button>
                </form>
            </SignInPage>
        </div>
    );
}

Register.layout = (page: any) => page;
