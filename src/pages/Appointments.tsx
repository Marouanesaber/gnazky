import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { format, parseISO, isSameDay } from "date-fns";
import { CalendarIcon, Search, Filter, Plus, Clock, Calendar as CalendarIcon2, AlertCircle, CheckCircle, Trash2, Pencil, FileText, UserCircle, PawPrint } from "lucide-react";
import { toast } from "sonner";
import { appointmentsApi, petsApi, ownersApi } from "@/utils/api";

interface Appointment {
  id: number;
  pet_id?: number;
  petName: string;
  petType: string;
  ownerName: string;
  date: string;
  time: string;
  end_time?: string;
  reason: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  notes: string;
  doctor: string;
}

interface Pet {
  id: number;
  name: string;
  owner: string;
  type: string;
  breed: string;
  owner_id?: number;
}

interface Doctor {
  id: number;
  name: string;
  speciality: string;
}

interface AppointmentCardProps {
  appointment: Appointment;
  onComplete: (id: number) => void;
  onConfirm: (id: number) => void;
  onEdit: () => void;
  onCancel: () => void;
  getStatusBadge: (status: string) => React.ReactNode;
  getReasonIcon: (reason: string) => React.ReactNode;
}

const AppointmentCard = ({
  appointment,
  onComplete,
  onConfirm,
  onEdit,
  onCancel,
  getStatusBadge,
  getReasonIcon
}: AppointmentCardProps) => {
  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          {getReasonIcon(appointment.reason)}
          <div>
            <h3 className="font-medium">{appointment.petName} ({appointment.petType})</h3>
            <p className="text-sm text-muted-foreground">{appointment.ownerName}</p>
          </div>
        </div>
        {getStatusBadge(appointment.status)}
      </div>
      
      <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
        <div className="flex items-center gap-1">
          <CalendarIcon className="h-3.5 w-3.5 text-muted-foreground" />
          <span>{format(new Date(appointment.date), 'MMM dd, yyyy')}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5 text-muted-foreground" />
          <span>{appointment.time}</span>
        </div>
        <div className="col-span-2 flex items-center gap-1">
          <UserCircle className="h-3.5 w-3.5 text-muted-foreground" />
          <span>{appointment.doctor}</span>
        </div>
        {appointment.notes && (
          <div className="col-span-2 mt-1 text-xs text-muted-foreground">
            <p className="line-clamp-2">{appointment.notes}</p>
          </div>
        )}
      </div>
      
      <div className="mt-3 flex justify-end gap-2">
        {appointment.status === "pending" && (
          <Button size="sm" variant="outline" onClick={() => onConfirm(appointment.id)}>
            <CheckCircle className="mr-1 h-3.5 w-3.5" />
            Confirm
          </Button>
        )}
        {["pending", "confirmed"].includes(appointment.status) && (
          <>
            <Button size="sm" variant="outline" onClick={() => onComplete(appointment.id)}>
              <CheckCircle className="mr-1 h-3.5 w-3.5" />
              Complete
            </Button>
            <Button size="sm" variant="outline" onClick={onEdit}>
              <Pencil className="mr-1 h-3.5 w-3.5" />
              Edit
            </Button>
            <Button size="sm" variant="outline" className="text-destructive hover:text-destructive" onClick={onCancel}>
              <Trash2 className="mr-1 h-3.5 w-3.5" />
              Cancel
            </Button>
          </>
        )}
        {["completed", "cancelled"].includes(appointment.status) && (
          <Button size="sm" variant="outline" onClick={onEdit}>
            <FileText className="mr-1 h-3.5 w-3.5" />
            Details
          </Button>
        )}
      </div>
    </div>
  );
};

const AppointmentsPage = () => {
  const doctors = [
    { id: 1, name: "Dr. Sarah Johnson", speciality: "Surgery, Internal Medicine" },
    { id: 2, name: "Dr. Michael Chen", speciality: "Dermatology, Nutrition" },
    { id: 3, name: "Dr. Emily Rodriguez", speciality: "Exotic Pets, Avian Medicine" },
    { id: 4, name: "Dr. James Wilson", speciality: "Dental Surgery, Oral Health" }
  ];

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  
  const [newAppointment, setNewAppointment] = useState({
    petId: "",
    date: format(new Date(), 'yyyy-MM-dd'),
    time: "10:00",
    end_time: "10:30",
    reason: "checkup",
    notes: "",
    doctorId: ""
  });
  
  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const data = await appointmentsApi.getAll();
        
        const formattedAppointments: Appointment[] = data.map((app: any) => ({
          id: app.id,
          pet_id: app.pet_id,
          petName: app.pet_name || "Unknown Pet",
          petType: app.pet_type || "Unknown",
          ownerName: app.owner_name || "Unknown Owner",
          date: app.appointment_date?.split('T')[0] || new Date().toISOString().split('T')[0],
          time: app.appointment_date ? format(new Date(app.appointment_date), 'HH:mm') : "00:00",
          end_time: app.end_time,
          reason: app.reason || "checkup",
          status: (app.status as "pending" | "confirmed" | "completed" | "cancelled") || "pending",
          notes: app.notes || "",
          doctor: app.doctor || "Dr. Unknown"
        }));
        
        setAppointments(formattedAppointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        toast.error("Failed to load appointments");
        
        setAppointments([
          { 
            id: 1, 
            pet_id: 1,
            petName: "Max", 
            petType: "Dog",
            ownerName: "John Doe", 
            date: "2023-10-15", 
            time: "10:00", 
            reason: "Vaccination", 
            status: "confirmed", 
            notes: "Rabies vaccination due",
            doctor: "Dr. Sarah Johnson"
          },
          { 
            id: 2, 
            pet_id: 2,
            petName: "Luna", 
            petType: "Cat",
            ownerName: "Jane Smith", 
            date: "2023-10-16", 
            time: "14:30", 
            reason: "Checkup", 
            status: "pending", 
            notes: "Annual wellness exam",
            doctor: "Dr. Michael Chen"
          },
          { 
            id: 3, 
            pet_id: 3,
            petName: "Buddy", 
            petType: "Dog",
            ownerName: "Mike Johnson", 
            date: "2023-10-18", 
            time: "09:15", 
            reason: "Illness", 
            status: "completed", 
            notes: "Digestive issues, prescribed medication",
            doctor: "Dr. Sarah Johnson"
          },
          { 
            id: 4, 
            pet_id: 4,
            petName: "Whiskers", 
            petType: "Cat",
            ownerName: "Sarah Williams", 
            date: "2023-10-20", 
            time: "16:00", 
            reason: "Dental", 
            status: "cancelled", 
            notes: "Dental cleaning",
            doctor: "Dr. James Wilson"
          },
          { 
            id: 5, 
            pet_id: 5,
            petName: "Rocky", 
            petType: "Dog",
            ownerName: "David Miller", 
            date: "2023-10-22", 
            time: "11:30", 
            reason: "Surgery", 
            status: "confirmed", 
            notes: "Scheduled for minor procedure",
            doctor: "Dr. Emily Rodriguez"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    
    const fetchPets = async () => {
      try {
        const petsData = await petsApi.getAll();
        
        const enhancedPets = await Promise.all(petsData.map(async (pet: any) => {
          try {
            const ownerData = pet.owner_id ? await ownersApi.getById(pet.owner_id) : null;
            return {
              id: pet.id,
              name: pet.name,
              owner: ownerData ? `${ownerData.first_name} ${ownerData.last_name}` : "Unknown Owner",
              type: pet.species || "Unknown",
              breed: pet.breed || "Unknown",
              owner_id: pet.owner_id
            };
          } catch (error) {
            return {
              id: pet.id,
              name: pet.name,
              owner: "Unknown Owner",
              type: pet.species || "Unknown",
              breed: pet.breed || "Unknown"
            };
          }
        }));
        
        setPets(enhancedPets);
      } catch (error) {
        console.error("Error fetching pets:", error);
        setPets([
          { id: 1, name: "Max", owner: "John Doe", type: "Dog", breed: "Golden Retriever" },
          { id: 2, name: "Luna", owner: "Jane Smith", type: "Cat", breed: "Siamese" },
          { id: 3, name: "Buddy", owner: "Mike Johnson", type: "Dog", breed: "German Shepherd" },
          { id: 4, name: "Whiskers", owner: "Sarah Williams", type: "Cat", breed: "Maine Coon" },
          { id: 5, name: "Rocky", owner: "David Miller", type: "Dog", breed: "Bulldog" }
        ]);
      }
    };
    
    fetchAppointments();
    fetchPets();
  }, []);
  
  const filteredAppointments = appointments.filter(app => {
    const matchesSearch = 
      app.petName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.ownerName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || app.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });
  
  const appointmentsForSelectedDate = appointments.filter(app => 
    selectedDate && app.date && isSameDay(parseISO(app.date), selectedDate)
  );
  
  const handleCreateAppointment = async () => {
    if (!newAppointment.petId || !newAppointment.date || !newAppointment.time || !newAppointment.doctorId) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    const pet = pets.find(p => p.id.toString() === newAppointment.petId);
    const doctor = doctors.find(d => d.id.toString() === newAppointment.doctorId);
    
    if (!pet) {
      toast.error("Invalid pet selection");
      return;
    }

    try {
      const appointmentData = {
        pet_id: parseInt(newAppointment.petId),
        appointment_date: `${newAppointment.date}T${newAppointment.time}`,
        end_time: newAppointment.end_time,
        reason: newAppointment.reason,
        notes: newAppointment.notes,
        status: "pending",
        doctor: doctor?.name || ""
      };
      
      const response = await appointmentsApi.create(appointmentData);
      
      const newAppointmentObj: Appointment = {
        id: response.id || Date.now(),
        pet_id: parseInt(newAppointment.petId),
        petName: pet.name,
        petType: pet.type,
        ownerName: pet.owner,
        date: newAppointment.date,
        time: newAppointment.time,
        end_time: newAppointment.end_time,
        reason: newAppointment.reason,
        status: "pending",
        notes: newAppointment.notes,
        doctor: doctor?.name || "Unassigned"
      };
      
      setAppointments([...appointments, newAppointmentObj]);
      setIsCreateDialogOpen(false);
      
      setNewAppointment({
        petId: "",
        date: format(new Date(), 'yyyy-MM-dd'),
        time: "10:00",
        end_time: "10:30",
        reason: "checkup",
        notes: "",
        doctorId: ""
      });
      
      toast.success("New appointment created successfully!");
    } catch (error) {
      console.error("Error creating appointment:", error);
      toast.error("Failed to create appointment");
    }
  };
  
  const handleUpdateAppointment = async () => {
    if (!selectedAppointment) return;
    
    try {
      const updateData = {
        appointment_date: `${selectedAppointment.date}T${selectedAppointment.time}`,
        end_time: selectedAppointment.end_time,
        reason: selectedAppointment.reason,
        notes: selectedAppointment.notes,
        status: selectedAppointment.status,
        doctor: selectedAppointment.doctor
      };
      
      await appointmentsApi.update(selectedAppointment.id, updateData);
      
      const updatedAppointments = appointments.map(app => {
        if (app.id === selectedAppointment.id) {
          return selectedAppointment;
        }
        return app;
      });
      
      setAppointments(updatedAppointments);
      setIsEditDialogOpen(false);
      toast.success("Appointment updated successfully!");
    } catch (error) {
      console.error("Error updating appointment:", error);
      toast.error("Failed to update appointment");
    }
  };
  
  const handleCancelAppointment = async () => {
    if (!selectedAppointment) return;
    
    try {
      await appointmentsApi.update(selectedAppointment.id, { status: "cancelled" });
      
      const updatedAppointments = appointments.map(app => {
        if (app.id === selectedAppointment.id) {
          return { ...app, status: "cancelled" as "pending" | "confirmed" | "completed" | "cancelled" };
        }
        return app;
      });
      
      setAppointments(updatedAppointments);
      setIsCancelDialogOpen(false);
      toast.success("Appointment cancelled successfully!");
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      toast.error("Failed to cancel appointment");
    }
  };
  
  const handleCompleteAppointment = async (id: number) => {
    try {
      await appointmentsApi.update(id, { status: "completed" });
      
      const updatedAppointments = appointments.map(app => {
        if (app.id === id) {
          return { ...app, status: "completed" as "pending" | "confirmed" | "completed" | "cancelled" };
        }
        return app;
      });
      
      setAppointments(updatedAppointments);
      toast.success("Appointment marked as completed!");
    } catch (error) {
      console.error("Error completing appointment:", error);
      toast.error("Failed to complete appointment");
    }
  };

  const handleConfirmAppointment = async (id: number) => {
    try {
      await appointmentsApi.update(id, { status: "confirmed" });
      
      const updatedAppointments = appointments.map(app => {
        if (app.id === id) {
          return { ...app, status: "confirmed" as "pending" | "confirmed" | "completed" | "cancelled" };
        }
        return app;
      });
      
      setAppointments(updatedAppointments);
      toast.success("Appointment confirmed!");
    } catch (error) {
      console.error("Error confirming appointment:", error);
      toast.error("Failed to confirm appointment");
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case "confirmed":
        return <Badge className="bg-blue-500">Confirmed</Badge>;
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>;
      case "cancelled":
        return <Badge className="bg-red-500">Cancelled</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };
  
  const getReasonIcon = (reason: string) => {
    switch (reason.toLowerCase()) {
      case "vaccination":
        return <div className="bg-green-100 p-1.5 rounded-full"><FileText className="h-4 w-4 text-green-600" /></div>;
      case "checkup":
        return <div className="bg-blue-100 p-1.5 rounded-full"><UserCircle className="h-4 w-4 text-blue-600" /></div>;
      case "illness":
        return <div className="bg-red-100 p-1.5 rounded-full"><AlertCircle className="h-4 w-4 text-red-600" /></div>;
      case "dental":
        return <div className="bg-purple-100 p-1.5 rounded-full"><FileText className="h-4 w-4 text-purple-600" /></div>;
      case "surgery":
        return <div className="bg-orange-100 p-1.5 rounded-full"><FileText className="h-4 w-4 text-orange-600" /></div>;
      default:
        return <div className="bg-gray-100 p-1.5 rounded-full"><FileText className="h-4 w-4 text-gray-600" /></div>;
    }
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Appointments</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Appointment
        </Button>
      </div>

      {loading ? (
        <div className="py-10 text-center">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading appointments...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Appointments List</CardTitle>
                <CardDescription>
                  View and manage all scheduled appointments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                  <div className="relative w-full md:w-auto">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search by pet or owner name..."
                      className="w-full md:w-[300px] pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Tabs defaultValue="upcoming" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                    <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                  </TabsList>

                  <TabsContent value="upcoming" className="mt-4">
                    <div className="space-y-3">
                      {filteredAppointments
                        .filter(app => ["confirmed", "pending"].includes(app.status))
                        .sort((a, b) => new Date(a.date + 'T' + a.time).getTime() - new Date(b.date + 'T' + b.time).getTime())
                        .map(appointment => (
                          <AppointmentCard 
                            key={appointment.id} 
                            appointment={appointment} 
                            onComplete={handleCompleteAppointment}
                            onConfirm={handleConfirmAppointment}
                            onEdit={() => {
                              setSelectedAppointment(appointment);
                              setIsEditDialogOpen(true);
                            }}
                            onCancel={() => {
                              setSelectedAppointment(appointment);
                              setIsCancelDialogOpen(true);
                            }}
                            getStatusBadge={getStatusBadge}
                            getReasonIcon={getReasonIcon}
                          />
                        ))}
                      
                      {filteredAppointments.filter(app => ["confirmed", "pending"].includes(app.status)).length === 0 && (
                        <div className="text-center py-6 text-muted-foreground">
                          No upcoming appointments found
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="pending" className="mt-4">
                    <div className="space-y-3">
                      {filteredAppointments
                        .filter(app => app.status === "pending")
                        .sort((a, b) => new Date(a.date + 'T' + a.time).getTime() - new Date(b.date + 'T' + b.time).getTime())
                        .map(appointment => (
                          <AppointmentCard 
                            key={appointment.id} 
                            appointment={appointment} 
                            onComplete={handleCompleteAppointment}
                            onConfirm={handleConfirmAppointment}
                            onEdit={() => {
                              setSelectedAppointment(appointment);
                              setIsEditDialogOpen(true);
                            }}
                            onCancel={() => {
                              setSelectedAppointment(appointment);
                              setIsCancelDialogOpen(true);
                            }}
                            getStatusBadge={getStatusBadge}
                            getReasonIcon={getReasonIcon}
                          />
                        ))}
                      
                      {filteredAppointments.filter(app => app.status === "pending").length === 0 && (
                        <div className="text-center py-6 text-muted-foreground">
                          No pending appointments found
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="completed" className="mt-4">
                    <div className="space-y-3">
                      {filteredAppointments
                        .filter(app => app.status === "completed")
                        .sort((a, b) => new Date(b.date + 'T' + b.time).getTime() - new Date(a.date + 'T' + a.time).getTime())
                        .map(appointment => (
                          <AppointmentCard 
                            key={appointment.id} 
                            appointment={appointment}
                            onComplete={handleCompleteAppointment}
                            onConfirm={handleConfirmAppointment}
                            onEdit={() => {
                              setSelectedAppointment(appointment);
                              setIsEditDialogOpen(true);
                            }}
                            onCancel={() => {
                              setSelectedAppointment(appointment);
                              setIsCancelDialogOpen(true);
                            }}
                            getStatusBadge={getStatusBadge}
                            getReasonIcon={getReasonIcon}
                          />
                        ))}
                      
                      {filteredAppointments.filter(app => app.status === "completed").length === 0 && (
                        <div className="text-center py-6 text-muted-foreground">
                          No completed appointments found
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="cancelled" className="mt-4">
                    <div className="space-y-3">
                      {filteredAppointments
                        .filter(app => app.status === "cancelled")
                        .sort((a, b) => new Date(b.date + 'T' + b.time).getTime() - new Date(a.date + 'T' + a.time).getTime())
                        .map(appointment => (
                          <AppointmentCard 
                            key={appointment.id} 
                            appointment={appointment}
                            onComplete={handleCompleteAppointment}
                            onConfirm={handleConfirmAppointment}
                            onEdit={() => {
                              setSelectedAppointment(appointment);
                              setIsEditDialogOpen(true);
                            }}
                            onCancel={() => {
                              setSelectedAppointment(appointment);
                              setIsCancelDialogOpen(true);
                            }}
                            getStatusBadge={getStatusBadge}
                            getReasonIcon={getReasonIcon}
                          />
                        ))}
                      
                      {filteredAppointments.filter(app => app.status === "cancelled").length === 0 && (
                        <div className="text-center py-6 text-muted-foreground">
                          No cancelled appointments found
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Calendar View</CardTitle>
                <CardDescription>
                  View appointments by date
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border shadow p-3 pointer-events-auto"
                />
                
                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-2">
                    {selectedDate ? `Appointments for ${format(selectedDate, 'PPP')}` : 'No date selected'}
                  </h3>
                  
                  <div className="space-y-2">
                    {appointmentsForSelectedDate.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No appointments scheduled for this date</p>
                    ) : (
                      appointmentsForSelectedDate.map(app => (
                        <div key={app.id} className="flex items-center justify-between p-2 rounded-md border">
                          <div className="flex items-center gap-2">
                            <div className="flex-shrink-0">
                              {getReasonIcon(app.reason)}
                            </div>
                            <div>
                              <p className="text-sm font-medium">{app.time} - {app.petName}</p>
                              <p className="text-xs text-muted-foreground">{app.reason}</p>
                            </div>
                          </div>
                          <div>{getStatusBadge(app.status)}</div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full"
                  variant="outline"
                  onClick={() => {
                    if (selectedDate) {
                      setNewAppointment({
                        ...newAppointment,
                        date: format(selectedDate, 'yyyy-MM-dd')
                      });
                      setIsCreateDialogOpen(true);
                    } else {
                      toast.error("Please select a date first");
                    }
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Appointment
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Appointment</DialogTitle>
            <DialogDescription>
              Enter the details to schedule a new appointment
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="pet" className="text-right">
                Pet
              </Label>
              <Select
                value={newAppointment.petId}
                onValueChange={(value) => setNewAppointment({...newAppointment, petId: value})}
              >
                <SelectTrigger id="pet" className="col-span-3">
                  <SelectValue placeholder="Select pet" />
                </SelectTrigger>
                <SelectContent>
                  {pets.map((pet) => (
                    <SelectItem key={pet.id} value={pet.id.toString()}>
                      {pet.name} ({pet.type} - {pet.owner})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={newAppointment.date}
                onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                className="col-span-3"
                min={format(new Date(), 'yyyy-MM-dd')}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="time" className="text-right">
                Start Time
              </Label>
              <Input
                id="time"
                type="time"
                value={newAppointment.time}
                onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="endTime" className="text-right">
                End Time
              </Label>
              <Input
                id="endTime"
                type="time"
                value={newAppointment.end_time}
                onChange={(e) => setNewAppointment({...newAppointment, end_time: e.target.value})}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="reason" className="text-right">
                Reason
              </Label>
              <Select
                value={newAppointment.reason}
                onValueChange={(value) => setNewAppointment({...newAppointment, reason: value})}
              >
                <SelectTrigger id="reason" className="col-span-3">
                  <SelectValue placeholder="Select reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="checkup">Regular Checkup</SelectItem>
                  <SelectItem value="vaccination">Vaccination</SelectItem>
                  <SelectItem value="illness">Illness/Injury</SelectItem>
                  <SelectItem value="dental">Dental Care</SelectItem>
                  <SelectItem value="surgery">Surgery</SelectItem>
                  <SelectItem value="grooming">Grooming</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="doctor" className="text-right">
                Doctor
              </Label>
              <Select
                value={newAppointment.doctorId}
                onValueChange={(value) => setNewAppointment({...newAppointment, doctorId: value})}
              >
                <SelectTrigger id="doctor" className="col-span-3">
                  <SelectValue placeholder="Select doctor" />
                </SelectTrigger>
                <SelectContent>
                  {doctors.map((doctor) => (
                    <SelectItem key={doctor.id} value={doctor.id.toString()}>
                      {doctor.name} ({doctor.speciality})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="notes" className="text-right pt-2">
                Notes
              </Label>
              <Textarea
                id="notes"
                placeholder="Additional details about the appointment"
                value={newAppointment.notes}
                onChange={(e) => setNewAppointment({...newAppointment, notes: e.target.value})}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateAppointment}>Create Appointment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Appointment</DialogTitle>
            <DialogDescription>
              {selectedAppointment && `Update the details for ${selectedAppointment.petName}'s appointment`}
            </DialogDescription>
          </DialogHeader>
          {selectedAppointment && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-date" className="text-right">
                  Date
                </Label>
                <Input
                  id="edit-date"
                  type="date"
                  value={selectedAppointment.date}
                  onChange={(e) => setSelectedAppointment({...selectedAppointment, date: e.target.value})}
                  className="col-span-3"
                  min={format(new Date(), 'yyyy-MM-dd')}
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-time" className="text-right">
                  Time
                </Label>
                <Input
                  id="edit-time"
                  type="time"
                  value={selectedAppointment.time}
                  onChange={(e) => setSelectedAppointment({...selectedAppointment, time: e.target.value})}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-reason" className="text-right">
                  Reason
                </Label>
                <Select
                  value={selectedAppointment.reason}
                  onValueChange={(value) => setSelectedAppointment({...selectedAppointment, reason: value})}
                >
                  <SelectTrigger id="edit-reason" className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="checkup">Regular Checkup</SelectItem>
                    <SelectItem value="vaccination">Vaccination</SelectItem>
                    <SelectItem value="illness">Illness/Injury</SelectItem>
                    <SelectItem value="dental">Dental Care</SelectItem>
                    <SelectItem value="surgery">Surgery</SelectItem>
                    <SelectItem value="grooming">Grooming</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right">
                  Status
                </Label>
                <Select
                  value={selectedAppointment.status}
                  onValueChange={(value: "pending" | "confirmed" | "completed" | "cancelled") => 
                    setSelectedAppointment({...selectedAppointment, status: value})}
                >
                  <SelectTrigger id="edit-status" className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-doctor" className="text-right">
                  Doctor
                </Label>
                <Select
                  value={selectedAppointment.doctor}
                  onValueChange={(value) => setSelectedAppointment({...selectedAppointment, doctor: value})}
                >
                  <SelectTrigger id="edit-doctor" className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {doctors.map((doctor) => (
                      <SelectItem key={doctor.id} value={doctor.name}>
                        {doctor.name} ({doctor.speciality})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="edit-notes" className="text-right pt-2">
                  Notes
                </Label>
                <Textarea
                  id="edit-notes"
                  placeholder="Additional details about the appointment"
                  value={selectedAppointment.notes}
                  onChange={(e) => setSelectedAppointment({...selectedAppointment, notes: e.target.value})}
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdateAppointment}>Update Appointment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Cancel Appointment</DialogTitle>
            <DialogDescription>
              {selectedAppointment && `Are you sure you want to cancel ${selectedAppointment.petName}'s appointment on ${format(new Date(selectedAppointment.date), 'PPP')}?`}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              This action cannot be undone. The appointment will be marked as cancelled.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCancelDialogOpen(false)}>
              Keep Appointment
            </Button>
            <Button variant="destructive" onClick={handleCancelAppointment}>
              Cancel Appointment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AppointmentsPage;
