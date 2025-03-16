
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const VaccinationsPage = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Vaccinations</h1>
      <Card>
        <CardHeader>
          <CardTitle>Vaccination Records</CardTitle>
          <CardDescription>
            Manage pet vaccination records and schedules
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Vaccination content coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default VaccinationsPage;
