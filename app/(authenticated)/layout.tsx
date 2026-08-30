import { MainHeader } from "@/components/main-header";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MainHeader />
      {children}
      {/* potential Footer etc. */}
    </>
  );
}
