/**
 * Google Apps Script for DogeDigger Waitlist
 * 
 * Setup Instructions:
 * 1. Create a new Google Sheet with the following headers in row 1:
 *    A1: Email
 *    B1: Name
 *    C1: Interests
 *    D1: Source
 *    E1: Timestamp
 *    F1: IP
 *    G1: User Agent
 *    H1: Referrer
 * 
 * 2. Go to Extensions > Apps Script
 * 3. Delete the default code and paste this entire script
 * 4. Save the project with a name like "DogeDigger Waitlist API"
 * 5. Click "Deploy" > "New Deployment"
 * 6. Choose type: "Web app"
 * 7. Set:
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 8. Click "Deploy" and copy the Web App URL
 * 9. Add the URL to your .env.local file as GOOGLE_SCRIPT_URL
 */

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    if (data.action === 'addEntry') {
      const entry = data.data;
      
      // Check if email already exists
      const emailColumn = sheet.getRange('A:A').getValues();
      const emailIndex = emailColumn.findIndex(row => row[0] === entry.email);
      
      if (emailIndex > 0) { // > 0 because index 0 is the header row
        // Update existing entry
        const rowNumber = emailIndex + 1;
        sheet.getRange(rowNumber, 1, 1, 8).setValues([[
          entry.email,
          entry.name || '',
          entry.interests.join(', '),
          entry.source || '',
          entry.timestamp,
          entry.metadata?.ip || '',
          entry.metadata?.user_agent || '',
          entry.metadata?.referrer || ''
        ]]);
        
        return ContentService.createTextOutput(JSON.stringify({
          success: true,
          message: '情報を更新しました',
          isUpdate: true
        })).setMimeType(ContentService.MimeType.JSON);
      } else {
        // Add new entry
        sheet.appendRow([
          entry.email,
          entry.name || '',
          entry.interests.join(', '),
          entry.source || '',
          entry.timestamp,
          entry.metadata?.ip || '',
          entry.metadata?.user_agent || '',
          entry.metadata?.referrer || ''
        ]);
        
        return ContentService.createTextOutput(JSON.stringify({
          success: true,
          message: 'ウェイトリストに登録されました！',
          isUpdate: false
        })).setMimeType(ContentService.MimeType.JSON);
      }
    } else if (data.action === 'getCount') {
      const lastRow = sheet.getLastRow();
      const count = lastRow - 1; // Subtract header row
      
      return ContentService.createTextOutput(JSON.stringify({
        count: Math.max(0, count)
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      error: 'Invalid action'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    console.error('Error in doPost:', error);
    return ContentService.createTextOutput(JSON.stringify({
      error: error.toString(),
      success: false
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function to ensure the script is working
function test() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        action: 'getCount'
      })
    }
  };
  
  const result = doPost(testData);
  console.log(result.getContent());
}