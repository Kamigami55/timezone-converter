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
import { RotateCcwIcon } from 'lucide-react';
import { DateTime } from 'luxon';
import Link from 'next/link';
import * as React from 'react';

import { DarkModeToggle } from '@/components/DarkModeToggle';
import { DateTimePicker } from '@/components/DateTimePicker';
import { TimezoneDisplay } from '@/components/TimezoneDisplay';
import { TimezonePickerDialog } from '@/components/TimezonePickerDialog';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
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

  const [currentTime, setCurrentTime] = React.useState<Date>(new Date());
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const [selectedTime, setSelectedTime] = React.useState<Date | null>(null);
  const centerTime = selectedTime || currentTime;

  const [openTimezonePickerDialog, setOpenTimezonePickerDialog] =
    React.useState(false);

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

  // get screen width
  const [screenWidth, setScreenWidth] = React.useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );
  React.useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [hoveredX, setHoveredX] = React.useState<number | null>(null);

  const hoveredTimeDiffInMinutes = hoveredX
    ? ((hoveredX - screenWidth / 2) * 60) / 56
    : null;

  const hoveredTime = hoveredTimeDiffInMinutes
    ? DateTime.fromJSDate(centerTime).plus({
        minutes: hoveredTimeDiffInMinutes,
      })
    : null;

  const hoveredTimeDiffDisplayText = hoveredTime
    ? hoveredTime.diff(DateTime.fromJSDate(centerTime), ['hours']).toHuman({
        listStyle: 'short',
        unitDisplay: 'short',
        maximumFractionDigits: 1,
        signDisplay: 'exceptZero',
      })
    : null;

  const selectedTimeDiffDIsplayText = selectedTime
    ? DateTime.fromJSDate(selectedTime)
        .diff(DateTime.fromJSDate(currentTime), ['days', 'hours', 'minutes'])
        .normalize()
        .toHuman({
          listStyle: 'narrow',
          unitDisplay: 'short',
          maximumFractionDigits: 0,
          signDisplay: 'exceptZero',
        })
    : 'Current time';

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

          <div className="flex justify-end gap-x-4">
            {selectedTime !== null && (
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setSelectedTime(null);
                      }}
                      className=""
                    >
                      <RotateCcwIcon className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Reset to current time</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            <DateTimePicker date={centerTime} setDate={setSelectedTime} />
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
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-0.5 h-full bg-primary" />
          <div className="absolute left-1/2 -translate-x-1/2 top-0 rounded-[10px] bg-primary text-white py-2 px-4 text-sm leading-6 shadow-md">
            {selectedTimeDiffDIsplayText}
          </div>

          {/* Hovered Time Indicator */}
          {hoveredX !== null && screenWidth > 1024 && (
            <>
              <div
                className="absolute left-[-48px] top-0 w-[1px] h-full dashed-border"
                style={{
                  transform: `translateX(calc(-50% + ${hoveredX}px))`,
                }}
              />
              <div
                className="absolute left-[-48px] top-0 rounded-[10px] bg-background dashed-border text-accent-foreground py-2 px-4 text-sm leading-6 min-w-[80px] text-center"
                // className="absolute left-[-48px] top-0 rounded-[10px] bg-background border border-primary border-dashed text-accent-foreground py-2 px-4 text-sm leading-6"
                style={{
                  transform: `translateX(calc(-50% + ${hoveredX}px))`,
                }}
              >
                {hoveredTimeDiffDisplayText}
              </div>
            </>
          )}

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
                    currentTime={centerTime}
                    timezone={timezone}
                    isEditing={isEditing}
                    removeSelectedTimezone={removeSelectedTimezone}
                    screenWidth={screenWidth}
                    hoveredX={hoveredX}
                    setHoveredX={setHoveredX}
                    hoveredTime={hoveredTime}
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
