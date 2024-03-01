'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TimeZone } from '@vvo/tzdb';
import { MenuIcon, XCircleIcon } from 'lucide-react';
import { DateTime } from 'luxon';
import { IBM_Plex_Mono } from 'next/font/google';

const IBM_Plex_Mono_font = IBM_Plex_Mono({
  weight: '400',
  subsets: ['latin'],
});

import * as React from 'react';

import { DateTimeDisplay } from '@/components/DateTimeDisplay';
import { Button } from '@/components/ui/button';
import { pad } from '@/lib/string';
import { utcOffsetToDisplay } from '@/lib/timezone';
import { cn } from '@/lib/utils';

export function TimezoneDisplay({
  id,
  timezone,
  currentTime,
  isEditing = false,
  removeSelectedTimezone,
}: {
  id: number;
  timezone: TimeZone;
  currentTime?: DateTime;
  isEditing?: boolean;
  removeSelectedTimezone: (timezone: TimeZone) => void;
}) {
  const currentTimeInZone = currentTime.setZone(timezone.name);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    setActivatorNodeRef,
  } = useSortable({ id: id, disabled: !isEditing });

  const style = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div className="flex flex-col space-y-2 relative">
        <div>
          <div className="flex items-center space-x-1">
            {isEditing && (
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full animate-wiggle animate-infinite animate-duration-500 animate-ease-in-out"
                ref={setActivatorNodeRef}
                {...listeners}
              >
                <MenuIcon className="h-4 w-4" />
              </Button>
            )}
            <div className="flex items-end space-x-1">
              <p className="font-semibold">{timezone.name}</p>
              <p className="text-sm text-[#7C7C7C]">
                {timezone.abbreviation}
                {', UTC'}
                {utcOffsetToDisplay(timezone.currentTimeOffsetInMinutes)}
              </p>
            </div>
            {isEditing && (
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full animate-wiggle-more animate-infinite animate-duration-500 animate-ease-in-out"
                onClick={() => {
                  removeSelectedTimezone(timezone);
                }}
              >
                <XCircleIcon className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        <div className="overflow-x-hidden -mx-6 px-6">
          <div className="relative flex items-center h-[58px] rounded-[15px] w-full border border-[#DBDBDB] overflow-hidden">
            <div
              className="flex items-center h-full"
              style={{
                transform: `translateX(calc(50vw - 16px - 24px - ${
                  (currentTimeInZone.hour + currentTimeInZone.minute / 60) * 32
                }px - (32px * 24)))`,
                background:
                  'linear-gradient(90deg, rgba(31,52,182,1) 0%, rgba(31,52,182,1) 8.333%, rgba(135,208,240,1) 11.111%, rgba(135,208,240,1) 23.611%, rgba(31,52,182,1) 26.388%, rgba(31,52,182,1) 41.666%, rgba(135,208,240,1) 44.444%, rgba(135,208,240,1) 56.944%, rgba(31,52,182,1) 59.722%, rgba(31,52,182,1) 75%, rgba(135,208,240,1) 77.777%, rgba(135,208,240,1) 90.277%, rgba(31,52,182,1) 93.055%, rgba(31,52,182,1) 100%)',
              }}
            >
              {Array.from({ length: 145 }).map((_, i) => (
                <div key={i} className="flex justify-end w-[16px] shrink-0">
                  <div
                    className={cn(
                      'w-[2px] shrink-0 bg-white',
                      i % 2 === 0 ? 'h-[18px]' : 'h-[9px]'
                    )}
                  />
                </div>
              ))}
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 top-0 w-0.5 h-full bg-blue-600" />

            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-[#F1F5F9]/90 text-sm text-[#1245CA] px-2 py-1 leading-6 rounded-[10px] backdrop-blur-[2px]">
              <DateTimeDisplay
                currentTime={currentTime}
                timezoneName={timezone.name}
              />
            </div>
          </div>

          <div
            className={cn('text-sm flex', IBM_Plex_Mono_font.className)}
            style={{
              transform: `translateX(calc(50vw - 16px - 24px - ${
                (currentTimeInZone.hour + currentTimeInZone.minute / 60) * 32
              }px - (32px * 24)))`,
            }}
          >
            {Array.from({ length: 73 }).map((_, i) => (
              <div className="w-[32px] shrink-0 text-center" key={i}>
                {pad(i % 24)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
