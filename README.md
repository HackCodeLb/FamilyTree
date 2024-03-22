# Family Tree Project

## Overview
The Family Tree project is a web application that allows users to create and visualize family trees using data fetched from a Google Sheets spreadsheet. It provides an interactive interface for exploring family relationships and viewing family members' details.

## Features
- Fetches family data from a Google Sheets spreadsheet using Google Sheets API.
- Visualizes family tree using Balkan Diagrams library.
- Supports various orientations for displaying the family tree.
- Dynamically updates total family members count.
- Option to filter family members by gender.

## Requirements
- JavaScript (ES6+)
- HTML5
- CSS3
- Google Sheets API
- Balkan Diagrams library

## Libraries Used
- Balkan FamilyTress: [Link](https://balkan.app/FamilyTreeJS/Download)

## Installation
1. Clone the repository: `git clone https://github.com/HackCodeLb/FamilyTree.git`
2. Navigate to the project directory: `cd FamilyTree`
3. Open `index.html` in your web browser.

## Usage
1. Obtain Google Sheets API key and enable Google Sheets API access.
2. Create a Google Sheets spreadsheet with the required family data. [Sample](https://docs.google.com/spreadsheets/d/18HTAX68hOJVShpTJ3ValNtCoyhBBkO8w-uPMXWfPdQg/edit?usp=sharing)
3. Substitute the image links in the spreadsheet with direct image URLs or use Google Drive thumbnail links.
4. Update `fetching.js` file with your spreadsheet ID and API key.
5. Open `index.html` in your web browser to view the family tree.

## Adding Images
To add images to the family tree, follow these steps:
1. Upload images to an online image hosting service or Google Drive.
2. If its Google Drive change the sharing settings of the images to "Anyone with the link can view" to ensure general access.
3. Obtain direct image URLs or Google Drive thumbnail links.
4. Substitute the image links in the spreadsheet with the obtained URLs.

## Substituting Drive Images Link
To substitute Google Drive images links with direct URLs, replace the `YOUR_IMAGE_ID` part of `https://drive.google.com/thumbnail?id=YOUR_IMAGE_ID&sz=w1000`.

Example:
- Original Drive link: `https://drive.google.com/uc?export=view&id=YOUR_FILE_ID`
- Direct link: `https://drive.google.com/thumbnail?id=YOUR_IMAGE_ID&sz=w1000`