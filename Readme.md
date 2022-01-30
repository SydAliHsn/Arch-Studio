////////////// FOR COMPILING SCSS TO CSS/////////////
As there were 4 pages and not all of the scss files were needed on each page, I have made separate folders for using the combined scss and for separate scss.

1. Currently I am using css from separate-scss

2. For compiling scss from the separate-scss folder, use:

   - "npm run sass-index" for css of index page
   - "npm run sass-portfolio" for css of portfolio page
   - "npm run sass-about" for css of about page
   - "npm run sass-contact" for css of contact page

3. For compiling scss from the combined-scss folder, use:
   - "npm run sass"
     NOTE: before starting to use the combinde-scss folder for compiling css, don't forget to delete the "css" folder from "dist". Also comment and uncomment the respective stylesheet links from each HTML page.
