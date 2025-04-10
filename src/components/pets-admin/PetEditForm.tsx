
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { AdminPet } from "./types";
import { petsApi } from "@/utils/api";

interface PetEditFormProps {
  pet: AdminPet | null;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const PetEditForm = ({ pet, onSuccess, onCancel }: PetEditFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Set up form with default values from pet data
  const form = useForm({
    defaultValues: {
      name: pet?.name || "",
      species: pet?.species || "",
      breed: pet?.breed || "",
      microchip_id: pet?.chipId || "",
      gender: pet?.gender || "unknown",
      weight: pet?.weight?.toString() || "",
      weight_unit: pet?.weight_unit || "kg",
      color: pet?.color || "",
      notes: pet?.notes || "",
    },
  });

  // Update form values when pet data changes
  useEffect(() => {
    if (pet) {
      form.reset({
        name: pet.name || "",
        species: pet.species || "",
        breed: pet.breed || "",
        microchip_id: pet.chipId || "",
        gender: pet.gender || "unknown",
        weight: pet.weight?.toString() || "",
        weight_unit: pet.weight_unit || "kg",
        color: pet.color || "",
        notes: pet.notes || "",
      });
    }
  }, [pet, form]);

  const onSubmit = async (data: any) => {
    if (!pet?.id) {
      toast.error("Pet ID is missing");
      return;
    }

    setIsSubmitting(true);

    try {
      // Convert weight to number if provided
      if (data.weight) {
        data.weight = parseFloat(data.weight);
      }

      // Use the petsApi utility to update the pet
      const response = await petsApi.update(pet.id, data);
      
      console.log("Pet updated:", response);
      toast.success("Pet information updated successfully");
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error updating pet information:", error);
      toast.error("Failed to update pet information. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pet Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter pet name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="species"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Species</FormLabel>
                <FormControl>
                  <Input placeholder="Species" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="breed"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Breed</FormLabel>
                <FormControl>
                  <Input placeholder="Breed" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="microchip_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Microchip ID</FormLabel>
                <FormControl>
                  <Input placeholder="Microchip ID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select 
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <Select.Trigger>
                    <Select.Value placeholder="Select gender" />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Item value="male">Male</Select.Item>
                    <Select.Item value="female">Female</Select.Item>
                    <Select.Item value="unknown">Unknown</Select.Item>
                  </Select.Content>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color</FormLabel>
                <FormControl>
                  <Input placeholder="Color" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-5 gap-2">
            <div className="col-span-3">
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" placeholder="Weight" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="weight_unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit</FormLabel>
                    <Select 
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <Select.Trigger>
                        <Select.Value placeholder="Unit" />
                      </Select.Trigger>
                      <Select.Content>
                        <Select.Item value="kg">kg</Select.Item>
                        <Select.Item value="lb">lb</Select.Item>
                      </Select.Content>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea placeholder="Additional notes" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2 pt-4">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PetEditForm;
