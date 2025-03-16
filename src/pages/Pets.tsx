
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const PetsPage = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Pets Management</h1>
      <Card>
        <CardHeader>
          <CardTitle>Pets Registry</CardTitle>
          <CardDescription>
            Manage pets information and records
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Pets management content coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PetsPage;
