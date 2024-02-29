'use client';

import { TimeZone } from '@vvo/tzdb';
import { DateTime } from 'luxon';
import { IBM_Plex_Mono } from 'next/font/google';

const IBM_Plex_Mono_font = IBM_Plex_Mono({
  weight: '400',
  subsets: ['latin'],
});

import { DateTimeDisplay } from '@/components/DateTimeDisplay';
import { pad } from '@/lib/string';
import { utcOffsetToDisplay } from '@/lib/timezone';
import { cn } from '@/lib/utils';

export function TimezoneDisplay({
  timezone,
  currentTime,
}: {
  timezone: TimeZone;
  currentTime?: DateTime;
}) {
  return (
    <div className="flex flex-col space-y-2 relative">
      <div>
        <p className="font-semibold">{timezone.name}</p>
        <p className="text-sm text-gray-500">
          {timezone.abbreviation}
          {', UTC'}
          {utcOffsetToDisplay(timezone.currentTimeOffsetInMinutes)}
        </p>
        <div className="absolute left-1/2 ml-2 top-6 text-sm text-blue-600 font-semibold">
          <DateTimeDisplay
            currentTime={currentTime}
            timezoneName={timezone.name}
          />
        </div>
      </div>

      <div className="relative flex flex-col w-full items-center">
        <div className="flex w-full justify-between items-center bg-gray-100 py-2 px-3 rounded-md">
          {Array.from({ length: 25 }).map((_, i) => (
            <>
              {i > 0 && <div key={-i} className="h-3 w-0.5 bg-gray-300" />}
              <div key={i} className="h-6 w-0.5 bg-gray-300" />
            </>
          ))}
        </div>
        <div
          className={cn(
            'flex w-full justify-between text-sm px-1',
            IBM_Plex_Mono_font.className
          )}
        >
          {Array.from({ length: 25 }).map((_, i) => (
            <div key={i}>{pad(i)}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
