import { Product } from './../product.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) {}
  id: string = ''
  product: Product = {name: '', price: 0}
  
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!
    this.productService.readById(this.id).subscribe(product => {
      this.product = product
    })
  }

  deleteProduct(): void {
    this.productService.delete(this.id).subscribe(() => {
      this.productService.showMessage("Produto deletado!")
      this.router.navigate(["/products"])  
    })
  }

  cancel(): void {
    this.router.navigate(["/products"])
  }
}
