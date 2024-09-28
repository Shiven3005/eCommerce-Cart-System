import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  private cartUrl = 'http://localhost:5059/api/cart';  

  constructor(private http: HttpClient) {}

  getCart(): Observable<any> {
    return this.http.get(`${this.cartUrl}`);
  }

  addToCart(product: any): Observable<any> {
    return this.http.post(`${this.cartUrl}/add`, product);
  }

  updateCart(product: any): Observable<any> {
    return this.http.put(`${this.cartUrl}/update`, product);
  }

  removeFromCart(productId: number): Observable<any> {
    return this.http.delete(`${this.cartUrl}/remove/${productId}`);
  }

  removeAllFromCart(): Observable<any> {
    return this.http.delete(`${this.cartUrl}/clear`);
  }
}
