import { UserSimpleDTO } from "./case-model";

export interface ReportDTO {
    id: string;
    summary: string;
    notes: string;
    contentUrl: string;
    evidencesCount: number;
    createdAt: string; // ISO format string
    case: ReportCaseDTO;
  }
  
  export interface ReportCaseDTO {
    id: string;
    title: string;
    status: string;
    caseDate: string;
    openedAt: string;
    closedAt?: string | null;
    peritoPrincipal: {
      id: string;
      name: string;
    };
    caseParticipants: {
      caseId: string;
      id: string;
      user: UserSimpleDTO;
      userId: string;
    }[];
  }
  