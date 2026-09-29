# Security Specification

## Data Invariants
1. `siteContent` document (e.g. `main`): publicly readable; writeable only by authenticated admin users.
2. `testimonials`: publicly readable; writeable/editable only by authenticated admin users.
3. `articles`: publicly readable; writeable only by authenticated admin users.
4. `appointments`: createable by anyone with valid sanitization (name, phone, caseDescription length limit); read, list, update, and delete restricted to authenticated admin users.

## The Dirty Dozen Payloads Handled
1. Injection of malicious script in testimonials
2. Shadow field additions to site content
3. Unauthorized deletion of testimonials by anonymous users
4. Unauthorized reading of patient appointments by anonymous users
5. Privilege escalation via user profile modifications
6. Bloated payload strings (>2000 chars) in appointment case description
7. Setting invalid status values in appointment records
8. Client-side ID spoofing or invalid document IDs
9. Overwriting siteContent without admin authentication
10. Mass deletion of educational articles by non-admins
11. Bypassing size restrictions on text fields
12. Empty string or null values for required fields (name, phone, case description)
