import { AbstractConceptFilter } from './AbstractConceptFilter';
import { FilterTypes } from 'src/app/model/FilterTypes';
import { ReferenceCriterion } from '../../ReferenceCriterion';
import { TerminologyCode } from 'src/app/model/terminology/Terminology';

/**
 * Class representing a ReferenceFilter.
 */
export class ReferenceFilter extends AbstractConceptFilter {
  private selectedReference: ReferenceCriterion[] = [];
  private allowedReferenceUri: Array<string> = []; // Renamed to allowedReferenceUri
  private type: FilterTypes = FilterTypes.REFERENCE;

  /**
   * Creates an instance of ReferenceFilter.
   *
   * @param selectedReference - The selected reference criteria.
   * @param allowedReferenceUri - The allowed reference URI.
   * @param selectedConcepts - The selected concepts (inherited from AbstractConceptFilter).
   * @param allowedConcepts - The allowed concepts (inherited from AbstractConceptFilter).
   */
  constructor(
    allowedReferenceUri: Array<string>,
    selectedReference: ReferenceCriterion[] = [],
    selectedConcepts: TerminologyCode[] = [],
    allowedConcepts: TerminologyCode[] = []
  ) {
    super(selectedConcepts, allowedConcepts);
    this.selectedReference = selectedReference;
    this.allowedReferenceUri = allowedReferenceUri;
  }

  /**
   * Gets the selected reference criteria.
   *
   * @returns An array of selected reference criteria.
   */
  getSelectedReference(): ReferenceCriterion[] {
    return this.selectedReference;
  }

  /**
   * Sets the selected reference criteria.
   *
   * @param selectedReference - An array of selected reference criteria.
   */
  setSelectedReference(selectedReference: ReferenceCriterion[]): void {
    this.selectedReference = selectedReference;
  }

  /**
   * Gets the allowed reference URI.
   *
   * @returns The allowed reference URI.
   */
  getAllowedReferenceUri(): string[] {
    return this.allowedReferenceUri;
  }

  /**
   * Sets the allowed reference URI.
   *
   * @param allowedReferenceUri - The allowed reference URI to set.
   */
  setAllowedReferenceUri(allowedReferenceUri: Array<string>): void {
    this.allowedReferenceUri = allowedReferenceUri;
  }

  /**
   * Gets the filter type.
   *
   * @returns The filter type.
   */
  getType(): FilterTypes {
    return this.type;
  }

  /**
   * Sets the filter type.
   *
   * @param type - The new filter type.
   */
  setType(type: FilterTypes): void {
    this.type = type;
  }
}
