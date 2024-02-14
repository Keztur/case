import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { FetchService } from '../../services/fetch.service';
import { Commerce } from '../../services/fetch.interface'; 

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  commerces: Commerce[] = [];
  displayedColumns = ['product_name', 'color', 'material', 'price']

  constructor(private fetchService: FetchService) {}

  ngOnInit(): void {
    this.fetchService.getCommerces(10).subscribe((commerces) => {
    this.commerces = commerces;
    })
  }

}
