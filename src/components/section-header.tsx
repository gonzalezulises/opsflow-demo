interface SectionHeaderProps {
  step: number;
  title: string;
  description: string;
}

export function SectionHeader({ step, title, description }: SectionHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-rizoma-green text-white text-sm font-bold">
          {step}
        </span>
        <h1 className="text-2xl font-bold font-serif text-foreground">{title}</h1>
      </div>
      <p className="text-muted-foreground ml-11">{description}</p>
    </div>
  );
}
