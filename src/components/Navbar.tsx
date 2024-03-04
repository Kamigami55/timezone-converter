'use client';

import Image from 'next/image';
import Link from 'next/link';

import { DarkModeToggle } from '@/components/DarkModeToggle';
import { Button } from '@/components/ui/button';

export function Navbar() {
  return (
    <nav className="flex w-full items-center justify-between py-4 px-6 border-b border-gray-200">
      <Link href="/" className="flex items-center space-x-3">
        <Image src="/favicon.png" alt="" width={32} height={32} />
        <h1 className="text-xl font-bold">Time Zone Converter</h1>
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
