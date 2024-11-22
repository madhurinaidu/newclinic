import { ShieldCheck } from '@phosphor-icons/react/dist/ssr';

interface GrowLogoProps {
  animate?: boolean;
  scaleIn?: boolean;
}

export default function GrowLogo({
  animate = true,
  scaleIn = false,
}: GrowLogoProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 ${
        scaleIn ? 'animate-[scale-in_0.3s_ease-out]' : ''
      }`}
    >
      <div className={`w-8 h-8 text-primary ${animate ? 'animate-pulse' : ''}`}>
        <ShieldCheck size={32} weight="bold" />
      </div>
      <span className="text-3xl font-bold dark:text-white text-shadow-lg">
        Gro<span className="text-primary">w</span>
      </span>
    </div>
  );
}
