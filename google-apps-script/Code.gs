/**
 * SERGOIT PRIMARY SCHOOL — FORM-TO-SHEET BACKEND
 * ------------------------------------------------
 * Paste this whole file into the Apps Script editor that's attached
 * to your Google Sheet (Extensions > Apps Script), then deploy it as
 * a Web App. Full step-by-step instructions are in README.md.
 *
 * It creates two tabs automatically the first time each form is used:
 *   - "Contact Messages"     (from contact.html)
 *   - "Alumni Registrations" (from alumni.html)
 */

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    if (data.formType === 'alumni') {
      appendRow(ss, 'Alumni Registrations',
        ['Timestamp', 'First Name', 'Last Name', 'Graduation Year', 'Phone', 'Email', 'Profession', 'Location'],
        [data.timestamp, data.firstName, data.lastName, data.graduationYear, data.phone, data.email, data.profession, data.location]
      );
    } else {
      // default: treat everything else as the contact form
      appendRow(ss, 'Contact Messages',
        ['Timestamp', 'First Name', 'Last Name', 'Email', 'Phone', 'Subject', 'Message'],
        [data.timestamp, data.firstName, data.lastName, data.email, data.phone, data.subject, data.message]
      );
    }

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function appendRow(ss, sheetName, headerRow, rowData) {
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    sheet.appendRow(headerRow);
    sheet.getRange(1, 1, 1, headerRow.length).setFontWeight('bold');
  }
  sheet.appendRow(rowData);
}

/**
 * Optional: lets you sanity-check the deployment by visiting the
 * Web App URL directly in a browser (a GET request).
 */
function doGet(e) {
  return ContentService
    .createTextOutput('Sergoit Primary School form backend is running.')
    .setMimeType(ContentService.MimeType.TEXT);
}
