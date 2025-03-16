
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Plus, Search, Phone, Mail, MapPin, PawPrint } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const OwnersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for owners
  const owners = [
    { id: 1, name: "John Doe", email: "john.doe@example.com", phone: "+1 (555) 123-4567", address: "123 Main St, New York, NY", petsCount: 2 },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", phone: "+1 (555) 987-6543", address: "456 Oak Ave, Los Angeles, CA", petsCount: 1 },
    { id: 3, name: "Mike Johnson", email: "mike.johnson@example.com", phone: "+1 (555) 456-7890", address: "789 Pine Rd, Chicago, IL", petsCount: 3 },
    { id: 4, name: "Sarah Williams", email: "sarah.williams@example.com", phone: "+1 (555) 234-5678", address: "101 Maple Dr, Houston, TX", petsCount: 1 },
    { id: 5, name: "David Miller", email: "david.miller@example.com", phone: "+1 (555) 876-5432", address: "202 Cedar Ln, Phoenix, AZ", petsCount: 2 },
    { id: 6, name: "Emily Davis", email: "emily.davis@example.com", phone: "+1 (555) 345-6789", address: "303 Elm St, Philadelphia, PA", petsCount: 1 }
  ];

  // Filter owners based on search query
  const filteredOwners = owners.filter(owner => 
    owner.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    owner.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    owner.phone.includes(searchQuery)
  );

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Pet Owners</h1>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add New Owner
        </Button>
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
              <OwnerCard key={owner.id} owner={owner} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recent" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredOwners
              .slice(0, 3) // Just showing the first 3 as "recent" for demonstration
              .map(owner => (
                <OwnerCard key={owner.id} owner={owner} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Owner Card Component
const OwnerCard = ({ owner }: { owner: any }) => {
  const initials = owner.name
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase();

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
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
        <Button size="sm" variant="outline" className="w-full">
          View Profile
        </Button>
        <Button size="sm" variant="outline" className="w-full">
          View Pets
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OwnersPage;
