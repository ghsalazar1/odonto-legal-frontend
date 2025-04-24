import { Component } from '@angular/core';
import { ToastAlert } from '../../../helpers/toast-alert';
import { ReportsService } from '../../../services/reports.service';
import { ReportDTO } from '../../../models/reports-model';
import { Environment } from '../../../../environments/environment';

@Component({
  selector: 'app-reports-list',
  templateUrl: './reports-list.component.html',
  styleUrl: './reports-list.component.scss'
})
export class ReportsListComponent {
  reports: ReportDTO[] = [];
  filteredReports: ReportDTO[] = [];
  searchTerm: string = '';
  toast: ToastAlert = new ToastAlert();

  constructor(private reportsService: ReportsService) {}

  ngOnInit(): void {
    this.loadReports();
  }

  getParticipantNames(report: ReportDTO): string {
    return report?.case?.caseParticipants.map(p => p?.user?.name).join(', ') ?? '-';
  }

  
  getEvidenceUrl(url: any): string {
    return Environment.isProduction ? url : Environment.BackendURL + "/uploads/" +  url;
  }
  

  loadReports(): void {
    this.reportsService.getAll().subscribe({
      next: (response) => {
        this.reports = response.data || [];
        this.filteredReports = [...this.reports];
      },
      error: (err) => {
        const msg = err?.error?.message || 'Erro ao carregar relatórios de dossiê.';
        this.toast.showError(msg);
      }
    });
  }

  getBadgeStatus(status: string): string {
    switch (status) {
      case 'Em andamento':
        return 'info';
      case 'Finalizado':
        return 'success';
      case 'Arquivado':
        return 'warning';
      default:
        return 'basic';
    }
  }

  onSearch(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredReports = this.reports.filter(r =>
      r.case.title.toLowerCase().includes(term) ||
      r.case.status.toLowerCase().includes(term) ||
      r.case.peritoPrincipal?.name.toLowerCase().includes(term) ||
      (r.case.caseDate && new Date(r.case.caseDate).toLocaleDateString().includes(term)) ||
      (r.case.closedAt && new Date(r.case.closedAt).toLocaleDateString().includes(term))
    );
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Finalizado': return 'success';
      case 'Arquivado': return 'warning';
      default: return 'info';
    }
  }

  downloadReport(report: any): void {
    if (!report?.contentUrl) {
      this.toast.showError('URL do dossiê não disponível.');
      return;
    }
    window.open(report.contentUrl, '_blank');
  }
}
