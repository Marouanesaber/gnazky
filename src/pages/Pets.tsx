
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PawPrint, Plus, Search, Filter, Calendar, Syringe } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const PetsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const [isVaccinationDialogOpen, setIsVaccinationDialogOpen] = useState(false);
  const [currentPet, setCurrentPet] = useState<any>(null);

  // Mock data for pets
  const [pets, setPets] = useState([
    { id: 1, name: "Max", type: "Dog", breed: "Golden Retriever", age: 3, owner: "John Doe", status: "healthy", lastVisit: "2023-09-10" },
    { id: 2, name: "Luna", type: "Cat", breed: "Siamese", age: 2, owner: "Jane Smith", status: "scheduled", lastVisit: "2023-09-05" },
    { id: 3, name: "Buddy", type: "Dog", breed: "German Shepherd", age: 4, owner: "Mike Johnson", status: "sick", lastVisit: "2023-09-20" },
    { id: 4, name: "Coco", type: "Rabbit", breed: "Holland Lop", age: 1, owner: "Sarah Williams", status: "healthy", lastVisit: "2023-08-15" },
    { id: 5, name: "Rocky", type: "Dog", breed: "Bulldog", age: 5, owner: "David Miller", status: "healthy", lastVisit: "2023-09-01" },
    { id: 6, name: "Milo", type: "Cat", breed: "Maine Coon", age: 3, owner: "Emily Davis", status: "scheduled", lastVisit: "2023-09-15" }
  ]);

  // New pet form state
  const [newPet, setNewPet] = useState({
    name: "",
    type: "",
    breed: "",
    age: "",
    owner: "",
  });

  // Schedule appointment state
  const [appointment, setAppointment] = useState({
    date: "",
    time: "",
    reason: "",
  });

  // Vaccination state
  const [vaccination, setVaccination] = useState({
    type: "",
    date: "",
    notes: "",
  });

  // Filter pets based on search query and filter type
  const filteredPets = pets.filter(pet => {
    const matchesSearch = pet.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         pet.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pet.breed.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = filterType === "all" || pet.type.toLowerCase() === filterType.toLowerCase();
    
    return matchesSearch && matchesType;
  });

  const handleOpenRegisterDialog = () => {
    setNewPet({
      name: "",
      type: "",
      breed: "",
      age: "",
      owner: "",
    });
    setIsRegisterDialogOpen(true);
  };

  const handleRegisterPet = () => {
    // Validate form
    if (!newPet.name || !newPet.type || !newPet.breed || !newPet.age || !newPet.owner) {
      toast.error("Please fill in all fields");
      return;
    }

    // Create new pet
    const newPetObject = {
      id: pets.length + 1,
      name: newPet.name,
      type: newPet.type,
      breed: newPet.breed,
      age: parseInt(newPet.age),
      owner: newPet.owner,
      status: "healthy",
      lastVisit: new Date().toISOString().split('T')[0],
    };

    // Add to pets list
    setPets([...pets, newPetObject]);
    
    // Close dialog and show success message
    setIsRegisterDialogOpen(false);
    toast.success(`${newPet.name} has been registered successfully!`);
  };

  const handleOpenScheduleDialog = (pet: any) => {
    setCurrentPet(pet);
    setAppointment({
      date: "",
      time: "",
      reason: "",
    });
    setIsScheduleDialogOpen(true);
  };

  const handleScheduleAppointment = () => {
    // Validate form
    if (!appointment.date || !appointment.time) {
      toast.error("Please select date and time");
      return;
    }

    // Update pet status
    const updatedPets = pets.map(pet => 
      pet.id === currentPet.id 
        ? { ...pet, status: "scheduled", lastVisit: appointment.date } 
        : pet
    );
    
    setPets(updatedPets);
    
    // Close dialog and show success message
    setIsScheduleDialogOpen(false);
    toast.success(`Appointment scheduled for ${currentPet.name} on ${appointment.date} at ${appointment.time}`);
  };

  const handleOpenVaccinationDialog = (pet: any) => {
    setCurrentPet(pet);
    setVaccination({
      type: "",
      date: "",
      notes: "",
    });
    setIsVaccinationDialogOpen(true);
  };

  const handleAddVaccination = () => {
    // Validate form
    if (!vaccination.type || !vaccination.date) {
      toast.error("Please select vaccination type and date");
      return;
    }

    // In a real app, we would save this to a database
    // For now, just show a success message
    setIsVaccinationDialogOpen(false);
    toast.success(`Vaccination ${vaccination.type} recorded for ${currentPet.name}`);
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Pets Management</h1>
        <Button className="gap-2" onClick={handleOpenRegisterDialog}>
          <Plus className="h-4 w-4" />
          Register New Pet
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-4">
          <TabsTrigger value="all">All Pets</TabsTrigger>
          <TabsTrigger value="dogs">Dogs</TabsTrigger>
          <TabsTrigger value="cats">Cats</TabsTrigger>
          <TabsTrigger value="other">Other Animals</TabsTrigger>
        </TabsList>
        
        <div className="flex flex-col md:flex-row justify-between gap-4 my-4">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search pets by name, breed, or owner..."
              className="w-full md:w-[350px] pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-[180px] flex gap-2">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="Pet Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="dog">Dogs</SelectItem>
                <SelectItem value="cat">Cats</SelectItem>
                <SelectItem value="rabbit">Rabbits</SelectItem>
                <SelectItem value="bird">Birds</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPets.map(pet => (
              <PetCard 
                key={pet.id} 
                pet={pet} 
                onSchedule={handleOpenScheduleDialog} 
                onVaccination={handleOpenVaccinationDialog} 
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="dogs" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPets
              .filter(pet => pet.type.toLowerCase() === "dog")
              .map(pet => (
                <PetCard 
                  key={pet.id} 
                  pet={pet} 
                  onSchedule={handleOpenScheduleDialog} 
                  onVaccination={handleOpenVaccinationDialog} 
                />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="cats" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPets
              .filter(pet => pet.type.toLowerCase() === "cat")
              .map(pet => (
                <PetCard 
                  key={pet.id} 
                  pet={pet} 
                  onSchedule={handleOpenScheduleDialog} 
                  onVaccination={handleOpenVaccinationDialog} 
                />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="other" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPets
              .filter(pet => !["dog", "cat"].includes(pet.type.toLowerCase()))
              .map(pet => (
                <PetCard 
                  key={pet.id} 
                  pet={pet} 
                  onSchedule={handleOpenScheduleDialog} 
                  onVaccination={handleOpenVaccinationDialog} 
                />
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Register Pet Dialog */}
      <Dialog open={isRegisterDialogOpen} onOpenChange={setIsRegisterDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Register New Pet</DialogTitle>
            <DialogDescription>
              Enter the details of the new pet.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="pet-name" className="text-right">Name</Label>
              <Input
                id="pet-name"
                value={newPet.name}
                onChange={(e) => setNewPet({...newPet, name: e.target.value})}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="pet-type" className="text-right">Type</Label>
              <Select
                value={newPet.type}
                onValueChange={(value) => setNewPet({...newPet, type: value})}
              >
                <SelectTrigger id="pet-type" className="col-span-3">
                  <SelectValue placeholder="Select pet type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Dog">Dog</SelectItem>
                  <SelectItem value="Cat">Cat</SelectItem>
                  <SelectItem value="Rabbit">Rabbit</SelectItem>
                  <SelectItem value="Bird">Bird</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="pet-breed" className="text-right">Breed</Label>
              <Input
                id="pet-breed"
                value={newPet.breed}
                onChange={(e) => setNewPet({...newPet, breed: e.target.value})}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="pet-age" className="text-right">Age</Label>
              <Input
                id="pet-age"
                type="number"
                value={newPet.age}
                onChange={(e) => setNewPet({...newPet, age: e.target.value})}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="pet-owner" className="text-right">Owner</Label>
              <Input
                id="pet-owner"
                value={newPet.owner}
                onChange={(e) => setNewPet({...newPet, owner: e.target.value})}
                className="col-span-3"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRegisterDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleRegisterPet}>Register Pet</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Schedule Appointment Dialog */}
      <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule Appointment</DialogTitle>
            <DialogDescription>
              {currentPet && `Schedule an appointment for ${currentPet.name}`}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="appointment-date" className="text-right">Date</Label>
              <Input
                id="appointment-date"
                type="date"
                value={appointment.date}
                onChange={(e) => setAppointment({...appointment, date: e.target.value})}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="appointment-time" className="text-right">Time</Label>
              <Select
                value={appointment.time}
                onValueChange={(value) => setAppointment({...appointment, time: value})}
              >
                <SelectTrigger id="appointment-time" className="col-span-3">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="09:00">9:00 AM</SelectItem>
                  <SelectItem value="10:00">10:00 AM</SelectItem>
                  <SelectItem value="11:00">11:00 AM</SelectItem>
                  <SelectItem value="13:00">1:00 PM</SelectItem>
                  <SelectItem value="14:00">2:00 PM</SelectItem>
                  <SelectItem value="15:00">3:00 PM</SelectItem>
                  <SelectItem value="16:00">4:00 PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="appointment-reason" className="text-right">Reason</Label>
              <Textarea
                id="appointment-reason"
                value={appointment.reason}
                onChange={(e) => setAppointment({...appointment, reason: e.target.value})}
                placeholder="Reason for the appointment"
                className="col-span-3"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsScheduleDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleScheduleAppointment}>Schedule</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Vaccination Dialog */}
      <Dialog open={isVaccinationDialogOpen} onOpenChange={setIsVaccinationDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Record Vaccination</DialogTitle>
            <DialogDescription>
              {currentPet && `Record a vaccination for ${currentPet.name}`}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="vaccination-type" className="text-right">Type</Label>
              <Select
                value={vaccination.type}
                onValueChange={(value) => setVaccination({...vaccination, type: value})}
              >
                <SelectTrigger id="vaccination-type" className="col-span-3">
                  <SelectValue placeholder="Select vaccination type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Rabies">Rabies</SelectItem>
                  <SelectItem value="Distemper">Distemper</SelectItem>
                  <SelectItem value="Parvovirus">Parvovirus</SelectItem>
                  <SelectItem value="Bordetella">Bordetella</SelectItem>
                  <SelectItem value="Leptospirosis">Leptospirosis</SelectItem>
                  <SelectItem value="Feline Leukemia">Feline Leukemia</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="vaccination-date" className="text-right">Date</Label>
              <Input
                id="vaccination-date"
                type="date"
                value={vaccination.date}
                onChange={(e) => setVaccination({...vaccination, date: e.target.value})}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="vaccination-notes" className="text-right">Notes</Label>
              <Textarea
                id="vaccination-notes"
                value={vaccination.notes}
                onChange={(e) => setVaccination({...vaccination, notes: e.target.value})}
                placeholder="Additional notes"
                className="col-span-3"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsVaccinationDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddVaccination}>Record Vaccination</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Pet Card Component
const PetCard = ({ pet, onSchedule, onVaccination }: { pet: any, onSchedule: (pet: any) => void, onVaccination: (pet: any) => void }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "healthy":
        return <Badge className="bg-green-500">Healthy</Badge>;
      case "sick":
        return <Badge className="bg-red-500">Sick</Badge>;
      case "scheduled":
        return <Badge className="bg-blue-500">Appointment Scheduled</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <PawPrint className="h-5 w-5 text-clinic-blue" />
            {pet.name}
          </CardTitle>
          {getStatusBadge(pet.status)}
        </div>
        <CardDescription>{pet.breed} • {pet.age} years old</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-sm space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">Owner:</span>
            <span>{pet.owner}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span>Last visit: {new Date(pet.lastVisit).toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between gap-2">
        <Button size="sm" variant="outline" className="w-full flex gap-1" onClick={() => onSchedule(pet)}>
          <Calendar className="h-4 w-4" />
          Schedule
        </Button>
        <Button size="sm" variant="outline" className="w-full flex gap-1" onClick={() => onVaccination(pet)}>
          <Syringe className="h-4 w-4" />
          Vaccinations
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PetsPage;
