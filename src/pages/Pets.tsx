
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PawPrint, Plus, Search, Filter, Calendar, Syringe } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const PetsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");

  // Mock data for pets
  const pets = [
    { id: 1, name: "Max", type: "Dog", breed: "Golden Retriever", age: 3, owner: "John Doe", status: "healthy", lastVisit: "2023-09-10" },
    { id: 2, name: "Luna", type: "Cat", breed: "Siamese", age: 2, owner: "Jane Smith", status: "scheduled", lastVisit: "2023-09-05" },
    { id: 3, name: "Buddy", type: "Dog", breed: "German Shepherd", age: 4, owner: "Mike Johnson", status: "sick", lastVisit: "2023-09-20" },
    { id: 4, name: "Coco", type: "Rabbit", breed: "Holland Lop", age: 1, owner: "Sarah Williams", status: "healthy", lastVisit: "2023-08-15" },
    { id: 5, name: "Rocky", type: "Dog", breed: "Bulldog", age: 5, owner: "David Miller", status: "healthy", lastVisit: "2023-09-01" },
    { id: 6, name: "Milo", type: "Cat", breed: "Maine Coon", age: 3, owner: "Emily Davis", status: "scheduled", lastVisit: "2023-09-15" }
  ];

  // Filter pets based on search query and filter type
  const filteredPets = pets.filter(pet => {
    const matchesSearch = pet.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         pet.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pet.breed.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = filterType === "all" || pet.type.toLowerCase() === filterType.toLowerCase();
    
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Pets Management</h1>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Register New Pet
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-4">
          <TabsTrigger value="all">All Pets</TabsTrigger>
          <TabsTrigger value="dogs">Dogs</TabsTrigger>
          <TabsTrigger value="cats">Cats</TabsTrigger>
          <TabsTrigger value="other">Other Animals</TabsTrigger>
        </TabsList>
        
        <div className="flex flex-col md:flex-row justify-between gap-4 my-4">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search pets by name, breed, or owner..."
              className="w-full md:w-[350px] pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-[180px] flex gap-2">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="Pet Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="dog">Dogs</SelectItem>
                <SelectItem value="cat">Cats</SelectItem>
                <SelectItem value="rabbit">Rabbits</SelectItem>
                <SelectItem value="bird">Birds</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPets.map(pet => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="dogs" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPets
              .filter(pet => pet.type.toLowerCase() === "dog")
              .map(pet => (
                <PetCard key={pet.id} pet={pet} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="cats" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPets
              .filter(pet => pet.type.toLowerCase() === "cat")
              .map(pet => (
                <PetCard key={pet.id} pet={pet} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="other" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPets
              .filter(pet => !["dog", "cat"].includes(pet.type.toLowerCase()))
              .map(pet => (
                <PetCard key={pet.id} pet={pet} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Pet Card Component
const PetCard = ({ pet }: { pet: any }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "healthy":
        return <Badge className="bg-green-500">Healthy</Badge>;
      case "sick":
        return <Badge className="bg-red-500">Sick</Badge>;
      case "scheduled":
        return <Badge className="bg-blue-500">Appointment Scheduled</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <PawPrint className="h-5 w-5 text-clinic-blue" />
            {pet.name}
          </CardTitle>
          {getStatusBadge(pet.status)}
        </div>
        <CardDescription>{pet.breed} • {pet.age} years old</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-sm space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">Owner:</span>
            <span>{pet.owner}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span>Last visit: {new Date(pet.lastVisit).toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between gap-2">
        <Button size="sm" variant="outline" className="w-full flex gap-1">
          <Calendar className="h-4 w-4" />
          Schedule
        </Button>
        <Button size="sm" variant="outline" className="w-full flex gap-1">
          <Syringe className="h-4 w-4" />
          Vaccinations
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PetsPage;
