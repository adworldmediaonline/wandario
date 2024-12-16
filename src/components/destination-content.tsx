import { IDestination } from '@/types';
import { CldImage } from 'next-cloudinary';

interface DestinationContentProps {
  destination: IDestination;
}

export default function DestinationContent({
  destination,
}: DestinationContentProps) {
  return (
    <article className="prose prose-lg max-w-none">
      <div className="relative aspect-video mb-8 rounded-xl overflow-hidden">
        <CldImage
          src={destination.thumbnail.public_id}
          alt={destination.name}
          fill
          className="object-cover"
          sizes="(min-width: 1280px) 1200px, 90vw"
        />
      </div>
      <div dangerouslySetInnerHTML={{ __html: destination.description }} />
    </article>
  );
}
