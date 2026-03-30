type SectionFallbackProps = {
  title: string;
  message?: string;
  className?: string;
  id?: string;
};

export function SectionFallback({
  title,
  message = "This section is temporarily unavailable.",
  className = "retro-card",
  id,
}: SectionFallbackProps) {
  return (
    <section className={className} id={id}>
      <h2>{title}</h2>
      <p>{message}</p>
    </section>
  );
}
