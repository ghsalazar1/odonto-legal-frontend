export interface EvidenceInput {
    file: File;
    preview: string;
    name: string;
    type: string;
  }
  
  export interface CaseForm {
    title: string;
    description: string;
    status: string;
    openedAt: string;    
    closedAt?: string;
    caseDate: string;
    peritoPrincipalId: string;
    participants: string[];
    evidences: EvidenceInput[];
  }