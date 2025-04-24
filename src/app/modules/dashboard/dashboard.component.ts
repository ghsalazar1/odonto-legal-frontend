import { Component } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
    totalCases = 25;
  finishedCases = 12;
  archivedCases = 5;
  reports = 10;

  evidencesSummary = {
    IMAGE: 15,
    AUDIO: 8,
    PDF: 6,
    TEXT: 10,
    OTHER: 3
  };
}
