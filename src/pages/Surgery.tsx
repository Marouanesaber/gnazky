
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Filter, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SurgeryPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock data for surgeries
  const surgeries = [
    { id: 1, petName: "Max", type: "Dog", owner: "John Doe", procedure: "Castration", date: "2023-09-15", status: "completed" },
    { id: 2, petName: "Luna", type: "Cat", owner: "Jane Smith", procedure: "Tumor Removal", date: "2023-09-20", status: "scheduled" },
    { id: 3, petName: "Buddy", type: "Dog", owner: "Mike Johnson", procedure: "Fracture Repair", date: "2023-10-05", status: "scheduled" },
    { id: 4, petName: "Coco", type: "Rabbit", owner: "Sarah Williams", procedure: "Teeth Trimming", date: "2023-10-10", status: "scheduled" }
  ];

  // Filter surgeries based on search query and filter status
  const filteredSurgeries = surgeries.filter(surgery => {
    const matchesSearch = surgery.petName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          surgery.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          surgery.procedure.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || surgery.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Surgery</h1>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Surgery
        </Button>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-3">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="all">All Surgeries</TabsTrigger>
        </TabsList>
        
        <div className="flex flex-col md:flex-row justify-between gap-4 my-4">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search surgeries..."
              className="w-full md:w-[300px] pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-[180px] flex gap-2">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="Filter Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="upcoming" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSurgeries
              .filter(surgery => surgery.status === "scheduled")
              .map(surgery => (
                <Card key={surgery.id} className="overflow-hidden transition-all hover:shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{surgery.petName} ({surgery.type})</CardTitle>
                    <CardDescription>{surgery.owner}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="font-medium">Procedure:</div>
                        <div>{surgery.procedure}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>{new Date(surgery.date).toLocaleDateString()}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <div>10:00 AM</div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="text-xs py-1 px-2 rounded-full bg-amber-100 text-amber-800">
                      Scheduled
                    </div>
                    <Button variant="outline" size="sm">View Details</Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSurgeries
              .filter(surgery => surgery.status === "completed")
              .map(surgery => (
                <Card key={surgery.id} className="overflow-hidden transition-all hover:shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{surgery.petName} ({surgery.type})</CardTitle>
                    <CardDescription>{surgery.owner}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="font-medium">Procedure:</div>
                        <div>{surgery.procedure}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>{new Date(surgery.date).toLocaleDateString()}</div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="text-xs py-1 px-2 rounded-full bg-green-100 text-green-800">
                      Completed
                    </div>
                    <Button variant="outline" size="sm">View Report</Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSurgeries.map(surgery => (
              <Card key={surgery.id} className="overflow-hidden transition-all hover:shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{surgery.petName} ({surgery.type})</CardTitle>
                  <CardDescription>{surgery.owner}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="font-medium">Procedure:</div>
                      <div>{surgery.procedure}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>{new Date(surgery.date).toLocaleDateString()}</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className={`text-xs py-1 px-2 rounded-full ${
                    surgery.status === "completed" 
                      ? "bg-green-100 text-green-800" 
                      : surgery.status === "scheduled" 
                        ? "bg-amber-100 text-amber-800" 
                        : "bg-red-100 text-red-800"
                  }`}>
                    {surgery.status.charAt(0).toUpperCase() + surgery.status.slice(1)}
                  </div>
                  <Button variant="outline" size="sm">
                    {surgery.status === "completed" ? "View Report" : "View Details"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SurgeryPage;
