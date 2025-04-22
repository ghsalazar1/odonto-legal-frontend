import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CasesService } from '../../../services/cases.service';
import { UserService } from '../../../services/user.services';
import { ToastAlert } from '../../../helpers/toast-alert';
import { Environment } from '../../../../environments/environment';

@Component({
  selector: 'app-edit-cases',
  templateUrl: './edit-cases.component.html',
  styleUrl: './edit-cases.component.scss'
})
export class EditCasesComponent implements OnInit {
  form: any = null;
  caseId: string = '';
  users: any[] = [];
  participantFilter: string = '';
  today: string = new Date().toISOString().split('T')[0];
  isReadonly = false;
  toast: ToastAlert;
  loading = false;
  originalExistingEvidences: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private casesService: CasesService,
    private userService: UserService,
    private router: Router
  ) {
    this.toast = new ToastAlert();
  }

  ngOnInit(): void {
    this.caseId = this.route.snapshot.paramMap.get('id') ?? '';
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAll().subscribe((res) => {
      this.users = res.data.filter((u: any) => u.role.description !== 'Administrador');
      this.loadCase();
    });
  }

  getEvidenceUrl(file: any): string {
    // Em produção, usa signedUrl (Supabase privado)
    if (Environment.isProduction && file.signedUrl) {
      return file.signedUrl;
    }
  
    // Em dev/local, usa contentUrl direto (pasta local)
    return file.contentUrl;
  }

  loadCase() {
    this.casesService.getById(this.caseId).subscribe({
      next: (res) => {
        const data = res.data;
        this.form = {
          title: data.title,
          description: data.description,
          status: data.status,
          caseDate: data.caseDate?.split('T')[0],
          openedAt: data.openedAt?.split('T')[0],
          closedAt: data.closedAt ? data.closedAt.split('T')[0] : '',
          peritoPrincipalId: data?.peritoPrincipal?.id ?? '',
          participants: data.participants?.map((p: any) => p.id) ?? [],
          existingEvidences: data.existingEvidences ?? [],
          newEvidences: []
        };
  
        this.originalExistingEvidences = [...data.existingEvidences];
  
        if (data.status !== 'Em andamento') {
          this.isReadonly = true;
          this.toast.showWarnig('Este caso não pode mais ser editado pois não está em andamento.');
        }
      },
      error: (err) => {
        const _defaultMessage = 'não foi possível carregar a lista de casos.';
        if(err && err?.error && err?.error?.message){
          this.toast.showError(err?.error?.message ?? _defaultMessage);
        }else{
          this.toast.showError(_defaultMessage);
        }
        this.router.navigate(['/home/cases']);
      }
    });
  }

  extractFilename(url: string): string {
    return url.split('/').pop() ?? '';
  }

  removeExistingEvidence(file: any) {
    this.form.existingEvidences = this.form.existingEvidences.filter((f: any) => f !== file);
  }

  removeNewEvidence(file: any) {
    this.form.newEvidences = this.form.newEvidences.filter((f: any) => f !== file);
  }

  toggleParticipant(userId: string) {
    const idx = this.form.participants.indexOf(userId);
    if (idx > -1) this.form.participants.splice(idx, 1);
    else this.form.participants.push(userId);
  }

  filteredParticipants() {
    const filter = this.participantFilter.trim().toLowerCase();
    return this.users
      .filter(user => user.id !== this.form.peritoPrincipalId)
      .filter(user => user.name.toLowerCase().includes(filter));
  }
  

  availablePeritos() {
    return this.users.filter(u => !this.form.participants.includes(u.id));
  }

  capturePhoto() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment';
    input.onchange = (event: any) => this.onFileSelected(event);
    input.click();
  }

  onFileSelected(event: any) {
    const files = event.target.files;

    for (let file of files) {
      if (file.size > 1536 * 1024) {
        this.toast.showWarnig(`O arquivo "${file.name}" excede o limite de 1.5mb.`);
        continue;
      }

      const evidence: any = {
        name: file.name,
        type: file.type,
        file: file,
        preview: ''
      };

      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          evidence.preview = e.target.result;
          this.form.newEvidences.push(evidence);
        };
        reader.readAsDataURL(file);
      } else {
        this.form.newEvidences.push(evidence);
      }
    }
  }

  submitEditCase() {
    if (!this.form.title || !this.form.description || !this.form.caseDate || !this.form.openedAt) {
      this.toast.showWarnig('Preencha todos os campos obrigatórios.');
      return;
    }

    if (!this.form.peritoPrincipalId && this.form.participants.length === 0) {
      this.toast.showWarnig('Adicione ao menos um participante ou perito.');
      return;
    }

    if (this.form.existingEvidences.length + this.form.newEvidences.length === 0) {
      this.toast.showWarnig('É necessário pelo menos uma evidência.');
      return;
    }

    const evidencesToRemove = this.originalExistingEvidences
    .filter(original => !this.form.existingEvidences.some((ev: { id: any; }) => ev.id === original.id))
    .map(ev => ev.id);

    const formData = new FormData();  
    formData.append('title', this.form.title);
    formData.append('description', this.form.description);
    formData.append('status', this.form.status);
    formData.append('openedAt', this.form.openedAt);
    if (this.form.closedAt) formData.append('closedAt', this.form.closedAt);
    formData.append('caseDate', this.form.caseDate);
    formData.append('peritoPrincipalId', this.form.peritoPrincipalId);

    this.form.participants.forEach((id: string) => {
      formData.append('participants', id);
    });

    this.form.existingEvidences.forEach((ev: any) => {
      formData.append('existingEvidences', ev.contentUrl);
    });

    this.form.newEvidences.forEach((file: any, index: number) => {
      formData.append(`evidences[${index}]`, file.file, file.name);
    });

    evidencesToRemove.forEach((id: string) => {
      formData.append('evidencesToRemove', id);
    });

    this.loading = true;
    this.casesService.update(this.caseId, formData).subscribe({
      next: () => {
        this.toast.showSuccess('Caso atualizado com sucesso!');
        this.router.navigate(['/home/cases']);
      },
      error: (err) => {
        const _defaultMessage = 'não foi possível carregar a lista de casos.';
        if(err && err?.error && err?.error?.message){
          this.toast.showError(err?.error?.message ?? _defaultMessage);
        }else{
          this.toast.showError(_defaultMessage);
        }
        this.loading = false;
      }
    });
  }
}
