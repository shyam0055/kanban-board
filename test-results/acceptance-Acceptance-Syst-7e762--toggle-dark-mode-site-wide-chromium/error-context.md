# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: acceptance.spec.js >> Acceptance & System Tests >> User can toggle dark mode site-wide
- Location: tests\acceptance.spec.js:14:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('button:has-text("Dark")')

```

# Page snapshot

```yaml
- main [ref=e4]:
  - generic [ref=e7]:
    - generic [ref=e8]:
      - generic [ref=e12]: Kanban Board
      - generic [ref=e13]:
        - heading "Welcome Back!" [level=1] [ref=e14]
        - paragraph [ref=e15]: To keep connected with us please login with your personal information
        - link "Log In" [ref=e16] [cursor=pointer]:
          - /url: /login
    - generic [ref=e17]:
      - heading "Create Account" [level=1] [ref=e18]
      - generic [ref=e19]:
        - button "f" [ref=e20] [cursor=pointer]
        - button "g+" [ref=e21] [cursor=pointer]
        - button "in" [ref=e22] [cursor=pointer]
      - generic [ref=e23]: or use your email for registration
      - generic [ref=e25]:
        - textbox "Name" [ref=e26]
        - textbox "Email" [ref=e27]
        - textbox "Password" [ref=e28]
        - button "Sign Up" [ref=e29] [cursor=pointer]
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
> 20 |     await page.click('button:has-text("Dark")');
     |                ^ Error: page.click: Test timeout of 30000ms exceeded.
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
  76 |     await expect(profileIcon).toHaveText('AG');
  77 |   });
  78 | 
  79 | });
  80 | 
```