
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const SurgeryPage = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Surgery</h1>
      <Card>
        <CardHeader>
          <CardTitle>Surgery Records</CardTitle>
          <CardDescription>
            Manage pet surgery records and schedules
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Surgery content coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SurgeryPage;
