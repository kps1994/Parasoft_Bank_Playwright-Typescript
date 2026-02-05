import ExcelJS from "exceljs";

/**
 * Reads expected column headers from an Excel sheet.
 * @param filePath Path to Excel file
 * @param sheetName Sheet name (e.g., "SheetA")
 * @param columnName Column name in the header row (e.g., "metric list")
 * @returns Array of expected column headers
 */
export async function getExpectedHeaders(
  filePath: string,
  sheetName: string,
  columnName: string
): Promise<string[]> {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);

  const sheet = workbook.getWorksheet(sheetName);
  if (!sheet) {
    throw new Error(`❌ Sheet '${sheetName}' not found in ${filePath}`);
  }

  const headerRow = sheet.getRow(1);
  if (!headerRow || !Array.isArray(headerRow.values)) {
    throw new Error(`❌ Header row is empty or invalid in '${sheetName}'`);
  }

  // Ensure we have a usable array
  const values = Array.isArray(headerRow.values)
    ? headerRow.values.slice(1) // skip index 0
    : [];

  const headersArray = values
    .map((v) => {
      if (v == null) return "";
      if (typeof v === "object" && "text" in v) return String(v.text);
      return String(v);
    })
    .map((v) => v.trim().toLowerCase())
    .filter((v) => v.length > 0);

  if (headersArray.length === 0) {
    throw new Error(`❌ No headers found in first row of sheet '${sheetName}'`);
  }

  const colIndex = headersArray.indexOf(columnName.toLowerCase());
  if (colIndex === -1) {
    throw new Error(
      `❌ Column '${columnName}' not found in header row of '${sheetName}'`
    );
  }

  const headers: string[] = [];
  sheet.eachRow((row, rowNumber) => {
    if (rowNumber > 1) {
      const cell = row.getCell(colIndex + 1); // ExcelJS is 1-based
      const value =
        cell.value && typeof cell.value === "object" && "text" in cell.value
          ? cell.value.text
          : cell.value;
      if (value) headers.push(String(value).trim());
    }
  });

  if (headers.length === 0) {
    throw new Error(
      `❌ No data found under column '${columnName}' in '${sheetName}'`
    );
  }

  return headers;
}
