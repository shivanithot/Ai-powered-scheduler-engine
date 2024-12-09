import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FeatureCardComponent } from '../../components/feature-card/feature-card.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, FeatureCardComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingComponent {}
