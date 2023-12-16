"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils/utils"
import { formatDate } from "@/lib/formatter/formatDate"

export function DatePicker({ onSelectedDate } : { onSelectedDate: (date: any) => void }) {
  const [date, setDate] = React.useState<Date>();
  const handleSelectedDate = () => {
    onSelectedDate(formatDate(date))
  }
  
  return (
    <div className="flex items-center">
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal rounded-r-none",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "dd/MM/yyyy") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 mb-3">
        <Calendar
          className="w-full"
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
    <Button className="rounded-l-none" onClick={handleSelectedDate}>cek</Button>
    </div>
  )
}
