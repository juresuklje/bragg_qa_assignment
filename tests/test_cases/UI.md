# Withdrawal UI Test Cases

## Test Cases for Withdrawal UI Functionality

### 1. Valid Withdrawal Request

**Description:** User enters a valid amount and requests a withdrawal.

**Steps:**
1. Enter a valid amount (e.g., 100) in the input field.
2. Click the "Request Withdrawal" button.

**Expected Result:** The withdrawal request is processed successfully, and a success message is displayed.

### 2. Empty Input Field

**Description:** User leaves the input field empty and attempts to request a withdrawal.

**Steps:**
1. Leave the input field blank.
2. Click the "Request Withdrawal" button.

**Expected Result:** An error message is displayed, prompting the user to enter an amount.

### 3. Zero Amount

**Description:** User enters zero as the withdrawal amount.

**Steps:**
1. Enter "0" in the input field.
2. Click the "Request Withdrawal" button.

**Expected Result:** An error message is displayed, indicating that the amount must be greater than zero.

### 4. Negative Amount

**Description:** User enters a negative amount.

**Steps:**
1. Enter "-50" in the input field.
2. Click the "Request Withdrawal" button.

**Expected Result:** An error message is displayed, indicating that the amount cannot be negative.

### 5. Non-numeric Input

**Description:** User enters non-numeric characters in the input field.

**Steps:**
1. Enter "abc" in the input field.
2. Click the "Request Withdrawal" button.

**Expected Result:** An error message is displayed, indicating that the input must be a valid number.

### 6. Maximum Withdrawals Reached

**Description:** User attempts to request a withdrawal after reaching the maximum allowed withdrawals per day.

**Steps:**
1. Ensure the user has already made 3 withdrawals.
2. Enter a valid amount in the input field.
3. Click the "Request Withdrawal" button.

**Expected Result:** The "Request Withdrawal" button is disabled, and an error message is displayed, indicating that the withdrawal limit has been reached.

### 7. Inactive Account

**Description:** User attempts to request a withdrawal when their account is inactive.

**Steps:**
1. Ensure the user's account is set to inactive.
2. Enter a valid amount in the input field.
3. Click the "Request Withdrawal" button.

**Expected Result:** The "Request Withdrawal" button is disabled, and an error message is displayed, indicating that the account is not active.

### 8. Server Error

**Description:** Simulate a server error during the withdrawal request.

**Steps:**
1. Enter a valid amount in the input field.
2. Click the "Request Withdrawal" button.
3. Simulate a server error (e.g., by manipulating the backend or network conditions).

**Expected Result:** An error message is displayed, indicating that the request could not be processed due to a server error.

### 9. Large Amount

**Description:** User enters an excessively large amount.

**Steps:**
1. Enter a very large amount (absurd) (e.g., 1000000) in the input field.
2. Click the "Request Withdrawal" button.

**Expected Result:** An error message is displayed, indicating that the amount exceeds the allowed limit (if such a limit is defined).

### 10. Decimal Amount

**Description:** User enters a decimal amount.

**Steps:**
1. Enter a decimal amount (e.g., 100.50) in the input field.
2. Click the "Request Withdrawal" button.

**Expected Result:** The withdrawal request is processed successfully (if decimals are allowed), or an error message is displayed (if only whole numbers are allowed).

### 11. Withdrawal with leading/trailing Spaces

**Descriptio:** Test the behavior when the input contains leading or trailing spaces.

**Steps:**
1. Enter an amount with leading spaces (e.g., " 100") or trailing spaces (e.g., "100 ").
2. Click the "Request Withdrawal" button.

**Expected results:** The spaces are trimmed, and the withdrawal request is processed successfully, or an error message is displayed if spaces are not allowed.


### 12. Edge cases / other possible test cases:

- **Minimum and Maximum Boundaries:** Test the minimum and maximum allowed withdrawal amounts.
- **Special Characters:** Test input with special characters to ensure they are handled correctly. Additionally, check for decimal behaviour - how it handles . or ,. 
- **Consecutive/Concurrent Requests:** Test making multiple withdrawal requests in quick succession to check for any race conditions or server load issues. Or make many concurrent requests.
- **Session Timeout:** Test the behavior when the user's session times out during the withdrawal process.
- **Network Latency:** Test the system's behavior under high network latency conditions.
- **Browser Compatibility:** Test the withdrawal form across different web browsers and devices.
- **Accessibility:** Ensure the withdrawal form is accessible to users with disabilities.
