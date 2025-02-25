// BackButton.tsx (Client Component)
'use client';

import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export function BackButton() {
  const router = useRouter();
  
  return (
    <Button 
      className="rounded-full" 
      variant="secondary" 
      size="icon" 
      onClick={() => router.back()}
    >
      <ChevronLeftIcon />
    </Button>
  );
}