// helpers
const debugEnabled = true;

function debugPrint(string) {
  if (debugEnabled == true) console.log(string);
}

const gallery = [];
const photoFolder = "gallery";

// gallery has 78 photos
const totalPhotos = 65;

// alt text: photo number -> placeholder label
// paste this over the existing altText object in script.js
const altText = {
  gallery: {
    1: "Photo 1 Gallery",
    2: "Photo 2 Gallery",
    3: "Photo 3 Gallery",
    4: "Photo 4 Gallery",
    5: "Photo 5 Gallery",
    6: "Photo 6 Gallery",
    7: "Photo 7 Gallery",
    8: "Photo 8 Gallery",
    9: "Photo 9 Gallery",
    10: "Photo 10 Gallery",
    11: "Photo 11 Gallery",
    12: "Photo 12 Gallery",
    13: "Photo 13 Gallery",
    14: "Photo 14 Gallery",
    15: "Photo 15 Gallery",
    16: "Photo 16 Gallery",
    17: "Photo 17 Gallery",
    18: "Photo 18 Gallery",
    19: "Photo 19 Gallery",
    20: "Photo 20 Gallery",
    21: "Photo 21 Gallery",
    22: "Photo 22 Gallery",
    23: "Photo 23 Gallery",
    24: "Photo 24 Gallery",
    25: "Photo 25 Gallery",
    26: "Photo 26 Gallery",
    27: "Photo 27 Gallery",
    28: "Photo 28 Gallery",
    29: "Photo 29 Gallery",
    30: "Photo 30 Gallery",
    31: "Photo 31 Gallery",
    32: "Photo 32 Gallery",
    33: "Photo 33 Gallery",
    34: "Photo 34 Gallery",
    35: "Photo 35 Gallery",
    36: "Photo 36 Gallery",
    37: "Photo 37 Gallery",
    38: "Photo 38 Gallery",
    39: "Photo 39 Gallery",
    40: "Photo 40 Gallery",
    41: "Photo 41 Gallery",
    42: "Photo 42 Gallery",
    43: "Photo 43 Gallery",
    44: "Photo 44 Gallery",
    45: "Photo 45 Gallery",
    46: "Photo 46 Gallery",
    47: "Photo 47 Gallery",
    48: "Photo 48 Gallery",
    49: "Photo 49 Gallery",
    50: "Photo 50 Gallery",
    51: "Photo 51 Gallery",
    52: "Photo 52 Gallery",
    53: "Photo 53 Gallery",
    54: "Photo 54 Gallery",
    55: "Photo 55 Gallery",
    56: "Photo 56 Gallery",
    57: "Photo 57 Gallery",
    58: "Photo 58 Gallery",
    59: "Photo 59 Gallery",
    60: "Photo 60 Gallery",
    61: "Photo 61 Gallery",
    62: "Photo 62 Gallery",
    63: "Photo 63 Gallery",
    64: "Photo 64 Gallery",
    65: "Photo 65 Gallery",
  },
};

for (let i = 1; i <= totalPhotos; i++) {
  gallery.push({
    title: `Photo ${i}`,
    year: 2026,
    desc: `Description ${i}`,
    alt:
      altText[photoFolder][i] ||
      `Photograph ${i} from the ${photoFolder} collection`,
    img: `../photos/${photoFolder}/photo${i}.jpg`,
  });
}

function renderGallery() {
  const container = document.querySelector(".grid");
  if (!container) return;

  debugPrint("renderGallery fired");

  let htmlContent = "";

  for (let i = 0; i < gallery.length; i++) {
    const item = gallery[i];
    const delay = (i * 0.1).toFixed(2) + "s";

    htmlContent += `
      <div class="item" style="animation-delay: ${delay}; animation-play-state: paused;">
        <img
          src="${item.img}"
          alt="${item.alt}"
          loading="lazy"
        >
      </div>
    `;
  }

  container.innerHTML = htmlContent;
}

window.addEventListener("load", () => {
  window.scrollTo(0, 0);

  renderGallery();
  startSiteAnimations();
});

function startSiteAnimations() {
  const openingAnimation = document.getElementById("openingAnimation");
  const banner = document.getElementById("banner");
  const pageTitle = document.getElementById("page-title");
  const navButton = document.getElementById("navButton");
  const topAnimation = document.getElementById("topAnimation");
  const navSection = document.getElementById("navSection");

  document.querySelectorAll(".item").forEach((item) => {
    item.style.animationPlayState = "running";
  });

  if (pageTitle) {
    pageTitle.style.animationPlayState = "running";
  }

  if (openingAnimation) {
    openingAnimation.style.animationPlayState = "running";

    const page = document.body.dataset.page;

    const shouldDelete =
      page === "bibliography" ||
      page === "gallery" ||
      page === "about" ||
      page === "contact";

    if (shouldDelete) {
      openingAnimation.addEventListener("animationend", () => {
        openingAnimation.remove();
      });
    }
  }

  if (topAnimation) {
    topAnimation.style.animationPlayState = "running";
  }

  if (banner) {
    banner.style.animationPlayState = "running";
  }

  if (navButton) {
    navButton.style.animationPlayState = "running";
  }

  if (navButton && navSection) {
    navButton.addEventListener("click", (event) => {
      navSection.classList.toggle("active");
      navButton.classList.toggle("active");

      const open = navSection.classList.contains("active");

      navButton.setAttribute("aria-expanded", open);

      if (open) {
        navButton.setAttribute("aria-label", "Close navigation menu");
        navButton.setAttribute("title", "Close navigation menu");
      } else {
        navButton.setAttribute("aria-label", "Open navigation menu");
        navButton.setAttribute("title", "Open navigation menu");
      }

      event.stopPropagation();
    });
  }

  document.addEventListener("click", (event) => {
    if (navSection && navSection.classList.contains("active")) {
      const clickedALink =
        event.target.tagName === "A" && navSection.contains(event.target);

      if (!clickedALink) {
        navSection.classList.remove("active");

        if (navButton) {
          navButton.classList.remove("active");
          navButton.setAttribute("aria-expanded", "false");
          navButton.setAttribute("aria-label", "Open navigation menu");
          navButton.setAttribute("title", "Open navigation menu");
        }
      }
    }
  });
}

// preview component
document.addEventListener("click", (event) => {
  const preview = document.getElementById("imagePreview");
  const previewImg = document.getElementById("imagePreviewImg");

  if (event.target.matches(".item img")) {
    if (previewImg) {
      previewImg.src = event.target.src;
      previewImg.alt = event.target.alt;
    }

    if (preview) {
      preview.classList.add("active");
    }

    return;
  }

  if (preview && preview.classList.contains("active")) {
    preview.classList.remove("active");
  }
});

// close with escape
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    const preview = document.getElementById("imagePreview");
    const navSection = document.getElementById("navSection");
    const navButton = document.getElementById("navButton");

    if (preview && preview.classList.contains("active")) {
      preview.classList.remove("active");
      return;
    }

    if (navSection && navSection.classList.contains("active")) {
      navSection.classList.remove("active");

      if (navButton) {
        navButton.classList.remove("active");
        navButton.setAttribute("aria-expanded", "false");
        navButton.setAttribute("aria-label", "Open navigation menu");
        navButton.setAttribute("title", "Open navigation menu");
        navButton.focus();
      }
    }
  }
});

// copy text component
const button = document.getElementById("copyBtn");

if (button) {
  button.addEventListener("click", async () => {
    const phraseToCopy = button.getAttribute("data-phrase");

    try {
      await navigator.clipboard.writeText(phraseToCopy);

      const originalText = button.textContent;

      button.textContent = "copied to clipboard";
      button.disabled = true;

      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  });
}
