import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { ComTableDataSource } from './com-table-datasource';
import { Commerce } from '../../services/fetch.interface'; 
import { Filter } from './com-table.interface'; 
import { Store } from '@ngrx/store';
import { loadCommerces } from '../../store/actions/commerce.action';

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

  commerces$!: Commerce[]

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['product_name', 'color', 'material', 'price']

  constructor(
    private store: Store<{commerces: {commerces: Commerce[]}}>
    ) {
    store.select('commerces').subscribe((commercesState: { commerces: Commerce[]}) => {
      this.commerces$ = commercesState.commerces;
    })
  }


  ngAfterViewInit(): void {

    this.store.dispatch(loadCommerces({commerces: this.commerces$}))

    //sorry about this - I don't know how to update the table
    //or get how to get a callback after data was fetched
    const wait = setInterval(() => { 
      if (this.commerces$.length !== 0) {
        this.dataSource.setData(this.commerces$);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
        clearInterval(wait);
      }
    }, 100)

  }

  applyFilter(filter: Filter) {
    this.dataSource.filter[filter.type] = filter.val
    // still don't know how to update the table without triggering a built in mat table method
    this.paginator.lastPage();
    this.paginator.firstPage();
  }

}