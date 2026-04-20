import { Badge } from "@/components/ui/badge";
import { ImagePlaceholder } from "@/components/image-placeholder";

export const metadata = {
  title: "Gallery",
  description:
    "Browse recent windows, doors and conservatory installations across Kent, Sussex and South London.",
};

const INSTALLS = [
  { title: "Heritage sash restoration", location: "Sevenoaks", image: "/placeholder-gallery-01.jpg" },
  { title: "Anthracite aluminium bi-fold", location: "Tonbridge", image: "/placeholder-gallery-02.jpg" },
  { title: "Edwardian conservatory", location: "Maidstone", image: "/placeholder-gallery-03.jpg" },
  { title: "Composite front door, Chartwell Green", location: "Royal Tunbridge Wells", image: "/placeholder-gallery-04.jpg" },
  { title: "Bay casement replacement", location: "Bromley", image: "/placeholder-gallery-05.jpg" },
  { title: "Orangery with lantern roof", location: "Ashford", image: "/placeholder-gallery-06.jpg" },
  { title: "Slim-frame sliding patio doors", location: "Canterbury", image: "/placeholder-gallery-07.jpg" },
  { title: "Timber casement refurbishment", location: "Rochester", image: "/placeholder-gallery-08.jpg" },
  { title: "Lean-to garden room", location: "Gravesend", image: "/placeholder-gallery-09.jpg" },
  { title: "Grey composite stable door", location: "Faversham", image: "/placeholder-gallery-10.jpg" },
  { title: "P-shaped conservatory", location: "Dartford", image: "/placeholder-gallery-11.jpg" },
  { title: "Tilt & turn whole-house refit", location: "Rye", image: "/placeholder-gallery-12.jpg" },
];

export default function GalleryPage() {
  return (
    <section className="container py-10 md:py-16">
      <div className="max-w-2xl mb-10">
        <Badge variant="accent" className="mb-3">Gallery</Badge>
        <h1 className="text-3xl md:text-4xl font-bold text-navy-900">
          Recent installations
        </h1>
        <p className="mt-3 text-navy-700">
          A selection of projects completed across the South East. Tap any tile
          to see a larger version in a future release.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {INSTALLS.map((i) => (
          <figure key={i.title} className="group">
            <ImagePlaceholder
              src={i.image}
              alt={`${i.title} in ${i.location}`}
              label={i.title}
              aspect="photo"
              className="transition-transform group-hover:scale-[1.01]"
            />
            <figcaption className="mt-2 text-sm text-navy-700">
              <strong className="text-navy-900">{i.title}</strong> · {i.location}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
