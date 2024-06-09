import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { CommonModule } from '@angular/common';
import { FilterChipsComponent } from './filter-chips/filter-chips.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/layout/material/material.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { SearchbarComponent } from './search/searchbar.component';
import { TranslateModule } from '@ngx-translate/core';
import { ResultListComponent } from './search-result/result-list/result-list.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { ListItemDetailsComponent } from './search-result/list-item-details/list-item-details.component';
import { ListItemDetailsSectionsComponent } from './search-result/list-item-details/list-item-details-sections/list-item-details-sections.component';
import { SearchFilterComponent } from './search-filter/search-filter.component';
const SHARED_DECLARATIONS = [
  SearchFilterComponent,
  SearchbarComponent,
  FilterChipsComponent,
  ButtonComponent,
  ResultListComponent,
  ListItemDetailsComponent,
  SearchResultComponent,
];

@NgModule({
  declarations: [...SHARED_DECLARATIONS, ListItemDetailsSectionsComponent, SearchFilterComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MatTooltipModule,
  ],
  exports: [...SHARED_DECLARATIONS],
})
export class SharedComponentsModule {}
