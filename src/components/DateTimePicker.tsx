'use client';

import { CalendarIcon } from 'lucide-react';
import { DateTime } from 'luxon';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

export function DateTimePicker({
  date,
  setDate,
}: {
  date: Date;
  setDate: (date: Date) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            DateTime.fromJSDate(date).toLocaleString(DateTime.DATETIME_SHORT, {
              locale: 'en-US',
            })
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(newDate: Date) => {
            const newDateWithSameHourMinute = DateTime.fromJSDate(newDate).set({
              hour: date.getHours(),
              minute: date.getMinutes(),
            });
            setDate(newDateWithSameHourMinute.toJSDate());
          }}
          initialFocus
        />
        <Separator />

        <div className="flex items-center justify-center p-4">
          <Input
            type="time"
            value={DateTime.fromJSDate(date).toFormat('HH:mm')}
            onChange={(e) => {
              const value = e.target.value;
              const newDate = DateTime.fromJSDate(date).set({
                hour: parseInt(value.split(':')[0]),
                minute: parseInt(value.split(':')[1]),
              });
              setDate(newDate.toJSDate());
            }}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
