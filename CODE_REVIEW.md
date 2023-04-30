## Code Review ( Fixed)

    * Need to display loader when we search books in the input in order to have better user experience.

    * Need to have error handling for book search api call and null/undefined/empty check should be added before mapping the response object.

    * 'searchTerm' getter has been used as data binding in html, it will be inovked repeatedly.we can avoid unnessary getter method call by using the variable interpolation in the html.  (Fixed)

    * Need to maintain netesd scss class structre, so that code maintainbilty will be improved.

## Accessibility Issues ( Fixed all the below points)

    * Reading List close button does not have a label.

    * Javascript text is not being highlighted.

    * Added aria disabled for the "want to read" button.

    * Modified the label for "want to read" button (Added book title to the label).
    
    * Images need to have 'alt' attribute.

##  Automated scan issue (Fixed)

    * Background and foreground colours do not have a sufficient contrast ratio.

## Test case issues (Fixed)

    * Reducers are not available for failedAddToReadingList and failedRemoveFromReadingList actions and hence the test cases were failing. 
