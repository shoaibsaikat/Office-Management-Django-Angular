import { Component, OnInit } from '@angular/core';

import { AssetService } from 'src/app/services/asset/asset.service';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.css']
})
export class MyListComponent implements OnInit {

  constructor(private assetService: AssetService) { }

  ngOnInit(): void {
    this.assetService.getMyAssetList();
  }

}
