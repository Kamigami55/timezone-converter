'use client';

import { getTimeZones, TimeZone } from '@vvo/tzdb';
import * as React from 'react';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { utcOffsetToDisplay } from '@/lib/timezone';

export function TimezonePickerDialog({
  open,
  setOpen,
  selectedTimezones,
  addSelectedTimezone,
  removeSelectedTimezone,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedTimezones: TimeZone[];
  addSelectedTimezone: (timezone: TimeZone) => void;
  removeSelectedTimezone: (timezone: TimeZone) => void;
}) {
  const allTimezones = React.useMemo(() => getTimeZones(), []);
  const unselectedTimezones = React.useMemo(
    () =>
      allTimezones.filter(
        (timezone) =>
          !selectedTimezones.some(
            (selectedTimezone) => selectedTimezone.name === timezone.name
          )
      ),
    [selectedTimezones, allTimezones]
  );
  const haveSelectedTimezones = selectedTimezones.length > 0;

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search timezone..." />
      <CommandList>
        <CommandEmpty>No timezone found.</CommandEmpty>

        {/* Selected timezones */}
        {haveSelectedTimezones && (
          <>
            <CommandGroup heading="Selected">
              {selectedTimezones.map((timezone) => (
                <CommandItem
                  key={timezone.name}
                  value={timezone.name}
                  onSelect={() => {
                    removeSelectedTimezone(timezone);
                    setOpen(false);
                  }}
                  className="cursor-pointer"
                >
                  (UTC
                  {utcOffsetToDisplay(
                    timezone.currentTimeOffsetInMinutes
                  )}) {timezone.name}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
          </>
        )}

        {/* Other unselected timezones */}
        <CommandGroup heading="All time zones">
          {/* show all timezones, if selected, show check mark, and when click, remove from array, otherwise not show check mark, and when click insert into array */}
          {unselectedTimezones.map((timezone) => {
            const isSelected = selectedTimezones.some(
              (selectedTimezone) => selectedTimezone.name === timezone.name
            );
            return (
              <CommandItem
                key={timezone.name}
                value={timezone.name}
                onSelect={() => {
                  if (isSelected) {
                    removeSelectedTimezone(timezone);
                  } else {
                    addSelectedTimezone(timezone);
                  }
                  setOpen(false);
                }}
                className="cursor-pointer"
              >
                (UTC{utcOffsetToDisplay(timezone.currentTimeOffsetInMinutes)}){' '}
                {timezone.name}
              </CommandItem>
            );
          })}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
