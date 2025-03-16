
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Sample data for pet owners
const petOwnersData = [
  { id: 1, name: "Tim Lafaungih", address: "Haber uti giflu gudofami", contact: "+233 55 123 45", email: "tim@example.com" },
  { id: 2, name: "Leah", address: "Haber uti giflu gudofami", contact: "+233 55 123 45", email: "leah@example.com" },
  { id: 3, name: "Ahmed Kobla", address: "Wolesi egtu le", contact: "+233 55 667 88", email: "ahmed@example.com" },
  { id: 4, name: "Lydia", address: "Nuniwa Oj", contact: "+233 50 123 456", email: "lydia@example.com" },
  { id: 5, name: "Greg", address: "Tep", contact: "+233 267 222", email: "greg@example.com" },
];

export function PetOwnersTable() {
  const [currentPage, setCurrentPage] = useState(1);
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
    </div>
  );
}
