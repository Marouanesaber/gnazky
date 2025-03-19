
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Pencil } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

// Initial sample data for pet owners
const initialPetOwnersData = [
  { id: 1, name: "Tim Lafaungih", address: "Haber uti giflu gudofami", contact: "+233 55 123 45", email: "tim@example.com" },
  { id: 2, name: "Leah", address: "Haber uti giflu gudofami", contact: "+233 55 123 45", email: "leah@example.com" },
  { id: 3, name: "Ahmed Kobla", address: "Wolesi egtu le", contact: "+233 55 667 88", email: "ahmed@example.com" },
  { id: 4, name: "Lydia", address: "Nuniwa Oj", contact: "+233 50 123 456", email: "lydia@example.com" },
  { id: 5, name: "Greg", address: "Tep", contact: "+233 267 222", email: "greg@example.com" },
];

export function PetOwnersTable() {
  const [petOwnersData, setPetOwnersData] = useState(initialPetOwnersData);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentOwner, setCurrentOwner] = useState<null | typeof petOwnersData[0]>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    address: "",
    contact: "",
    email: ""
  });
  
  const itemsPerPage = 5;
  const totalPages = Math.ceil(petOwnersData.length / itemsPerPage);

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
  const currentData = petOwnersData.slice(startIndex, endIndex);

  const handleEditClick = (owner: typeof petOwnersData[0]) => {
    setCurrentOwner(owner);
    setEditForm({
      name: owner.name,
      address: owner.address,
      contact: owner.contact,
      email: owner.email
    });
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (!currentOwner) return;
    
    // Validate
    if (!editForm.name || !editForm.email) {
      toast.error("Name and email are required fields");
      return;
    }
    
    // Update the data
    const updatedData = petOwnersData.map(owner => 
      owner.id === currentOwner.id 
        ? { ...owner, ...editForm } 
        : owner
    );
    
    setPetOwnersData(updatedData);
    setIsEditDialogOpen(false);
    toast.success("Owner information updated successfully!");
  };

  return (
    <div className="clinic-card animate-fade-in">
      <div className="overflow-x-auto">
        <table className="clinic-table">
          <thead>
            <tr>
              <th className="w-12">ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Contact</th>
              <th>Email</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((owner) => (
              <tr key={owner.id} className="hover:bg-muted/30 transition-colors">
                <td>{owner.id}</td>
                <td>{owner.name}</td>
                <td>{owner.address}</td>
                <td>{owner.contact}</td>
                <td>{owner.email}</td>
                <td className="text-right">
                  <Button 
                    size="sm" 
                    className="bg-clinic-blue hover:bg-clinic-blue/90"
                    onClick={() => handleEditClick(owner)}
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
          Showing {startIndex + 1} to {Math.min(endIndex, petOwnersData.length)} of {petOwnersData.length} entries
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
            <DialogTitle>Edit Owner Information</DialogTitle>
            <DialogDescription>
              Update the details for this pet owner
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">
                Name
              </Label>
              <Input
                id="edit-name"
                value={editForm.name}
                onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-address" className="text-right">
                Address
              </Label>
              <Input
                id="edit-address"
                value={editForm.address}
                onChange={(e) => setEditForm({...editForm, address: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-contact" className="text-right">
                Contact
              </Label>
              <Input
                id="edit-contact"
                value={editForm.contact}
                onChange={(e) => setEditForm({...editForm, contact: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-email" className="text-right">
                Email
              </Label>
              <Input
                id="edit-email"
                value={editForm.email}
                onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                className="col-span-3"
                type="email"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
