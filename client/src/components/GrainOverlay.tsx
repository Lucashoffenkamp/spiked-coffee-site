/*
 * GrainOverlay — Spiked Coffee
 * Subtle film grain texture overlay for analog, artisanal feel.
 * Fixed position, covers entire viewport, pointer-events-none.
 */
export default function GrainOverlay() {
  return (
    <div
      className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.035]"
      aria-hidden="true"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
      }}
    />
  );
}
