import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CasesService } from '../../../services/cases.service';
import { UserService } from '../../../services/user.services';
import { CaseForm } from '../../../models/case-model';

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

  constructor(
    private casesService: CasesService,
    private userService: UserService,
    private sanitizer: DomSanitizer
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
  }

  loadUsers() {
    this.userService.getAll().subscribe((response) => {
      this.users = response.data
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
    if (!filter) {
      // Se vazio, mostra os 4 primeiros (ex: os últimos logados)
      return this.users.slice(0, 4);
    }
  
    return this.users.filter(user =>
      user.name.toLowerCase().includes(filter)
    );
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
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.form.evidences.push({
          name: file.name,
          type: file.type,
          file: file,
          preview: e.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  }

  submitCase() {
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
      next: () => alert('Caso criado com sucesso!'),
      error: err => console.error('Erro ao criar caso:', err)
    });
  }
  
}
