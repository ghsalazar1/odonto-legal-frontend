import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CasesService } from '../../../services/cases.service';
import { CaseDTO } from '../../../shared/models/case-model';
import Swal from 'sweetalert2';
import { ToastAlert } from '../../../helpers/toast-alert';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-cases',
  templateUrl: './list-cases.component.html',
  styleUrl: './list-cases.component.scss'
})
export class ListCasesComponent {
  statusList = ['Em andamento', 'Finalizado', 'Arquivado'];
  searchTerm = '';
  casos: CaseDTO[] = [];
  filteredCasos = [...this.casos];
  paginatedCasos: CaseDTO[] = [...this.casos];
  currentPage = 1;
  itemsPerPage = 6;
  toast: ToastAlert;

  showFinalizeModal = false;
  selectedCase: CaseDTO | null = null;
  finalizeForm: FormGroup;

  constructor(private router: Router, private casesService: CasesService, private fb: FormBuilder) {
    this.fetchCases();
    this.toast = new ToastAlert();

    this.finalizeForm = this.fb.group({
      summary: ['', Validators.required],
      notes: ['', Validators.required]
    });
  }

  get caseSelected() {
    return this.selectedCase;
  }

  fetchCases(page = 1, search = '') {
    this.casesService.fetch(page, this.itemsPerPage, search).subscribe({
      next: (response) => {
        this.casos = response.data;
        this.casos.map(caso => {
          caso.originalStatus = caso.status;
        });
        this.filteredCasos = [...this.casos];
        this.currentPage = response.meta.currentPage;
        this.paginate();
      },
      error: (err) => {
        const _defaultMessage = 'não foi possível carregar a lista de casos.';
        if(err && err?.error && err?.error?.message){
          this.toast.showError(err?.error?.message ?? _defaultMessage);
        }else{
          this.toast.showError(_defaultMessage);
        }
      }
    });
  }

  get totalPages(): number {
    return Math.ceil(this.filteredCasos.length / this.itemsPerPage);
  }

  get totalPagesArray(): number[] {
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }

  onSearch() {
    const term = this.searchTerm.toLowerCase();
    this.filteredCasos = this.casos.filter(c =>
      c.title.toLowerCase().includes(term) ||
      c.description.toLowerCase().includes(term) ||
      c.status.toLowerCase().includes(term) ||
      c.peritoPrincipal?.name.toLowerCase().includes(term) || 
      (c.openedAt && new Date(c.openedAt).toLocaleDateString().includes(term)) ||
      (c.caseDate && new Date(c.caseDate).toLocaleDateString().includes(term)) ||
      (c.closedAt && new Date(c.closedAt).toLocaleDateString().includes(term))
    );
    this.currentPage = 1;
    this.paginate();
  }

  editCase(caso: CaseDTO): void {
    this.router.navigate(['/home/cases/edit', caso.id]);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.paginate();
  }

  paginate() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedCasos = this.filteredCasos.slice(start, end);
  }

  openModal(caso: CaseDTO) {
    this.selectedCase = caso;
    this.showFinalizeModal = true;
    this.finalizeForm.reset();
  }

  closeModal() {
    this.showFinalizeModal = false;
    this.selectedCase = null;
    this.finalizeForm.reset();
  }
   

  ngOnInit() {
    this.filteredCasos = [...this.casos];
    this.paginate();
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Finalizado': return 'success';
      case 'Arquivado': return 'warning';
      default: return 'info';
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'Finalizado': return 'checkmark-circle-2-outline';
      case 'Arquivado': return 'archive-outline';
      default: return 'clock-outline';
    }
  }

  getStatusClass(status: string): string {
    return this.getStatusColor(status);
  }

  onStatusChange(caso: CaseDTO, novoStatus: string) {
    if (novoStatus === 'Finalizado') {
      this.openModal(caso);
      caso.status = caso.originalStatus;
    } else if (novoStatus === 'Arquivado') {
      Swal.fire({
        title: caso?.title,
        text: 'Essa ação irá arquivar o caso de forma permanente.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sim, arquivar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.casesService.archive(caso?.id, { reason: '' }).subscribe({
            next: () => {
              Swal.fire('Arquivado!', 'O caso foi arquivado com sucesso.', 'success');
              this.fetchCases();
            },
            error: (err) => {
              const _defaultMessage = 'não foi possível arquivar o caso.';
              this.toast.showError(err?.error?.message ?? _defaultMessage);
            }
          });
        }
        else{
          caso.status = caso.originalStatus;
        }
      });
    } else {
      this.closeModal();
    }
  }
  

  confirmFinalizeCase() {
    if (this.finalizeForm.invalid || !this.selectedCase) return;
  
    const payload = {
      summary: this.finalizeForm.value.summary,
      notes: this.finalizeForm.value.notes,
    };
  
    this.casesService.finalize(this.selectedCase.id, payload).subscribe({
      next: () => {
        this.toast.showSuccess('Caso finalizado e dossiê gerado com sucesso.');
        this.closeModal();
        this.fetchCases(); // Recarrega a lista
      },
      error: (err) => {
        const _defaultMessage = 'Erro ao finalizar o caso.';
        this.toast.showError(err?.error?.message ?? _defaultMessage);
      }
    });
  }

  cancelConfirmCase(){
    this.fetchCases();
    this.closeModal();
  }

  redirectToDetails(caso: any){
    this.router.navigate(['/home/cases/details', caso?.id]);
  }

  deleteCase(caseObj: CaseDTO) {
    Swal.fire({
      title: caseObj?.title,
      text: 'Essa ação irá excluir o caso de forma permanente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.casesService.delete(caseObj.id).subscribe({
          next: () => {
            Swal.fire('Excluído!', 'O caso foi removido com sucesso.', 'success');
            this.fetchCases();
          },
          error: (err) => {
            const _defaultMessage = 'não foi possível excluir o caso.';
            if(err && err?.error && err?.error?.message){
              this.toast.showError(err?.error?.message ?? _defaultMessage);
            }else{
              this.toast.showError(_defaultMessage);
            }
          }
        });
      }
    });
  }

  redirectToRegister(){
    this.router.navigate(["/home/cases/register"]);
  }
}
