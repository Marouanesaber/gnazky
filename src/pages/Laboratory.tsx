
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const LaboratoryPage = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Laboratory Tests</h1>
      <Card>
        <CardHeader>
          <CardTitle>Laboratory Records</CardTitle>
          <CardDescription>
            Manage laboratory tests and results
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Laboratory content coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LaboratoryPage;
