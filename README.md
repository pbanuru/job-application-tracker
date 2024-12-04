# Job Application Helper Chrome Extension

A Chrome extension that helps you extract and analyze job posting information directly from job listing pages.

## Features

- One-click job information extraction
- Clean popup interface
- Works on any webpage with job listings
- Automatic content parsing and analysis

## Installation

1. Clone this repository or download the source code
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the extension directory

## Usage

1. Navigate to any job posting page
2. Click the extension icon in your Chrome toolbar
3. Click the "Extract Job Info" button in the popup
4. View the extracted job information and analysis

## Project Structure

- `manifest.json` - Extension configuration and permissions
- `popup.html` - Extension popup interface
- `popup.js` - Popup functionality and user interaction
- `content.js` - Content script for webpage interaction
- `background.js` - Background service worker for extension functionality

## Permissions

This extension requires the following permissions:

- `activeTab` - To access the current tab's content
- `storage` - To store extension data
- `tabs` - To interact with browser tabs
- `scripting` - To inject and execute scripts

## Development

To modify the extension:

1. Make your changes to the source files
2. Reload the extension in `chrome://extensions/`
3. Test your changes

## Contributing

Feel free to submit issues and pull requests for any improvements or bug fixes.

## License

This project is open source and available under the MIT License.
