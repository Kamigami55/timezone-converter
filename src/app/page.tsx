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
import { DatePicker } from '@/components/DatePicker';
import { TimezoneDisplay } from '@/components/TimezoneDisplay';
import { TimezonePickerDialog } from '@/components/TimezonePickerDialog';
import { Button } from '@/components/ui/button';
import { TimeZoneWithId } from '@/lib/timezone';

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
        <h1 className="text-xl font-bold">Time Zone Converter</h1>
        <div className="flex items-center space-x-4">
          <Button variant="link" asChild className="text-foreground">
            <Link href="/about">About</Link>
          </Button>
          <DarkModeToggle />
        </div>
      </nav>

      <main className="grow p-12">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">Hello 👋</h1>
            <h2 className="text-lg font-medium text-[#7C7C7C]">
              Add time zone you want to compare
            </h2>
          </div>

          <div className="flex justify-end space-x-4">
            <DatePicker date={date} setDate={setDate} />
            <Button
              variant={isEditing ? 'secondary' : 'outline'}
              onClick={() => {
                setIsEditing((isEditing) => !isEditing);
              }}
              className="px-5 py-2"
            >
              {isEditing ? 'Done' : 'Edit'}
            </Button>
            <Button
              onClick={() => {
                setOpenTimezonePickerDialog(true);
              }}
              className="px-5 py-2"
            >
              Add
            </Button>
          </div>
        </div>

        <TimezonePickerDialog
          open={openTimezonePickerDialog}
          setOpen={setOpenTimezonePickerDialog}
          selectedTimezones={selectedTimezones}
          addSelectedTimezone={addSelectedTimezone}
          removeSelectedTimezone={removeSelectedTimezone}
        />

        <div className="relative w-full">
          {/* Current Time Indicator */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-0.5 h-full bg-[#1B55EB]" />
          <div className="absolute left-1/2 -translate-x-1/2 top-0 rounded-[10px] bg-[#1B55EB] text-white py-2 px-4 text-sm leading-6 shadow-md">
            Current time
          </div>

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
                  <TimezoneDisplay
                    key={timezone.id}
                    id={timezone.id}
                    currentTime={currentTime}
                    timezone={timezone}
                    isEditing={isEditing}
                    removeSelectedTimezone={removeSelectedTimezone}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      </main>

      <footer className="flex w-full items-center justify-center py-4 px-6">
        <p className="text-sm text-gray-500 text-center">
          Made with ❤️ by{' '}
          <a
            href="https://easonchang.com"
            target="_blank"
            rel="noreferrer"
            className="hover:underline underline-offset-4"
          >
            Eason Chang
          </a>
          {' & '}
          <a
            href="https://carolhsiao.webflow.io"
            target="_blank"
            rel="noreferrer"
            className="hover:underline underline-offset-4"
          >
            Carol Hsiao
          </a>
        </p>
      </footer>
    </div>
  );
}
