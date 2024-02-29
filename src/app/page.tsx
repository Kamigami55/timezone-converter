'use client';

import { TimeZone } from '@vvo/tzdb';
import * as React from 'react';

import { DateTimeDisplay } from '@/components/DateTimeDisplay';
import { TimezoneDisplay } from '@/components/TimezoneDisplay';
import { TimezonePicker } from '@/components/TimezonePicker';
import { DateTimePicker } from '@/components/ui/date-time-picker';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Home() {
  const [selectedTimezones, setSelectedTimezones] = React.useState<TimeZone[]>(
    []
  );

  const addSelectedTimezone = (timezone: TimeZone) => {
    setSelectedTimezones(
      [...selectedTimezones, timezone].sort(
        (a, b) => a.currentTimeOffsetInMinutes - b.currentTimeOffsetInMinutes
      )
    );
  };
  const removeSelectedTimezone = (timezone: TimeZone) => {
    setSelectedTimezones(selectedTimezones.filter((tz) => tz !== timezone));
  };

  const [date, setDate] = React.useState<Date>(new Date());

  return (
    <div className="flex min-h-screen flex-col">
      <nav className="flex w-full items-center justify-between py-4 px-6">
        <h1 className="text-xl font-bold">Time Zone Converter</h1>
      </nav>

      <main className="grow p-6">
        <div className="flex space-x-2">
          <TimezonePicker
            selectedTimezones={selectedTimezones}
            addSelectedTimezone={addSelectedTimezone}
            removeSelectedTimezone={removeSelectedTimezone}
          />
        </div>

        <DateTimePicker date={date} setDate={setDate} />

        <div className="relative w-full">
          <h2 className="text-sm text-gray-500">Current Local Time:</h2>
          <DateTimeDisplay />
          {/* <div className="absolute inset-y-0 left-1/2 w-0.5 bg-gray-300" /> */}
          <ScrollArea className="overflow-x-scroll">
            <div className="flex flex-col gap-y-8 overflow-x-scroll py-2">
              {selectedTimezones.map((timezone) => (
                <TimezoneDisplay key={timezone.name} timezone={timezone} />
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
