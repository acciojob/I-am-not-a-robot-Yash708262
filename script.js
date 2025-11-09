//your code here
// Select DOM elements
const imageContainer = document.getElementById("image-container");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const message = document.getElementById("para");
const heading = document.getElementById("h");

// List of 5 unique image classes
const images = ["img1", "img2", "img3", "img4", "img5"];

// State variables
let selected = [];

// Create randomized set of 6 images with 1 duplicate
function loadImages() {
  imageContainer.innerHTML = "";
  message.innerText = "";
  heading.innerText =
    "Please click on the identical tiles to verify that you are not a robot.";
  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";
  selected = [];

  // Copy unique images and add a random duplicate
  const duplicateIndex = Math.floor(Math.random() * images.length);
  const allImages = [...images, images[duplicateIndex]];

  // Shuffle images randomly
  allImages.sort(() => Math.random() - 0.5);

  // Create image elements dynamically
  allImages.forEach((imgClass, index) => {
    const img = document.createElement("img");
    img.classList.add(imgClass);
    img.dataset.imgType = imgClass;
    img.addEventListener("click", () => handleImageClick(img));
    imageContainer.appendChild(img);
  });
}

// Handle image click
function handleImageClick(img) {
  if (selected.length < 2 && !img.classList.contains("selected")) {
    img.classList.add("selected");
    selected.push(img.dataset.imgType);

    // Show Reset button when first image clicked
    resetBtn.style.display = "inline-block";

    // Show Verify button only after two selections
    if (selected.length === 2) {
      verifyBtn.style.display = "inline-block";
    }
  }
}

// Reset button functionality
resetBtn.addEventListener("click", () => {
  loadImages();
});

// Verify button functionality
verifyBtn.addEventListener("click", () => {
  verifyBtn.style.display = "none";

  if (selected.length === 2) {
    if (selected[0] === selected[1]) {
      message.innerText = "You are a human. Congratulations!";
    } else {
      message.innerText =
        "We can't verify you as a human. You selected the non-identical tiles.";
    }
  }
});

// Load images initially
loadImages();
