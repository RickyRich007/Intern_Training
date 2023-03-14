# TICKET FORM

-Step 1: Download the project

- The project use typescript
- Install npm, typescript, \*\*\*@type/ckeditor5
  -Step 2: Setup bundle to JS at file json.config
- Run terminal and demand: npx tsc

- or set up code:  
  "scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "build": "npx tsc"
  },  
  in package.json and run npm run build in ter
  -Step 3: After completing bundle to JS, remove “ import ClassicEditor from "@ckeditor/ckeditor5-build-classic"; “ in dist/index.js
