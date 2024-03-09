'use client';

import Image from 'next/image';
import Link from 'next/link';

import { DarkModeToggle } from '@/components/DarkModeToggle';
import { Button } from '@/components/ui/button';

export function Navbar() {
  return (
    <nav className="flex w-full items-center justify-between py-4 px-6 border-b border-[#DFDFDF] dark:border-[#4D4D4D]">
      <Link href="/" className="flex items-center space-x-1">
        <Image src="/logo.svg" alt="" width={40} height={40} />
        <h1 className="text-3xl font-bold">Timez</h1>
      </Link>
      <div className="flex items-center space-x-4">
        <Button variant="link" asChild className="text-foreground">
          <Link href="/about">About</Link>
        </Button>
        <DarkModeToggle />
      </div>
    </nav>
  );
}
