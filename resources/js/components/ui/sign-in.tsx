import React, { useState, useEffect, useRef } from 'react';
import { Eye, EyeOff, ChevronLeft, Bell, X } from 'lucide-react';
import { animateStagger, animateFloat, animatePageEntrance, animateClickPop, animate } from '@/lib/anime';
import { router } from '@inertiajs/react';
import { home } from '@/routes';
import { OriginButton } from '@/components/ui/origin-button';

// --- HELPER COMPONENTS (ICONS) ---

const GoogleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s12-5.373 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-2.641-.21-5.236-.611-7.743z" />
        <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
        <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
        <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.022 35.026 44 30.038 44 24c0-2.641-.21-5.236-.611-7.743z" />
    </svg>
);


// --- TYPE DEFINITIONS ---

export interface Testimonial {
  avatarSrc: string;
  name: string;
  handle: string;
  text: string;
}

export interface SignInPageProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  heroImageSrc?: string;
  testimonials?: Testimonial[];
  onSignIn?: (event: React.FormEvent<HTMLFormElement>) => void;
  onGoogleSignIn?: () => void;
  onResetPassword?: () => void;
  onCreateAccount?: () => void;
  errors?: Partial<Record<string, string>>;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  hideBackButton?: boolean;
}

// --- SUB-COMPONENTS ---

export const GlassInputWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-2xl border border-border bg-card transition-colors focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20 shadow-sm">
    {children}
  </div>
);

const TestimonialCard = ({ testimonial, delay }: { testimonial: Testimonial, delay: string }) => (
  <div className={`flex items-start gap-3 rounded-3xl bg-card/60 dark:bg-zinc-800/60 backdrop-blur-xl border border-white/20 p-5 w-64 shadow-xl`}>
    <img src={testimonial.avatarSrc} className="h-10 w-10 object-cover rounded-2xl" alt="avatar" />
    <div className="text-sm leading-snug">
      <p className="flex items-center gap-1 font-medium">{testimonial.name}</p>
      <p className="text-muted-foreground">{testimonial.handle}</p>
      <p className="mt-1 text-foreground/80">{testimonial.text}</p>
    </div>
  </div>
);

export function ErrorToast({ message, onClose }: { message: string, onClose: () => void }) {
    const toastRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (toastRef.current) {
            animate(toastRef.current, {
                translateY: [50, 0],
                opacity: [0, 1],
                duration: 600,
                ease: 'outBack',
            });
        }
    }, []);

    const handleClose = () => {
        if (toastRef.current) {
            animate(toastRef.current, {
                translateY: [0, 50],
                opacity: [1, 0],
                duration: 300,
                ease: 'inQuad',
                onComplete: onClose,
            });
        } else {
            onClose();
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100]">
            <div ref={toastRef} className="w-[380px] rounded-3xl bg-card border border-border p-6 text-foreground shadow-2xl relative">
                <div className="flex items-start gap-4 mb-5">
                    <div className="flex-1">
                        <h3 className="text-xl font-bold mb-1.5 text-foreground">Validation Error</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {message}
                        </p>
                    </div>
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                        <Bell className="h-6 w-6 animate-ring-subtle" />
                    </div>
                </div>

                <button 
                    type="button"
                    onClick={handleClose}
                    className="w-full rounded-2xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[0.98] active:scale-95 hover:bg-primary/90 shadow-md"
                >
                    Okay, I Understand
                </button>
            </div>
        </div>
    );
}

// --- MAIN COMPONENT ---

export const SignInPage: React.FC<SignInPageProps & { footer?: React.ReactNode }> = ({
  title = <span className="font-light text-foreground tracking-tighter">Welcome</span>,
  description = "Access your account and continue your journey with us",
  heroImageSrc,
  testimonials = [],
  onSignIn,
  onGoogleSignIn,
  onResetPassword,
  onCreateAccount,
  errors = {},
  children,
  footer,
  hideBackButton = false
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [toastError, setToastError] = useState<string | null>(null);
  const formSectionRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const testimonialContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (errors && Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0];
      if (firstError) {
        setToastError(firstError as string);
      }
    }
  }, [errors]);

  useEffect(() => {
    // Stagger entrance on form elements
    if (formSectionRef.current) {
      const items = formSectionRef.current.querySelectorAll('.auth-anime-item');
      if (items.length > 0) {
        animateStagger(items, {
          duration: 650,
          staggerMs: 70,
          yOffset: 20,
          delay: 50,
        });
      }
    }

    // Hero image reveal
    if (heroImageRef.current) {
      animatePageEntrance(heroImageRef.current, {
        duration: 800,
        yOffset: 0,
        scale: 0.96,
        delay: 200,
      });
    }

    // Float testimonial card if present
    let anim: any;
    if (testimonialContainerRef.current) {
      anim = animateFloat(testimonialContainerRef.current, {
        yDistance: 8,
        rotate: 1,
        duration: 3600,
        delay: 500,
      });
    }

    return () => {
      if (anim && typeof anim.revert === 'function') anim.revert();
    };
  }, []);

  const defaultFooter = (
    <>
      <div className="auth-anime-item relative flex items-center justify-center mt-2">
        <span className="w-full border-t border-border"></span>
        <span className="px-4 text-sm text-muted-foreground bg-background absolute">Or continue with</span>
      </div>

      <button 
        onClick={(e) => {
          onGoogleSignIn?.();
        }} 
        type="button" 
        className="auth-anime-item w-full flex items-center justify-center gap-3 border border-border rounded-2xl py-4 hover:bg-secondary hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 hover:shadow-md transition-all duration-200 mt-2"
      >
          <GoogleIcon />
          Continue with Google
      </button>

      <p className="auth-anime-item text-center text-sm text-muted-foreground mt-4">
        New to our platform? <a href="#" onClick={(e) => { e.preventDefault(); onCreateAccount?.(); }} className="text-primary hover:underline hover:text-primary/80 transition-colors font-medium">Create Account</a>
      </p>
    </>
  );

  const handleBack = () => {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        router.visit(home());
    }
  };

  return (
    <div className="relative h-[100dvh] flex flex-col md:flex-row w-full overflow-hidden">
      {/* Back Button */}
      {!hideBackButton && (
          <div className="absolute left-6 top-6 md:left-10 md:top-10 z-50">
              <OriginButton 
                  onClick={handleBack} 
                  className="!h-12 !w-12 !rounded-full !px-0 shadow-sm"
                  aria-label="Go back"
              >
                  <ChevronLeft className="size-5" />
              </OriginButton>
          </div>
      )}

      {/* Left column: sign-in form */}
      <section className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
        <div ref={formSectionRef} className="w-full max-w-md">
          <div className="flex flex-col gap-6">
            <h1 className="auth-anime-item text-4xl md:text-5xl font-semibold leading-tight">{title}</h1>
            <p className="auth-anime-item text-muted-foreground">{description}</p>

            {children ? (
               children
            ) : (
                <form className="space-y-5" onSubmit={onSignIn} noValidate>
                  <div className="auth-anime-item">
                    <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                    <GlassInputWrapper>
                      <input name="email" type="email" placeholder="Enter your email address" className="w-full bg-transparent text-sm p-4 rounded-2xl focus:outline-none" />
                    </GlassInputWrapper>
                    {errors?.email && <p className="text-sm text-red-500 mt-1.5 ml-1">{errors.email}</p>}
                  </div>

                  <div className="auth-anime-item">
                    <label className="text-sm font-medium text-muted-foreground">Password</label>
                    <GlassInputWrapper>
                      <div className="relative">
                        <input name="password" type={showPassword ? 'text' : 'password'} placeholder="Enter your password" className="w-full bg-transparent text-sm p-4 pr-12 rounded-2xl focus:outline-none" />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-3 flex items-center">
                          {showPassword ? <EyeOff className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" /> : <Eye className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />}
                        </button>
                      </div>
                    </GlassInputWrapper>
                    {errors?.password && <p className="text-sm text-red-500 mt-1.5 ml-1">{errors.password}</p>}
                  </div>

                  <div className="auth-anime-item flex items-center justify-between text-sm">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" name="rememberMe" className="custom-checkbox" />
                      <span className="text-foreground/90">Keep me signed in</span>
                    </label>
                    <a href="#" onClick={(e) => { e.preventDefault(); onResetPassword?.(); }} className="hover:underline text-primary hover:text-primary/80 transition-colors">Reset password</a>
                  </div>

                  <button 
                    type="submit" 
                    className="auth-anime-item w-full rounded-2xl bg-primary py-4 font-medium text-primary-foreground hover:bg-primary/90 hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 hover:shadow-md transition-all duration-200"
                  >
                    Sign In
                  </button>
                </form>
            )}

            {footer !== undefined ? footer : defaultFooter}
          </div>
        </div>
      </section>

      {/* Right column: hero image + testimonials */}
      {heroImageSrc && (
        <section className="hidden md:block flex-1 relative p-4">
          <div 
            ref={heroImageRef}
            className="absolute inset-4 rounded-3xl bg-cover bg-center shadow-2xl" 
            style={{ backgroundImage: `url(${heroImageSrc})` }}
          ></div>
          {testimonials.length > 0 && (
            <div 
              ref={testimonialContainerRef}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 px-8 w-full justify-center z-20"
            >
              <TestimonialCard testimonial={testimonials[0]} delay="animate-delay-1000" />
              {testimonials[1] && <div className="hidden xl:flex"><TestimonialCard testimonial={testimonials[1]} delay="animate-delay-1200" /></div>}
              {testimonials[2] && <div className="hidden 2xl:flex"><TestimonialCard testimonial={testimonials[2]} delay="animate-delay-1400" /></div>}
            </div>
          )}
        </section>
      )}

      {toastError && <ErrorToast message={toastError} onClose={() => setToastError(null)} />}
    </div>
  );
};



