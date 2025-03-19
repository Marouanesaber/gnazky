
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Sample data for pets registered by admin
const adminPetsData = [
  { id: 1, chipId: "CHIP900001", name: "Teddy", registeredBy: "Admin Admin", vaccinationRecords: "View", petRecords: "View" },
  { id: 2, chipId: "CHIP900002", name: "Buddy", registeredBy: "Admin Admin", vaccinationRecords: "View", petRecords: "View" },
  { id: 3, chipId: "CHIP900003", name: "Whiskers", registeredBy: "Admin Admin", vaccinationRecords: "View", petRecords: "View" },
  { id: 4, chipId: "CHIP900004", name: "Lucy", registeredBy: "Admin Admin", vaccinationRecords: "View", petRecords: "View" },
  { id: 5, chipId: "CHIP900005", name: "Max", registeredBy: "Admin Admin", vaccinationRecords: "View", petRecords: "View" },
];

export function AdminPetsTable() {
  const [currentPage, setCurrentPage] = useState(1);
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
                  <Button variant="outline" size="sm" className="text-clinic-blue">
                    {pet.vaccinationRecords}
                  </Button>
                </td>
                <td>
                  <Button variant="outline" size="sm" className="text-clinic-blue">
                    {pet.petRecords}
                  </Button>
                </td>
                <td className="text-right">
                  <Button size="sm" className="bg-clinic-blue hover:bg-clinic-blue/90">
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
    </div>
  );
}
