import { AuthService } from '../service/auth.service'; 
import { Component } from '@angular/core';
import { CartServiceService } from '../service/cart-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

getCartDetails: any[] = [];
  total: number = 0;

  constructor(private auth: AuthService, private cartService: CartServiceService,private toastr: ToastrService) {}

  ngOnInit() {
    this.loadCart();
  }


// This function fetches the cart items from API and stores them in getCartDetails  
  loadCart() {
    this.cartService.getCart().subscribe((data: any) => {
      this.getCartDetails = data;
      this.calculateTotal();
    });
  }

// Function to increase the quantity of a product 
  incQnt(prodId: number, qnt: number) {
    let item = this.getCartDetails.find(item => item.prodId === prodId);
    if (item && qnt < 5) {
      item.qnt++;
      this.cartService.updateCart(item).subscribe(() => this.loadCart());
    }
  }

// Function to derease the quantity of a product
  decQnt(prodId: number, qnt: number) {
    let item = this.getCartDetails.find(item => item.prodId === prodId);
    if (item && qnt > 1) {
      item.qnt--;
      this.cartService.updateCart(item).subscribe(() => this.loadCart());
    }
  }

// Function to remove a specific item from the cart
  removeItem(prodId: number) {
    this.cartService.removeFromCart(prodId).subscribe(() => this.loadCart());
    
    this.toastr.success('Item removed from cart','Removed Successfully')
  }

// Function to calculate the total price including GST
  calculateTotal() {
    // this.total = this.getCartDetails.reduce((acc, item) => acc + (item.amt * item.qnt ), 0);
    const subtotal = this.getCartDetails.reduce((acc, item) => acc + (item.amt * item.qnt), 0);
    const gst = subtotal * 0.18;
    this.total = subtotal + gst;
  }

// Function to remove all items from the cart 
  removeAll() {
    this.getCartDetails.forEach(item => this.removeItem(item.prodId));
  }

// Function to clear the entire cart at once using the API  
  clearCart() {
    this.cartService.removeAllFromCart().subscribe(() => {
      this.getCartDetails = []; 
      this.total = 0;            
      this.auth.cartSubject.next(0);  
      this.toastr.success('All items removed from cart','Cart Empty')
    });
  }
}
