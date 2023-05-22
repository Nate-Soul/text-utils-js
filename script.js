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

const generateSlug = (string, delimiter = "-", unwanted_keywords = ["and", "of"]) => {
    if (!string) {
      return "";
    }
  
    const slug = string
      .toString()
      .trim() 
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s-]+/g, "")
      .split(" ")
      .filter(word => !unwanted_keywords.includes(word))
      .join(delimiter)
      .replace(/-+/g, delimiter)
      .replace(/^-*|-*$/g, "");
  
    return slug;
};  

const makeExcerpt = (string, len = 50) => {
    if (typeof string !== "string" || isNaN(len) || len <= 0) {
      return "";
    }
  
    if (string.length > len) {
      string = string.trim().substring(0, len).trimEnd() + "...";
    }
  
    return string;
};  