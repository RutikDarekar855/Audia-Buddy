import React from 'react'

const PDF = () => {

  function extracttext() {
    const inpFile = document.getElementById("inpFile");
    const btnUpload = document.getElementById("btnUpload");
    const resultText = document.getElementById("resultText");

    btnUpload.addEventListener("click", () => {
      const formData = new FormData();

      formData.append("pdfFile", inpFile.files[0]);

      fetch("/extract-text", {
        method: "post",
        body: formData
      }).then(response => {
        return response.text();
      }).then(extractedText => {
        resultText.value = extractedText.trim();
      });
    });
  }

  return (
    <div >
      <input type="file" id="inpFile" />
      <button type="button" id="btnUpload">Upload</button>
      <br />
      <br />
      <textarea  id="resultText" placeholder="Your PDF text will appear here...">  </textarea>
    </div>
  )
}

export default PDF;