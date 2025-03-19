
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Plus, Search, Phone, Mail, MapPin, PawPrint } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const OwnersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddOwnerOpen, setIsAddOwnerOpen] = useState(false);
  const [isViewProfileOpen, setIsViewProfileOpen] = useState(false);
  const [isViewPetsOpen, setIsViewPetsOpen] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState<any>(null);

  // Mock data for owners
  const owners = [
    { id: 1, name: "John Doe", email: "john.doe@example.com", phone: "+1 (555) 123-4567", address: "123 Main St, New York, NY", petsCount: 2 },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", phone: "+1 (555) 987-6543", address: "456 Oak Ave, Los Angeles, CA", petsCount: 1 },
    { id: 3, name: "Mike Johnson", email: "mike.johnson@example.com", phone: "+1 (555) 456-7890", address: "789 Pine Rd, Chicago, IL", petsCount: 3 },
    { id: 4, name: "Sarah Williams", email: "sarah.williams@example.com", phone: "+1 (555) 234-5678", address: "101 Maple Dr, Houston, TX", petsCount: 1 },
    { id: 5, name: "David Miller", email: "david.miller@example.com", phone: "+1 (555) 876-5432", address: "202 Cedar Ln, Phoenix, AZ", petsCount: 2 },
    { id: 6, name: "Emily Davis", email: "emily.davis@example.com", phone: "+1 (555) 345-6789", address: "303 Elm St, Philadelphia, PA", petsCount: 1 }
  ];

  // Mock data for pets
  const petsByOwner = {
    1: [
      { id: 1, name: "Max", species: "Dog", breed: "Golden Retriever", age: 3 },
      { id: 2, name: "Bella", species: "Cat", breed: "Siamese", age: 2 }
    ],
    2: [
      { id: 3, name: "Charlie", species: "Dog", breed: "Beagle", age: 5 }
    ],
    3: [
      { id: 4, name: "Luna", species: "Cat", breed: "Persian", age: 4 },
      { id: 5, name: "Rocky", species: "Dog", breed: "German Shepherd", age: 6 },
      { id: 6, name: "Daisy", species: "Rabbit", breed: "Holland Lop", age: 1 }
    ],
    4: [
      { id: 7, name: "Cooper", species: "Dog", breed: "Labrador", age: 2 }
    ],
    5: [
      { id: 8, name: "Lucy", species: "Cat", breed: "Maine Coon", age: 3 },
      { id: 9, name: "Bailey", species: "Dog", breed: "Shih Tzu", age: 4 }
    ],
    6: [
      { id: 10, name: "Milo", species: "Cat", breed: "Ragdoll", age: 2 }
    ]
  };

  // Filter owners based on search query
  const filteredOwners = owners.filter(owner => 
    owner.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    owner.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    owner.phone.includes(searchQuery)
  );

  const handleAddOwner = () => {
    toast.success("New owner has been added");
    setIsAddOwnerOpen(false);
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Pet Owners</h1>
        <Dialog open={isAddOwnerOpen} onOpenChange={setIsAddOwnerOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 animate-fade-in">
              <Plus className="h-4 w-4" />
              Add New Owner
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Add New Owner</DialogTitle>
              <DialogDescription>
                Enter the details of the new pet owner.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Full Name
                </Label>
                <Input id="name" placeholder="John Doe" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input id="email" type="email" placeholder="john.doe@example.com" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input id="phone" placeholder="+1 (555) 123-4567" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right">
                  Address
                </Label>
                <Textarea id="address" placeholder="123 Main St, New York, NY" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddOwnerOpen(false)}>Cancel</Button>
              <Button onClick={handleAddOwner}>Add Owner</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-2">
          <TabsTrigger value="all">All Owners</TabsTrigger>
          <TabsTrigger value="recent">Recently Added</TabsTrigger>
        </TabsList>
        
        <div className="relative w-full my-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search owners by name, email, or phone..."
            className="w-full md:w-[350px] pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredOwners.map(owner => (
              <OwnerCard 
                key={owner.id} 
                owner={owner} 
                onViewProfile={() => {
                  setSelectedOwner(owner);
                  setIsViewProfileOpen(true);
                }}
                onViewPets={() => {
                  setSelectedOwner(owner);
                  setIsViewPetsOpen(true);
                }}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recent" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredOwners
              .slice(0, 3) // Just showing the first 3 as "recent" for demonstration
              .map(owner => (
                <OwnerCard 
                  key={owner.id} 
                  owner={owner} 
                  onViewProfile={() => {
                    setSelectedOwner(owner);
                    setIsViewProfileOpen(true);
                  }}
                  onViewPets={() => {
                    setSelectedOwner(owner);
                    setIsViewPetsOpen(true);
                  }}
                />
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* View Profile Dialog */}
      <Dialog open={isViewProfileOpen} onOpenChange={setIsViewProfileOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Owner Profile</DialogTitle>
          </DialogHeader>
          {selectedOwner && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(selectedOwner.name)}`} />
                  <AvatarFallback>{selectedOwner.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-bold">{selectedOwner.name}</h2>
                  <p className="text-sm text-muted-foreground">{selectedOwner.petsCount} {selectedOwner.petsCount === 1 ? 'Pet' : 'Pets'}</p>
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t">
                <div className="grid grid-cols-3 gap-2">
                  <div className="font-medium">Email:</div>
                  <div className="col-span-2 text-blue-600">
                    <a href={`mailto:${selectedOwner.email}`}>{selectedOwner.email}</a>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="font-medium">Phone:</div>
                  <div className="col-span-2">
                    <a href={`tel:${selectedOwner.phone}`}>{selectedOwner.phone}</a>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="font-medium">Address:</div>
                  <div className="col-span-2">{selectedOwner.address}</div>
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t">
                <h3 className="font-medium">Ownership History</h3>
                <p className="text-sm text-muted-foreground">Customer since: January 2023</p>
                <p className="text-sm text-muted-foreground">Last Visit: June 15, 2023</p>
                <p className="text-sm text-muted-foreground">Total Visits: 8</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewProfileOpen(false)}>Close</Button>
            <Button>Edit Profile</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Pets Dialog */}
      <Dialog open={isViewPetsOpen} onOpenChange={setIsViewPetsOpen}>
        <DialogContent className="sm:max-w-[650px]">
          <DialogHeader>
            <DialogTitle>{selectedOwner?.name}'s Pets</DialogTitle>
          </DialogHeader>
          {selectedOwner && (
            <div className="space-y-4">
              <div className="grid gap-4">
                {petsByOwner[selectedOwner.id as keyof typeof petsByOwner]?.map((pet) => (
                  <Card key={pet.id} className="overflow-hidden animate-fade-in">
                    <div className="flex items-start p-4">
                      <div className="bg-blue-100 rounded-full p-3 mr-4">
                        <PawPrint className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{pet.name}</CardTitle>
                        <CardDescription>
                          {pet.species} • {pet.breed} • {pet.age} years old
                        </CardDescription>
                        <div className="mt-4 flex items-center text-sm text-muted-foreground">
                          <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                          Healthy
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button variant="outline" size="sm">View Details</Button>
                        <Button variant="outline" size="sm">Schedule Visit</Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewPetsOpen(false)}>Close</Button>
            <Button>Register New Pet</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Owner Card Component
const OwnerCard = ({ owner, onViewProfile, onViewPets }: { owner: any; onViewProfile: () => void; onViewPets: () => void }) => {
  const initials = owner.name
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase();

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(owner.name)}`} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">{owner.name}</CardTitle>
            <CardDescription className="flex items-center gap-1">
              <PawPrint className="h-3 w-3" />
              {owner.petsCount} {owner.petsCount === 1 ? 'Pet' : 'Pets'}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-sm space-y-2">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <a href={`mailto:${owner.email}`} className="text-blue-600 hover:underline">{owner.email}</a>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <a href={`tel:${owner.phone}`} className="hover:underline">{owner.phone}</a>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
            <span className="text-xs">{owner.address}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between gap-2">
        <Button 
          size="sm" 
          variant="outline" 
          className="w-full hover:bg-blue-50 hover:text-blue-600 transition-all animate-fade-in"
          onClick={onViewProfile}
        >
          View Profile
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          className="w-full hover:bg-blue-50 hover:text-blue-600 transition-all animate-fade-in [animation-delay:100ms]"
          onClick={onViewPets}
        >
          View Pets
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OwnersPage;
