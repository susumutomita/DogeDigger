// Google Sheets Integration using Google Apps Script Web App
// This approach doesn't require googleapis package or service account credentials
// Instead, it uses a deployed Google Apps Script as a web API

const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || '';

// Check if Google Script URL is configured
export const isGoogleSheetsConfigured = !!GOOGLE_SCRIPT_URL && GOOGLE_SCRIPT_URL.startsWith('https://script.google.com/');

export interface WaitlistEntry {
  email: string;
  name?: string;
  interests: string[];
  source?: string;
  timestamp?: string;
  metadata?: {
    ip?: string;
    user_agent?: string;
    referrer?: string;
  };
}

/**
 * Add a new entry to Google Sheets via Google Apps Script
 * @param entry The waitlist entry to add
 * @returns The response from the Google Apps Script
 */
export async function addToGoogleSheets(entry: WaitlistEntry): Promise<{ success: boolean; message: string; isUpdate: boolean }> {
  if (!isGoogleSheetsConfigured) {
    throw new Error('Google Sheets not configured');
  }

  try {
    const payload = {
      action: 'addEntry',
      data: {
        ...entry,
        timestamp: new Date().toISOString(),
      }
    };

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error adding to Google Sheets:', error);
    throw error;
  }
}

/**
 * Get the total count of registrations from Google Sheets
 * @returns The total number of registrations
 */
export async function getRegistrationCount(): Promise<number> {
  if (!isGoogleSheetsConfigured) {
    return 42; // Default demo value
  }

  try {
    const payload = {
      action: 'getCount'
    };

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.count || 0;
  } catch (error) {
    console.error('Error getting registration count:', error);
    return 42; // Fallback to demo value
  }
}

/**
 * Google Apps Script Code Template
 * This code should be deployed as a Google Apps Script Web App
 * 
 * 1. Create a new Google Sheet
 * 2. Go to Extensions > Apps Script
 * 3. Replace the default code with this:
 * 
 * ```javascript
 * function doPost(e) {
 *   try {
 *     const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
 *     const data = JSON.parse(e.postData.contents);
 *     
 *     if (data.action === 'addEntry') {
 *       const entry = data.data;
 *       
 *       // Check if email already exists
 *       const emailColumn = sheet.getRange('A:A').getValues();
 *       const emailIndex = emailColumn.findIndex(row => row[0] === entry.email);
 *       
 *       if (emailIndex > -1) {
 *         // Update existing entry
 *         const rowNumber = emailIndex + 1;
 *         sheet.getRange(rowNumber, 1, 1, 8).setValues([[
 *           entry.email,
 *           entry.name || '',
 *           entry.interests.join(', '),
 *           entry.source || '',
 *           entry.timestamp,
 *           entry.metadata?.ip || '',
 *           entry.metadata?.user_agent || '',
 *           entry.metadata?.referrer || ''
 *         ]]);
 *         
 *         return ContentService.createTextOutput(JSON.stringify({
 *           success: true,
 *           message: '情報を更新しました',
 *           isUpdate: true
 *         })).setMimeType(ContentService.MimeType.JSON);
 *       } else {
 *         // Add new entry
 *         sheet.appendRow([
 *           entry.email,
 *           entry.name || '',
 *           entry.interests.join(', '),
 *           entry.source || '',
 *           entry.timestamp,
 *           entry.metadata?.ip || '',
 *           entry.metadata?.user_agent || '',
 *           entry.metadata?.referrer || ''
 *         ]);
 *         
 *         return ContentService.createTextOutput(JSON.stringify({
 *           success: true,
 *           message: 'ウェイトリストに登録されました！',
 *           isUpdate: false
 *         })).setMimeType(ContentService.MimeType.JSON);
 *       }
 *     } else if (data.action === 'getCount') {
 *       const lastRow = sheet.getLastRow();
 *       const count = lastRow - 1; // Subtract header row
 *       
 *       return ContentService.createTextOutput(JSON.stringify({
 *         count: Math.max(0, count)
 *       })).setMimeType(ContentService.MimeType.JSON);
 *     }
 *     
 *     return ContentService.createTextOutput(JSON.stringify({
 *       error: 'Invalid action'
 *     })).setMimeType(ContentService.MimeType.JSON);
 *     
 *   } catch (error) {
 *     return ContentService.createTextOutput(JSON.stringify({
 *       error: error.toString()
 *     })).setMimeType(ContentService.MimeType.JSON);
 *   }
 * }
 * ```
 * 
 * 4. Deploy as Web App:
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the Web App URL and set it as GOOGLE_SCRIPT_URL environment variable
 */