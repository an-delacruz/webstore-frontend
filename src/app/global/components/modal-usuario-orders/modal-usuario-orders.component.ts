import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../../store/services/orders.service';
import * as moment from 'moment';
import { convertStringToPDF } from 'src/app/store/helpers/convertStringToPDF';
import { Loading, Notify } from 'notiflix';

@Component({
  selector: 'app-modal-usuario-orders',
  templateUrl: './modal-usuario-orders.component.html',
  styleUrls: ['./modal-usuario-orders.component.css'],
})
export class ModalUsuarioOrdersComponent implements OnInit {
  constructor(private ordersService: OrdersService) {}
  orders: any[] = [];
  ngOnInit() {
    Loading.circle('Loading Orders...', {
      svgColor: '#5c2b8a',
    });
    this.getOrders();
  }

  getOrders() {
    this.ordersService.getUserOrders().subscribe({
      next: (resp: any) => {
        if (resp) {
          this.orders = resp.results;
          Loading.remove();
        }
      },
      error: (err: any) => {
        Notify.failure('Error, Could Not Get Orders', {
          position: 'center-bottom',
        });
        Loading.remove();
      },
    });
  }
  formatDate(date: string) {
    return moment(date).format('DD/MM/YYYY');
  }
  getOrderPDF(idOrder: number) {
    Loading.circle('Generating PDF...', {
      svgColor: '#5c2b8a',
    });
    this.ordersService.generatePDFOrder(idOrder).subscribe({
      next: (resp: any) => {
        const dataurl = `data:application/pdf;base64,${resp}`;
        const pdf = convertStringToPDF(dataurl);
        const url = window.URL.createObjectURL(pdf);
        window.open(url, '_blank');
        Loading.remove();
      },
    });
  }
  cancelOrder(idOrder: number) {
    Loading.circle('Cancelling Order...', {
      svgColor: '#5c2b8a',
    });
    this.ordersService.cancelOrder(idOrder).subscribe({
      next: (resp: any) => {
        this.getOrders();
        Loading.remove();
      },
      error: (err: any) => {
        Notify.failure('Error, Could Not Cancel The Order', {
          position: 'center-bottom',
        });
        Loading.remove();
      },
    });
  }
}
