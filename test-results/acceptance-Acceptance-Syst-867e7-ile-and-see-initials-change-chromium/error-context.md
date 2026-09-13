# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: acceptance.spec.js >> Acceptance & System Tests >> User can update profile and see initials change
- Location: tests\acceptance.spec.js:61:3

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator: locator('a[href="/profile"] div').first()
Expected: "AG"
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 5000ms
  - waiting for locator('a[href="/profile"] div').first()

```

```yaml
- main:
  - button
  - heading "My Profile" [level=1]
  - text: A
  - button
  - heading "Agent Smith Active" [level=2]
  - paragraph: john.doe@example.com
  - button "Edit Profile"
  - heading "Personal Information" [level=3]
  - paragraph: Full Name
  - paragraph: Agent Smith
  - paragraph: Email
  - paragraph: john.doe@example.com
  - paragraph: Phone
  - paragraph: +1 234 567 890
  - paragraph: College
  - paragraph: Sri Indu Institute of Engineering & Technology
  - paragraph: Course
  - paragraph: B.Tech CSE
  - paragraph: Joined
  - paragraph: June 2026
  - heading "Task Statistics" [level=3]
  - heading "0" [level=2]
  - paragraph: Total Tasks
  - heading "0" [level=2]
  - paragraph: Completed
  - heading "0" [level=2]
  - paragraph: Pending
  - heading "0" [level=2]
  - paragraph: High Priority
  - text: Productivity Score 0%
  - heading "Security" [level=3]
  - button "Change Password Update your password regularly →":
    - paragraph: Change Password
    - paragraph: Update your password regularly
    - text: →
  - button "Two-Factor Auth Enhance account security →":
    - paragraph: Two-Factor Auth
    - paragraph: Enhance account security
    - text: →
  - heading "Recent Activity" [level=3]
  - paragraph: Logged into your account
  - paragraph: Just now
  - paragraph: Viewed Dashboard
  - paragraph: 2 hours ago
  - paragraph: Created a new task
  - paragraph: Yesterday
  - paragraph: Updated profile information
  - paragraph: 2 days ago
  - heading "Danger Zone" [level=3]
  - paragraph: Irreversible and destructive actions. Proceed with caution.
  - button "Logout"
  - button "Delete Account"
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Acceptance & System Tests', () => {
  4  |   
  5  |   test.beforeEach(async ({ page }) => {
  6  |     // Navigate to the app (Playwright will automatically start the dev server)
  7  |     await page.goto('/');
  8  |     
  9  |     // Clear localStorage to ensure a clean slate
  10 |     await page.evaluate(() => localStorage.clear());
  11 |     await page.reload();
  12 |   });
  13 | 
  14 |   test('User can toggle dark mode site-wide', async ({ page }) => {
  15 |     // Assert initial state is light
  16 |     const html = page.locator('html');
  17 |     await expect(html).not.toHaveClass(/dark/);
  18 |     
  19 |     // Click the Dark mode toggle
  20 |     await page.click('button:has-text("Dark")');
  21 |     
  22 |     // Assert dark mode is applied
  23 |     await expect(html).toHaveClass(/dark/);
  24 |     
  25 |     // Navigate to another page to ensure it persists
  26 |     await page.click('text=🚀 Projects');
  27 |     await expect(html).toHaveClass(/dark/);
  28 |     
  29 |     // Click Light mode toggle
  30 |     await page.click('button:has-text("Light")');
  31 |     await expect(html).not.toHaveClass(/dark/);
  32 |   });
  33 | 
  34 |   test('User can create and filter a new project', async ({ page }) => {
  35 |     // Navigate to Projects
  36 |     await page.goto('/projects');
  37 |     
  38 |     // Click New Project
  39 |     await page.click('text=+ New Project');
  40 |     
  41 |     // Fill out the modal form
  42 |     await page.fill('input[placeholder="Enter project title"]', 'Playwright E2E Test');
  43 |     await page.fill('textarea[placeholder="Project description"]', 'Testing system flow');
  44 |     
  45 |     // Select status (assuming select exists, or we just submit defaults)
  46 |     // The form uses required fields, let's just submit
  47 |     await page.click('button[type="submit"]:has-text("Create Project")');
  48 |     
  49 |     // Assert the new project is in the list
  50 |     await expect(page.locator('text=Playwright E2E Test')).toBeVisible();
  51 |     
  52 |     // Click 'Completed' filter and verify it disappears (default is Active/Planning)
  53 |     await page.click('text=Completed');
  54 |     await expect(page.locator('text=Playwright E2E Test')).not.toBeVisible();
  55 |     
  56 |     // Click 'Active' filter and verify it reappears
  57 |     await page.click('text=Active');
  58 |     await expect(page.locator('text=Playwright E2E Test')).toBeVisible();
  59 |   });
  60 | 
  61 |   test('User can update profile and see initials change', async ({ page }) => {
  62 |     // Go to profile page
  63 |     await page.goto('/profile');
  64 |     
  65 |     // Wait for the page to load by checking for Edit Profile button
  66 |     await page.click('text=Edit Profile');
  67 |     
  68 |     // Clear the name field and type a new name
  69 |     await page.fill('input[type="text"]', 'Agent Smith');
  70 |     
  71 |     // Click save
  72 |     await page.click('text=Save Changes');
  73 |     
  74 |     // Wait for reload and verify the top nav bar now says 'AG'
  75 |     const profileIcon = page.locator('a[href="/profile"] div').first();
> 76 |     await expect(profileIcon).toHaveText('AG');
     |                               ^ Error: expect(locator).toHaveText(expected) failed
  77 |   });
  78 | 
  79 | });
  80 | 
```