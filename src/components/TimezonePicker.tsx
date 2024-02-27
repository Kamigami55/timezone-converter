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
import { cn } from '@/lib/utils';

export function TimezonePicker() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[600px] justify-between"
        >
          {value
            ? 'Selected: ' +
              timezones.find((timezone) => timezone.tzCode === value)?.name
            : 'Select timezone...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[600px] p-0">
        <Command>
          <CommandInput placeholder="Search timezone..." />
          <ScrollArea className="h-[600px] w-[600px] rounded-md border p-4">
            <CommandEmpty>No timezone found.</CommandEmpty>
            <CommandGroup>
              {timezones.map((timezone) => (
                <CommandItem
                  key={timezone.tzCode}
                  value={timezone.name}
                  onSelect={() => {
                    setValue(timezone.tzCode === value ? '' : timezone.tzCode);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === timezone.tzCode ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {timezone.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
