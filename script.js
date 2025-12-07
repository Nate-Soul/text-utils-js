const titleField    = document.querySelector("#title");
const slugField     = document.querySelector("#slug");
const excerptField  = document.querySelector("#excerpt");
const bodyField     = document.querySelector("#body");

titleField.addEventListener("input", (e) => {
    slugField.value = generateSlug(e.target.value);
});

bodyField.addEventListener("blur", (e) => {
    excerptField.value = makeExcerpt(e.target.value);
});

const makeExcerpt = (string, len = 50) => {
    if (typeof string !== "string" || isNaN(len) || len <= 0) {
      return "";
    }
  
    if (string.length > len) {
      string = string.trim().substring(0, len).trimEnd() + "...";
    }
  
    return string;
};

const generateSlug = (
  input, 
  allowUnicode = false, 
  unwanted_keywords = [
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
  ],
  delimiter = "-"
) => {

  if (!input || typeof input !== "string") {
    return "";
  }
  
  // Convert to lowercase and remove non-alphanumeric characters
  let slug = input
              .toString()
              .trim()
              .toLowerCase()
              .replace(/[^\w\s-]+/g, '');

  
  // Remove specified words as standalone words
  unwanted_keywords.forEach(unwanted_keyword => {
    slug = slug.replace(new RegExp(`\\b${unwanted_keyword}\\b`, 'gi'), '');
  });

  // Convert spaces and repeated dashes to single delimiter
  slug = slug.replace(new RegExp(`[${delimiter}_\\s]+`, 'g'), delimiter);

  // Strip leading and trailing delimiter
  slug = slug.replace(new RegExp(`^${delimiter}+|${delimiter}+$`, 'g'), '');

  if (!allowUnicode) {
    // Convert non-ASCII characters to their closest ASCII equivalent
    slug = slug.normalize('NFKD').replace(/[\u0300-\u036F]/g, '');
  }

  return slug;
};