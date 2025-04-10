
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AdminPet } from "./types";
import PetEditForm from "./PetEditForm";

interface PetEditDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  currentPet: AdminPet | null;
  onSuccess: () => void;
}

export function PetEditDialog({
  isOpen,
  onOpenChange,
  currentPet,
  onSuccess,
}: PetEditDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Pet Information</DialogTitle>
          <DialogDescription>
            Update the details for this pet. Changes will be saved to the database.
          </DialogDescription>
        </DialogHeader>
        
        <PetEditForm 
          pet={currentPet} 
          onSuccess={onSuccess}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
