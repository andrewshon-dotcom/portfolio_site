import Image from "next/image";

export function HeroArtwork() {
  return (
    <figure className="hero-art hero-portrait-card">
      <span
        className="portrait-ambient portrait-ambient--lavender"
        aria-hidden="true"
      />
      <span
        className="portrait-ambient portrait-ambient--mint"
        aria-hidden="true"
      />
      <span className="portrait-orbit" aria-hidden="true" />

      <div className="portrait-glass">
        <div className="portrait-image-wrap">
          <Image
            src="/images/profile/andrew-young-shon.png"
            alt="Portrait of Andrew Young Shon"
            fill
            priority
            sizes="(max-width: 860px) 88vw, (max-width: 1199px) 38vw, 520px"
          />
          <span className="portrait-image-glow" aria-hidden="true" />
          <span className="portrait-scanline" aria-hidden="true" />
        </div>

        <figcaption className="portrait-caption">
          <span>
            <strong>Andrew Young Shon</strong>
            <small>Commerce / Full-stack</small>
          </span>
          <span className="portrait-monogram" aria-hidden="true">
            AS
          </span>
        </figcaption>
      </div>

      <span className="portrait-chip portrait-chip--status" aria-hidden="true">
        <i />
        Available
      </span>
      <span
        className="portrait-chip portrait-chip--commerce"
        aria-hidden="true"
      >
        Shopify Plus
      </span>
      <span className="portrait-frame-index" aria-hidden="true">
        Portrait / 01
      </span>
    </figure>
  );
}
