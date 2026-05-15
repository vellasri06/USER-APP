import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { registerLocaleData } from '@angular/common';

import localeFr from '@angular/common/locales/fr';
import localeDe from '@angular/common/locales/de';
import localeEnIN from '@angular/common/locales/en-IN';

registerLocaleData(localeFr);
registerLocaleData(localeDe);
registerLocaleData(localeEnIN);
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  editindex = -1;
  loading = true;
  searchText = '';
  showPopup = false;
  selectedUser: any = null;
  showUserPopup = false;
  popupMessage = '';
  actionType = '';
  selectedIndex = -1;
  gotoPageNumber: number = 1;
  currentPage = 1;
  itemsPerPage = 5;
  filterDistance = '';
  asc = true;
  sortCol: string = '';
  sortDir: 'asc' | 'desc' = 'asc';
  filterGender = '';
  filterStatus = '';
  jumpPage = 1;
  lastDeletedUser: any = null;
  lastDeletedIndex: number = -1;
  showUndo = false;
  bulkCount: number = 0;
  undoTimer: any;
  selectedLocale = 'en-IN';
  constructor(public sc: UserService, public r: Router) { }

  ngOnInit() {
    this.loading = true;
    this.sc.loadData();
    setTimeout(() => { this.loading = false; }, 900);
  }
  viewUser(user: any) {
    this.selectedUser = user;
    this.showUserPopup = true;
  }

  closeUserPopup() {
    this.showUserPopup = false;
  }
  sort() {
    this.loading = true;
    this.sc.students.sort((a: any, b: any) =>
      this.asc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
    setTimeout(() => { this.loading = false; }, 500);
    this.asc = !this.asc;
  }
  sortBy(col: string) {
    if (this.sortCol === col) {
      this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortCol = col;
      this.sortDir = 'asc';
    }
    this.currentPage = 1;
  }
  getSortIcon(col: string): string {
    if (this.sortCol !== col) return '↕';
    return this.sortDir === 'asc' ? '≣↑' : '≣↓';
  }
  resetFilters() {
    this.searchText = '';
    this.filterGender = '';
    this.filterStatus = '';
    this.filterDistance = '';
    this.sortCol = '';
    this.sortDir = 'asc';
    this.currentPage = 1;
  }
  get filteredStudents(): any[] {
    let list = this.sc.students.filter((u: any) => {
      const matchSearch =
        u.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        u.city.toLowerCase().includes(this.searchText.toLowerCase());
      const matchGender =
        !this.filterGender ||
        u.gender?.toLowerCase() === this.filterGender.toLowerCase();
      const matchStatus =
        this.filterStatus === '' ||
        String(u.working) === this.filterStatus;
      const dist = parseFloat(u.distance) / 1000;
      const matchDistance =
        !this.filterDistance ||
        (this.filterDistance === 'near' && dist <= 10) ||
        (this.filterDistance === 'far' && dist > 10);

      return matchSearch && matchGender && matchStatus && matchDistance;
    });
    if (this.sortCol) {
      list = [...list].sort((a: any, b: any) => {
        let av = a[this.sortCol];
        let bv = b[this.sortCol];

        if (typeof av === 'string') av = av.toLowerCase();
        if (typeof bv === 'string') bv = bv.toLowerCase();
        if (typeof av === 'boolean') av = av ? 1 : 0;
        if (typeof bv === 'boolean') bv = bv ? 1 : 0;

        if (av < bv) return this.sortDir === 'asc' ? -1 : 1;
        if (av > bv) return this.sortDir === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return list;
  }
  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredStudents.length / this.itemsPerPage));
  }
  get paginatedItems(): any[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredStudents.slice(start, start + this.itemsPerPage);
  }
  get pageNumbers(): (number | string)[] {
    const total = this.totalPages;
    const cur = this.currentPage;
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    const pages: (number | string)[] = [1];
    if (cur > 3) pages.push('...');
    for (let p = Math.max(2, cur - 1); p <= Math.min(total - 1, cur + 1); p++) {
      pages.push(p);
    }
    if (cur < total - 2) pages.push('...');
    pages.push(total);

    return pages;
  }
  goToPage(page: number | string) {
    const p = Number(page);
    if (p >= 1 && p <= this.totalPages) {
      this.currentPage = p;
      this.jumpPage = p;
    }
  }
  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }
  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }
  getActualIndex(i: number): number {
    return (this.currentPage - 1) * this.itemsPerPage + i;
  }
  add1() {
    this.popupMessage = 'Do you want to add a new user?';
    this.actionType = 'add';
    this.showPopup = true;
  }
  edit(user: any) {
    const index = this.sc.students.indexOf(user);
    this.popupMessage = `Do you want to edit the ${user.name} ?`;
    this.actionType = 'edit';
    this.selectedIndex = index;
    this.showPopup = true;
  }
  delete(user: any) {
    const index = this.sc.students.indexOf(user);
    this.popupMessage = `Are you sure you want to delete the ${user.name} ?`;
    this.actionType = 'delete';
    this.selectedIndex = index;
    this.showPopup = true;
  }

  onConfirm() {
    if (this.actionType === 'add') {
      this.sc.addLog('Opening Add User form');
      this.r.navigate(['adduser']);
      this.sc.savedata();
    }
    if (this.actionType === 'edit') {
      const name = this.sc.students[this.selectedIndex]?.name;
      this.sc.addLog(`Editing ${name}`);
      this.sc.currentStudent = this.sc.students[this.selectedIndex];
      this.editindex = this.selectedIndex;
      this.r.navigate(['adduser']);
    }
    if (this.actionType === 'delete') {
      const user = this.sc.students[this.selectedIndex];
      this.lastDeletedUser = { ...user };
      this.lastDeletedIndex = this.selectedIndex;
      this.sc.addLog(`Deleted ${user.name}`);
      this.loading = true;
      this.sc.delete(this.selectedIndex);
      setTimeout(() => { this.loading = false; }, 500);
      this.showUndo = true;
      clearTimeout(this.undoTimer);
      this.undoTimer = setTimeout(() => {
        this.showUndo = false;
        this.lastDeletedUser = null;
      }, 5000);
    }
    if (this.actionType === 'bulkDelete') {
      const selectedUsers = this.sc.students.filter(u => u.selected);
      selectedUsers.forEach(user => {
        this.sc.addLog(`Deleted ${user.name}`);
      });
      this.sc.students = this.sc.students.filter(u => !u.selected);
      this.sc.savedata()
    }
    this.showPopup = false;
  }
  onCancel() { this.showPopup = false; }
  undoDelete() {
    if (this.lastDeletedUser) {
      this.sc.students.splice(this.lastDeletedIndex, 0, this.lastDeletedUser);
      this.sc.addLog(`Restored ${this.lastDeletedUser.name}`);
      this.sc.savedata();
      this.showUndo = false;
      this.lastDeletedUser = null;
    }
  }
  toggleStatus(user: any) {
    user.working = !user.working;

    const status = user.working ? 'Working' : 'Not Working';
    this.sc.addLog(`${user.name} marked as ${status}`);

    this.sc.savedata();
  }
  refreshData() {
    this.sc.loadData();
    this.loading = true;
    this.searchText = '';
    this.filterGender = '';
    this.filterStatus = '';
    this.filterDistance = '';
    this.sortCol = '';
    this.sortDir = 'asc';
    this.currentPage = 1;
    setTimeout(() => {
      this.loading = false;
    }, 1000)
  }
  exportCSV() {
    const data = this.filteredStudents;

    const csv = [
      ['Name', 'City', 'Dob', 'Distance', 'Gender', 'Status'],
      ...data.map(u => [
        u.name,
        u.city,
        new Date(u.dob).toLocaleDateString(),
        u.distance,
        u.gender,
        u.working ? 'Working' : 'Not Working'
      ])
    ];

    const blob = new Blob([csv.map(e => e.join(',')).join('\n')], {
      type: 'text/csv'
    });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'users.csv';
    a.click();
  }
  confirmBulkDelete() {
    const selectedUsers = this.sc.students.filter(u => u.selected);
    this.bulkCount = selectedUsers.length;
    this.popupMessage = `Are you sure you want to delete ${this.bulkCount} user(s)?`;
    this.actionType = 'bulkDelete';
    
    this.sc.savedata()
    this.showPopup = true;
    this.showUndo = true;
    this.undoTimer = setTimeout(() => {
        this.showUndo = false;
        this.lastDeletedUser = null;
      }, 5000);
  }
  selectAll(event: any) {
    const checked = event.target.checked;
    this.paginatedItems.forEach(u => {
      u.selected = checked;
    });
  }
  goToInputPage() {
    if (!this.gotoPageNumber) return;

    let page = Number(this.gotoPageNumber);
    if (page < 1) page = 1;
    if (page > this.totalPages) page = this.totalPages;

    this.goToPage(page);
  }
  logout(){
    localStorage.removeItem('loggedUser');
    this.r.navigate(['login'])
  }
}