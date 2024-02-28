'use client';

import { TimeZone } from 'timezones-list';

import { DateTimeDisplay } from '@/components/DateTimeDisplay';

export function TimezoneDisplay({ timezone }: { timezone: TimeZone }) {
  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="text-center">
        <p className="font-semibold">{timezone.label}</p>
        <p className="text-sm text-gray-500">{timezone.name}</p>
        <p className="text-sm text-gray-500">{timezone.tzCode}</p>
        <p className="text-sm text-gray-500">{timezone.utc}</p>
      </div>
      <div className="relative flex h-10 w-full items-center">
        {/* <div className="absolute inset-y-0 left-0 w-1/2 bg-gray-200" /> */}
        <div className="flex w-full justify-between px-4">
          <span>0</span>
          <span>4</span>
          <span>8</span>
          <span>12</span>
          <span>16</span>
          <span>20</span>
          <span>00</span>
        </div>
        {/* <div className="absolute inset-y-0 right-0 w-1/2 bg-gray-200" /> */}
      </div>
      <div className="text-sm">
        <DateTimeDisplay tzCode={timezone.tzCode} />
      </div>
    </div>
  );
}
