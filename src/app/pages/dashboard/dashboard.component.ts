import { Component } from '@angular/core';

@Component({
  selector: 'dashboard',
  styleUrls: ['./dashboard.scss'],
  templateUrl: './dashboard.html'
})
export class Dashboard {
  public items = [];

  constructor() {
    this.items = [
      {
        id: 1,
        name: 'Test 1',
        manager: {
          id: 1,
          firstName: "string",
          lastName: "string",
          email: "string",
        },
        services: [
          {
            mappingId: 1,
            id: 1,
            name: 'string 1',
            image: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Vanamo_Logo.png'
          },
          {
            mappingId: 2,
            id: 2,
            name: 'string 2',
            image: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Vanamo_Logo.png'
          }
        ]
      },
      {
        id: 2,
        name: 'Test 1',
        services: [
          {
            mappingId: 1,
            id: 1,
            name: 'string 1',
            image: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Vanamo_Logo.png'
          },
          {
            mappingId: 2,
            id: 2,
            name: 'string 2',
            image: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Vanamo_Logo.png'
          }
        ]
      }
    ]
  }

}
