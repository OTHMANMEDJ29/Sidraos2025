// ═══════════════════════════════════════════════════════════════════════════════
// KEYBOARD SHORTCUTS HOOK
// Global keyboard shortcuts for power users
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';

interface ShortcutAction {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  action: () => void;
  description: string;
}

interface UseKeyboardShortcutsOptions {
  enabled?: boolean;
  onShortcutTriggered?: (description: string) => void;
}

export function useKeyboardShortcuts(
  options: UseKeyboardShortcutsOptions = {}
): { shortcuts: ShortcutAction[] } {
  const { enabled = true, onShortcutTriggered } = options;
  const router = useRouter();
  const { setTheme, theme } = useTheme();

  const shortcuts: ShortcutAction[] = [
    {
      key: 'k',
      ctrl: true,
      description: 'Open command palette (coming soon)',
      action: () => {
        // Will be used for command palette
        console.log('Command palette triggered');
      },
    },
    {
      key: 'd',
      ctrl: true,
      shift: true,
      description: 'Toggle dark mode',
      action: () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
      },
    },
    {
      key: 'h',
      alt: true,
      description: 'Go to home',
      action: () => router.push('/'),
    },
    {
      key: '/',
      description: 'Focus search',
      action: () => {
        const searchInput = document.querySelector<HTMLInputElement>('[data-search-input]');
        searchInput?.focus();
      },
    },
  ];

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in inputs
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        (event.target as HTMLElement)?.isContentEditable
      ) {
        return;
      }

      for (const shortcut of shortcuts) {
        const ctrlMatch = shortcut.ctrl ? event.ctrlKey || event.metaKey : !event.ctrlKey && !event.metaKey;
        const shiftMatch = shortcut.shift ? event.shiftKey : !event.shiftKey;
        const altMatch = shortcut.alt ? event.altKey : !event.altKey;
        const keyMatch = event.key.toLowerCase() === shortcut.key.toLowerCase();

        if (keyMatch && ctrlMatch && shiftMatch && altMatch) {
          event.preventDefault();
          shortcut.action();
          onShortcutTriggered?.(shortcut.description);
          break;
        }
      }
    },
    [shortcuts, onShortcutTriggered]
  );

  useEffect(() => {
    if (!enabled) return;

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enabled, handleKeyDown]);

  return { shortcuts };
}
