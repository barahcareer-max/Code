import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  label?: string;
  className?: string;
  aspect?: "video" | "square" | "portrait" | "photo";
};

/**
 * Renders a styled placeholder that references an image path that you can
 * later drop into /public. If the image is missing the decorative gradient
 * and label act as a graceful fallback.
 */
export function ImagePlaceholder({
  src,
  alt,
  label,
  className,
  aspect = "video",
}: Props) {
  const aspectClass = {
    video: "aspect-video",
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    photo: "aspect-[4/3]",
  }[aspect];

  return (
    <div
      className={cn(
        "image-placeholder relative overflow-hidden rounded-lg flex items-center justify-center",
        aspectClass,
        className,
      )}
      role="img"
      aria-label={alt}
      data-src={src}
    >
      {label && (
        <span className="text-white/90 text-sm font-medium tracking-wide uppercase">
          {label}
        </span>
      )}
    </div>
  );
}
