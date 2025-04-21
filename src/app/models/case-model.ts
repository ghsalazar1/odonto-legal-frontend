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

  export interface CaseDTO {
    id: string;
    title: string;
    description: string;
    status: 'Em andamento' | 'Finalizado' | 'Arquivado';
    caseDate: string;
    openedAt: string;
    closedAt: string | null;
    peritoPrincipal: {
      id: string;
      name: string;
    } | null;
    participants: {
      id: string;
      name: string;
    }[];
  }

  export interface FullCaseDTO {
    id: string;
    title: string;
    description: string;
    status: 'Em andamento' | 'Finalizado' | 'Arquivado';
    caseDate: string;         // yyyy-MM-dd
    openedAt: string;         // yyyy-MM-dd
    closedAt: string | null;
  
    peritoPrincipalId: string;
    participants: string[];
  
    // Evidências já existentes no banco
    existingEvidences: ExistingEvidenceDTO[];
  
    // Novos arquivos que serão adicionados no update
    newEvidences: NewEvidenceDTO[];
  }
  
  export interface ExistingEvidenceDTO {
    id: string;
    type: 'IMAGE' | 'AUDIO' | 'DOCUMENT' | 'OTHER';
    contentUrl: string;
  }
  
  export interface NewEvidenceDTO {
    file: File;
    name: string;
    type: string;
    preview: string;
  }
  