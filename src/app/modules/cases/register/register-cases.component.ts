import { Component } from '@angular/core';
import { CasesService } from '../../../services/cases.service';
import { UserService } from '../../../services/user.services';
import { CaseForm } from '../../../models/case-model';
import { ToastAlert } from '../../../helpers/toast-alert';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-cases',
  templateUrl: './register-cases.component.html',
  styleUrl: './register-cases.component.scss'
})
export class RegisterCasesComponent {

  form: CaseForm;
  users: any[] = [];
  participantFilter: any;
  loading: boolean = false;
  today: string = new Date().toISOString().split('T')[0];
  toast: ToastAlert;

  constructor(
    private casesService: CasesService,
    private userService: UserService,
    private router: Router
  ) {
    this.loadUsers();
    this.form = {
      title: '',
      description: '',
      status: 'Em andamento',
      caseDate: '',
      openedAt: new Date().toISOString().split('T')[0],
      closedAt: '',
      peritoPrincipalId: '',
      participants: [] as string[],
      evidences: [] as any[]
    };  
    this.participantFilter = "";
    this.toast = new ToastAlert();
  }

  loadUsers() {
    this.userService.getAll().subscribe((response) => {
      this.users = response.data.filter((u: any) => u.role.description !== 'Administrador');
    });
  }

  toggleParticipant(userId: string) {
    const index = this.form.participants.indexOf(userId);
    if (index > -1) {
      this.form.participants.splice(index, 1);
    } else {
      this.form.participants.push(userId);
    }
  }

  filteredParticipants() {
    const filter = this.participantFilter.trim().toLowerCase();
    return this.users
      .filter(user => user.id !== this.form.peritoPrincipalId)
      .filter(user => user.name.toLowerCase().includes(filter))
      .slice(0, filter ? 100 : 4);
  }

  availablePeritos() {
    return this.users.filter(user => !this.form.participants.includes(user.id));
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
      if (file.size > 900 * 1024) {
        this.toast.showWarnig(`O arquivo "${file.name}" excede o limite de 900KB.`);
        continue;
      }

      const isImage = file.type.startsWith('image/');
      const isPdf = file.type === 'application/pdf';
      const isAudio = file.type.startsWith('audio/');

      const evidence: any = {
        name: file.name,
        type: file.type,
        file: file,
        preview: ''
      };

      if (isImage) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          evidence.preview = e.target.result;
          this.form.evidences.push(evidence);
        };
        reader.readAsDataURL(file);
      } else {
        if (isPdf) evidence.icon = 'file-text-outline';
        else if (isAudio) evidence.icon = 'music-outline';
        else evidence.icon = 'file-outline';
        this.form.evidences.push(evidence);
      }
    }
  }

  submitCase() {
    const today = new Date().toISOString().split('T')[0];

    if (!this.form.title.trim() || !this.form.description.trim() || !this.form.caseDate || !this.form.openedAt) {
      this.toast.showWarnig('Preencha todos os campos obrigatórios.');
      return;
    }

    if (this.form.caseDate > today || this.form.openedAt > today) {
      this.toast.showWarnig('As datas não podem ser maiores que a data atual.');
      return;
    }

    if (!this.form.peritoPrincipalId && this.form.participants.length === 0) {
      this.toast.showWarnig('Selecione um participante e/ou perito principal.');
      return;
    }

    if (this.form.evidences.length === 0) {
      this.toast.showWarnig('Adicione pelo menos uma evidência.');
      return;
    }

    const formData = new FormData();
    const {
      title,
      description,
      status,
      openedAt,
      closedAt,
      caseDate,
      peritoPrincipalId,
      participants,
      evidences
    } = this.form;

    formData.append('title', title);
    formData.append('description', description);
    formData.append('status', status);
    formData.append('openedAt', openedAt);
    if (closedAt) formData.append('closedAt', closedAt);
    formData.append('caseDate', caseDate);
    formData.append('peritoPrincipalId', peritoPrincipalId);

    participants.forEach(id => formData.append('participants', id));

    evidences.forEach((evidence, index) => {
      formData.append(`evidences[${index}]`, evidence.file, evidence.name);
    });

    this.casesService.create(formData).subscribe({
      next: () => {
        this.toast.showSuccess('Caso criado com sucesso!');
        this.router.navigate(['/home/cases'])
      },
      error: (err) => {
        const _defaultMessage = 'não foi possível cadastrar o novo caso.';
        if(err && err?.error && err?.error?.message){
          this.toast.showError(err?.error?.message ?? _defaultMessage);
        }else{
          this.toast.showError(_defaultMessage);
        }
      }
    });
  }
}