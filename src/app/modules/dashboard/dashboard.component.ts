import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userCount = 0;
  activeCases = 0;
  archivedCases = 0;
  reportsCreated = 0;

  barChartData: any[] = [];
  pieChartData: any[] = [];

  view: [number, number] = [400, 300];

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Categoria';
  showYAxisLabel = true;
  yAxisLabel = 'Quantidade';

  error = false;

  colorScheme: Color = {
    name: 'custom-scheme',
    selectable: true,
    group: ScaleType.Ordinal, 
    domain: [
      '#4BCCA6',
      '#38B29D',
      '#2F9989',
      '#267F74',
      '#1E665F'
    ],
  };

  constructor(private dashboardService: DashboardService, private router: Router) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  navigateToUsers(){
    this.router.navigate(['/home/users'])
  }

  navigateToCases(){
    this.router.navigate(['/home/cases'], { queryParams: { query: 'Em andamento' } });
  }

  navigateToArchive(){
    this.router.navigate(['/home/cases'], { queryParams: { query: 'Arquivado' } });
  }

  navigateToReports(){
    this.router.navigate(['home/reports'])
  }

  private loadDashboard() {
    this.dashboardService.getDashboardSummary().subscribe({
      next: (res) => {
        if (!res.hasError && res.data) {
          this.userCount = res.data.userCount;
          this.activeCases = res.data.activeCases;
          this.archivedCases = res.data.archivedCases;
          this.reportsCreated = res.data.reportsCreated;

          this.updateCharts();
        } else {
          this.error = true;
        }
      },
      error: (err) => {
        console.error('Erro ao carregar dashboard:', err);
        this.error = true;
      }
    });
  }

  private updateCharts() {
    this.barChartData = [
      { name: 'Ativos', value: this.activeCases },
      { name: 'Arquivados', value: this.archivedCases },
      { name: 'Relatórios', value: this.reportsCreated },
    ];

    this.pieChartData = [
      { name: 'Usuários', value: this.userCount },
      { name: 'Casos', value: this.activeCases + this.archivedCases },
      { name: 'Relatórios', value: this.reportsCreated },
    ];
  }
}
