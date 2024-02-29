'use client';

import { getTimeZones, TimeZone } from '@vvo/tzdb';
import { Check, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandSeparator,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { utcOffsetToDisplay } from '@/lib/timezone';

export function TimezonePicker({
  selectedTimezones,
  addSelectedTimezone,
  removeSelectedTimezone,
}: {
  selectedTimezones: TimeZone[];
  addSelectedTimezone: (timezone: TimeZone) => void;
  removeSelectedTimezone: (timezone: TimeZone) => void;
}) {
  const [open, setOpen] = React.useState(false);

  const allTimezones = React.useMemo(() => getTimeZones(), []);

  const haveSelectedTimezones = selectedTimezones.length > 0;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[600px] justify-between"
        >
          {haveSelectedTimezones
            ? `Selected: ${selectedTimezones.length} time zones`
            : 'Select timezone...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[600px] p-0">
        <Command>
          <CommandInput placeholder="Search timezone..." />
          <ScrollArea className="h-[600px] w-[600px] rounded-md border p-4">
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
                      }}
                    >
                      ({utcOffsetToDisplay(timezone.currentTimeOffsetInMinutes)}
                      ) {timezone.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
                <CommandSeparator />
              </>
            )}

            {/* Other unselected timezones */}
            <CommandGroup heading="All time zones">
              {/* show all timezones, if selected, show check mark, and when click, remove from array, otherwise not show check mark, and when click insert into array */}
              {allTimezones.map((timezone) => {
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
                    }}
                  >
                    {isSelected ? (
                      <Check className="mr-2 h-4 w-4 shrink-0" />
                    ) : (
                      <span className="mr-2 h-4 w-4 shrink-0" />
                    )}
                    ({utcOffsetToDisplay(timezone.currentTimeOffsetInMinutes)}){' '}
                    {timezone.name}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
