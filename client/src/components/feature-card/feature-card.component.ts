import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-feature-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterLink],
  templateUrl: './feature-card.component.html',
  styleUrl: './feature-card.component.scss',
})
export class FeatureCardComponent {
  @Input() heading: string = '';
  @Input() content: string = '';
  @Input() cta: string = '';
  @Input() ctaUrl: string = '';
  @Input() image: string = '';
}
