export const downloadFileFromUrl = async (url, customFileName) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch the file. Status: ${response.status}`);
    }

    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(new Blob([blob]));
    const fileName = customFileName || getFileNameFromUrl(url); // Use customFileName if provided, otherwise extract from URL

    downloadBlobAsFile(blobUrl, fileName);
  } catch (error) {
    console.error("Error downloading the file:", error);
  }
};

const getFileNameFromUrl = (url) => {
  return url.split("/").pop();
};

const downloadBlobAsFile = (blobUrl, fileName) => {
  const aTag = document.createElement("a");
  aTag.href = blobUrl;
  aTag.setAttribute("download", fileName);

  document.body.appendChild(aTag);
  aTag.click();

  // Clean up
  document.body.removeChild(aTag);
  window.URL.revokeObjectURL(blobUrl);
};
