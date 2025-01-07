document.getElementById("calculateBtn").addEventListener("click", function () {
  const fileInput = document.getElementById("inputFile");
  const textInput = document.getElementById("inputText").value;
  const resultsDiv = document.getElementById("results");
  const algorithms = ["md5", "sha1", "sha256", "sha384", "sha512"];
  const selectedAlgorithms = algorithms.filter((alg) =>
    document.getElementById(alg).checked
  );

  resultsDiv.innerHTML = "";

  const processHash = (data) => {
    selectedAlgorithms.forEach((algorithm) => {
      try {
        const hash =
           CryptoJS[algorithm.toUpperCase()](data).toString();
        resultsDiv.innerHTML += `<p><strong>${algorithm.toUpperCase()}:</strong> ${hash}</p>`;
      } catch (err) {
        resultsDiv.innerHTML += `<p><strong>${algorithm.toUpperCase()}:</strong> Not supported</p>`;
      }
    });
  };

  if (fileInput.files.length > 0) {
    const reader = new FileReader();
    reader.onload = (e) => processHash(e.target.result);
    reader.readAsBinaryString(fileInput.files[0]);
  } else if (textInput.trim()) {
    processHash(textInput);
  } else {
    resultsDiv.innerHTML = "<p>Please provide a file or text input.</p>";
  }
});
