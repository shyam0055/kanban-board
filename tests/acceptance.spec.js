import { test, expect } from '@playwright/test';

test.describe('Acceptance & System Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to the app (Playwright will automatically start the dev server)
    await page.goto('/');
    
    // Clear localStorage to ensure a clean slate
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('User can toggle dark mode site-wide', async ({ page }) => {
    // Assert initial state is light
    const html = page.locator('html');
    await expect(html).not.toHaveClass(/dark/);
    
    // Click the Dark mode toggle
    await page.click('button:has-text("Dark")');
    
    // Assert dark mode is applied
    await expect(html).toHaveClass(/dark/);
    
    // Navigate to another page to ensure it persists
    await page.click('text=🚀 Projects');
    await expect(html).toHaveClass(/dark/);
    
    // Click Light mode toggle
    await page.click('button:has-text("Light")');
    await expect(html).not.toHaveClass(/dark/);
  });

  test('User can create and filter a new project', async ({ page }) => {
    // Navigate to Projects
    await page.goto('/projects');
    
    // Click New Project
    await page.click('text=+ New Project');
    
    // Fill out the modal form
    await page.fill('input[placeholder="Enter project title"]', 'Playwright E2E Test');
    await page.fill('textarea[placeholder="Project description"]', 'Testing system flow');
    
    // Select status (assuming select exists, or we just submit defaults)
    // The form uses required fields, let's just submit
    await page.click('button[type="submit"]:has-text("Create Project")');
    
    // Assert the new project is in the list
    await expect(page.locator('text=Playwright E2E Test')).toBeVisible();
    
    // Click 'Completed' filter and verify it disappears (default is Active/Planning)
    await page.click('text=Completed');
    await expect(page.locator('text=Playwright E2E Test')).not.toBeVisible();
    
    // Click 'Active' filter and verify it reappears
    await page.click('text=Active');
    await expect(page.locator('text=Playwright E2E Test')).toBeVisible();
  });

  test('User can update profile and see initials change', async ({ page }) => {
    // Go to profile page
    await page.goto('/profile');
    
    // Wait for the page to load by checking for Edit Profile button
    await page.click('text=Edit Profile');
    
    // Clear the name field and type a new name
    await page.fill('input[type="text"]', 'Agent Smith');
    
    // Click save
    await page.click('text=Save Changes');
    
    // Wait for reload and verify the top nav bar now says 'AG'
    const profileIcon = page.locator('a[href="/profile"] div').first();
    await expect(profileIcon).toHaveText('AG');
  });

});
