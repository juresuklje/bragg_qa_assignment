# Withdrawal API Test Cases

## Test Cases for Withdrawal API Functionality

### 1. Successful Withdrawal

**Description:** Verify that a user can successfully request a withdrawal when all conditions are met.

**Precondition:** User has an active account, and wd_restriction is not enabled or has not reached the limit.

**Input:** Valid user_id and withdrawal amount.

**Expected Result:** Withdrawal request is successful, and the response code is OK.

### 2. Withdrawal Limit Reached

**Description:** Verify that a user cannot request more than 3 withdrawals in a day when wd_restriction is enabled.

**Precondition:** User has made 3 withdrawals already.

**Input:** Valid user_id and withdrawal amount.

**Expected Result:** Withdrawal request is denied, and the response code indicates the limit has been reached.

### 3. Inactive Account

**Description:** Verify that a user cannot request a withdrawal when their account is inactive.

**Precondition:** User account is set to inactive.

**Input:** Valid user_id and withdrawal amount.

**Expected Result:** Withdrawal request is denied, and the response code indicates the account is inactive.

### 4. Invalid Input

**Description:** Verify that the system handles invalid input gracefully.

**Input:** Invalid user_id or negative/zero amount.

**Expected Result:** Withdrawal request is denied, and the response code indicates invalid input.

### 5. Server Error

**Description:** Verify that the system handles server errors gracefully.

**Input:** Simulate a server error condition.

**Expected Result:** Withdrawal request fails, and the response code indicates a server error.

### 6. Invalid User ID

**Description:** Test the API's response to a request with an invalid user_id.

**Input:** Use a non-existent or malformed user_id.

**Expected Result:** The API should return a 400 Bad Request or 404 Not Found with a clear error message.

### 7. Negative Amount

**Description:** Test the API's response to a request with a negative withdrawal amount.

**Input:** {"user_id": "test-user-id", "amount": -50}

**Expected Result:** The API should return a 400 Bad Request with a message indicating that the amount must be positive.

### 8. Zero Amount

**Description:** Test the API's response to a request with a zero withdrawal amount.

**Input:** {"user_id": "test-user-id", "amount": 0}

**Expected Result:** The API should return a 400 Bad Request with a message indicating that the amount must be greater than zero.

### 9. Non-numeric Amount

**Description:** Test the API's response to a request with a non-numeric withdrawal amount.

**Input:** {"user_id": "test-user-id", "amount": "abc"}

**Expected Result:** The API should return a 400 Bad Request with a message indicating that the amount must be a number.

### 10. Missing Access Key

**Description:** Test the API's response when the access-key header is missing.

**Input:** Omit the access-key header.

**Expected Result:** The API should return a 401 Unauthorized with a message indicating that the access key is missing.

### 11. Invalid Access Key

**Description:** Test the API's response with an invalid access-key.

**Input:** Use an incorrect access-key.

**Expected Result:** The API should return a 401 Unauthorized with a message indicating that the access key is invalid.

### 12. Excessive Amount

**Description:** Test the API's response to a request with an excessively large withdrawal amount.

**Input:** {"user_id": "test-user-id", "amount": 1000000000000000}

**Expected Result:** The API should return a 400 Bad Request with a message indicating that the amount exceeds the allowed limit (if such a limit is defined).

### 13. Empty JSON Object

**Description:** Test the API's response to a request with an empty JSON object.

**Input:** {}

**Expected Result:** The API should return a 400 Bad Request with a message indicating that required fields are missing.

### 14. Malformed JSON

**Description:** Test the API's response to a request with malformed JSON.

**Input:** {"user_id": "test-user-id", "amount": 50, "extra_field":}

**Expected Result:** The API should return a 400 Bad Request with a message indicating that the JSON is malformed.