'use client';

import * as React from 'react';
import timezones from 'timezones-list';

import { DateTimeDisplay } from '@/components/DateTimeDisplay';
import { TimezoneDisplay } from '@/components/TimezoneDisplay';
import { TimezonePicker } from '@/components/TimezonePicker';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Home() {
  const [tzCodes, setTzCodes] = React.useState<string[]>([
    'America/Los_Angeles',
  ]);

  return (
    <div className="flex min-h-screen flex-col">
      <nav className="flex w-full items-center justify-between py-4 px-6">
        <h1 className="text-xl font-bold">Time Zone Converter</h1>
      </nav>

      <main className="grow p-6">
        <div className="flex space-x-2">
          <TimezonePicker tzCodes={tzCodes} setTzCodes={setTzCodes} />
        </div>

        <div className="relative w-full">
          <h2 className="text-sm text-gray-500">Current Local Time:</h2>
          <DateTimeDisplay />
          {/* <div className="absolute inset-y-0 left-1/2 w-0.5 bg-gray-300" /> */}
          <ScrollArea className="overflow-x-scroll">
            <div className="flex flex-col gap-y-8 overflow-x-scroll py-2">
              {tzCodes.map((tzCode) => (
                <TimezoneDisplay
                  key={tzCode}
                  timezone={timezones.find(
                    (timezone) => timezone.tzCode === tzCode
                  )}
                />
              ))}
            </div>
          </ScrollArea>
        </div>
      </main>

      <footer className="flex w-full items-center justify-center py-4 px-6">
        <p className="text-sm text-gray-500 text-center">
          Made with ❤️ by{' '}
          <a href="https://easonchang.com" target="_blank" rel="noreferrer">
            Eason Chang
          </a>
          {' & '} {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#" target="_blank" rel="noreferrer">
            Carol Hsiao
          </a>
        </p>
      </footer>
    </div>
  );
}
