### Objective
Implement accessible labels and validation messages in all project forms, including clear error indications using ARIA attributes.

### Implementation Plan

#### 1. Form Component Enhancements
*   **src/components/InsuranceQuoteForm.tsx**: 
    *   Add `aria-invalid` to inputs/selects based on the `error` state.
    *   Add `aria-describedby` linking to a new inline error message `<p>`.
    *   Add `aria-required="true"` for required fields.
    *   Render inline error messages below each field when `touched` and invalid.

*   **src/components/QuickQuoteForm.tsx**:
    *   Add `aria-invalid` and `aria-describedby` to inputs.
    *   Ensure all inputs have `aria-required`.

*   **src/pages/Contato.tsx**:
    *   Implement inline validation messages instead of just a generic toast.
    *   Add `aria-invalid`, `aria-describedby`, and `aria-required` to fields.

*   **src/pages/FormularioSeguroVida.tsx**:
    *   Implement logic to track `touched` states for fields.
    *   Add inline error messages and ARIA attributes (`aria-invalid`, `aria-describedby`, `aria-required`).

*   **src/components/LeadMagnetSection.tsx** and **src/components/ExitIntentPopup.tsx**:
    *   Review and apply similar accessibility improvements to these smaller forms.

#### 2. Technical Details
*   Use `useId` for stable IDs when linking labels/errors to inputs if not already using unique field IDs.
*   Ensure error messages have a unique ID that matches the `aria-describedby` value of the input.
*   Validation logic should trigger on blur or change as appropriate to maintain a good user experience.

### Verification
*   Audit forms using browser tools to verify `aria-` attributes are correctly applied when errors occur.
*   Manually test forms to ensure inline errors appear as expected.
