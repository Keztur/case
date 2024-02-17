import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Commerce } from '../../services/fetch.interface'; 

/**
 * Data source for the ComTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ComTableDataSource extends DataSource<Commerce> {
  data: Commerce[] = [];
  dataRaw: Commerce[] = [];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;
  filter: {product_name: string, color: string, material: string}

  constructor() {
    super();
    this.filter = {product_name: '', color: '', material: ''};
  }

  //data is "inserted" from component
  setData(data: Commerce[]): void {
    this.data = data;
    this.dataRaw = data;
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Commerce[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getFilteredData(this.getPagedData(this.getSortedData([...this.data ])));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Commerce[]): Commerce[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Commerce[]): Commerce[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'product_name': return compare(a.product_name, b.product_name, isAsc);
        case 'color': return compare(a.color, b.color, isAsc);
        case 'material': return compare(a.material, b.material, isAsc);
        case 'price': return compare(+a.price, +b.price, isAsc);
        default: return 0;
      }
    });
  }

  private getFilteredData(data: Commerce[]): Commerce[] {
    let filtered = data;

    if (this.filter.product_name.length !== 0) {
      filtered = filtered.filter(el => el.product_name.toLowerCase().includes(this.filter.product_name.trim().toLowerCase()));
    }
    if (this.filter.color.length !== 0) {
      filtered = filtered.filter(el => el.color.toLowerCase().includes(this.filter.color.trim().toLowerCase()));
    } 
    if (this.filter.material.length !== 0) {
      filtered = filtered.filter(el => el.material.toLowerCase().includes(this.filter.material.trim().toLowerCase()));
    }
    return filtered;
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
