import { Component } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loading-view',
  templateUrl: './loading-view.component.html',
  styleUrl: './loading-view.component.scss'
})
export class LoadingViewComponent {

  loading$: Observable<boolean>;

  constructor(private loadingService: LoadingService) {
    // Atribuição feita após a injeção estar garantida
    this.loading$ = this.loadingService.loading$;
  }
}
