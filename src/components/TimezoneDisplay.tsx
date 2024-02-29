'use client';

import { TimeZone } from '@vvo/tzdb';
import { DateTime } from 'luxon';
import { IBM_Plex_Mono } from 'next/font/google';

const IBM_Plex_Mono_font = IBM_Plex_Mono({
  weight: '400',
  subsets: ['latin'],
});

import * as React from 'react';

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
  const currentTimeInZone = currentTime.setZone(timezone.name);

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

      <div className="overflow-x-hidden">
        <div className="flex justify-between items-center bg-gray-100 py-2 px-3 rounded-md w-full">
          {Array.from({ length: 25 }).map((_, i) => (
            <React.Fragment key={i}>
              {i > 0 && (
                <div className="h-3 w-0.5 bg-gray-300 -translate-x-[8px]" />
              )}
              <div className="h-6 w-0.5 bg-gray-300 -translate-x-[8px]" />
            </React.Fragment>
          ))}
        </div>
        <div
          className={cn('text-sm flex', IBM_Plex_Mono_font.className)}
          style={{
            transform: `translateX(calc(50vw - 16px - 24px - ${
              (currentTimeInZone.hour + currentTimeInZone.minute / 60) * 32
            }px - 768px))`,
          }}
        >
          {Array.from({ length: 200 }).map((_, i) => (
            <div className="w-[32px] shrink-0 text-center" key={i}>
              {pad(i % 24)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
