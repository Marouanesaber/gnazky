
export interface VaccinationRecord {
  name: string;
  date: string;
}

export interface PetRecord {
  type: string;
  date: string;
  notes: string;
}

export interface AdminPet {
  id: number;
  chipId: string;
  name: string;
  registeredBy: string;
  vaccinationRecords: VaccinationRecord[];
  petRecords: PetRecord[];
  species?: string;
  breed?: string;
  gender?: string;
  weight?: number;
  weight_unit?: string;
  color?: string;
  notes?: string;
}
