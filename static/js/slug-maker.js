const initialStopWords = [
    "and", 
    "of", 
    "a",
    "an",
    "the",
    "but",
    "or",
    "for",
    "in",
    "with",
    "is",
    "it",
    "to",
    "how",
    "what",
    "your",
    "you"
];


// GENERATE SLUG 
const generateSlug = (
  input, 
  allowUnicode = false,
  allowNumbers = true, 
  unwanted_keywords = initialStopWords,
  delimiter = "-"
) => {

  if (!input || typeof input !== "string") {
    return "";
  }
  
  // Convert to lowercasetrim, and handle non-alphanumeric based on allowNumbers
  let slug = input
              .toString()
              .trim()
              .toLowerCase()

  // If numbers are not allowed, remove all digits (\d)
  if (!allowNumbers) {
    slug = slug.replace(/\d+/g, "");
  }
  
  // Remove non-word characters except spaces and hyphens/delimiters
  slug = slug.replace(/[^\w\s-]+/g, "");

  // Remove specified words as standalone words
  unwanted_keywords.forEach(unwanted_keyword => {
    slug = slug.replace(new RegExp(`\\b${unwanted_keyword}\\b`, "gi"), "");
  });

  // Convert spaces and repeated dashes to single delimiter
  slug = slug.replace(new RegExp(`[${delimiter}_\\s]+`, "g"), delimiter);

  // Strip leading and trailing delimiter
  slug = slug.replace(new RegExp(`^${delimiter}+|${delimiter}+$`, "g"), "");

  if (!allowUnicode) {
    // Convert non-ASCII characters to their closest ASCII equivalent
    slug = slug.normalize("NFKD").replace(/[\u0300-\u036F]/g, "");
  }

  return slug;
};


document.addEventListener("DOMContentLoaded", () => {
    const titleField            = document.querySelector("#originalText");
    const clearTitleFieldBtn    = document.querySelector("#clearButton");
    const slugField             = document.querySelector("#generatedSlug");
    // const delimiterField        = document.querySelector("#customSelectDropdown");
    const allowUnicodeOption    = document.querySelector("#allowUnicode");
    const removeNumbersOption   = document.querySelector("#removeNumbers");
    const stopWordsOption       = document.querySelector("#excludeStopWords");
    const stopWordField         = document.querySelector("#customStopWords");
    const stopWordsContainer    = document.querySelector("#badgeContainer");
    const resetBtn              = document.querySelector("#resetFormButton");
    const copySlugButton        = document.querySelector("#copyButton");
    const copyTooltip           = document.querySelector("#copyTooltip");

    
    const customSelect          = document.querySelector("#customSelect");
    const customSelectDropdown  = document.querySelector("#customSelectDropdown");
    const customSelectValue     = document.querySelector("#customSelectValue");
    const customSelectOptions   = document.querySelectorAll(".custom-select-option");
    

    if (!titleField || !slugField || !customSelectValue || !customSelectDropdown || !customSelect || !stopWordsOption || !stopWordField || !stopWordsContainer || !clearTitleFieldBtn || !resetBtn || !copySlugButton || !allowUnicodeOption || !removeNumbersOption || !copyTooltip) {
        console.error("Missing essential form elements. Slugify feature will not run.");
        return;
    };
    
    let stopWords = [];
    let selectedDelimiter = '-';
    
    if (stopWordsOption.checked) {
        stopWords = [...initialStopWords];
    }

    //create Badge Element
    const createBadgeElement = (badgeText, badgeArray, badgeDisplayContainer) => {
        const badgeElement = document.createElement("div");
        badgeElement.className = "stop-word-badge";
        badgeElement.textContent = badgeText;
        const closeBtn = document.createElement("span");
        closeBtn.classList.add("remove-icon");
        closeBtn.setAttribute("role", "button");
        closeBtn.setAttribute("aria-label", `Remove ${badgeText}`);
        closeBtn.setAttribute("data-word", badgeText);
        closeBtn.innerHTML = "<i class=\"fa-solid fa-times\"></i>";
        closeBtn.addEventListener("click", () => removeBadgeElement(badgeText, badgeArray, badgeDisplayContainer));
        badgeElement.appendChild(closeBtn);
        return badgeElement;
    };
    
    //Populate the badge display container
    const populateBadgeDisplayContainer = (stopWordsContainer, stopWords) => {
        stopWordsContainer.innerHTML = "";
        stopWords.forEach((badgeText) => {
            stopWordsContainer.appendChild(createBadgeElement(badgeText, stopWords, stopWordsContainer));
        });
    };

    if (stopWords.length > 0) {
        populateBadgeDisplayContainer(stopWordsContainer, stopWords);
    }

    const repopulateSlugField = (
        title = titleField.value, 
        allowUnicode = allowUnicodeOption.checked,
        allowNumbers = !removeNumbersOption.checked,
        unwanted_keywords=stopWords, 
        delimiter=selectedDelimiter
    ) => {
        slugField.value = generateSlug(title, allowUnicode, allowNumbers, unwanted_keywords, delimiter);
    };

    //remove badge
    const removeBadgeElement = (badgeText, badgeArray, badgeDisplayContainer) => {
        const index = badgeArray.indexOf(badgeText);
        if (index !== -1) {
            badgeArray.splice(index, 1);
            repopulateSlugField();
            populateBadgeDisplayContainer(badgeDisplayContainer, badgeArray);
            // console.log(stopWords);
        }
    };

    // Custom Select Functionality
    customSelect.addEventListener("click", e => {
        e.stopPropagation();
        const isOpen = customSelect.classList.contains("open");

        if (isOpen) {
            closeDropdown();
        } else {
            openDropdown();
        }
    });

    // Keyboard navigation for custom select
    customSelect.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            const isOpen = customSelect.classList.contains("open");
            if (isOpen) {
                closeDropdown();
            } else {
                openDropdown();
            }
        }
    });

    const openDropdown = () => {
        customSelect.classList.add("open");
        customSelectDropdown.classList.add("open");
        customSelect.setAttribute("aria-expanded", "true");
    }

    const closeDropdown = () => {
        customSelect.classList.remove("open");
        customSelectDropdown.classList.remove("open");
        customSelect.setAttribute("aria-expanded", "false");
    }

    // Handle option selection
    if (!customSelectOptions.length) {
        console.error("No custom select options on DOM Node");
        return;
    }

    customSelectOptions.forEach(option => {
        option.addEventListener("click", e => {
            e.stopPropagation();

            // Remove selected class from all options
            customSelectOptions.forEach(opt => opt.classList.remove("selected"));

            // Add selected class to clicked option
            option.classList.add("selected");

            // Update selected value display
            const label = option.getAttribute("data-label");
            const value = option.getAttribute("data-value");
            customSelectValue.textContent = label;
            selectedDelimiter = value;

            // Close dropdown
            closeDropdown();

            repopulateSlugField();
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", e => {
        if (!customSelect.contains(e.target) && !customSelectDropdown.contains(e.target)) {
            closeDropdown();
        }
    });

    const resetForm = () => {
        titleField.value = "";
        slugField.value = "";

        // Reset custom select to default (Dash)
        customSelectOptions.forEach(opt => opt.classList.remove("selected"));
        customSelectOptions[0].classList.add("selected");
        customSelectValue.textContent = "Dash (-)";
        selectedDelimiter = "-";

        removeNumbersOption.checked = false;
        allowUnicodeOption.checked = false;
        stopWordsOption.checked = true;
        stopWordField.value = "";
        stopWords = [...initialStopWords];
        populateBadgeDisplayContainer(stopWordsContainer, stopWords);
        repopulateSlugField();
    }
        
    titleField.addEventListener("input", (e) => {
        repopulateSlugField();
    });
    
    clearTitleFieldBtn.addEventListener("click", () => {
        titleField.value = ""
        repopulateSlugField();
    });

    allowUnicodeOption.addEventListener("change", (e) => {
        repopulateSlugField();        
    });

    removeNumbersOption.addEventListener("change", (e) => {
        repopulateSlugField();
    });

    stopWordsOption.addEventListener("change", (e) => {
        if (e.currentTarget.checked) {
            stopWords = [...initialStopWords];
            stopWordField.parentElement.style.display = "block";
        } else {
            stopWords = [];
            stopWordField.parentElement.style.display = "none";
        }
        repopulateSlugField();
        populateBadgeDisplayContainer(stopWordsContainer, stopWords);
    });

    stopWordField.addEventListener("keydown", (e) => {
        if (e.key === "," || e.key === " " || e.key === "Enter") {
            e.preventDefault();
            const badgeText = stopWordField.value.trim().replace(",", "").toLowerCase();

            if (badgeText && !stopWords.includes(badgeText)) {
                stopWords.push(badgeText);
                populateBadgeDisplayContainer(stopWordsContainer, stopWords);
                repopulateSlugField();
                stopWordField.value = "";
                // console.log(stopWords);
            }
        }
    });

    copySlugButton.addEventListener("click", async () => {
        if (slugField.value !== "") {
            try {
                await navigator.clipboard.writeText(slugField.value);
                copyTooltip.classList.add('show');
                setTimeout(() => {
                    copyTooltip.classList.remove('show');
                }, 1500);
            } catch (err) {
                console.error('Failed to copy: ', err);
                // Fallback for older browsers
                slugField.select();
                document.execCommand('copy');
                copyTooltip.classList.add('show');
                setTimeout(() => {
                    copyTooltip.classList.remove('show');
                }, 1500);
            }
        }
    });
    
    resetBtn.addEventListener('click', resetForm);
});
