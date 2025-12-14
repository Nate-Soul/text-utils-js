document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const inputText = document.getElementById('inputText');
  const clearInputButton = document.getElementById('clearInputButton');
  const charCounter = document.getElementById('charCounter');
  const helperText = document.getElementById('helperText');
  const wordCountSlider = document.getElementById('wordCountSlider');
  const sliderValue = document.getElementById('sliderValue');
  const generateButton = document.getElementById('generateButton');
  const outputText = document.getElementById('outputText');
  const copyButton = document.getElementById('copyButton');
  const copyTooltip = document.getElementById('copyTooltip');
  const wordCounter = document.getElementById('wordCounter');
  const charStat = document.getElementById('charStat');
  const sentenceStat = document.getElementById('sentenceStat');
  const compressionStat = document.getElementById('compressionStat');

  // Update character counter
  function updateCharCounter() {
      const length = inputText.value.length;
      charCounter.textContent = `${length} / 5000 characters`;
      
      // Show/hide clear button
      if (length > 0) {
          clearInputButton.classList.add('visible');
          generateButton.disabled = false;
          helperText.classList.remove('error-text');
          helperText.textContent = 'Paste or type your content to generate an excerpt';
      } else {
          clearInputButton.classList.remove('visible');
          generateButton.disabled = true;
      }
  }

  // Clear input
  clearInputButton.addEventListener('click', () => {
      inputText.value = '';
      updateCharCounter();
  });

  inputText.addEventListener('input', updateCharCounter);

  // Update slider value
  wordCountSlider.addEventListener('input', () => {
      const value = wordCountSlider.value;
      sliderValue.textContent = `${value} words`;
  });

  // Count words
  function countWords(text) {
      return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  }

  // Count sentences
  function countSentences(text) {
      return text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
  }

  // Generate excerpt
  function generateExcerpt() {
      const text = inputText.value.trim();
      const wordCount = countWords(text);

      if (wordCount < 10) {
          helperText.classList.add('error-text');
          helperText.textContent = 'Content too short. Please provide at least 10 words.';
          return;
      }

      const targetWords = parseInt(wordCountSlider.value);
      const excerptType = document.querySelector('input[name="excerptType"]:checked').value;
      const addEllipsis = document.getElementById('addEllipsis').checked;
      const preserveFormatting = document.getElementById('preserveFormatting').checked;

      let excerpt = '';
      const words = text.split(/\s+/);

      if (excerptType === 'smart') {
          // Smart detection - break at sentence boundaries
          const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
          let currentWords = 0;
          
          for (let sentence of sentences) {
              const sentenceWords = countWords(sentence);
              if (currentWords + sentenceWords <= targetWords) {
                  excerpt += sentence + ' ';
                  currentWords += sentenceWords;
              } else if (currentWords === 0) {
                  // If first sentence is longer than target, take target words
                  excerpt = words.slice(0, targetWords).join(' ');
                  if (addEllipsis) excerpt += '...';
                  break;
              } else {
                  break;
              }
          }
          
          excerpt = excerpt.trim();
      } else {
          // Fixed length - exact word count
          excerpt = words.slice(0, targetWords).join(' ');
          if (wordCount > targetWords && addEllipsis) {
              excerpt += '...';
          }
      }

      if (!preserveFormatting) {
          excerpt = excerpt.replace(/\s+/g, ' ').trim();
      }

      // Update output
      outputText.value = excerpt;
      
      // Update statistics
      const excerptWords = countWords(excerpt);
      const excerptChars = excerpt.length;
      const excerptSentences = countSentences(excerpt);
      const compression = Math.round((excerptWords / wordCount) * 100);

      wordCounter.textContent = `${excerptWords} words`;
      charStat.textContent = `Characters: ${excerptChars}`;
      sentenceStat.textContent = `Sentences: ${excerptSentences}`;
      compressionStat.textContent = `Compression: ${compression}%`;
  }

  generateButton.addEventListener('click', generateExcerpt);

  // Copy to clipboard
  copyButton.addEventListener('click', async () => {
      try {
          await navigator.clipboard.writeText(outputText.value);
          copyTooltip.classList.add('show');
          setTimeout(() => {
              copyTooltip.classList.remove('show');
          }, 1500);
      } catch (err) {
          console.error('Failed to copy:', err);
      }
  });

  // Initialize
  updateCharCounter();
});

