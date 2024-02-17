import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { ComTableDataSource } from './com-table-datasource';
import { FetchService } from '../../services/fetch.service';
import { Commerce } from '../../services/fetch.interface'; 
import { Filter } from './com-table.interface'; 

@Component({
  selector: 'app-com-table',
  templateUrl: './com-table.component.html',
  styleUrl: './com-table.component.css',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule]
})
export class ComTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Commerce>;
  dataSource = new ComTableDataSource();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['product_name', 'color', 'material', 'price']

  constructor(private fetchService: FetchService) {}

  ngAfterViewInit(): void {
    this.fetchService.getCommerces(35).subscribe((commerces) => {
      this.dataSource.setData(commerces);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    })
  }


  applyFilter(filter: Filter) {
    this.dataSource.filter[filter.type] = filter.val
    //sorry about this :)
    this.paginator.lastPage();
    this.paginator.firstPage();
  }

}