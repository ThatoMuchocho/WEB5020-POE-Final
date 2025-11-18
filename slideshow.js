// PART 3: Slideshow Implementation for index.html

let slideIndex = 0; // Initialize the slide index globally

// **CRITICAL: Initial call to start the slideshow**
// This function needs to be called once to begin the 2-second loop.
showSlides(); 

function showSlides() {
    let i;
    // Get all elements with the class name "mySlides" from the HTML
    let slides = document.getElementsByClassName("mySlides"); 

    // 1. Hide all slides by setting display to none
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }

    // 2. Increment slide index (0, 1, 2, 3...)
    slideIndex++;

    // 3. Loop back to the first slide if index exceeds the total number of slides
    if (slideIndex > slides.length) {
        slideIndex = 1
    }

    // 4. Display the current slide (slideIndex - 1 is used because arrays are 0-indexed)
    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].style.display = "block";  
    }

    // 5. Call the function again after 2000 milliseconds (2 seconds)
    // This creates the continuous automatic loop
    setTimeout(showSlides, 2000); 
}
