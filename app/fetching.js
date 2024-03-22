// Define the fetchFamilyData function in the global scope
window.fetchFamilyData = function () {
  const spreadSheetName = "members";
  const spreadSheetId = "1v15ufpikq7MtPUjyTnRYIZmqDWU7MfgVNZ2Y3-t3yoU";
  const apiKey = "AIzaSyDjQ2_vyIrTsnQTO2iN0snB0SkjEIv1r5M";
  return new Promise((resolve, reject) => {
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadSheetId}/values/${spreadSheetName}?alt=json&key=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        const jsonResponse = data;
        // Extract the header row (field names)
        const headerRow = jsonResponse.values[0];

        // Initialize an array to store the transformed data, which contains family members data
        const transformedData = [];

        // Iterate over the remaining rows and transform them
        for (let i = 1; i < jsonResponse.values.length; i++) {
          const row = jsonResponse.values[i];

          // Create an object to hold the transformed row data
          const transformedRow = {};

          // Iterate over the cells in the row and assign them to the corresponding field names
          for (let j = 0; j < headerRow.length; j++) {
            const fieldName = headerRow[j];
            const cellValue = row[j];

            // Exclude null or empty values
            if (cellValue) {
              // Handle specific data types
              if (fieldName === "id" || fieldName === "fid" || fieldName === "mid") {
                transformedRow[fieldName] = parseInt(cellValue);
              } else if (fieldName === "pids") {
                transformedRow[fieldName] = cellValue.split(",").map(pid => parseInt(pid));
              } else {
                transformedRow[fieldName] = cellValue;
              }
            }
          }

          // Add the transformed row object to the array
          transformedData.push(transformedRow);
        }
        resolve(transformedData);
      })
      .catch(error => {
        console.log('Error:', error);
        reject(error);
      });
  });
};
