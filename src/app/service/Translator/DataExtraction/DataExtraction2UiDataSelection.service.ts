import { CreateDataSelectionProfileService } from '../../DataSelection/CreateDataSelectionProfileProfile.service';
import { DataSelection } from 'src/app/model/DataSelection/DataSelection';
import { DataSelectionFilterType } from 'src/app/model/Utilities/DataSelectionFilterType';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ProfileFields } from 'src/app/model/DataSelection/Profile/Fields/ProfileFields';
import { ProfileTimeRestrictionFilter } from 'src/app/model/DataSelection/Profile/Filter/ProfileDateFilter';
import { ProfileTokenFilter } from 'src/app/model/DataSelection/Profile/Filter/ProfileTokenFilter';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';
import { UITimeRestrictionFactoryService } from '../Shared/UITimeRestrictionFactory.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class DataExtraction2UiDataSelectionService {
  constructor(
    private createDataSelection: CreateDataSelectionProfileService,
    private uITimeRestrictionFactoryService: UITimeRestrictionFactoryService
  ) {}

  /**
   * @todo Check if version is part of the dataExtraction.attributeGroups.filter.codes
   * @param dataExtraction
   */
  public translate(dataExtraction: any): Observable<DataSelection> {
    if (dataExtraction.attributeGroups?.length > 0) {
      const urls = dataExtraction.attributeGroups.map(
        (attributeGroup) => attributeGroup.groupReference
      );
      return this.createDataSelection.fetchDataSelectionProfileData(urls).pipe(
        map((dataSelectionProfiles) => {
          dataSelectionProfiles.forEach((dataSelectionProfile) => {
            const externDataSelectionProfile = dataExtraction.attributeGroups.find(
              (attributeGroup) => attributeGroup.groupReference === dataSelectionProfile.getUrl()
            );
            this.setDataSectionProfileFields(
              externDataSelectionProfile.attributes,
              dataSelectionProfile.getFields()
            );
            const profileTokenFilter = externDataSelectionProfile.filter?.map(
              (externSingleFilter) => {
                if (externSingleFilter.type === DataSelectionFilterType.TOKEN) {
                  const codeFilter = dataSelectionProfile
                    .getFilters()
                    .find(
                      (singleFilter) => singleFilter.getName() === externSingleFilter.name
                    ) as ProfileTokenFilter;
                  return new ProfileTokenFilter(
                    uuidv4(),
                    externSingleFilter.name,
                    externSingleFilter.type,
                    codeFilter.getValueSetUrls(),
                    externSingleFilter.codes.map(
                      (code) =>
                        new TerminologyCode(code.code, code.display, code.system, code.version)
                    )
                  );
                }

                if (externSingleFilter.type === DataSelectionFilterType.DATE) {
                  const timeRestriction =
                    this.uITimeRestrictionFactoryService.createTimeRestrictionForDataSelection(
                      externSingleFilter
                    );
                  return new ProfileTimeRestrictionFilter(
                    externSingleFilter.name,
                    externSingleFilter.type,
                    timeRestriction
                  );
                }
              }
            );
            dataSelectionProfile.setFilters(profileTokenFilter);
          });
          return new DataSelection(dataSelectionProfiles, uuidv4());
        })
      );
    }
  }

  private setDataSectionProfileFields(attributes: any[], fields: ProfileFields[]) {
    fields.forEach((field) => {
      const foundattribute = attributes.find(
        (attribute) => attribute.attributeRef === field.getId()
      );
      if (foundattribute) {
        field.setIsSelected(true);
        field.setIsRequired(foundattribute.mustHave);
      }
      if (field.getChildren().length > 0) {
        this.setDataSectionProfileFields(attributes, field.getChildren());
      }
    });
  }

  test = {
    display: '',
    version: 'http://json-schema.org/to-be-done/schema#',
    cohortDefinition: {
      version: 'http://to_be_decided.com/draft-1/schema#',
      display: 'Ausgewählte Merkmale',
    },
    dataExtraction: {
      attributeGroups: [
        {
          groupReference:
            'https://www.medizininformatik-initiative.de/fhir/core/modul-labor/StructureDefinition/ObservationLab',
          attributes: [
            {
              attributeRef: 'Observation.status',
              mustHave: false,
            },
            {
              attributeRef: 'Observation.category',
              mustHave: true,
            },
          ],
          filter: [
            {
              type: 'token',
              name: 'code',
              codes: [
                {
                  code: '45197-1',
                  display: 'Decanoylcarnitine (C10) [Moles/volume] in DBS',
                  system: 'http://loinc.org',
                  version: '2099',
                },
                {
                  code: '45198-9',
                  display: 'Decenoylcarnitine (C10:1) [Moles/volume] in DBS',
                  system: 'http://loinc.org',
                  version: '2099',
                },
              ],
            },
            {
              type: 'date',
              name: 'date',
              start: '2024-09-04',
            },
          ],
        },
        {
          groupReference:
            'https://www.medizininformatik-initiative.de/fhir/core/modul-labor/StructureDefinition/ServiceRequestLab',
          attributes: [
            {
              attributeRef: 'ServiceRequest.identifier',
              mustHave: false,
            },
          ],
          filter: [
            {
              type: 'date',
              name: 'date',
              start: '2024-09-04',
            },
          ],
        },
      ],
    },
  };
}
