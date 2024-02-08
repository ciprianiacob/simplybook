async function initBookingSteps() {
  await checkPreloaderStatus(); // Wait for the preloader status to be checked
  
  console.log("Delay value before: ", finalDelayDoHomeArtValue + 1);
  setTimeout(async function() {
    var stepContent = document.querySelector('.step-content');

    if (stepContent) {
      switch (true) {
        case stepContent.classList.contains('location-step') && !document.getElementById('sb_prerequisites_step_container'):
          console.log('Case 1: step-content has class location-step');
          // code block for Case 1
          break;
        case stepContent.classList.contains('category-step'):
          console.log('Case 2: step-content has class category-step');
          // code block for Case 2
          break;
        case stepContent.classList.contains('service-step'):
          console.log('Case 3: step-content has class service-step');
          // code block for Case 3
          break;
        case stepContent.classList.contains('paid-attribute-step'):
          console.log('Case 4: step-content has class paid-attribute-step');
          // code block for Case 4
          break;
        case stepContent.classList.contains('datetime-step'):
          console.log('Case 5: step-content has class datetime-step');
          // code block for Case 5
          break;
        default:
          console.log('Default case: none of the specified classes are present');
          // code block if none of the above cases match
      }
    }
  }, finalDelayDoHomeArtValue + 1); // 1000 milliseconds = 1 second
  console.log("Delay value after: ", finalDelayDoHomeArtValue + 1);
}

initBookingSteps();
