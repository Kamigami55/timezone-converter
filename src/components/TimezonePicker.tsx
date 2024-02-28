'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';
import timezones from 'timezones-list';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';

export function TimezonePicker({
  tzCodes,
  setTzCodes,
}: {
  tzCodes: string[];
  setTzCodes: (tzCodes: string[]) => void;
}) {
  const [open, setOpen] = React.useState(false);

  const selectedTimezones = tzCodes.map((tzCode) =>
    timezones.find((timezone) => timezone.tzCode === tzCode)
  );
  // const unselectedTimezones = timezones.filter(
  //   (timezone) => !tzCodes.includes(timezone.tzCode)
  // );

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
            ? `Selected: ${tzCodes.length} time zones`
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
              <CommandGroup heading="Selected">
                {selectedTimezones.map((timezone) => (
                  <CommandItem
                    key={timezone.tzCode}
                    value={timezone.name}
                    onSelect={() => {
                      setTzCodes(
                        tzCodes.filter((code) => code !== timezone.tzCode)
                      );
                    }}
                  >
                    <Check className="mr-2 h-4 w-4 shrink-0" />
                    {timezone.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {/* Other unselected timezones */}
            <CommandGroup heading="All time zones">
              {/* show all timezones, if selected, show check mark, and when click, remove from array, otherwise not show check mark, and when click insert into array */}
              {timezones.map((timezone) => {
                const isSelected = tzCodes.includes(timezone.tzCode);
                return (
                  <CommandItem
                    key={timezone.tzCode}
                    value={timezone.name}
                    onSelect={() => {
                      if (isSelected) {
                        setTzCodes(
                          tzCodes.filter((code) => code !== timezone.tzCode)
                        );
                      } else {
                        setTzCodes([...tzCodes, timezone.tzCode]);
                      }
                    }}
                  >
                    {isSelected ? (
                      <Check className="mr-2 h-4 w-4 shrink-0" />
                    ) : (
                      <span className="mr-2 h-4 w-4 shrink-0" />
                    )}
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
