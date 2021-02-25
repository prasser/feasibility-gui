import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SearchTextOverlayContentComponent } from './search-text-overlay-content.component'
import { SearchTextHeaderComponent } from '../search-text-header/search-text-header.component'
import { TranslateModule } from '@ngx-translate/core'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from '../../../../../../layout/material/material.module'
import { ComponentType, OverlayModule } from '@angular/cdk/overlay'
import { FormsModule } from '@angular/forms'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { Observable, of } from 'rxjs'
import { CategoryEntry, TerminologyEntry } from '../../../../model/api/terminology/terminology'
import { BackendService } from '../../../../service/backend.service'
import { EventEmitter, TemplateRef } from '@angular/core'
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog'
import { SearchTextTermEntryComponent } from '../search-text-term-entry/search-text-term-entry.component'
import { EnterCriterionListComponent } from '../../edit/enter-criterion-list/enter-criterion-list.component'

describe('SerachTextOverlayContentComponent', () => {
  let component: SearchTextOverlayContentComponent
  let fixture: ComponentFixture<SearchTextOverlayContentComponent>

  let backendService
  let dialog
  let closeOverlay

  beforeEach(async () => {
    backendService = {
      getCategories(): Observable<Array<CategoryEntry>> {
        return of([new CategoryEntry()])
      },
    } as BackendService

    // noinspection JSUnusedLocalSymbols
    dialog = {
      open<T, D = any, R = any>(
        componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
        config?: MatDialogConfig<D>
      ): MatDialogRef<T, R> {
        return {} as MatDialogRef<any>
      },
    } as MatDialog

    closeOverlay = {
      emit(): void {
        return
      },
    } as EventEmitter<void>

    await TestBed.configureTestingModule({
      declarations: [
        SearchTextOverlayContentComponent,
        SearchTextHeaderComponent,
        SearchTextTermEntryComponent,
      ],
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        HttpClientTestingModule,
        OverlayModule,
        FormsModule,
        FlexLayoutModule,
        FontAwesomeTestingModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        {
          provide: BackendService,
          useValue: backendService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTextOverlayContentComponent)
    component = fixture.componentInstance
    component.critType = 'inclusion'

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should fire choose event', () => {
    spyOn(component.closeOverlay, 'emit')
    spyOn(component.dialog, 'open')
    const termEntry = new TerminologyEntry()
    const dialogConfig = new MatDialogConfig()

    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.data = {
      termEntryList: [termEntry],
      groupIndex: 0,
      critType: 'inclusion',
    }

    component.openDetailsPopUp(termEntry)
    expect(component.closeOverlay.emit).toHaveBeenCalledWith('text')
    expect(component.dialog.open).toHaveBeenCalledWith(EnterCriterionListComponent, dialogConfig)
  })
})
