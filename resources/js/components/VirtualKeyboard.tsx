import React, { useEffect, useRef } from 'react';

// 60% Layout (no numpad, no arrows as requested)
const KEYBOARD_LAYOUT = [
    // Row 1
    [
        { code: 'Escape', label: 'Esc' },
        { code: 'Digit1', label: '1' },
        { code: 'Digit2', label: '2' },
        { code: 'Digit3', label: '3' },
        { code: 'Digit4', label: '4' },
        { code: 'Digit5', label: '5' },
        { code: 'Digit6', label: '6' },
        { code: 'Digit7', label: '7' },
        { code: 'Digit8', label: '8' },
        { code: 'Digit9', label: '9' },
        { code: 'Digit0', label: '0' },
        { code: 'Minus', label: '-' },
        { code: 'Equal', label: '=' },
        { code: 'Backspace', label: 'Backspace', width: 2 },
    ],
    // Row 2
    [
        { code: 'Tab', label: 'Tab', width: 1.5 },
        { code: 'KeyQ', label: 'Q' },
        { code: 'KeyW', label: 'W' },
        { code: 'KeyE', label: 'E' },
        { code: 'KeyR', label: 'R' },
        { code: 'KeyT', label: 'T' },
        { code: 'KeyY', label: 'Y' },
        { code: 'KeyU', label: 'U' },
        { code: 'KeyI', label: 'I' },
        { code: 'KeyO', label: 'O' },
        { code: 'KeyP', label: 'P' },
        { code: 'BracketLeft', label: '[' },
        { code: 'BracketRight', label: ']' },
        { code: 'Backslash', label: '\\', width: 1.5 },
    ],
    // Row 3
    [
        { code: 'CapsLock', label: 'Caps', width: 1.75 },
        { code: 'KeyA', label: 'A' },
        { code: 'KeyS', label: 'S' },
        { code: 'KeyD', label: 'D' },
        { code: 'KeyF', label: 'F' },
        { code: 'KeyG', label: 'G' },
        { code: 'KeyH', label: 'H' },
        { code: 'KeyJ', label: 'J' },
        { code: 'KeyK', label: 'K' },
        { code: 'KeyL', label: 'L' },
        { code: 'Semicolon', label: ';' },
        { code: 'Quote', label: "'" },
        { code: 'Enter', label: 'Enter', width: 2.25 },
    ],
    // Row 4
    [
        { code: 'ShiftLeft', label: 'Shift', width: 2.25 },
        { code: 'KeyZ', label: 'Z' },
        { code: 'KeyX', label: 'X' },
        { code: 'KeyC', label: 'C' },
        { code: 'KeyV', label: 'V' },
        { code: 'KeyB', label: 'B' },
        { code: 'KeyN', label: 'N' },
        { code: 'KeyM', label: 'M' },
        { code: 'Comma', label: ',' },
        { code: 'Period', label: '.' },
        { code: 'Slash', label: '/' },
        { code: 'ShiftRight', label: 'Shift', width: 2.75 },
    ],
    // Row 5
    [
        { code: 'ControlLeft', label: 'Ctrl', width: 1.25 },
        { code: 'MetaLeft', label: 'Win', width: 1.25 },
        { code: 'AltLeft', label: 'Alt', width: 1.25 },
        { code: 'Space', label: '', width: 6.25 },
        { code: 'AltRight', label: 'Alt', width: 1.25 },
        { code: 'MetaRight', label: 'Win', width: 1.25 },
        { code: 'ContextMenu', label: 'Menu', width: 1.25 },
        { code: 'ControlRight', label: 'Ctrl', width: 1.25 },
    ],
];

export default function VirtualKeyboard() {
    const keyboardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!keyboardRef.current) return;
            const keyEl = keyboardRef.current.querySelector(
                `[data-code="${e.code}"]`,
            );
            if (keyEl) {
                keyEl.setAttribute('data-pressed', 'true');
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            if (!keyboardRef.current) return;
            const keyEl = keyboardRef.current.querySelector(
                `[data-code="${e.code}"]`,
            );
            if (keyEl) {
                keyEl.removeAttribute('data-pressed');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    return (
        <div
            className="flex w-full items-center justify-center py-10"
            style={{ perspective: '1200px' }}
        >
            {/* Keyboard Frame */}
            <div
                ref={keyboardRef}
                className="rounded-xl border-r-[4px] border-b-[8px] border-[#2A1D15] bg-gradient-to-br from-[#684A3A] via-[#5C4033] to-[#3A281E] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] ring-1 ring-white/10"
                style={{
                    transform: 'rotateX(30deg) rotateY(0deg) translateZ(0px)',
                    transformStyle: 'preserve-3d',
                    boxShadow:
                        'inset 0 2px 10px rgba(255,255,255,0.1), 0 30px 40px -10px rgba(0,0,0,0.7)',
                }}
            >
                {/* Inner Plate */}
                <div className="flex flex-col gap-1.5 rounded-lg border border-black/40 bg-[#1A120E] p-2 shadow-inner">
                    {KEYBOARD_LAYOUT.map((row, rowIndex) => (
                        <div
                            key={rowIndex}
                            className="flex justify-center gap-1.5"
                        >
                            {row.map((key) => {
                                const widthMultiplier = key.width || 1;
                                // Base size for 1U keycap
                                const baseWidth = 3.25;
                                const widthRem =
                                    baseWidth * widthMultiplier +
                                    (widthMultiplier - 1) * 0.375; // Account for gap

                                return (
                                    <div
                                        key={key.code}
                                        data-code={key.code}
                                        className="group relative transition-transform duration-100 ease-out select-none"
                                        style={{
                                            width: `${widthRem}rem`,
                                            height: '3.25rem',
                                        }}
                                    >
                                        {/*
                                          Keycap base (shadow/thickness)
                                          data-pressed state handled by direct CSS selection to avoid React re-renders
                                        */}
                                        <div className="absolute inset-0 rounded-md bg-gradient-to-b from-[#D4C5B0] to-[#A3947F] shadow-[0_4px_0_#8B7E6B,0_6px_8px_rgba(0,0,0,0.4)] transition-all duration-100 ease-out group-data-[pressed=true]:translate-y-[4px] group-data-[pressed=true]:shadow-[0_0px_0_#8B7E6B,0_1px_2px_rgba(0,0,0,0.4)]">
                                            {/* Keycap top surface */}
                                            <div className="absolute top-[1px] right-[2px] bottom-[4px] left-[2px] flex items-center justify-center rounded-[4px] border border-[#FFF9F0]/50 bg-gradient-to-b from-[#F4EFE6] to-[#E9E3D6] px-2 transition-colors duration-100 group-data-[pressed=true]:bg-gradient-to-b group-data-[pressed=true]:from-[#E9E3D6] group-data-[pressed=true]:to-[#DCD3C3]">
                                                <span className="pointer-events-none font-sans text-[13px] font-semibold tracking-wide text-[#4A453F]">
                                                    {key.label}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
