import { Component, OnInit } from '@angular/core';
import { SalesService } from 'src/app/services/sales.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  user:any;
  data:any;

  constructor(public sellService: SalesService) {
    this.user = JSON.parse(localStorage.getItem('userLog')|| '{}');
  }

  ngOnInit(): void {
    this.data = this.sellService.getMySales(this.user.id).subscribe(
      data => {
        console.log(data);
      });
  }

}
