import { Component } from '@angular/core';
import { Environment } from '../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { CasesService } from '../../../services/cases.service';
import { ToastAlert } from '../../../helpers/toast-alert';

@Component({
  selector: 'app-case-details',
  templateUrl: './case-details.component.html',
  styleUrl: './case-details.component.scss'
})
export class CaseDetailsComponent {
  caseId: string = '';
  caseData: any = null;
  toast: ToastAlert;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private casesService: CasesService
  ) {
    this.toast = new ToastAlert();
  }

  ngOnInit(): void {
    this.caseId = this.route.snapshot.paramMap.get('id') ?? '';
    this.loadCase();
  }

  loadCase() {
    this.loading = true;
    this.casesService.getById(this.caseId).subscribe({
      next: (res: any) => {
        this.caseData = res.data;
        this.loading = false;
      },
      error: (err: any) => {
        this.toast.showError(err?.error?.message ??  'Erro ao carregar o caso');
        this.router.navigate(['/home/cases']);
        this.loading = false;
      }
    });
  }

  getEvidenceUrl(evidence: any): string {
    return Environment.isProduction ? evidence?.signedUrl : Environment.BackendURL + evidence?.contentUrl;
  }

  extractFilename(url: string): string {
    return url.split('/').pop() ?? 'arquivo';
  }

  getEvidenceIcon(type: string): string {
    switch (type) {
      case 'IMAGE': return 'image-outline';
      case 'AUDIO': return 'music-outline';
      case 'DOCUMENT': return 'file-text-outline';
      case 'TEXT': return 'edit-2-outline';
      default: return 'file-outline';
    }
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

  downloadFile(url: string) {
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.target = '_blank';
    anchor.click();
  }
}
