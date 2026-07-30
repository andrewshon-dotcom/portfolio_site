type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <header
      className={`section-heading section-heading--${align} motion-reveal`}
    >
      <p className="section-eyebrow">
        <span aria-hidden="true" />
        {eyebrow}
      </p>
      <h2>{title}</h2>
      {description ? <p className="section-intro">{description}</p> : null}
    </header>
  );
}
