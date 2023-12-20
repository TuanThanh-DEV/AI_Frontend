
export interface Appointment {
  id: number;
  appointDate: Date;
  doctorId: number;
  hospitalId: number;
  patientId: number;
  status: String;
  patient: {
    id: number;
    fullName: string;
  };
  hospital: {
    id: number;
    name: string;
  }
}
