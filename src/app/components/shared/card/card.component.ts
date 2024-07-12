import {Component, Input} from '@angular/core';
import {PostModel} from "../../../models/post.model";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() public post: PostModel;

  public isActivePanel: boolean;

  public togglePanel(isActive: boolean) {
    this.isActivePanel = isActive;
  }
}
