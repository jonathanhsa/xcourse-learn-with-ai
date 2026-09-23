import { useEffect, useRef } from 'react';
import {
    animatePageEntrance,
    animateStagger,
    animateFloat,
    animateCounter,
} from '@/lib/anime';

/**
 * Hook to automatically animate a container on mount or when key changes
 */
export function usePageTransition<T extends HTMLElement = HTMLDivElement>(
    key?: any,
    options?: { duration?: number; yOffset?: number; delay?: number },
) {
    const ref = useRef<T>(null);

    useEffect(() => {
        if (!ref.current) return;
        const anim = animatePageEntrance(ref.current, options);
        return () => {
            if (anim && typeof anim.revert === 'function') {
                // If needed, cleanup
            }
        };
    }, [key]);

    return ref;
}

/**
 * Hook to stagger-animate child elements inside a container
 */
export function useStagger<T extends HTMLElement = HTMLDivElement>(
    selector: string = '[data-anime="item"]',
    deps: any[] = [],
    options?: {
        duration?: number;
        staggerMs?: number;
        yOffset?: number;
        delay?: number;
    },
) {
    const ref = useRef<T>(null);

    useEffect(() => {
        if (!ref.current) return;
        const items = ref.current.querySelectorAll(selector);
        if (items.length === 0) return;

        animateStagger(items, options);
    }, deps);

    return ref;
}

/**
 * Hook to apply subtle ambient floating animation to an element
 */
export function useFloating<T extends HTMLElement = HTMLDivElement>(options?: {
    yDistance?: number;
    rotate?: number;
    duration?: number;
    delay?: number;
}) {
    const ref = useRef<T>(null);

    useEffect(() => {
        if (!ref.current) return;
        const anim = animateFloat(ref.current, options);
        return () => {
            if (anim && typeof anim.revert === 'function') {
                anim.revert();
            }
        };
    }, []);

    return ref;
}

/**
 * Hook to animate number counting
 */
export function useCounter<T extends HTMLElement = HTMLSpanElement>(
    endValue: number,
    startValue: number = 0,
    options?: {
        duration?: number;
        prefix?: string;
        suffix?: string;
        round?: boolean;
    },
) {
    const ref = useRef<T>(null);

    useEffect(() => {
        if (!ref.current) return;
        animateCounter(ref.current, startValue, endValue, options);
    }, [endValue]);

    return ref;
}
