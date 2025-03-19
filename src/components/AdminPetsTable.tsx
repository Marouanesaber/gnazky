
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Eye, PenSquare, Trash, PawPrint, Syringe } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

// Sample data for pets registered by admin
const initialPetsData = [
  { id: 1, chipId: "CHIP900001", name: "Teddy", species: "Dog", breed: "Poodle", age: 3, gender: "Male", registeredBy: "Admin Admin", vaccinationRecords: "View", petRecords: "View" },
  { id: 2, chipId: "CHIP900002", name: "Buddy", species: "Dog", breed: "Labrador", age: 2, gender: "Male", registeredBy: "Admin Admin", vaccinationRecords: "View", petRecords: "View" },
  { id: 3, chipId: "CHIP900003", name: "Whiskers", species: "Cat", breed: "Siamese", age: 4, gender: "Female", registeredBy: "Admin Admin", vaccinationRecords: "View", petRecords: "View" },
  { id: 4, chipId: "CHIP900004", name: "Lucy", species: "Dog", breed: "Beagle", age: 1, gender: "Female", registeredBy: "Admin Admin", vaccinationRecords: "View", petRecords: "View" },
  { id: 5, chipId: "CHIP900005", name: "Max", species: "Dog", breed: "German Shepherd", age: 5, gender: "Male", registeredBy: "Admin Admin", vaccinationRecords: "View", petRecords: "View" },
];

// Sample vaccination records
const vaccinationRecords = [
  { petId: 1, records: [
    { id: 1, vaccine: "Rabies", date: "2023-05-15", nextDue: "2024-05-15", vet: "Dr. Sarah Johnson" },
    { id: 2, vaccine: "DHPP", date: "2023-03-10", nextDue: "2024-03-10", vet: "Dr. James Wilson" }
  ]},
  { petId: 2, records: [
    { id: 3, vaccine: "Rabies", date: "2023-06-20", nextDue: "2024-06-20", vet: "Dr. Rebecca Owusu" }
  ]},
  { petId: 3, records: [
    { id: 4, vaccine: "FVRCP", date: "2023-04-25", nextDue: "2024-04-25", vet: "Dr. Michael Thompson" },
    { id: 5, vaccine: "Rabies", date: "2023-04-25", nextDue: "2024-04-25", vet: "Dr. Michael Thompson" }
  ]},
  { petId: 4, records: [
    { id: 6, vaccine: "Bordetella", date: "2023-07-10", nextDue: "2024-01-10", vet: "Dr. Lisa Mensah" }
  ]},
  { petId: 5, records: [
    { id: 7, vaccine: "Rabies", date: "2023-02-05", nextDue: "2024-02-05", vet: "Dr. Sarah Johnson" },
    { id: 8, vaccine: "DHPP", date: "2023-02-05", nextDue: "2024-02-05", vet: "Dr. Sarah Johnson" },
    { id: 9, vaccine: "Leptospirosis", date: "2023-02-05", nextDue: "2024-02-05", vet: "Dr. Sarah Johnson" }
  ]},
];

// Sample medical records
const medicalRecords = [
  { petId: 1, records: [
    { id: 1, date: "2023-05-15", condition: "Annual Checkup", treatment: "All vitals normal. Weight: 12kg", notes: "Healthy pet, no concerns." },
    { id: 2, date: "2022-12-10", condition: "Ear Infection", treatment: "Prescribed EarDrops-X for 7 days", notes: "Follow up in one week if not improved." }
  ]},
  { petId: 2, records: [
    { id: 3, date: "2023-06-20", condition: "Annual Checkup", treatment: "All vitals normal. Weight: 25kg", notes: "Slight tartar buildup, recommend dental cleaning." }
  ]},
  { petId: 3, records: [
    { id: 4, date: "2023-04-25", condition: "Dental Cleaning", treatment: "Full cleaning performed under anesthesia", notes: "Recovered well, no complications." }
  ]},
  { petId: 4, records: [
    { id: 5, date: "2023-07-10", condition: "Paw Injury", treatment: "Cleaned wound, bandaged, prescribed antibiotics", notes: "Recheck in 3 days." },
    { id: 6, date: "2023-07-13", condition: "Paw Injury Follow-up", treatment: "Healing well, bandage changed", notes: "No signs of infection." }
  ]},
  { petId: 5, records: [
    { id: 7, date: "2023-02-05", condition: "Annual Checkup", treatment: "All vitals normal. Weight: 35kg", notes: "Healthy senior dog, recommended joint supplement." }
  ]},
];

export function AdminPetsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [petsData, setPetsData] = useState(initialPetsData);
  const [viewRecordsDialogOpen, setViewRecordsDialogOpen] = useState(false);
  const [viewVaccinationsDialogOpen, setViewVaccinationsDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [currentPet, setCurrentPet] = useState<any>(null);
  const [editFormData, setEditFormData] = useState({
    id: 0,
    chipId: "",
    name: "",
    species: "",
    breed: "",
    age: 0,
    gender: ""
  });
  
  const itemsPerPage = 5;
  const totalPages = Math.ceil(petsData.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = petsData.slice(startIndex, endIndex);

  const handleViewRecords = (pet: any) => {
    setCurrentPet(pet);
    setViewRecordsDialogOpen(true);
  };

  const handleViewVaccinations = (pet: any) => {
    setCurrentPet(pet);
    setViewVaccinationsDialogOpen(true);
  };

  const handleEditClick = (pet: any) => {
    setCurrentPet(pet);
    setEditFormData({
      id: pet.id,
      chipId: pet.chipId,
      name: pet.name,
      species: pet.species,
      breed: pet.breed,
      age: pet.age,
      gender: pet.gender
    });
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (pet: any) => {
    setCurrentPet(pet);
    setDeleteDialogOpen(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setPetsData(prevData => 
      prevData.map(pet => 
        pet.id === editFormData.id ? {
          ...pet,
          chipId: editFormData.chipId,
          name: editFormData.name,
          species: editFormData.species,
          breed: editFormData.breed,
          age: editFormData.age,
          gender: editFormData.gender
        } : pet
      )
    );
    
    setEditDialogOpen(false);
    toast.success("Pet information updated successfully");
  };

  const handleDeleteConfirm = () => {
    setPetsData(prevData => 
      prevData.filter(pet => pet.id !== currentPet.id)
    );
    
    setDeleteDialogOpen(false);
    toast.success("Pet deleted successfully");
  };

  return (
    <div className="clinic-card animate-fade-in">
      <div className="overflow-x-auto">
        <table className="clinic-table">
          <thead>
            <tr>
              <th className="w-12">ID</th>
              <th>Chip ID</th>
              <th>Name</th>
              <th>Registered By</th>
              <th>Vaccination Records</th>
              <th>Pet Records</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((pet) => (
              <tr key={pet.id} className="hover:bg-muted/30 transition-colors">
                <td>{pet.id}</td>
                <td>{pet.chipId}</td>
                <td>{pet.name}</td>
                <td>{pet.registeredBy}</td>
                <td>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-clinic-blue"
                    onClick={() => handleViewVaccinations(pet)}
                  >
                    <Syringe className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </td>
                <td>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-clinic-blue"
                    onClick={() => handleViewRecords(pet)}
                  >
                    <PawPrint className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </td>
                <td className="text-right space-x-2">
                  <Button 
                    size="sm" 
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => handleEditClick(pet)}
                  >
                    <PenSquare className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => handleDeleteClick(pet)}
                  >
                    <Trash className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 text-sm">
        <div>
          Showing {startIndex + 1} to {Math.min(endIndex, petsData.length)} of {petsData.length} entries
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handlePreviousPage} disabled={currentPage === 1}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous</span>
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={page === currentPage ? "default" : "outline"}
              size="sm"
              onClick={() => handlePageChange(page)}
            >
              {page}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next</span>
          </Button>
        </div>
      </div>

      {/* View Pet Records Dialog */}
      <Dialog open={viewRecordsDialogOpen} onOpenChange={setViewRecordsDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Medical Records for {currentPet?.name}</DialogTitle>
            <DialogDescription>
              Full medical history and treatment records
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {currentPet && (
              <>
                <div className="flex items-center gap-4 mb-4 p-3 bg-gray-50 rounded-md">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <PawPrint className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold">{currentPet.name}</h3>
                    <p className="text-sm text-gray-500">{currentPet.species} • {currentPet.breed} • {currentPet.age} years • {currentPet.gender}</p>
                  </div>
                  <div className="ml-auto">
                    <p className="text-sm text-gray-500">Chip ID: {currentPet.chipId}</p>
                  </div>
                </div>
                
                {medicalRecords.find(r => r.petId === currentPet.id)?.records.length ? (
                  <div className="border rounded-md overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left">Date</th>
                          <th className="px-4 py-2 text-left">Condition</th>
                          <th className="px-4 py-2 text-left">Treatment</th>
                          <th className="px-4 py-2 text-left">Notes</th>
                        </tr>
                      </thead>
                      <tbody>
                        {medicalRecords.find(r => r.petId === currentPet.id)?.records.map((record) => (
                          <tr key={record.id} className="border-t">
                            <td className="px-4 py-3">{record.date}</td>
                            <td className="px-4 py-3">{record.condition}</td>
                            <td className="px-4 py-3">{record.treatment}</td>
                            <td className="px-4 py-3">{record.notes}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No medical records found for this pet.
                  </div>
                )}
              </>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setViewRecordsDialogOpen(false)}>
              Close
            </Button>
            <Button type="button">
              Add New Record
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Vaccination Records Dialog */}
      <Dialog open={viewVaccinationsDialogOpen} onOpenChange={setViewVaccinationsDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Vaccination Records for {currentPet?.name}</DialogTitle>
            <DialogDescription>
              All vaccine history and upcoming schedules
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {currentPet && (
              <>
                <div className="flex items-center gap-4 mb-4 p-3 bg-gray-50 rounded-md">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Syringe className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold">{currentPet.name}</h3>
                    <p className="text-sm text-gray-500">{currentPet.species} • {currentPet.breed} • {currentPet.age} years • {currentPet.gender}</p>
                  </div>
                  <div className="ml-auto">
                    <p className="text-sm text-gray-500">Chip ID: {currentPet.chipId}</p>
                  </div>
                </div>
                
                {vaccinationRecords.find(r => r.petId === currentPet.id)?.records.length ? (
                  <div className="border rounded-md overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left">Vaccine</th>
                          <th className="px-4 py-2 text-left">Date</th>
                          <th className="px-4 py-2 text-left">Next Due</th>
                          <th className="px-4 py-2 text-left">Vet</th>
                        </tr>
                      </thead>
                      <tbody>
                        {vaccinationRecords.find(r => r.petId === currentPet.id)?.records.map((record) => (
                          <tr key={record.id} className="border-t">
                            <td className="px-4 py-3">{record.vaccine}</td>
                            <td className="px-4 py-3">{record.date}</td>
                            <td className="px-4 py-3">{record.nextDue}</td>
                            <td className="px-4 py-3">{record.vet}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No vaccination records found for this pet.
                  </div>
                )}
              </>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setViewVaccinationsDialogOpen(false)}>
              Close
            </Button>
            <Button type="button">
              Add Vaccination
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Pet Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Pet Information</DialogTitle>
            <DialogDescription>
              Make changes to the pet's details below.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Pet Name</Label>
                  <Input
                    id="name"
                    value={editFormData.name}
                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="chipId">Chip ID</Label>
                  <Input
                    id="chipId"
                    value={editFormData.chipId}
                    onChange={(e) => setEditFormData({ ...editFormData, chipId: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="species">Species</Label>
                  <Select 
                    value={editFormData.species} 
                    onValueChange={(value) => setEditFormData({ ...editFormData, species: value })}
                  >
                    <SelectTrigger id="species">
                      <SelectValue placeholder="Select species" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Dog">Dog</SelectItem>
                      <SelectItem value="Cat">Cat</SelectItem>
                      <SelectItem value="Bird">Bird</SelectItem>
                      <SelectItem value="Reptile">Reptile</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="breed">Breed</Label>
                  <Input
                    id="breed"
                    value={editFormData.breed}
                    onChange={(e) => setEditFormData({ ...editFormData, breed: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age (years)</Label>
                  <Input
                    id="age"
                    type="number"
                    min="0"
                    value={editFormData.age}
                    onChange={(e) => setEditFormData({ ...editFormData, age: parseInt(e.target.value) })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select 
                    value={editFormData.gender} 
                    onValueChange={(value) => setEditFormData({ ...editFormData, gender: value })}
                  >
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Pet</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this pet? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {currentPet && (
              <div className="border rounded p-3 bg-gray-50">
                <p><span className="font-medium">Name:</span> {currentPet.name}</p>
                <p><span className="font-medium">Species:</span> {currentPet.species}</p>
                <p><span className="font-medium">Breed:</span> {currentPet.breed}</p>
                <p><span className="font-medium">Chip ID:</span> {currentPet.chipId}</p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" variant="destructive" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
