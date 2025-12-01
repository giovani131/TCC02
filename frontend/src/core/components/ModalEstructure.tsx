interface ModalEstructureProps {
  children: React.ReactNode;
}

export function ModalEscructure({ children }: ModalEstructureProps) {
  return (
    <div
      className="
        w-full max-w-5xl max-h-[90vh]
        overflow-y-auto no-scrollbar
        rounded-3xl
        border border-white/20
        bg-gradient-to-br from-white/80 via-white/70 to-white/40
        shadow-[0_18px_50px_rgba(0,0,0,0.35)]
        backdrop-blur-xl
        p-6
        relative
        animate-[modalIn_0.22s_ease-out]
      "
    >
      {children}
    </div>
  );
}
