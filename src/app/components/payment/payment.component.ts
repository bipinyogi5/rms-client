import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from 'src/app/service/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  orderId: string | null = null;
  pidx: string | null = null;
  paymentStatusMessage: string = "";

  constructor(
    private route: ActivatedRoute,
    private paymentService: PaymentService
  ) {}

  ngOnInit() {
    const queryParams = this.route.snapshot.queryParams;
    this.orderId = queryParams['purchase_order_id'] || null;
    this.pidx = queryParams['pidx'] || null;
    if (this.orderId && this.pidx) {
      this.paymentLookup(this.pidx, this.orderId);
    } else {
      this.paymentStatusMessage = "Missing parameters. Please check the URL.";
    }
  }

  paymentLookup(pidx: string, orderId: string) {
    this.paymentService.paymentLookup(pidx, orderId).subscribe((res: any) => {
      if (res && res.success && res.data && res.data.status === 'Completed') {
        this.paymentStatusMessage = "Payment successful";
      } else {
        this.paymentStatusMessage = "Payment failed. Please contact admin.";
      }
    });
  }
}
