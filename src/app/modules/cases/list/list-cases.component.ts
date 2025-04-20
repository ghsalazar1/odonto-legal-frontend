import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-cases',
  templateUrl: './list-cases.component.html',
  styleUrl: './list-cases.component.scss'
})
export class ListCasesComponent {
  statusList = ['Em andamento', 'Finalizado', 'Arquivado'];
  searchTerm = '';
  casos = [
    {
      title: 'Identificação de Vítima 001',
      description: 'Análise de radiografia e histórico odontológico.',
      status: 'Em andamento',
      openedAt: new Date('2024-04-01'),
      closedAt: null
    },
    {
      title: 'Exame Criminal 002',
      description: 'Coleta de evidências em cena de crime envolvendo vítima com implantes.',
      status: 'Finalizado',
      openedAt: new Date('2024-03-15'),
      closedAt: new Date('2024-03-25')
    },
    {
      title: 'Acidente Veicular 003',
      description: 'Análise de arcada dentária para identificação em colisão frontal.',
      status: 'Arquivado',
      openedAt: new Date('2024-02-10'),
      closedAt: new Date('2024-02-25')
    }
  ];

  filteredCasos = [...this.casos];
  paginatedCasos = [...this.casos];
  currentPage = 1;
  itemsPerPage = 6;

  constructor(private router: Router) {
    
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
      (c.openedAt && new Date(c.openedAt).toLocaleDateString().includes(term)) ||
      (c.closedAt && new Date(c.closedAt).toLocaleDateString().includes(term))
    );
    this.currentPage = 1;
    this.paginate();
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

  onStatusChange(caso: any) {
    console.log('Status atualizado:', caso);
  }

  redirectToRegister(){
    this.router.navigate(["/home/cases/register"]);
  }
}
