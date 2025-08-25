import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  template: `
    <h2>ProfilePage</h2>
    <img src="https://via.placeholder.com/400x200.png?text=Profile+Image" 
         alt="Profile" class="img-fluid mt-3">
  `
})
export class ProfileComponent {}