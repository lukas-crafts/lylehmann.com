# 🧹 Refactor trimSlash to remove redundant outer trim call

## 🎯 What
Refactored `src/utils/permalinks.ts` to simplify the `trimSlash` function. Removed the redundant outer `trim` call.

## 💡 Why
The `trimSlash` function was defined as `trim(trim(s, "/"))`. The inner `trim(s, "/")` removes leading and trailing slashes. The outer `trim` (without a second argument) uses the default behavior, which removes characters matching `undefined`. Since no character matches `undefined`, the outer `trim` call was a no-op, adding unnecessary complexity.

## ✅ Verification
- Created a reproduction test case `src/utils/__tests__/trim_reproduction.test.ts` which confirmed:
    - `trim(s)` (without 2nd arg) returns the string unmodified.
    - `trimSlash(s)` behaves correctly (removes slashes).
    - `trimSlash(s)` is equivalent to `trim(s, "/")`.
- Ran existing tests in `src/utils/__tests__/permalinks.test.ts` and they passed.
- Verified that the refactored code passes all tests.

## ✨ Result
The code is now cleaner and more efficient, avoiding a redundant function call.
