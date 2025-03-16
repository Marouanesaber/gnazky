
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const OwnersPage = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Pet Owners</h1>
      <Card>
        <CardHeader>
          <CardTitle>Owners Registry</CardTitle>
          <CardDescription>
            Manage pet owner information and records
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Owner management content coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default OwnersPage;
