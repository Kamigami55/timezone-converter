'use client';

import { TimeZone } from '@vvo/tzdb';

import { DateTimeDisplay } from '@/components/DateTimeDisplay';
import { pad } from '@/lib/string';

export function TimezoneDisplay({ timezone }: { timezone: TimeZone }) {
  return (
    <div className="flex flex-col space-y-2">
      <div>
        <p className="font-semibold">{timezone.name}</p>
        <p className="text-sm text-gray-500">{timezone.currentTimeFormat}</p>
        {/* <p className="text-sm text-gray-500">{timezone.tzCode}</p> */}
        <div className="text-sm">
          <DateTimeDisplay tzCode={timezone.name} />
        </div>
        {/* <p className="text-sm text-gray-500">{timezone.utc}</p> */}
      </div>

      <div className="relative flex flex-col w-full items-center">
        <div className="flex w-full justify-between items-center bg-gray-100 py-2 px-3">
          {Array.from({ length: 24 }).map((_, i) => (
            <>
              {i > 0 && (
                <div
                  key={i}
                  className="h-3 inset-y-0 right-1/2 w-0.5 bg-gray-300"
                />
              )}
              <div
                key={i}
                className="h-6 inset-y-0 left-1/2 w-0.5 bg-gray-300"
              />
            </>
          ))}
        </div>
        <div className="flex w-full justify-between">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i}>{pad(i)}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
