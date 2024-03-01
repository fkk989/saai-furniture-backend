import JWT from "jsonwebtoken";

interface TokenCreationProp {
  email: string;
  secret: string;
  options?: any;
}

export const signAsync = ({ email, secret, options }: TokenCreationProp) => {
  return new Promise((resolve, reject) => {
    JWT.sign({ email }, secret, { expiresIn: "24h" }, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
};
