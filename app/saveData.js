import fs from 'fs';

export default function handler(req, res) {
  const { pickedColor, response } = req.body;

  // Create a timestamp for the current entry
  const timestamp = new Date().toLocaleString();

  // Format the data as a CSV row
  const csvRow = `${timestamp},${pickedColor},${response}\n`;

  // Define the path to the spreadsheet file
  const filePath = './data/logs.csv';

  // Append the CSV row to the file
  fs.appendFile(filePath, csvRow, (err) => {
    if (err) {
      console.error('Error saving data:', err);
      res.status(500).json({ message: 'Error saving data' });
    } else {
      console.log('Data saved successfully!');
      res.status(200).json({ message: 'Data saved successfully' });
    }
  });
}
