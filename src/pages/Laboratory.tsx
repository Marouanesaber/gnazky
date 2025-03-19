
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Eye, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const laboratoryTests = [
  { id: 7, petId: "OVHMS0009", test: "Electrolyte Panel", findings: "", by: "Admin Admin", date: "2025-02-08 15:41:00", status: "Pending" },
  { id: 6, petId: "OVHMS0011", test: "Electrolyte Panel", findings: "szxdcftgyvbhunjko", by: "Admin Admin", date: "2025-01-05 11:41:00", status: "Pending" },
  { id: 5, petId: "OVHMS0008", test: "Complete Blood Count (CBC)", findings: "", by: "Admin Admin", date: "2024-12-23 14:43:00", status: "Pending" },
  { id: 4, petId: "OVHMS0003", test: "Complete Blood Count (CBC)", findings: "n mn mn", by: "Admin Admin", date: "2024-05-01 10:03:00", status: "Pending" },
  { id: 3, petId: "OVHMS0001", test: "Complete Blood Count (CBC)", findings: "", by: "Admin Admin", date: "2024-02-20 12:35:00", status: "Pending" },
  { id: 2, petId: "OVHMS0001", test: "Antibody Detection", findings: "", by: "Admin Admin", date: "2023-12-14 10:54:00", status: "Pending" },
  { id: 1, petId: "OVHMS0001", test: "Bacterial Culture and Sensitivity", findings: "", by: "Admin Admin", date: "2023-12-11 15:15:00", status: "Pending" },
];

const LaboratoryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState("25");
  const [currentLocation, setCurrentLocation] = useState("");
  const [selectedTest, setSelectedTest] = useState<any>(null);
  const [isAddRecordOpen, setIsAddRecordOpen] = useState(false);
  const [isAddRequestOpen, setIsAddRequestOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Filter lab tests based on search term
  const filteredTests = laboratoryTests.filter(test => 
    test.petId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    test.test.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = () => {
    toast.success(`Test #${selectedTest?.id} has been deleted`);
    setIsDeleteDialogOpen(false);
  };

  const handleAddRecord = () => {
    toast.success("New record has been added");
    setIsAddRecordOpen(false);
  };

  const handleAddRequest = () => {
    toast.success("New request has been added");
    setIsAddRequestOpen(false);
  };

  const handleEdit = () => {
    toast.success(`Test #${selectedTest?.id} has been updated`);
    setIsEditDialogOpen(false);
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Laboratory</h1>
        <div className="flex items-center text-sm text-muted-foreground">
          <span>Dashboard</span>
          <span className="mx-2">›</span>
          <span>Laboratory</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Dialog open={isAddRecordOpen} onOpenChange={setIsAddRecordOpen}>
          <DialogTrigger asChild>
            <Button variant="default" className="bg-blue-500 hover:bg-blue-600 transition-all animate-fade-in [animation-delay:100ms]">
              Add Record
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Add Laboratory Record</DialogTitle>
              <DialogDescription>
                Add a new laboratory test record for a pet.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="petId" className="text-right">
                  Pet ID
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select pet ID" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="OVHMS0001">OVHMS0001</SelectItem>
                    <SelectItem value="OVHMS0003">OVHMS0003</SelectItem>
                    <SelectItem value="OVHMS0008">OVHMS0008</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="testType" className="text-right">
                  Test Type
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select test type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cbc">Complete Blood Count (CBC)</SelectItem>
                    <SelectItem value="electrolyte">Electrolyte Panel</SelectItem>
                    <SelectItem value="antibody">Antibody Detection</SelectItem>
                    <SelectItem value="bacterial">Bacterial Culture and Sensitivity</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="findings" className="text-right">
                  Findings
                </Label>
                <Textarea className="col-span-3" placeholder="Enter test findings" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date & Time
                </Label>
                <Input type="datetime-local" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddRecordOpen(false)}>Cancel</Button>
              <Button onClick={handleAddRecord}>Save Record</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isAddRequestOpen} onOpenChange={setIsAddRequestOpen}>
          <DialogTrigger asChild>
            <Button variant="default" className="bg-blue-500 hover:bg-blue-600 transition-all animate-fade-in [animation-delay:200ms]">
              Add Request
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Add Laboratory Request</DialogTitle>
              <DialogDescription>
                Request a new laboratory test for a pet.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="petId" className="text-right">
                  Pet ID
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select pet ID" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="OVHMS0001">OVHMS0001</SelectItem>
                    <SelectItem value="OVHMS0003">OVHMS0003</SelectItem>
                    <SelectItem value="OVHMS0008">OVHMS0008</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="testType" className="text-right">
                  Test Type
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select test type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cbc">Complete Blood Count (CBC)</SelectItem>
                    <SelectItem value="electrolyte">Electrolyte Panel</SelectItem>
                    <SelectItem value="antibody">Antibody Detection</SelectItem>
                    <SelectItem value="bacterial">Bacterial Culture and Sensitivity</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="urgency" className="text-right">
                  Urgency
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select urgency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="routine">Routine</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="notes" className="text-right">
                  Notes
                </Label>
                <Textarea className="col-span-3" placeholder="Additional notes" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddRequestOpen(false)}>Cancel</Button>
              <Button onClick={handleAddRequest}>Submit Request</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

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
                  <th className="text-left py-3 px-4 font-medium text-sm">Type of Test</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">Lab Findings</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">Request/ Test By</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">Date & Time</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">Request Status</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredTests.map((test) => (
                  <tr key={test.id} className="border-b hover:bg-muted/20 transition-colors">
                    <td className="py-3 px-4">{test.id}</td>
                    <td className="py-3 px-4">{test.petId}</td>
                    <td className="py-3 px-4">{test.test}</td>
                    <td className="py-3 px-4">{test.findings || "-"}</td>
                    <td className="py-3 px-4">{test.by}</td>
                    <td className="py-3 px-4">{test.date}</td>
                    <td className="py-3 px-4">
                      <span className="inline-block px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-medium">
                        {test.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-1">
                        <Dialog open={isEditDialogOpen && selectedTest?.id === test.id} onOpenChange={(open) => !open && setIsEditDialogOpen(false)}>
                          <DialogTrigger asChild>
                            <Button 
                              variant="default" 
                              size="sm" 
                              className="h-8 w-8 p-0 bg-blue-500 animate-fade-in"
                              onClick={() => {
                                setSelectedTest(test);
                                setIsEditDialogOpen(true);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Laboratory Test</DialogTitle>
                              <DialogDescription>
                                Update the laboratory test information.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right">Pet ID</Label>
                                <div className="col-span-3">
                                  <Input value={selectedTest?.petId} readOnly />
                                </div>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right">Test Type</Label>
                                <div className="col-span-3">
                                  <Input value={selectedTest?.test} readOnly />
                                </div>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right">Findings</Label>
                                <Textarea 
                                  className="col-span-3" 
                                  defaultValue={selectedTest?.findings} 
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right">Status</Label>
                                <Select defaultValue={selectedTest?.status} className="col-span-3">
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Pending">Pending</SelectItem>
                                    <SelectItem value="Completed">Completed</SelectItem>
                                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
                              <Button onClick={handleEdit}>Save Changes</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        <Dialog open={isViewDialogOpen && selectedTest?.id === test.id} onOpenChange={(open) => !open && setIsViewDialogOpen(false)}>
                          <DialogTrigger asChild>
                            <Button 
                              variant="default" 
                              size="sm" 
                              className="h-8 w-8 p-0 bg-blue-500 animate-fade-in [animation-delay:100ms]"
                              onClick={() => {
                                setSelectedTest(test);
                                setIsViewDialogOpen(true);
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Laboratory Test Details</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="grid grid-cols-3 gap-2">
                                <div className="text-sm font-medium">Test ID:</div>
                                <div className="col-span-2">{selectedTest?.id}</div>
                              </div>
                              <div className="grid grid-cols-3 gap-2">
                                <div className="text-sm font-medium">Pet ID:</div>
                                <div className="col-span-2">{selectedTest?.petId}</div>
                              </div>
                              <div className="grid grid-cols-3 gap-2">
                                <div className="text-sm font-medium">Test Type:</div>
                                <div className="col-span-2">{selectedTest?.test}</div>
                              </div>
                              <div className="grid grid-cols-3 gap-2">
                                <div className="text-sm font-medium">Findings:</div>
                                <div className="col-span-2">{selectedTest?.findings || "No findings recorded"}</div>
                              </div>
                              <div className="grid grid-cols-3 gap-2">
                                <div className="text-sm font-medium">Requested By:</div>
                                <div className="col-span-2">{selectedTest?.by}</div>
                              </div>
                              <div className="grid grid-cols-3 gap-2">
                                <div className="text-sm font-medium">Date & Time:</div>
                                <div className="col-span-2">{selectedTest?.date}</div>
                              </div>
                              <div className="grid grid-cols-3 gap-2">
                                <div className="text-sm font-medium">Status:</div>
                                <div className="col-span-2">
                                  <span className="inline-block px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-medium">
                                    {selectedTest?.status}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        <Dialog open={isDeleteDialogOpen && selectedTest?.id === test.id} onOpenChange={(open) => !open && setIsDeleteDialogOpen(false)}>
                          <DialogTrigger asChild>
                            <Button 
                              variant="default" 
                              size="sm" 
                              className="h-8 w-8 p-0 bg-red-500 animate-fade-in [animation-delay:200ms]"
                              onClick={() => {
                                setSelectedTest(test);
                                setIsDeleteDialogOpen(true);
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Delete Laboratory Test</DialogTitle>
                              <DialogDescription>
                                Are you sure you want to delete this laboratory test? This action cannot be undone.
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
                              <Button variant="destructive" onClick={handleDelete}>Delete</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
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
        <div>Showing 1 to {filteredTests.length} of {filteredTests.length} entries</div>
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

export default LaboratoryPage;
