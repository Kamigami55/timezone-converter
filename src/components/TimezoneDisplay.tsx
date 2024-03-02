'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TimeZone } from '@vvo/tzdb';
import { MenuIcon, XCircleIcon } from 'lucide-react';
import { DateTime } from 'luxon';
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
      <div className="flex flex-col space-y-3 relative">
        <div>
          <div className="relative inline-flex items-center">
            {isEditing && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute -left-10 rounded-full animate-wiggle-more animate-infinite animate-duration-500 animate-ease-in-out"
                ref={setActivatorNodeRef}
                {...listeners}
              >
                <MenuIcon className="h-6 w-6" />
              </Button>
            )}
            <div className="flex items-end space-x-2">
              <p className="text-xl font-bold">{timezone.name}</p>
              <p className="text-md text-[#7C7C7C] font-medium">
                {timezone.abbreviation}
                {', UTC'}
                {utcOffsetToDisplay(timezone.currentTimeOffsetInMinutes)}
              </p>
            </div>
            {isEditing && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute -right-10 rounded-full animate-wiggle-more animate-infinite animate-duration-500 animate-ease-in-out"
                onClick={() => {
                  removeSelectedTimezone(timezone);
                }}
              >
                <XCircleIcon className="h-6 w-6" />
              </Button>
            )}
          </div>
        </div>

        <div className="overflow-x-hidden -mx-12 px-12">
          <div className="relative flex items-center h-[58px] rounded-[15px] w-full border border-[#DBDBDB] overflow-hidden mb-2">
            <div
              className="flex items-center h-full"
              style={{
                transform: `translateX(calc(50vw - 28px - 48px - ${
                  (currentTimeInZone.hour + currentTimeInZone.minute / 60) * 56
                }px - (56px * 24)))`,
                background:
                  'linear-gradient(90deg, rgba(31,52,182,1) 0%, rgba(31,52,182,1) 8.333%, rgba(135,208,240,1) 11.111%, rgba(135,208,240,1) 23.611%, rgba(31,52,182,1) 26.388%, rgba(31,52,182,1) 41.666%, rgba(135,208,240,1) 44.444%, rgba(135,208,240,1) 56.944%, rgba(31,52,182,1) 59.722%, rgba(31,52,182,1) 75%, rgba(135,208,240,1) 77.777%, rgba(135,208,240,1) 90.277%, rgba(31,52,182,1) 93.055%, rgba(31,52,182,1) 100%)',
              }}
            >
              {Array.from({ length: 145 }).map((_, i) => (
                <div key={i} className="flex justify-end w-[28px] shrink-0">
                  <div
                    className={cn(
                      'w-[2px] shrink-0 bg-white',
                      i % 2 === 0 ? 'h-[18px]' : 'h-[9px]'
                    )}
                  />
                </div>
              ))}
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 top-0 w-0.5 h-full bg-[#1B55EB]" />

            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-[#F1F5F9]/90 text-sm text-[#1245CA] px-2 py-1 leading-6 rounded-[10px] backdrop-blur-[2px]">
              <DateTimeDisplay
                currentTime={currentTime}
                timezoneName={timezone.name}
              />
            </div>
          </div>

          <div
            className="text-sm flex font-bold leading-4"
            style={{
              transform: `translateX(calc(50vw - 28px - 48px - ${
                (currentTimeInZone.hour + currentTimeInZone.minute / 60) * 56
              }px - (56px * 24)))`,
            }}
          >
            {Array.from({ length: 73 }).map((_, i) => (
              <div className="w-[56px] shrink-0 text-center" key={i}>
                {pad(i % 24)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
