import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { CartServiceService } from '../service/cart-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

constructor(private auth: AuthService, private cartService: CartServiceService,private toastr:ToastrService) {}

// List of products displayed on the homepage
  productArray = [
    { prodId: 1, img: "assets/16.jpg", amt: 140000, name: "Iphone 16 pro", qnt: 1 },
    { prodId: 2, img: "assets/fridge.jpg", amt: 60000, name: "LG Refrigerator", qnt: 1 },
    { prodId: 3, img: "assets/machine.jpg", amt: 90000, name: "LG Machine", qnt: 1 },
    { prodId: 4, img: "assets/s22.jpg", amt: 100000, name: "S22 Ultra", qnt: 1 }
  ];

// Method to increase the quantity of a product  
  inc(prod: any) {
    if (prod.qnt != 5) {
      prod.qnt++;
    }
  }

// Method to derease the quantity of a product  
  dec(prod: any) {
    if (prod.qnt > 1) {
      prod.qnt--;
    }
  }

// Method to add the product to the cart  
  addCart(category: any) {
    this.cartService.addToCart(category).subscribe(() => {
      this.cartNumberFunc();
    });
    this.toastr.success('Item added to cart','Successfully added')
  }

  cartNumber: number = 0;
// Method to fetch the cart data and update the cart count  
  cartNumberFunc() {
    this.cartService.getCart().subscribe((data: any) => {
      this.cartNumber = data.length;
      this.auth.cartSubject.next(this.cartNumber);
    });
  }
}
