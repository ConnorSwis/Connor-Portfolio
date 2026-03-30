type RetroMarqueeProps = {
  text: string;
  reverse?: boolean;
  className?: string;
};

export function RetroMarquee({ text, reverse, className }: RetroMarqueeProps) {
  const repeatedText = `${text}   ✦   ${text}   ✦   ${text}`;
  const classes = reverse
    ? `${className ?? ""} retro-marquee reverse`.trim()
    : `${className ?? ""} retro-marquee`.trim();

  return (
    <div aria-label={text} className={classes} role="status">
      <span>{repeatedText}</span>
    </div>
  );
}
