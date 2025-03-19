import React, { useState } from "react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, parse } from "date-fns";
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, Clock, User, PawPrint, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Appointment {
  id: number;
  title: string;
  date: Date;
  petName: string;
  ownerName: string;
  duration: number;
  color?: string;
}

export function AppointmentCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState<Date | undefined>(new Date());
  const [appointmentTime, setAppointmentTime] = useState("09:00");
  const [appointmentTitle, setAppointmentTitle] = useState("");
  const [petName, setPetName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [appointmentType, setAppointmentType] = useState("");
  const [notes, setNotes] = useState("");
  
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 1,
      title: "Fluffy - Checkup",
      date: new Date(2023, 2, 15, 10, 0),
      petName: "Fluffy",
      ownerName: "John Doe",
      duration: 30,
      color: "bg-blue-200 text-blue-800"
    },
  ]);

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const onDateClick = (day: Date) => {
    setSelectedDate(day);
  };

  const handleAddAppointment = () => {
    if (!appointmentDate || !appointmentTitle || !appointmentTime || !petName || !ownerName) {
      toast.error("Please fill in all required fields");
      return;
    }

    const [hours, minutes] = appointmentTime.split(':').map(Number);
    const appointmentDateTime = new Date(appointmentDate);
    appointmentDateTime.setHours(hours, minutes, 0, 0);

    const newAppointment: Appointment = {
      id: appointments.length + 1,
      title: appointmentTitle,
      date: appointmentDateTime,
      petName: petName,
      ownerName: ownerName,
      duration: 30,
      color: getRandomAppointmentColor()
    };

    setAppointments([...appointments, newAppointment]);
    
    toast.success("Appointment scheduled successfully!");
    
    resetAppointmentForm();
    setDialogOpen(false);
  };

  const resetAppointmentForm = () => {
    setAppointmentTitle("");
    setAppointmentDate(new Date());
    setAppointmentTime("09:00");
    setPetName("");
    setOwnerName("");
    setAppointmentType("");
    setNotes("");
  };

  const getRandomAppointmentColor = () => {
    const colors = [
      "bg-blue-200 text-blue-800",
      "bg-green-200 text-green-800",
      "bg-purple-200 text-purple-800",
      "bg-yellow-200 text-yellow-800",
      "bg-red-200 text-red-800",
      "bg-indigo-200 text-indigo-800",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
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
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-clinic-blue hover:bg-clinic-blue/90">
              <Plus className="h-4 w-4 mr-1" />
              New Appointment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Schedule New Appointment</DialogTitle>
              <DialogDescription>
                Enter the details below to schedule a new appointment.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="appointment-date" className="flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-2 text-blue-500" />
                    Date
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !appointmentDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {appointmentDate ? format(appointmentDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 pointer-events-auto">
                      <Calendar
                        mode="single"
                        selected={appointmentDate}
                        onSelect={setAppointmentDate}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="appointment-time" className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-blue-500" />
                    Time
                  </Label>
                  <Select value={appointmentTime} onValueChange={setAppointmentTime}>
                    <SelectTrigger id="appointment-time">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 10 }, (_, i) => i + 9).map((hour) => (
                        <React.Fragment key={hour}>
                          <SelectItem value={`${hour.toString().padStart(2, '0')}:00`}>
                            {`${hour.toString().padStart(2, '0')}:00`}
                          </SelectItem>
                          <SelectItem value={`${hour.toString().padStart(2, '0')}:30`}>
                            {`${hour.toString().padStart(2, '0')}:30`}
                          </SelectItem>
                        </React.Fragment>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="appointment-title" className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-blue-500" />
                  Appointment Title
                </Label>
                <Input 
                  id="appointment-title" 
                  placeholder="E.g. Checkup, Vaccination, etc."
                  value={appointmentTitle}
                  onChange={(e) => setAppointmentTitle(e.target.value)} 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pet-name" className="flex items-center">
                    <PawPrint className="h-4 w-4 mr-2 text-blue-500" />
                    Pet Name
                  </Label>
                  <Input 
                    id="pet-name" 
                    placeholder="Pet's name"
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="owner-name" className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-blue-500" />
                    Owner Name
                  </Label>
                  <Input 
                    id="owner-name" 
                    placeholder="Owner's name"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)} 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="appointment-type">Appointment Type</Label>
                <Select value={appointmentType} onValueChange={setAppointmentType}>
                  <SelectTrigger id="appointment-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="checkup">Regular Checkup</SelectItem>
                    <SelectItem value="vaccination">Vaccination</SelectItem>
                    <SelectItem value="surgery">Surgery</SelectItem>
                    <SelectItem value="dental">Dental Cleaning</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea 
                  id="notes" 
                  placeholder="Additional information"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="button" onClick={handleAddAppointment}>
                Schedule Appointment
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
            {todaysAppointments.map((appt, index) => (
              <div 
                key={appt.id} 
                className={`calendar-day-event ${appt.color || "bg-blue-200 text-blue-800"} text-xs p-1 rounded my-1 truncate`}
                style={{ top: `${(index * 40) + 40}%` }}
                title={`${appt.title} - ${format(appt.date, "h:mm a")}`}
              >
                {format(appt.date, "h:mm a")} {appt.title}
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
