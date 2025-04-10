import React, { useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody } from "@/components/ui/table";
import { toast } from "sonner";
import { PetTableRow } from "./pets-admin/PetTableRow";
import { PetsPagination } from "./pets-admin/PetsPagination";
import { PetEditDialog } from "./pets-admin/PetEditDialog";
import { VaccinationDialog } from "./pets-admin/VaccinationDialog";
import { PetRecordsDialog } from "./pets-admin/PetRecordsDialog";
import { AdminPet } from "./pets-admin/types";

// Sample data for pets registered by admin
const initialAdminPetsData = [
  { 
    id: 1, 
    chipId: "CHIP900001", 
    name: "Teddy", 
    registeredBy: "Admin Admin", 
    vaccinationRecords: [{ name: "Rabies", date: "2023-03-15" }], 
    petRecords: [{ type: "Checkup", date: "2023-05-20", notes: "Healthy" }],
    species: "Dog",
    breed: "Golden Retriever",
    gender: "male",
    weight: 25,
    weight_unit: "kg",
    color: "Golden",
    notes: "Friendly and active dog"
  },
  { 
    id: 2, 
    chipId: "CHIP900002", 
    name: "Buddy", 
    registeredBy: "Admin Admin", 
    vaccinationRecords: [{ name: "Distemper", date: "2023-04-10" }], 
    petRecords: [{ type: "Surgery", date: "2023-06-05", notes: "Minor procedure" }],
    species: "Dog",
    breed: "Beagle",
    gender: "male",
    weight: 15,
    weight_unit: "kg",
    color: "Brown/White",
    notes: "Loves to play fetch"
  },
  { 
    id: 3, 
    chipId: "CHIP900003", 
    name: "Whiskers", 
    registeredBy: "Admin Admin", 
    vaccinationRecords: [{ name: "FVRCP", date: "2023-02-20" }], 
    petRecords: [{ type: "Dental", date: "2023-07-12", notes: "Teeth cleaning" }],
    species: "Cat",
    breed: "Siamese",
    gender: "female",
    weight: 4.5,
    weight_unit: "kg",
    color: "Cream/Brown",
    notes: "Quiet and shy"
  },
  { 
    id: 4, 
    chipId: "CHIP900004", 
    name: "Lucy", 
    registeredBy: "Admin Admin", 
    vaccinationRecords: [{ name: "Bordetella", date: "2023-08-01" }], 
    petRecords: [{ type: "Checkup", date: "2023-08-15", notes: "Weight management" }],
    species: "Dog",
    breed: "Labrador",
    gender: "female",
    weight: 30,
    weight_unit: "kg",
    color: "Black",
    notes: "Needs diet management"
  },
  { 
    id: 5, 
    chipId: "CHIP900005", 
    name: "Max", 
    registeredBy: "Admin Admin", 
    vaccinationRecords: [{ name: "Leptospirosis", date: "2023-01-10" }], 
    petRecords: [{ type: "Grooming", date: "2023-09-01", notes: "Full service" }],
    species: "Dog",
    breed: "German Shepherd",
    gender: "male",
    weight: 35,
    weight_unit: "kg",
    color: "Black/Tan",
    notes: "Well-trained guard dog"
  },
];

export function AdminPetsTable() {
  const [adminPetsData, setAdminPetsData] = useState<AdminPet[]>(initialAdminPetsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isVaccinationDialogOpen, setIsVaccinationDialogOpen] = useState(false);
  const [isPetRecordsDialogOpen, setIsPetRecordsDialogOpen] = useState(false);
  const [currentPet, setCurrentPet] = useState<null | AdminPet>(null);
  
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

  const handleEditClick = (pet: AdminPet) => {
    setCurrentPet(pet);
    setIsEditDialogOpen(true);
  };

  const handleVaccinationClick = (pet: AdminPet) => {
    setCurrentPet(pet);
    setNewVaccination({
      name: "",
      date: ""
    });
    setIsVaccinationDialogOpen(true);
  };

  const handlePetRecordsClick = (pet: AdminPet) => {
    setCurrentPet(pet);
    setNewRecord({
      type: "",
      date: "",
      notes: ""
    });
    setIsPetRecordsDialogOpen(true);
  };

  const handleNewVaccinationChange = (field: string, value: string) => {
    setNewVaccination({...newVaccination, [field]: value});
  };

  const handleNewRecordChange = (field: string, value: string) => {
    setNewRecord({...newRecord, [field]: value});
  };

  const handleSaveEdit = () => {
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">ID</TableHead>
              <TableHead>Chip ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Registered By</TableHead>
              <TableHead>Vaccination Records</TableHead>
              <TableHead>Pet Records</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((pet) => (
              <PetTableRow
                key={pet.id}
                pet={pet}
                onEditClick={handleEditClick}
                onVaccinationClick={handleVaccinationClick}
                onPetRecordsClick={handlePetRecordsClick}
              />
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* Pagination */}
      <PetsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        startIndex={startIndex}
        endIndex={endIndex}
        totalItems={adminPetsData.length}
        onPageChange={handlePageChange}
        onPreviousPage={handlePreviousPage}
        onNextPage={handleNextPage}
      />

      {/* Dialogs */}
      <PetEditDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        currentPet={currentPet}
        onSuccess={handleSaveEdit}
      />

      <VaccinationDialog
        isOpen={isVaccinationDialogOpen}
        onOpenChange={setIsVaccinationDialogOpen}
        currentPet={currentPet}
        newVaccination={newVaccination}
        onNewVaccinationChange={handleNewVaccinationChange}
        onAddVaccination={handleAddVaccination}
      />

      <PetRecordsDialog
        isOpen={isPetRecordsDialogOpen}
        onOpenChange={setIsPetRecordsDialogOpen}
        currentPet={currentPet}
        newRecord={newRecord}
        onNewRecordChange={handleNewRecordChange}
        onAddRecord={handleAddRecord}
      />
    </div>
  );
}
