const {
    createLoginTracker
  } = require('../index');
  
  describe('createLoginTracker function', () => {
    const mockUser = {
      "username": "user1",
      "password": "password123"
    }
    const mockUser2 = {
      "username": "john_smith_24",
      "password": "securePassword"
    }
    user1Login = createLoginTracker(mockUser);
    
    test('should return a function', () => {
      expect(typeof user1Login).toBe('function');
    });

    test('should keep track of wrong login count', () => {
      expect(user1Login("wrongPassword")).toBe('Attempt 1: Login failed');
      expect(user1Login("wrongPassword")).toBe('Attempt 2: Login failed');
      expect(user1Login("wrongPassword")).toBe('Attempt 3: Login failed');
    });

    test('should limit login attempts to be 3', () => {
      expect(user1Login("lastWrongPassword")).toBe('Account locked due to too many failed login attempts');
    });

    user1LoginNew = createLoginTracker(mockUser);
    user2Login = createLoginTracker(mockUser2)
    test('should allow correct login immediately', () => {
      expect(user1LoginNew("password123")).toBe('Login successful');
      expect(user2Login("securePassword")).toBe('Login successful');
    });
    const mockUser3 = {
      "username": "Jane_Smith_4",
      "password": "password45!"
    }
    user3Login = createLoginTracker(mockUser3)
    test('should allow correct login after failed login', () => {
      expect(user3Login("wrongpassword")).toBe('Attempt 1: Login failed');
      expect(user3Login("password45!")).toBe('Login successful');
    });
  });
  const { capitalizeWords, filterActiveUsers, logAction } = require("../index");

describe("capitalizeWords", () => {
    test("capitalizes first letter of each word", () => {
        expect(capitalizeWords("hello world")).toBe("Hello World");
    });

    test("handles single word", () => {
        expect(capitalizeWords("javascript")).toBe("Javascript");
    });

    test("handles empty string", () => {
        expect(capitalizeWords("")).toBe("");
    });

    test("handles multiple spaces", () => {
        expect(capitalizeWords("hello   world")).toBe("Hello   World");
    });
});


describe("filterActiveUsers", () => {
    test("filters only active users", () => {
        const users = [
            { name: "Alice", isActive: true },
            { name: "Bob", isActive: false }
        ];

        expect(filterActiveUsers(users)).toEqual([
            { name: "Alice", isActive: true }
        ]);
    });

    test("returns empty array if no active users", () => {
        const users = [
            { name: "Bob", isActive: false }
        ];

        expect(filterActiveUsers(users)).toEqual([]);
    });

    test("returns empty array if input is empty", () => {
        expect(filterActiveUsers([])).toEqual([]);
    });
});


describe("logAction", () => {
    test("returns correct log message format", () => {
        const result = logAction("login", "Alice");

        expect(result).toContain("User Alice performed login at");
    });

    test("includes action in log", () => {
        const result = logAction("logout", "Bob");

        expect(result).toContain("logout");
    });

    test("returns string", () => {
        expect(typeof logAction("login", "Alice")).toBe("string");
    });
});