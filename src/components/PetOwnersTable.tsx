
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Edit, Trash, Eye, PenSquare, Pencil } from "lucide-react";
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
import { toast } from "sonner";

// Sample data for pet owners
const initialPetOwnersData = [
  { id: 1, name: "Tim Lafaungih", address: "Haber uti giflu gudofami", contact: "+233 55 123 45", email: "tim@example.com" },
  { id: 2, name: "Leah", address: "Haber uti giflu gudofami", contact: "+233 55 123 45", email: "leah@example.com" },
  { id: 3, name: "Ahmed Kobla", address: "Wolesi egtu le", contact: "+233 55 667 88", email: "ahmed@example.com" },
  { id: 4, name: "Lydia", address: "Nuniwa Oj", contact: "+233 50 123 456", email: "lydia@example.com" },
  { id: 5, name: "Greg", address: "Tep", contact: "+233 267 222", email: "greg@example.com" },
];

export function PetOwnersTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [petOwnersData, setPetOwnersData] = useState(initialPetOwnersData);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [viewPetsDialogOpen, setViewPetsDialogOpen] = useState(false);
  const [viewProfileDialogOpen, setViewProfileDialogOpen] = useState(false);
  const [currentOwner, setCurrentOwner] = useState<any>(null);
  const [editFormData, setEditFormData] = useState({
    id: 0,
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

  const handleEditClick = (owner: any) => {
    setCurrentOwner(owner);
    setEditFormData(owner);
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (owner: any) => {
    setCurrentOwner(owner);
    setDeleteDialogOpen(true);
  };

  const handleViewProfile = (owner: any) => {
    setCurrentOwner(owner);
    setViewProfileDialogOpen(true);
  };

  const handleViewPets = (owner: any) => {
    setCurrentOwner(owner);
    setViewPetsDialogOpen(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setPetOwnersData(prevData => 
      prevData.map(owner => 
        owner.id === editFormData.id ? editFormData : owner
      )
    );
    
    setEditDialogOpen(false);
    toast.success("Owner information updated successfully");
  };

  const handleDeleteConfirm = () => {
    setPetOwnersData(prevData => 
      prevData.filter(owner => owner.id !== currentOwner.id)
    );
    
    setDeleteDialogOpen(false);
    toast.success("Owner deleted successfully");
  };

  const petsByOwner = [
    { ownerId: 1, pets: [{ id: 1, name: "Rex", species: "Dog", breed: "German Shepherd", age: 3 }] },
    { ownerId: 2, pets: [{ id: 2, name: "Whiskers", species: "Cat", breed: "Persian", age: 2 }] },
    { ownerId: 3, pets: [
      { id: 3, name: "Buddy", species: "Dog", breed: "Labrador", age: 4 },
      { id: 4, name: "Max", species: "Dog", breed: "Beagle", age: 1 }
    ]},
    { ownerId: 4, pets: [{ id: 5, name: "Tweety", species: "Bird", breed: "Canary", age: 1 }] },
    { ownerId: 5, pets: [{ id: 6, name: "Nemo", species: "Fish", breed: "Goldfish", age: 1 }] },
  ];

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
                <td className="text-right space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="text-blue-600"
                    onClick={() => handleViewProfile(owner)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Profile
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="text-blue-600"
                    onClick={() => handleViewPets(owner)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Pets
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="text-amber-600"
                    onClick={() => handleEditClick(owner)}
                  >
                    <Pencil className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="text-red-600"
                    onClick={() => handleDeleteClick(owner)}
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

      {/* Edit Owner Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Owner</DialogTitle>
            <DialogDescription>
              Make changes to the owner's information here.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditSubmit}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={editFormData.address}
                  onChange={(e) => setEditFormData({ ...editFormData, address: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact">Contact</Label>
                <Input
                  id="contact"
                  value={editFormData.contact}
                  onChange={(e) => setEditFormData({ ...editFormData, contact: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={editFormData.email}
                  onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                  required
                />
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
            <DialogTitle>Delete Owner</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this owner? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {currentOwner && (
              <div className="border rounded p-3 bg-gray-50">
                <p><span className="font-medium">Name:</span> {currentOwner.name}</p>
                <p><span className="font-medium">Contact:</span> {currentOwner.contact}</p>
                <p><span className="font-medium">Email:</span> {currentOwner.email}</p>
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

      {/* View Profile Dialog */}
      <Dialog open={viewProfileDialogOpen} onOpenChange={setViewProfileDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Owner Profile</DialogTitle>
          </DialogHeader>
          {currentOwner && (
            <div className="py-4">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-blue-600">
                    {currentOwner.name.split(' ').map((n: string) => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">{currentOwner.name}</h3>
                  <p className="text-gray-500">Owner ID: {currentOwner.id}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div className="font-medium">Address:</div>
                  <div>{currentOwner.address}</div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="font-medium">Contact:</div>
                  <div>{currentOwner.contact}</div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="font-medium">Email:</div>
                  <div>{currentOwner.email}</div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="font-medium">Registered Pets:</div>
                  <div>
                    {petsByOwner.find(p => p.ownerId === currentOwner.id)?.pets.length || 0} pets
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="font-medium">Last Visit:</div>
                  <div>15 May, 2023</div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="button" onClick={() => handleViewPets(currentOwner)}>View Pets</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Pets Dialog */}
      <Dialog open={viewPetsDialogOpen} onOpenChange={setViewPetsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Pets owned by {currentOwner?.name}</DialogTitle>
            <DialogDescription>
              List of all pets registered under this owner.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {currentOwner && (
              <>
                {petsByOwner.find(p => p.ownerId === currentOwner.id)?.pets.length ? (
                  <div className="border rounded-md overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left">Pet Name</th>
                          <th className="px-4 py-2 text-left">Species</th>
                          <th className="px-4 py-2 text-left">Breed</th>
                          <th className="px-4 py-2 text-left">Age</th>
                        </tr>
                      </thead>
                      <tbody>
                        {petsByOwner.find(p => p.ownerId === currentOwner.id)?.pets.map((pet) => (
                          <tr key={pet.id} className="border-t">
                            <td className="px-4 py-3">{pet.name}</td>
                            <td className="px-4 py-3">{pet.species}</td>
                            <td className="px-4 py-3">{pet.breed}</td>
                            <td className="px-4 py-3">{pet.age} {pet.age === 1 ? 'year' : 'years'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No pets registered for this owner.
                  </div>
                )}
              </>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setViewPetsDialogOpen(false)}>
              Close
            </Button>
            <Button type="button">
              Register New Pet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
