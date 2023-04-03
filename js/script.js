// Initialize the Swiper instance
var swiper = new Swiper(".mySwiper", {
  cssMode: true,
  slidesPerView: 1,
  grabCursor: true,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// Keep track of the comments that have been submitted
var submittedComments = [];

form.addEventListener('submit', function (event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the value of the textarea
  var commentText = document.querySelector('#comment-text').value.trim();
  if (commentText === '') {
    alert('Please enter a comment!');
    return;
  }

  // Check if the comment already exists in the Swiper slider or submittedComments array
  var commentIndex = checkCommentExists(commentText);
  if (commentIndex !== -1) {
    // Display an error message to the user
    var error = document.querySelector('#error-message');
    error.style.display = 'block';

    // Update the Swiper instance and go to the existing slide
    swiper.update();
    swiper.slideTo(commentIndex);
  } else {
    // Add the new comment to the submittedComments array
    submittedComments.push(commentText);

    // Create a new slide with the comment content
    var newSlide = document.createElement('div');
    newSlide.classList.add('swiper-slide');
    newSlide.innerHTML = '<div class="comment-text"><p>' + commentText + '</p></div>';

    // Append the new slide to the Swiper slider
    var sliderWrapper = document.querySelector('.swiper-wrapper');
    sliderWrapper.appendChild(newSlide);

    // Update the Swiper instance and go to the last slide
    swiper.update();
    swiper.slideTo(swiper.slides.length - 1);

    // Clear the textarea
    document.querySelector('#comment-text').value = '';

    // Clear the error message
    var error = document.querySelector('#error-message');
    error.style.display = 'none';

    // Clear the submission hint
    var submissionHint = document.querySelector('.comment-container p');
    submissionHint.style.display = 'none';
  }
});

// Check if a comment already exists in the Swiper slider or submittedComments array
function checkCommentExists(commentText) {
  // Loop through each slide in the Swiper slider
  var slides = document.querySelectorAll('.swiper-slide');
  for (var i = 0; i < slides.length; i++) {
    // Get the comment content from the slide
    var slideContent = slides[i].querySelector('.comment-text p').textContent.trim();

    // If the comment content matches the new comment content, return the index of the slide
    if (slideContent === commentText) {
      return i;
    }
  }

  // Loop through each submitted comment in the submittedComments array
  for (var i = 0; i < submittedComments.length; i++) {
    // If the comment content matches the new comment content, return the index of the comment
    if (submittedComments[i] === commentText) {
      return i + slides.length;
    }
  }

  // If no match is found, return -1
  return -1;
}