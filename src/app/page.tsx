'use client';

import * as React from 'react';

import { TimezonePicker } from '@/components/TimezonePicker';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Home() {
  const [tzCodes, setTzCodes] = React.useState<string[]>([]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-xl font-bold">Time zone</h1>
        <div className="flex space-x-2">
          <TimezonePicker tzCodes={tzCodes} setTzCodes={setTzCodes} />
        </div>
      </div>
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-1/2 w-0.5 bg-gray-300" />
        <ScrollArea className="flex w-full space-x-4 overflow-x-scroll py-2">
          <div className="flex flex-col items-center space-y-2">
            <div className="text-center">
              <p className="font-semibold">Calgary</p>
              <p className="text-sm text-gray-500">GMT-7</p>
            </div>
            <div className="relative flex h-10 w-full items-center">
              {/* <div className="absolute inset-y-0 left-0 w-1/2 bg-gray-200" /> */}
              <div className="flex w-full justify-between px-4">
                <span>0</span>
                <span>4</span>
                <span>8</span>
                <span>12</span>
                <span>16</span>
                <span>20</span>
                <span>00</span>
              </div>
              {/* <div className="absolute inset-y-0 right-0 w-1/2 bg-gray-200" /> */}
            </div>
            <div className="text-sm">2/26 10:00</div>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <div className="text-center">
              <p className="font-semibold">London</p>
              <p className="text-sm text-gray-500">GMT</p>
            </div>
            <div className="relative flex h-10 w-full items-center">
              {/* <div className="absolute inset-y-0 left-0 w-1/2 bg-gray-200" /> */}
              <div className="flex w-full justify-between px-4">
                <span>7</span>
                <span>11</span>
                <span>15</span>
                <span>19</span>
                <span>23</span>
                <span>3</span>
                <span>7</span>
              </div>
              {/* <div className="absolute inset-y-0 right-0 w-1/2 bg-gray-200" /> */}
            </div>
            <div className="text-sm">2/26 11:00</div>
          </div>
        </ScrollArea>
      </div>
    </main>
  );
}
