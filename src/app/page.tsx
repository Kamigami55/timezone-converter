'use client';

import { getTimeZones, TimeZone } from '@vvo/tzdb';
import { DateTime } from 'luxon';
import * as React from 'react';

import { DarkModeToggle } from '@/components/DarkModeToggle';
import { TimezoneDisplay } from '@/components/TimezoneDisplay';
import { TimezonePickerDialog } from '@/components/TimezonePickerDialog';
import { Button } from '@/components/ui/button';
import { DateTimePicker } from '@/components/ui/date-time-picker';
// import { DateTimePicker } from '@/components/ui/date-time-picker';

export default function Home() {
  const allTimezones = React.useMemo(() => getTimeZones(), []);
  const userTimezone = allTimezones.find(
    (timezone) =>
      timezone.name === Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const [selectedTimezones, setSelectedTimezones] = React.useState<TimeZone[]>(
    userTimezone ? [userTimezone] : []
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

  const [currentTime, setCurrentTime] = React.useState(DateTime.now());
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(DateTime.now());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const [openTimezonePickerDialog, setOpenTimezonePickerDialog] =
    React.useState(false);

  const [date, setDate] = React.useState<Date>(new Date());

  return (
    <div className="flex min-h-screen flex-col">
      <nav className="flex w-full items-center justify-between py-4 px-6 border-b border-gray-200">
        <h1 className="text-xl font-bold">Time Zone</h1>
        <div className="flex items-center space-x-4">
          <Button variant="link">About us</Button>
          <DarkModeToggle />
        </div>
      </nav>

      <main className="grow p-6">
        <div className="flex justify-end space-x-4">
          <Button variant="outline">Edit</Button>
          <Button
            onClick={() => {
              setOpenTimezonePickerDialog(true);
            }}
          >
            Add
          </Button>
        </div>

        <TimezonePickerDialog
          open={openTimezonePickerDialog}
          setOpen={setOpenTimezonePickerDialog}
          selectedTimezones={selectedTimezones}
          addSelectedTimezone={addSelectedTimezone}
          removeSelectedTimezone={removeSelectedTimezone}
        />
        {/* <DateTimePicker date={date} setDate={setDate} /> */}

        <div className="relative w-full">
          {/* <h2 className="text-sm text-gray-500">Current Local Time:</h2>
          <DateTimeDisplay currentTime={currentTime} /> */}

          {/* <div className="absolute inset-y-0 left-1/2 w-0.5 bg-gray-300" /> */}
          <div className="flex flex-col gap-y-8 py-10">
            {selectedTimezones.map((timezone) => (
              <TimezoneDisplay
                key={timezone.name}
                currentTime={currentTime}
                timezone={timezone}
              />
            ))}
          </div>

          {/* Current Time Indicator */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 flex flex-col items-center">
            <div className="flex rounded-lg bg-blue-600 text-white py-2 px-3 text-sm">
              Current time
            </div>
            <div className="h-full w-0.5 bg-blue-600" />
          </div>
        </div>

        <DateTimePicker date={date} setDate={setDate} />
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
