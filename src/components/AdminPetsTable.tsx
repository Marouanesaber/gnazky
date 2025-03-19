
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Pencil, FileText, Syringe } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

// Sample data for pets registered by admin
const initialAdminPetsData = [
  { id: 1, chipId: "CHIP900001", name: "Teddy", registeredBy: "Admin Admin", vaccinationRecords: [{ name: "Rabies", date: "2023-03-15" }], petRecords: [{ type: "Checkup", date: "2023-05-20", notes: "Healthy" }] },
  { id: 2, chipId: "CHIP900002", name: "Buddy", registeredBy: "Admin Admin", vaccinationRecords: [{ name: "Distemper", date: "2023-04-10" }], petRecords: [{ type: "Surgery", date: "2023-06-05", notes: "Minor procedure" }] },
  { id: 3, chipId: "CHIP900003", name: "Whiskers", registeredBy: "Admin Admin", vaccinationRecords: [{ name: "FVRCP", date: "2023-02-20" }], petRecords: [{ type: "Dental", date: "2023-07-12", notes: "Teeth cleaning" }] },
  { id: 4, chipId: "CHIP900004", name: "Lucy", registeredBy: "Admin Admin", vaccinationRecords: [{ name: "Bordetella", date: "2023-08-01" }], petRecords: [{ type: "Checkup", date: "2023-08-15", notes: "Weight management" }] },
  { id: 5, chipId: "CHIP900005", name: "Max", registeredBy: "Admin Admin", vaccinationRecords: [{ name: "Leptospirosis", date: "2023-01-10" }], petRecords: [{ type: "Grooming", date: "2023-09-01", notes: "Full service" }] },
];

export function AdminPetsTable() {
  const [adminPetsData, setAdminPetsData] = useState(initialAdminPetsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isVaccinationDialogOpen, setIsVaccinationDialogOpen] = useState(false);
  const [isPetRecordsDialogOpen, setIsPetRecordsDialogOpen] = useState(false);
  const [currentPet, setCurrentPet] = useState<null | typeof adminPetsData[0]>(null);
  
  const [editForm, setEditForm] = useState({
    name: "",
    chipId: ""
  });
  
  const [newVaccination, setNewVaccination] = useState({
    name: "",
    date: ""
  });
  
  const [newRecord, setNewRecord] = useState({
    type: "",
    date: "",
    notes: ""
  });
  
  const itemsPerPage = 5;
  const totalPages = Math.ceil(adminPetsData.length / itemsPerPage);

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
  const currentData = adminPetsData.slice(startIndex, endIndex);

  const handleEditClick = (pet: typeof adminPetsData[0]) => {
    setCurrentPet(pet);
    setEditForm({
      name: pet.name,
      chipId: pet.chipId
    });
    setIsEditDialogOpen(true);
  };

  const handleVaccinationClick = (pet: typeof adminPetsData[0]) => {
    setCurrentPet(pet);
    setNewVaccination({
      name: "",
      date: ""
    });
    setIsVaccinationDialogOpen(true);
  };

  const handlePetRecordsClick = (pet: typeof adminPetsData[0]) => {
    setCurrentPet(pet);
    setNewRecord({
      type: "",
      date: "",
      notes: ""
    });
    setIsPetRecordsDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (!currentPet) return;
    
    // Validate
    if (!editForm.name || !editForm.chipId) {
      toast.error("All fields are required");
      return;
    }
    
    // Update the data
    const updatedData = adminPetsData.map(pet => 
      pet.id === currentPet.id 
        ? { ...pet, name: editForm.name, chipId: editForm.chipId } 
        : pet
    );
    
    setAdminPetsData(updatedData);
    setIsEditDialogOpen(false);
    toast.success("Pet information updated successfully!");
  };

  const handleAddVaccination = () => {
    if (!currentPet) return;
    
    // Validate
    if (!newVaccination.name || !newVaccination.date) {
      toast.error("All fields are required");
      return;
    }
    
    // Update the data
    const updatedData = adminPetsData.map(pet => {
      if (pet.id === currentPet.id) {
        return {
          ...pet,
          vaccinationRecords: [
            ...pet.vaccinationRecords,
            { name: newVaccination.name, date: newVaccination.date }
          ]
        };
      }
      return pet;
    });
    
    setAdminPetsData(updatedData);
    setNewVaccination({ name: "", date: "" });
    toast.success("Vaccination record added successfully!");
  };

  const handleAddRecord = () => {
    if (!currentPet) return;
    
    // Validate
    if (!newRecord.type || !newRecord.date) {
      toast.error("Type and date are required");
      return;
    }
    
    // Update the data
    const updatedData = adminPetsData.map(pet => {
      if (pet.id === currentPet.id) {
        return {
          ...pet,
          petRecords: [
            ...pet.petRecords,
            { 
              type: newRecord.type, 
              date: newRecord.date,
              notes: newRecord.notes 
            }
          ]
        };
      }
      return pet;
    });
    
    setAdminPetsData(updatedData);
    setNewRecord({ type: "", date: "", notes: "" });
    toast.success("Pet record added successfully!");
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
                    onClick={() => handleVaccinationClick(pet)}
                  >
                    <Syringe className="h-4 w-4 mr-1" />
                    View ({pet.vaccinationRecords.length})
                  </Button>
                </td>
                <td>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-clinic-blue"
                    onClick={() => handlePetRecordsClick(pet)}
                  >
                    <FileText className="h-4 w-4 mr-1" />
                    View ({pet.petRecords.length})
                  </Button>
                </td>
                <td className="text-right">
                  <Button 
                    size="sm" 
                    className="bg-clinic-blue hover:bg-clinic-blue/90"
                    onClick={() => handleEditClick(pet)}
                  >
                    <Pencil className="h-4 w-4 mr-1" />
                    Edit
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
          Showing {startIndex + 1} to {Math.min(endIndex, adminPetsData.length)} of {adminPetsData.length} entries
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

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Pet Information</DialogTitle>
            <DialogDescription>
              Update the details for this pet
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">
                Pet Name
              </Label>
              <Input
                id="edit-name"
                value={editForm.name}
                onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-chipId" className="text-right">
                Chip ID
              </Label>
              <Input
                id="edit-chipId"
                value={editForm.chipId}
                onChange={(e) => setEditForm({...editForm, chipId: e.target.value})}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Vaccination Records Dialog */}
      <Dialog open={isVaccinationDialogOpen} onOpenChange={setIsVaccinationDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              Vaccination Records for {currentPet?.name}
            </DialogTitle>
            <DialogDescription>
              View and manage vaccination records
            </DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="records">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="records">Existing Records</TabsTrigger>
              <TabsTrigger value="add">Add New Vaccination</TabsTrigger>
            </TabsList>
            <TabsContent value="records" className="pt-4">
              {currentPet?.vaccinationRecords.length === 0 ? (
                <p className="text-center py-4 text-muted-foreground">No vaccination records found</p>
              ) : (
                <div className="border rounded-md overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vaccination</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {currentPet?.vaccinationRecords.map((record, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </TabsContent>
            <TabsContent value="add" className="pt-4">
              <div className="space-y-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="vaccination-name" className="text-right">
                    Vaccination
                  </Label>
                  <Input
                    id="vaccination-name"
                    placeholder="e.g., Rabies, Distemper"
                    value={newVaccination.name}
                    onChange={(e) => setNewVaccination({...newVaccination, name: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="vaccination-date" className="text-right">
                    Date
                  </Label>
                  <Input
                    id="vaccination-date"
                    type="date"
                    value={newVaccination.date}
                    onChange={(e) => setNewVaccination({...newVaccination, date: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="flex justify-end pt-4">
                  <Button onClick={handleAddVaccination}>Add Vaccination</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsVaccinationDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Pet Records Dialog */}
      <Dialog open={isPetRecordsDialogOpen} onOpenChange={setIsPetRecordsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              Medical Records for {currentPet?.name}
            </DialogTitle>
            <DialogDescription>
              View and manage pet medical records
            </DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="records">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="records">Existing Records</TabsTrigger>
              <TabsTrigger value="add">Add New Record</TabsTrigger>
            </TabsList>
            <TabsContent value="records" className="pt-4">
              {currentPet?.petRecords.length === 0 ? (
                <p className="text-center py-4 text-muted-foreground">No medical records found</p>
              ) : (
                <div className="border rounded-md overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {currentPet?.petRecords.map((record, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.type}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </TabsContent>
            <TabsContent value="add" className="pt-4">
              <div className="space-y-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="record-type" className="text-right">
                    Record Type
                  </Label>
                  <Input
                    id="record-type"
                    placeholder="e.g., Checkup, Surgery"
                    value={newRecord.type}
                    onChange={(e) => setNewRecord({...newRecord, type: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="record-date" className="text-right">
                    Date
                  </Label>
                  <Input
                    id="record-date"
                    type="date"
                    value={newRecord.date}
                    onChange={(e) => setNewRecord({...newRecord, date: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="record-notes" className="text-right">
                    Notes
                  </Label>
                  <Input
                    id="record-notes"
                    placeholder="Any additional details"
                    value={newRecord.notes}
                    onChange={(e) => setNewRecord({...newRecord, notes: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="flex justify-end pt-4">
                  <Button onClick={handleAddRecord}>Add Record</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPetRecordsDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
