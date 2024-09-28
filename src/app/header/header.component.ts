import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { CartServiceService } from '../service/cart-service.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

cartItem: number = 0;

  constructor(private auth: AuthService, private cartService: CartServiceService) {
    this.auth.cartSubject.subscribe((data: any) => {
      this.cartItem = data;
    });
  }

  ngOnInit() {
    this.cartItemFunc();
  }


// Function to get the number of items in the cart by calling the CartAPI  
  cartItemFunc() {
    this.cartService.getCart().subscribe((data: any) => {
      this.cartItem = data.length;
    });
  }
}
