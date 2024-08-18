import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {
  constructor(private route: ActivatedRoute) { }
  url: any
  ngOnInit(): void {
    const requestedUrl = this.route.snapshot.url.join('/');
    this.url = requestedUrl
    console.log(`Requested URL not found: ${requestedUrl}`);
  }
}
