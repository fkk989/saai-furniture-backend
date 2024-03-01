import bcrypt from "bcrypt";

// Function to verify a password
export const verifyPassword = async (
  inputPassword: string,
  hashedPassword: string
) => {
  try {
    const passwordMatch = await bcrypt.compare(inputPassword, hashedPassword);
    return passwordMatch;
  } catch (error) {
    return error;
  }
};
