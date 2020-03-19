export interface IPrescription {
    _id?: string;
    formula: string;
    duration: string
    isTaken?: boolean;
    isViewed?: boolean;
    drugId: string;
    patientId: string;
    createdAt?: string;
    prescriptionId?: string;

}