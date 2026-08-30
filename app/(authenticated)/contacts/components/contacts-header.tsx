"use client";

import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/use-logout";

export function ContactsHeader() {
  const { mutate: logout, isPending } = useLogout();

  const handleLogout = () => {
    logout();
  };
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-xl font-bold text-blue-600">PeopleComp</h1>

          <Button
            onClick={handleLogout}
            disabled={isPending}
            variant="ghost"
            size="sm"
            className="text-gray-600 hover:text-gray-900"
          >
            <LogOut size={16} className="mr-2" />

            {isPending ? "Logging out..." : "Logout"}
          </Button>
        </div>
      </div>
    </header>
  );
}
