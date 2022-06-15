import { ActivatedRoute, Router } from '@angular/router';
import { Product } from './../product.model';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) { }
  product: Product = {
    name: '',
    price: 0
  }
  
  ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id')
  this.productService.readById(id!).subscribe(product => {
    this.product = product
  })
  }

  updateProcuct(): void {
    this.productService.update(this.product).subscribe(() => {
      this.productService.showMessage("Produto editado com sucesso!")
      this.router.navigate(['/products'])
    })
  }
  
  cancel(): void {
    this.router.navigate(['/products'])
  }

}
