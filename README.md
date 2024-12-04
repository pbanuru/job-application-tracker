# JobCopy Chrome Extension

A simple Chrome extension that extracts job titles and company names from job listing pages and copies them to your clipboard one after another. Perfect for quickly logging job applications when used with PasteQueue on macOS.

## What it Does

1. Extracts the current page content and URL
2. Uses GPT-4-mini to identify the job title and company name
3. Copies them to your clipboard: copy1 = company name, copy2 = job title, copy3 = job posting URL

## Recommended Setup

- Install [PasteQueue](https://apprywhere.com/paste-queue.html#/) on your Mac
- Configure PasteQueue to paste tab-separated values into separate columns - for when you paste the clipboard contents into a spreadsheet
- This combination lets you quickly build a spreadsheet of jobs you're applying to

## Installation

1. Download this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" (top right)
4. Click "Load unpacked" and select this directory

## Usage

1. Visit any job posting page
2. Click the extension icon
3. Click "Extract Job Info"
4. The company name, job title, and job posting URL will be copied to your clipboard
5. Open your spreadsheet and paste the clipboard contents with your keyboard shortcuts set up in PasteQueue

## Technical Details

The extension uses:

- Chrome's scripting API to extract page content
- GPT-4-mini for accurate job info extraction
- Background scripts for clipboard handling

## License

MIT License - See LICENSE file for details
