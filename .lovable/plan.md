The user wants to include a "Relacionamento" (Relationship) flow where clients to be contacted on the current day (as scheduled) appear.

Looking at the current codebase:
1.  There is already a `RelationshipModule` component in `src/components/crm/RelationshipModule.tsx` and a tab for it in `CRM.tsx`.
2.  The current `RelationshipModule` uses mock data and shows a general overview of portfolio health, but it doesn't explicitly focus on "clients to contact today based on schedule".
3.  The `contacts` table in Supabase has a `next_contact_date` field which is perfect for this requirement.

Plan:
1.  **Modify `RelationshipModule.tsx`**:
    *   Integrate with `useContacts` hook to fetch real contact data.
    *   Filter contacts where `next_contact_date` is today (or overdue).
    *   Add a new section at the top of the module specifically for "Contatos Agendados para Hoje" (Scheduled Contacts for Today).
    *   Maintain the existing portfolio health dashboard but back it with real data calculations from the `contacts` list (active clients, average satisfaction score, etc.).
    *   Update the table to show contacts scheduled for today by default or provide a clear toggle.
2.  **Enhance `useContacts` hook** (if needed): Ensure it properly exposes the `next_contact_date` field (it already seems to in the interface).

Technical Details:
*   Use `isSameDay` from `date-fns` to filter scheduled contacts.
*   Update the UI to be more "action-oriented" for the relationship flow.
