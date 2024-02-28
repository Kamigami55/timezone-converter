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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-xl font-bold">Time zone</h1>
        <div className="flex space-x-2">
          <TimezonePicker tzCodes={tzCodes} setTzCodes={setTzCodes} />
        </div>
      </div>

      <div className="relative w-full">
        <h2 className="text-sm text-gray-500">Current Local Time:</h2>
        <DateTimeDisplay />
        <div className="absolute inset-y-0 left-1/2 w-0.5 bg-gray-300" />
        <ScrollArea className="flex w-full space-x-4 overflow-x-scroll py-2">
          {tzCodes.map((tzCode) => (
            <TimezoneDisplay
              key={tzCode}
              timezone={timezones.find(
                (timezone) => timezone.tzCode === tzCode
              )}
            />
          ))}
        </ScrollArea>
      </div>
    </main>
  );
}
