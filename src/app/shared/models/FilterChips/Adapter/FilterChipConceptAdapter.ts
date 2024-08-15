import { ConceptFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Concept/ConceptFilter';
import { FilterChipBuilder } from '../FilterChipBuilder';
import { FilterTypes } from 'src/app/model/Utilities/FilterTypes';
import { InterfaceFilterChip } from '../InterfaceFilterChip';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';
import { v4 as uuidv4 } from 'uuid';
import { ConceptFilterChipService } from 'src/app/shared/service/FilterChips/Criterion/ConceptFilterChipService.service';

export class FilterChipConceptAdapter {
  public static conceptFilterChips: InterfaceFilterChip[] = [];

  /**
   * Adapts a ConceptFilter and optional attribute code into an array of InterfaceFilterChip.
   *
   * @param conceptFilter The ConceptFilter to adapt
   * @param attributeCode Optional TerminologyCode for additional attribute information
   * @returns An array of InterfaceFilterChip
   */
  public static adaptCodeableConcept(
    conceptFilter: ConceptFilter,
    attributeCode?: TerminologyCode
  ): InterfaceFilterChip[] {
    this.resetFilterChips();

    const type = this.getFilterType(attributeCode);
    const selectedConcepts = this.getSelectedConcepts(conceptFilter);

    if (!selectedConcepts) {
      console.warn('No selected concepts found in the ConceptFilter');
      return [];
    }

    this.buildFilterChips(selectedConcepts, type);

    return this.conceptFilterChips;
  }

  /**
   * Resets the conceptFilterChips array.
   */
  private static resetFilterChips(): void {
    this.conceptFilterChips = [];
  }

  /**
   * Determines the filter type.
   *
   * @param attributeCode Optional TerminologyCode
   * @returns The filter type as a string
   */
  private static getFilterType(attributeCode?: TerminologyCode): string {
    return attributeCode?.getDisplay() || FilterTypes.CONCEPT;
  }

  /**
   * Retrieves the selected concepts from the ConceptFilter.
   *
   * @param conceptFilter The ConceptFilter to retrieve concepts from
   * @returns A Set of TerminologyCode or null
   */
  private static getSelectedConcepts(conceptFilter: ConceptFilter): Set<TerminologyCode> | null {
    return conceptFilter?.getSelectedConcepts() || null;
  }

  /**
   * Builds filter chips and adds them to the conceptFilterChips array.
   *
   * @param selectedConcepts A Set of TerminologyCode
   * @param type The filter type
   */
  private static buildFilterChips(selectedConcepts: Set<TerminologyCode>, type: string): void {
    const builder = new FilterChipBuilder(type);
    Array.from(selectedConcepts).forEach((concept) => {
      this.createFilterChip(concept, builder);
    });
    this.conceptFilterChips.push(builder.buildFilterChip());
  }

  /**
   * Creates an InterfaceFilterChip from a TerminologyCode and adds it to the builder.
   *
   * @param concept The TerminologyCode to use for creating the chip
   * @param builder The FilterChipBuilder instance
   */
  private static createFilterChip(concept: TerminologyCode, builder: FilterChipBuilder): void {
    const displayText = concept.getDisplay();

    if (!displayText) {
      console.warn('Concept display text is undefined or null', concept);
      return;
    }

    builder.addData(uuidv4(), displayText);
  }
}
