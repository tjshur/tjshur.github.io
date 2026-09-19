export class User {
  email: string;
  name: string;
  role: 'admin' | 'editor';

  constructor() {
    this.email = '';
    this.name = '';
    this.role = 'editor';
  }
}