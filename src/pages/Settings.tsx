
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { PenSquare, Plus, Trash2, UserX, UserCheck } from "lucide-react";

// Sample users data
const usersData = [
  { id: 1, name: "Admin User", email: "admin@example.com", role: "Admin", status: "Active" },
  { id: 2, name: "Staff Member", email: "staff@example.com", role: "Staff", status: "Active" },
  { id: 3, name: "Doctor", email: "doctor@example.com", role: "Doctor", status: "Active" },
  { id: 4, name: "Receptionist", email: "reception@example.com", role: "Staff", status: "Inactive" },
];

const SettingsPage = () => {
  const [isNewUserOpen, setIsNewUserOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
      </div>

      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>
        
        <TabsContent value="account" className="space-y-6 animate-fade-in">
          <div className="clinic-card space-y-6">
            <div>
              <h3 className="text-lg font-medium">Profile Information</h3>
              <p className="text-sm text-muted-foreground">
                Update your account's profile information.
              </p>
            </div>
            <Separator />
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="Admin User" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" defaultValue="admin@example.com" />
              </div>
            </div>
            <div>
              <Button className="bg-clinic-blue hover:bg-clinic-blue/90">
                Save Changes
              </Button>
            </div>
          </div>

          <div className="clinic-card space-y-6">
            <div>
              <h3 className="text-lg font-medium">Change Password</h3>
              <p className="text-sm text-muted-foreground">
                Update your password to maintain security.
              </p>
            </div>
            <Separator />
            <Dialog open={isChangePasswordOpen} onOpenChange={setIsChangePasswordOpen}>
              <DialogTrigger asChild>
                <Button className="bg-clinic-blue hover:bg-clinic-blue/90">
                  Change Password
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Change Password</DialogTitle>
                  <DialogDescription>
                    Enter your current password and a new password to update.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsChangePasswordOpen(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-clinic-blue hover:bg-clinic-blue/90" onClick={() => setIsChangePasswordOpen(false)}>
                    Update Password
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </TabsContent>
        
        <TabsContent value="users" className="space-y-6 animate-fade-in">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">User Management</h3>
            <Dialog open={isNewUserOpen} onOpenChange={setIsNewUserOpen}>
              <DialogTrigger asChild>
                <Button className="bg-clinic-blue hover:bg-clinic-blue/90">
                  <Plus className="h-4 w-4 mr-2" />
                  New User
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New User</DialogTitle>
                  <DialogDescription>
                    Add a new user to the system with specific role and permissions.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="user-name">Name</Label>
                    <Input id="user-name" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="user-email">Email</Label>
                    <Input id="user-email" type="email" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="user-role">Role</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="doctor">Doctor</SelectItem>
                        <SelectItem value="staff">Staff</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="user-password">Temporary Password</Label>
                    <Input id="user-password" type="password" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsNewUserOpen(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-clinic-blue hover:bg-clinic-blue/90" onClick={() => setIsNewUserOpen(false)}>
                    Create User
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="clinic-card">
            <div className="overflow-x-auto">
              <table className="clinic-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {usersData.map((user) => (
                    <tr key={user.id} className="hover:bg-muted/30 transition-colors">
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          user.role === "Admin" 
                            ? "bg-clinic-purple/10 text-clinic-purple" 
                            : user.role === "Doctor" 
                            ? "bg-clinic-blue/10 text-clinic-blue" 
                            : "bg-clinic-teal/10 text-clinic-teal"
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          user.status === "Active" 
                            ? "bg-clinic-green/10 text-clinic-green" 
                            : "bg-clinic-red/10 text-clinic-red"
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <PenSquare className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            {user.status === "Active" ? (
                              <UserX className="h-4 w-4 text-clinic-red" />
                            ) : (
                              <UserCheck className="h-4 w-4 text-clinic-green" />
                            )}
                            <span className="sr-only">
                              {user.status === "Active" ? "Ban" : "Activate"}
                            </span>
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-clinic-red">
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="system" className="space-y-6 animate-fade-in">
          <div className="clinic-card space-y-6">
            <div>
              <h3 className="text-lg font-medium">Appearance</h3>
              <p className="text-sm text-muted-foreground">
                Customize the appearance of the application.
              </p>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="theme">Theme</Label>
                <p className="text-sm text-muted-foreground">
                  Switch between light and dark modes.
                </p>
              </div>
              <ThemeSwitcher />
            </div>
          </div>
          
          <div className="clinic-card space-y-6">
            <div>
              <h3 className="text-lg font-medium">Notifications</h3>
              <p className="text-sm text-muted-foreground">
                Configure system notifications.
              </p>
            </div>
            <Separator />
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications via email.
                  </p>
                </div>
                <Switch id="email-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="appointment-reminders">Appointment Reminders</Label>
                  <p className="text-sm text-muted-foreground">
                    Send reminders for upcoming appointments.
                  </p>
                </div>
                <Switch id="appointment-reminders" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="system-updates">System Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Notifications about system updates and maintenance.
                  </p>
                </div>
                <Switch id="system-updates" />
              </div>
            </div>
            <Button className="bg-clinic-blue hover:bg-clinic-blue/90">
              Save Preferences
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
