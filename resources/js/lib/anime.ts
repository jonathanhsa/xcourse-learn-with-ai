import { animate, createTimeline, stagger } from 'animejs';

// Re-export core Anime.js functions
export { animate, createTimeline, stagger };

/**
 * Animate page entrance transition
 */
export function animatePageEntrance(
    target: HTMLElement | string,
    options: {
        duration?: number;
        yOffset?: number;
        scale?: number;
        delay?: number;
        onComplete?: () => void;
    } = {},
) {
    const {
        duration = 650,
        yOffset = 24,
        scale = 0.985,
        delay = 0,
        onComplete,
    } = options;

    return animate(target, {
        opacity: [0, 1],
        translateY: [yOffset, 0],
        scale: [scale, 1],
        ease: 'outCubic',
        duration,
        delay,
        onComplete: onComplete ? () => onComplete() : undefined,
    });
}

/**
 * Animate a list of elements with staggered entrance
 */
export function animateStagger(
    targets: HTMLElement | HTMLElement[] | NodeList | string,
    options: {
        duration?: number;
        staggerMs?: number;
        yOffset?: number;
        scale?: number;
        delay?: number;
        ease?: string;
    } = {},
) {
    const {
        duration = 600,
        staggerMs = 60,
        yOffset = 20,
        scale = 0.96,
        delay = 50,
        ease = 'outCubic',
    } = options;

    return animate(targets, {
        opacity: [0, 1],
        translateY: [yOffset, 0],
        scale: [scale, 1],
        delay: stagger(staggerMs, { start: delay }),
        duration,
        ease,
    });
}

/**
 * Continuous subtle floating/levitation animation for decorative elements
 */
export function animateFloat(
    target: HTMLElement | string,
    options: {
        yDistance?: number;
        rotate?: number;
        duration?: number;
        delay?: number;
    } = {},
) {
    const { yDistance = 8, rotate = 1.5, duration = 3200, delay = 0 } = options;

    return animate(target, {
        translateY: [-yDistance, yDistance],
        rotate: [-rotate, rotate],
        duration,
        delay,
        ease: 'inOutSine',
        loop: true,
        alternate: true,
    });
}

/**
 * Bouncy spring pop on click or interaction
 */
export function animateClickPop(target: HTMLElement) {
    return animate(target, {
        scale: [
            { to: 0.94, duration: 120, ease: 'outQuad' },
            { to: 1.04, duration: 200, ease: 'outBack(2)' },
            { to: 1, duration: 180, ease: 'outQuad' },
        ],
    });
}

/**
 * Springy hover elevation
 */
export function animateHoverEnter(
    target: HTMLElement,
    y: number = -4,
    scale: number = 1.02,
) {
    return animate(target, {
        translateY: y,
        scale,
        duration: 250,
        ease: 'outCubic',
    });
}

export function animateHoverLeave(target: HTMLElement) {
    return animate(target, {
        translateY: 0,
        scale: 1,
        duration: 300,
        ease: 'outCubic',
    });
}

/**
 * Smooth step transition for multi-step flows (e.g. Onboarding)
 */
export function animateStepTransition(
    outgoingEl: HTMLElement | null,
    incomingEl: HTMLElement | null,
    direction: 'forward' | 'backward' = 'forward',
    onComplete?: () => void,
) {
    const xDistance = direction === 'forward' ? 40 : -40;

    const tl = createTimeline({
        onComplete: onComplete ? () => onComplete() : undefined,
    });

    if (outgoingEl) {
        tl.add(outgoingEl, {
            opacity: [1, 0],
            translateX: [0, -xDistance],
            scale: [1, 0.96],
            duration: 250,
            ease: 'inCubic',
        });
    }

    if (incomingEl) {
        tl.add(
            incomingEl,
            {
                opacity: [0, 1],
                translateX: [xDistance, 0],
                scale: [0.96, 1],
                duration: 400,
                ease: 'outCubic',
            },
            outgoingEl ? '-=100' : 0,
        );
    }

    return tl;
}

/**
 * Number counter animation (for stats, percentages, etc.)
 */
export function animateCounter(
    targetEl: HTMLElement,
    start: number,
    end: number,
    options: {
        duration?: number;
        prefix?: string;
        suffix?: string;
        round?: boolean;
    } = {},
) {
    const { duration = 1200, prefix = '', suffix = '', round = true } = options;
    const obj = { value: start };

    return animate(obj, {
        value: end,
        duration,
        ease: 'outExpo',
        onUpdate: () => {
            const val = round ? Math.round(obj.value) : obj.value.toFixed(1);
            targetEl.textContent = `${prefix}${val}${suffix}`;
        },
    });
}
