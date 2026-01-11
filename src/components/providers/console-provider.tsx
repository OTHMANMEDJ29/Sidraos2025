// ═══════════════════════════════════════════════════════════════════════════════
// CONSOLE PROVIDER
// Initializes the console easter egg for developers
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import { useEffect } from 'react';
import { initConsoleEasterEgg } from '@/lib/console-easter-egg';

export function ConsoleProvider({ children }: { children: React.ReactNode }): React.ReactElement {
  useEffect(() => {
    initConsoleEasterEgg();
  }, []);

  return <>{children}</>;
}
