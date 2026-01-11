// ═══════════════════════════════════════════════════════════════════════════════
// CONSOLE EASTER EGG
// A creative touch for developers who open the console
// ═══════════════════════════════════════════════════════════════════════════════

export function initConsoleEasterEgg(): void {
  if (typeof window === 'undefined') return;

  // ASCII art logo
  const logo = `
%c
   ███████╗██╗██████╗ ██████╗  █████╗  ██████╗ ███████╗
   ██╔════╝██║██╔══██╗██╔══██╗██╔══██╗██╔═══██╗██╔════╝
   ███████╗██║██║  ██║██████╔╝███████║██║   ██║███████╗
   ╚════██║██║██║  ██║██╔══██╗██╔══██║██║   ██║╚════██║
   ███████║██║██████╔╝██║  ██║██║  ██║╚██████╔╝███████║
   ╚══════╝╚═╝╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝
`;

  const styles = [
    'color: #10B981; font-family: monospace; font-size: 10px;',
  ];

  console.log(logo, ...styles);

  console.log(
    '%c🌳 Welcome to SidraOS Developer Console!',
    'color: #10B981; font-size: 16px; font-weight: bold;'
  );

  console.log(
    '%c✨ Your Life, Orchestrated.',
    'color: #D4AF37; font-size: 12px; font-style: italic;'
  );

  console.log(
    '%c─────────────────────────────────────────────────',
    'color: #888;'
  );

  console.log(
    '%c🔧 Tech Stack: Next.js 15 • TypeScript • Tailwind CSS • Supabase',
    'color: #888; font-size: 11px;'
  );

  console.log(
    '%c📖 Interested in how we built this? We\'re hiring!',
    'color: #888; font-size: 11px;'
  );

  console.log(
    '%c🔗 Visit: https://sidraos.com/careers',
    'color: #10B981; font-size: 11px;'
  );

  console.log(
    '%c─────────────────────────────────────────────────',
    'color: #888;'
  );

  // Fun interactive element
  console.log(
    '%c💡 Pro tip: Press Ctrl+Shift+D to toggle dark mode!',
    'color: #F59E0B; font-size: 11px;'
  );

  // Hidden challenge for curious developers
  if (process.env.NODE_ENV === 'development') {
    console.log(
      '%c🎯 Developer Challenge: Find the hidden feature by typing sidra.reveal() in the console!',
      'color: #8B5CF6; font-size: 11px;'
    );

    // Add a hidden function to the window object
    (window as unknown as { sidra: { reveal: () => void } }).sidra = {
      reveal: () => {
        console.log(
          '%c🎉 You found it! Here\'s a secret: The Sidra tree (سدرة) is mentioned in the Quran as the Lote tree of the utmost boundary (Sidrat al-Muntaha).',
          'color: #10B981; font-size: 12px; background: #10B98110; padding: 8px; border-radius: 4px;'
        );
        console.log(
          '%c🌳 It represents the farthest point of knowledge and the closest to the Divine. That\'s why we named this project SidraOS - to help you reach your highest potential.',
          'color: #D4AF37; font-size: 11px;'
        );
      },
    };
  }
}
