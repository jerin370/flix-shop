import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { User } from '../services/user.service';

@Component({
  selector: 'app-user-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-netflix-dark-gray p-6 rounded-lg max-w-2xl w-full mx-4">
        <div class="flex justify-between items-start mb-4">
          <h2 class="text-2xl font-bold text-white">{{ user ? 'Edit' : 'Add' }} User</h2>
          <button 
            (click)="close.emit()"
            class="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        <form [formGroup]="userForm" (ngSubmit)="onSubmit()" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="firstName" class="block text-sm font-medium text-gray-300">First Name</label>
              <input
                id="firstName"
                type="text"
                formControlName="firstName"
                class="mt-1 block w-full rounded bg-gray-700 border-gray-600 text-white"
              >
            </div>
            <div>
              <label for="lastName" class="block text-sm font-medium text-gray-300">Last Name</label>
              <input
                id="lastName"
                type="text"
                formControlName="lastName"
                class="mt-1 block w-full rounded bg-gray-700 border-gray-600 text-white"
              >
            </div>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-300">Email</label>
            <input
              id="email"
              type="email"
              formControlName="email"
              class="mt-1 block w-full rounded bg-gray-700 border-gray-600 text-white"
            >
          </div>

          <div>
            <label for="phone" class="block text-sm font-medium text-gray-300">Phone</label>
            <input
              id="phone"
              type="tel"
              formControlName="phone"
              class="mt-1 block w-full rounded bg-gray-700 border-gray-600 text-white"
            >
          </div>

          <div>
            <label for="image" class="block text-sm font-medium text-gray-300">Image URL</label>
            <input
              id="image"
              type="url"
              formControlName="image"
              class="mt-1 block w-full rounded bg-gray-700 border-gray-600 text-white"
            >
          </div>

          <div class="flex justify-end space-x-3">
            <button
              type="button"
              (click)="close.emit()"
              class="px-4 py-2 text-sm text-gray-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              [disabled]="!userForm.valid"
              class="px-4 py-2 text-sm text-white bg-netflix-red rounded hover:bg-[#f40612] disabled:opacity-50"
            >
              {{ user ? 'Update' : 'Add' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class UserModalComponent implements OnInit {
  @Input() user: User | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Partial<User>>();

  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (this.user) {
      this.userForm.patchValue(this.user);
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.save.emit(this.userForm.value);
    }
  }
}