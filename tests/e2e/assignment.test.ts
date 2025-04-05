import { fetchAPI } from '../helpers/api';
import { endpoints } from '../helpers/endpoints';

describe('Withdrawal API Tests', () => {

  describe('POST /createwd', () => {

    it('should create a withdrawal successfully', async () => {
      const withdrawal = {
        user_id: '6a9cf2ba-b394-4c1a-8a38-2edff793f1af',
        amount: 50,
      };

      const result = await fetchAPI(endpoints.create, {
        method: 'POST',
        body: JSON.stringify(withdrawal),
      });

      expect(result).toBeDefined();
      expect(result.response_code).toBe('OK');
      expect(result.response_message).toBe('WD created');
    });

    it('should return an error for invalid user_id', async () => {
      const withdrawal = {
        user_id: 'invalid-user-id',
        amount: 50,
      };

      const response = await fetchAPI(endpoints.create, {
        method: 'POST',
        body: JSON.stringify(withdrawal),
      });

      expect(response.response_code).toBe('BAD_REQUEST');
      expect(response.response_message).toBe('user_id is not valid');
    });

    it('should NOT allow negative amount withdrawal', async () => {
      const withdrawal = {
        user_id: '6a9cf2ba-b394-4c1a-8a38-2edff793f1af',
        amount: -50,
      };

      const result = await fetchAPI(endpoints.create, {
        method: 'POST',
        body: JSON.stringify(withdrawal),
      });

      expect(result.response_code).toBe('BAD_REQUEST');
      expect(result.response_message).toBe('Amount must be positive');
    });

    it('should NOT allow decimal amount withdrawal', async () => {
      const withdrawal = {
        user_id: '6a9cf2ba-b394-4c1a-8a38-2edff793f1af',
        amount: 50.5,
      };

      const result = await fetchAPI(endpoints.create, {
        method: 'POST',
        body: JSON.stringify(withdrawal),
      });

      expect(result.response_code).toBe('BAD_REQUEST');
      expect(result.response_message).toBe('Invalid data type in request data');
    });

    it('should return an error for non-numeric amount', async () => {
      const withdrawal = {
        user_id: '6a9cf2ba-b394-4c1a-8a38-2edff793f1af',
        // eslint-disable-next-line quotes
        amount: "abc",
      };

      const response = await fetchAPI(endpoints.create, {
        method: 'POST',
        body: JSON.stringify(withdrawal),
      });

      expect(response.response_code).toBe('BAD_REQUEST');
      expect(response.response_message).toBe('Invalid data type in request data');
    });

    it('should return an error for excessive amount', async () => {
      const withdrawal = {
        user_id: '6a9cf2ba-b394-4c1a-8a38-2edff793f1af',
        amount: 100000000000000000000,
      };

      const response = await fetchAPI(endpoints.create, {
        method: 'POST',
        body: JSON.stringify(withdrawal),
      });

      expect(response.response_code).toBe('BAD_REQUEST');
      expect(response.response_message).toBe('Amount is too high');
    });

    it('should return an error for invalid access key', async () => {
      const withdrawal = {
        user_id: '6a9cf2ba-b394-4c1a-8a38-2edff793f1af',
        amount: 50,
      };

      const response = await fetchAPI(endpoints.create, {
        method: 'POST',
        body: JSON.stringify(withdrawal),
        headers: {
          'Content-Type': 'application/json',
          'access-key': 'invalid-999-access-333-key',
        },
      });

      expect(response.response_code).toBe('DENIED');
      expect(response.response_message).toBe('Unauthorized access: Invalid access key provided.');
    });

    it('should return an error for a missing access key', async () => {
      const withdrawal = {
        user_id: '6a9cf2ba-b394-4c1a-8a38-2edff793f1af',
        amount: 50,
      };

      const response = await fetchAPI(endpoints.create, {
        method: 'POST',
        body: JSON.stringify(withdrawal),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      expect(response.response_code).toBe('DENIED');
      expect(response.response_message).toBe('Access key is missing.');
    });

    it('should return an error for empty JSON object', async () => {
      const response = await fetchAPI(endpoints.create, {
        method: 'POST',
        body: JSON.stringify({}),
      });

      expect(response.response_code).toBe('BAD_REQUEST');
      expect(response.response_message).toBe('Missing data in the request body');
    });

    it('should return an error for unexpected fields', async () => {
      const withdrawal = {
        user_id: '6a9cf2ba-b394-4c1a-8a38-2edff793f1af',
        amount: 50,
        ad: true, // Unexpected field
      };

      const response = await fetchAPI(endpoints.create, {
        method: 'POST',
        body: JSON.stringify(withdrawal),
      });

      expect(response.response_code).toBe('BAD_REQUEST');
      expect(response.response_message).toBeDefined();
    });

    it('should return a JSON error for "none" body', async () => {
      const response = await fetchAPI(endpoints.create, {
        method: 'POST',
        body: 'none', // Simulate sending "none" as the body
      });

      expect(response.response_code).toBe('BAD_REQUEST');
      expect(response.response_message).toBe('Invalid request body');
    });
  });
});
