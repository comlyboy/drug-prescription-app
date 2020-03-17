export interface IPrescription {
    _id?: string;
    formula: string;
    duration: string
    IsTaken?: boolean;
    isViewed?: boolean;
    drugId: string;
    patientId: string;
    createdAt?: string;
    prescriptionId?: string;

}