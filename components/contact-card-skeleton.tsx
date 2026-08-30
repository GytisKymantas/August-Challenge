export function ContactCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md">
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-200">
        <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200" />
      </div>
    </div>
  );
}
