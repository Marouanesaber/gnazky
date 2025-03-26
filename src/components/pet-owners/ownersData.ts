
// Mock data for owners
export const owners = [
  { id: 1, name: "John Doe", email: "john.doe@example.com", phone: "+1 (555) 123-4567", address: "123 Main St, New York, NY", petsCount: 2 },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com", phone: "+1 (555) 987-6543", address: "456 Oak Ave, Los Angeles, CA", petsCount: 1 },
  { id: 3, name: "Mike Johnson", email: "mike.johnson@example.com", phone: "+1 (555) 456-7890", address: "789 Pine Rd, Chicago, IL", petsCount: 3 },
  { id: 4, name: "Sarah Williams", email: "sarah.williams@example.com", phone: "+1 (555) 234-5678", address: "101 Maple Dr, Houston, TX", petsCount: 1 },
  { id: 5, name: "David Miller", email: "david.miller@example.com", phone: "+1 (555) 876-5432", address: "202 Cedar Ln, Phoenix, AZ", petsCount: 2 },
  { id: 6, name: "Emily Davis", email: "emily.davis@example.com", phone: "+1 (555) 345-6789", address: "303 Elm St, Philadelphia, PA", petsCount: 1 }
];

// Mock data for pets
export const petsByOwner = {
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
