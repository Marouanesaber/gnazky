
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Eye, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

  // Filter lab tests based on search term
  const filteredTests = laboratoryTests.filter(test => 
    test.petId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    test.test.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <Button variant="default" className="bg-blue-500 hover:bg-blue-600 transition-all">
          Add Record
        </Button>
        <Button variant="default" className="bg-blue-500 hover:bg-blue-600 transition-all">
          Add Request
        </Button>
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
                        <Button variant="default" size="sm" className="h-8 w-8 p-0 bg-blue-500">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="default" size="sm" className="h-8 w-8 p-0 bg-blue-500">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="default" size="sm" className="h-8 w-8 p-0 bg-red-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
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
