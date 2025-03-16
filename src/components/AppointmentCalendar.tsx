
import { useState } from "react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from "date-fns";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AppointmentCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Sample appointments data
  const appointments = [
    {
      id: 1,
      title: "Fluffy - Checkup",
      date: new Date(2023, 2, 15, 10, 0),
      duration: 30,
    },
  ];

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const onDateClick = (day: Date) => {
    setSelectedDate(day);
  };

  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between mb-4">
        <div className="flex space-x-4">
          <Button variant="outline" size="sm" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <h2 className="text-lg font-semibold">{format(currentMonth, "MMMM yyyy")}</h2>
        <Button size="sm" className="bg-clinic-blue hover:bg-clinic-blue/90">
          <Plus className="h-4 w-4 mr-1" />
          New Appointment
        </Button>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-center py-2 font-semibold text-sm">
          {daysOfWeek[i]}
        </div>
      );
    }

    return <div className="grid grid-cols-7">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, "d");
        const cloneDay = day;
        const todaysAppointments = appointments.filter(appt => 
          isSameDay(appt.date, day)
        );
        
        days.push(
          <div
            key={day.toString()}
            className={`calendar-day ${
              !isSameMonth(day, monthStart)
                ? "calendar-day-inactive"
                : isSameDay(day, selectedDate)
                ? "bg-blue-50 dark:bg-blue-900/20"
                : ""
            }`}
            onClick={() => onDateClick(cloneDay)}
          >
            <div className="text-right">{formattedDate}</div>
            {todaysAppointments.map(appt => (
              <div 
                key={appt.id} 
                className="calendar-day-event"
                style={{ top: `${40}%`, height: '40px' }}
              >
                {appt.title}
              </div>
            ))}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day.toString()} className="grid grid-cols-7">
          {days}
        </div>
      );
      days = [];
    }
    return <div className="border rounded-md overflow-hidden">{rows}</div>;
  };

  return (
    <div className="clinic-card space-y-4 animate-fade-in">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
}
