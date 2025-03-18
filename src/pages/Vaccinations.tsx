
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Eye, Trash2, Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const vaccinations = [
  { id: 8, petId: "OVHMS0011", date: "2025-03-03", type: "DHPP 4", by: "Admin Admin", temp: "55°C" },
  { id: 7, petId: "OVHMS0011", date: "2024-12-05", type: "Anti Rabies", by: "Admin Admin", temp: "37.1°C" },
  { id: 6, petId: "OVHMS0011", date: "2025-01-05", type: "DHPP 1", by: "Admin Admin", temp: "37.7°C" },
  { id: 5, petId: "OVHMS0001", date: "1975-03-14", type: "Magnam sunt offici", by: "Admin Admin", temp: "58°C" },
  { id: 4, petId: "OVHMS0008", date: "2021-01-02", type: "Necessitatibus quis", by: "Admin Admin", temp: "23°C" },
  { id: 3, petId: "OVHMS0001", date: "2024-02-20", type: "Anti Rabies", by: "Admin Admin", temp: "43°C" },
  { id: 2, petId: "OVHMS0001", date: "2023-12-11", type: "Anti Rabies y", by: "Admin Admin", temp: "admin°C" },
  { id: 1, petId: "OVHMS0001", date: "2023-12-11", type: "DHPP 1", by: "Admin Admin", temp: "admin°C" },
];

const VaccinationsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState("25");
  const [currentLocation, setCurrentLocation] = useState("");
  const [vaccRecords, setVaccRecords] = useState(vaccinations);
  const [editVaccination, setEditVaccination] = useState<any>(null);
  const [viewVaccination, setViewVaccination] = useState<any>(null);
  const [newVaccination, setNewVaccination] = useState({
    petId: "",
    date: "",
    type: "",
    by: "Admin Admin",
    temp: ""
  });

  // Filter vaccinations based on search term
  const filteredVaccinations = vaccRecords.filter(vacc => 
    vacc.petId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vacc.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddVaccination = () => {
    const newRecord = {
      id: vaccRecords.length + 1,
      ...newVaccination
    };
    setVaccRecords([newRecord, ...vaccRecords]);
    setNewVaccination({
      petId: "",
      date: "",
      type: "",
      by: "Admin Admin",
      temp: ""
    });
    toast.success("Vaccination record added successfully!");
  };

  const handleUpdateVaccination = () => {
    if (!editVaccination) return;
    
    setVaccRecords(vaccRecords.map(v => 
      v.id === editVaccination.id ? editVaccination : v
    ));
    setEditVaccination(null);
    toast.success("Vaccination record updated successfully!");
  };

  const handleDeleteVaccination = (id: number) => {
    setVaccRecords(vaccRecords.filter(v => v.id !== id));
    toast.success("Vaccination record deleted successfully!");
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">View Vaccination Records</h1>
        <div className="flex items-center text-sm text-muted-foreground">
          <span>Dashboard</span>
          <span className="mx-2">›</span>
          <span>Vaccinations</span>
        </div>
      </div>

      {/* Add New Vaccination Button */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default" className="bg-blue-500 hover:bg-blue-600 transition-all flex items-center gap-2">
            <Plus size={16} />
            Add
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Vaccination Record</DialogTitle>
            <DialogDescription>
              Enter the details for the new vaccination record below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="petId" className="text-right">Pet ID</label>
              <Input 
                id="petId" 
                value={newVaccination.petId} 
                onChange={(e) => setNewVaccination({...newVaccination, petId: e.target.value})}
                className="col-span-3" 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="date" className="text-right">Date</label>
              <Input 
                id="date" 
                type="date" 
                value={newVaccination.date} 
                onChange={(e) => setNewVaccination({...newVaccination, date: e.target.value})}
                className="col-span-3" 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="type" className="text-right">Type</label>
              <Input 
                id="type" 
                value={newVaccination.type} 
                onChange={(e) => setNewVaccination({...newVaccination, type: e.target.value})}
                className="col-span-3" 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="temp" className="text-right">Temp</label>
              <Input 
                id="temp" 
                value={newVaccination.temp} 
                onChange={(e) => setNewVaccination({...newVaccination, temp: e.target.value})}
                className="col-span-3" 
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="button" onClick={handleAddVaccination}>Save</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex flex-col md:flex-row gap-4 md:items-end justify-between mt-4">
        <div className="w-full md:w-64">
          <label htmlFor="location" className="block text-sm text-muted-foreground mb-1">
            Sort by Current Location
          </label>
          <Select value={currentLocation} onValueChange={setCurrentLocation}>
            <SelectTrigger id="location" className="w-full">
              <SelectValue placeholder="Current Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="location1">Main Clinic</SelectItem>
              <SelectItem value="location2">Downtown Branch</SelectItem>
              <SelectItem value="location3">Northside Office</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Show</span>
          <Select value={entriesPerPage} onValueChange={setEntriesPerPage}>
            <SelectTrigger className="w-16">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground">entries</span>
        </div>

        <div className="w-full md:w-64">
          <label htmlFor="search" className="block text-sm text-muted-foreground mb-1">
            Search:
          </label>
          <Input
            id="search"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="w-full"
          />
        </div>
      </div>

      <Card className="shadow-sm border animate-fade-in [animation-delay:200ms]">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted/40 border-b">
                  <th className="text-left py-3 px-4 font-medium text-sm">#</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">Pet Hospital ID</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">Date of Vaccination</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">Type of Vaccine</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">Vaccinated By</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">Temp °C</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredVaccinations.map((vacc) => (
                  <tr key={vacc.id} className="border-b hover:bg-muted/20 transition-colors">
                    <td className="py-3 px-4">{vacc.id}</td>
                    <td className="py-3 px-4">{vacc.petId}</td>
                    <td className="py-3 px-4">{vacc.date}</td>
                    <td className="py-3 px-4">{vacc.type}</td>
                    <td className="py-3 px-4">{vacc.by}</td>
                    <td className="py-3 px-4">{vacc.temp}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-1">
                        {/* Edit Button with Dialog */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="default" 
                              size="sm" 
                              className="h-8 w-8 p-0 bg-blue-500"
                              onClick={() => setEditVaccination({...vacc})}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Edit Vaccination Record</DialogTitle>
                              <DialogDescription>
                                Make changes to the vaccination record below.
                              </DialogDescription>
                            </DialogHeader>
                            {editVaccination && (
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <label htmlFor="edit-petId" className="text-right">Pet ID</label>
                                  <Input 
                                    id="edit-petId" 
                                    value={editVaccination.petId} 
                                    onChange={(e) => setEditVaccination({...editVaccination, petId: e.target.value})}
                                    className="col-span-3" 
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <label htmlFor="edit-date" className="text-right">Date</label>
                                  <Input 
                                    id="edit-date" 
                                    type="date" 
                                    value={editVaccination.date} 
                                    onChange={(e) => setEditVaccination({...editVaccination, date: e.target.value})}
                                    className="col-span-3" 
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <label htmlFor="edit-type" className="text-right">Type</label>
                                  <Input 
                                    id="edit-type" 
                                    value={editVaccination.type} 
                                    onChange={(e) => setEditVaccination({...editVaccination, type: e.target.value})}
                                    className="col-span-3" 
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <label htmlFor="edit-temp" className="text-right">Temp</label>
                                  <Input 
                                    id="edit-temp" 
                                    value={editVaccination.temp} 
                                    onChange={(e) => setEditVaccination({...editVaccination, temp: e.target.value})}
                                    className="col-span-3" 
                                  />
                                </div>
                              </div>
                            )}
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button type="button" variant="outline">Cancel</Button>
                              </DialogClose>
                              <DialogClose asChild>
                                <Button type="button" onClick={handleUpdateVaccination}>Save Changes</Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        {/* View Button with Dialog */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="default" 
                              size="sm" 
                              className="h-8 w-8 p-0 bg-blue-500"
                              onClick={() => setViewVaccination(vacc)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Vaccination Details</DialogTitle>
                              <DialogDescription>
                                View details of this vaccination record.
                              </DialogDescription>
                            </DialogHeader>
                            {viewVaccination && (
                              <div className="space-y-4 py-4">
                                <div className="flex flex-col space-y-1">
                                  <span className="text-sm font-medium text-muted-foreground">Pet Hospital ID:</span>
                                  <span>{viewVaccination.petId}</span>
                                </div>
                                <div className="flex flex-col space-y-1">
                                  <span className="text-sm font-medium text-muted-foreground">Date of Vaccination:</span>
                                  <span>{viewVaccination.date}</span>
                                </div>
                                <div className="flex flex-col space-y-1">
                                  <span className="text-sm font-medium text-muted-foreground">Type of Vaccine:</span>
                                  <span>{viewVaccination.type}</span>
                                </div>
                                <div className="flex flex-col space-y-1">
                                  <span className="text-sm font-medium text-muted-foreground">Vaccinated By:</span>
                                  <span>{viewVaccination.by}</span>
                                </div>
                                <div className="flex flex-col space-y-1">
                                  <span className="text-sm font-medium text-muted-foreground">Temperature:</span>
                                  <span>{viewVaccination.temp}</span>
                                </div>
                              </div>
                            )}
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button type="button">Close</Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        {/* Delete Button with Alert Dialog */}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="default" size="sm" className="h-8 w-8 p-0 bg-red-500">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Vaccination Record</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this vaccination record? 
                                This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteVaccination(vacc.id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div>Showing 1 to {filteredVaccinations.length} of {filteredVaccinations.length} entries</div>
        <div className="flex gap-1">
          <Button variant="outline" size="sm" disabled className="text-sm h-8">
            Previous
          </Button>
          <Button variant="default" size="sm" className="text-sm h-8 bg-blue-500">
            1
          </Button>
          <Button variant="outline" size="sm" disabled className="text-sm h-8">
            Next
          </Button>
        </div>
      </div>

      <div className="text-xs text-muted-foreground text-center py-4 border-t mt-8">
        © 2025 All rights reserved. v4.3.8. Software Developed by FusionEdge™ Technologies
      </div>
    </div>
  );
};

export default VaccinationsPage;
