'use client';

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { getTimeZones } from '@vvo/tzdb';
import { DateTime } from 'luxon';
import Link from 'next/link';
import * as React from 'react';

import { DarkModeToggle } from '@/components/DarkModeToggle';
import { SortableItem } from '@/components/SortableItem';
import { TimezoneDisplay } from '@/components/TimezoneDisplay';
import { TimezonePickerDialog } from '@/components/TimezonePickerDialog';
import { Button } from '@/components/ui/button';
import { DateTimePicker } from '@/components/ui/date-time-picker';
import { TimeZoneWithId } from '@/lib/timezone';
import { cn } from '@/lib/utils';
// import { DateTimePicker } from '@/components/ui/date-time-picker';

export default function Home() {
  const allTimezones: TimeZoneWithId[] = React.useMemo(
    () =>
      getTimeZones().map(
        (tz, index) => ({
          ...tz,
          id: index,
        }),
        []
      ),
    []
  );
  const userTimezone = allTimezones.find(
    (timezone) =>
      timezone.name === Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const [selectedTimezones, setSelectedTimezones] = React.useState<
    TimeZoneWithId[]
  >(userTimezone ? [userTimezone] : []);

  const addSelectedTimezone = (timezone: TimeZoneWithId) => {
    setSelectedTimezones(
      [...selectedTimezones, timezone].sort((a, b) => a.id - b.id)
    );
  };
  const removeSelectedTimezone = (timezone: TimeZoneWithId) => {
    setSelectedTimezones(selectedTimezones.filter((tz) => tz !== timezone));
  };

  const [currentTime, setCurrentTime] = React.useState(DateTime.now());
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(DateTime.now());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const [openTimezonePickerDialog, setOpenTimezonePickerDialog] =
    React.useState(false);

  const [date, setDate] = React.useState<Date>(new Date());

  const [isEditing, setIsEditing] = React.useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setSelectedTimezones((items) => {
        const oldIndex = items.findIndex((tz) => tz.id === active.id);
        const newIndex = items.findIndex((tz) => tz.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <nav className="flex w-full items-center justify-between py-4 px-6 border-b border-gray-200">
        <h1 className="text-xl font-bold">Time Zone</h1>
        <div className="flex items-center space-x-4">
          <Button variant="link" asChild>
            <Link href="/about">About</Link>
          </Button>
          <DarkModeToggle />
        </div>
      </nav>

      <main className="grow p-6">
        <div className="flex justify-end space-x-4">
          <Button
            variant={isEditing ? 'secondary' : 'outline'}
            onClick={() => {
              setIsEditing((isEditing) => !isEditing);
            }}
            className={cn(
              isEditing &&
                'animate-wiggle animate-infinite animate-duration-500 animate-ease-in-out'
            )}
          >
            {isEditing ? 'Done' : 'Edit'}
          </Button>
          <Button
            onClick={() => {
              setOpenTimezonePickerDialog(true);
            }}
          >
            Add
          </Button>
        </div>

        <TimezonePickerDialog
          open={openTimezonePickerDialog}
          setOpen={setOpenTimezonePickerDialog}
          selectedTimezones={selectedTimezones}
          addSelectedTimezone={addSelectedTimezone}
          removeSelectedTimezone={removeSelectedTimezone}
        />
        {/* <DateTimePicker date={date} setDate={setDate} /> */}

        <div className="relative w-full">
          {/* <h2 className="text-sm text-gray-500">Current Local Time:</h2>
          <DateTimeDisplay currentTime={currentTime} /> */}

          {/* <div className="absolute inset-y-0 left-1/2 w-0.5 bg-gray-300" /> */}
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={selectedTimezones}
              strategy={verticalListSortingStrategy}
            >
              <div className="flex flex-col gap-y-8 py-10">
                {selectedTimezones.map((timezone) => (
                  <SortableItem key={timezone.id} id={timezone.id}>
                    <TimezoneDisplay
                      currentTime={currentTime}
                      timezone={timezone}
                      isEditing={isEditing}
                      removeSelectedTimezone={removeSelectedTimezone}
                    />
                  </SortableItem>
                ))}
              </div>
            </SortableContext>
          </DndContext>

          {/* Current Time Indicator */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 flex flex-col items-center">
            <div className="flex rounded-lg bg-blue-600 text-white py-2 px-3 text-sm">
              Current time
            </div>
            <div className="h-full w-0.5 bg-blue-600" />
          </div>
        </div>

        <DateTimePicker date={date} setDate={setDate} />
      </main>

      <footer className="flex w-full items-center justify-center py-4 px-6">
        <p className="text-sm text-gray-500 text-center">
          Made with ❤️ by{' '}
          <a href="https://easonchang.com" target="_blank" rel="noreferrer">
            Eason Chang
          </a>
          {' & '} {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#" target="_blank" rel="noreferrer">
            Carol Hsiao
          </a>
        </p>
      </footer>
    </div>
  );
}
