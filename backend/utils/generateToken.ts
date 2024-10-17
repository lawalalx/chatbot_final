import jwt from 'jsonwebtoken';


const generateTokenAndGetToken = async (userId: any, req: any, res: any): Promise<void> => {
  // Check if token already exists in cookies
  // const tokenFromCookie = req.cookies.jwt;
  // console.log("Token from request cookie", tokenFromCookie);

  // if (tokenFromCookie) {
  //   try {
  //     // Verify the existing token
  //     const decoded = await jwt.verify(tokenFromCookie, process.env.JWT_SECRET!);
  //     console.log("Decoded token", decoded);
      
  //     // If the token is valid, reuse it and don't generate a new one
  //     if (typeof decoded !== 'string' && decoded.userId) {
  //       console.log('Reusing existing token');
  //       console.log(req.cookies.jwt);
  //       // View user
  //       console.log(decoded.userId);
  //       return;
  //     }
  //   } catch (err) {
  //     console.log('Existing token is invalid or expired');
  //   }
  // }

  // Generate a new token if no valid one is found
  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: '15d',
  });
  console.log("Generated new token", token);
  
  res.cookie('jwt', token, {
    httpOnly: true,
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    sameSite: 'strict',
    secure: process.env.NODE_ENV !== 'development',
  });
  return;
};


export default generateTokenAndGetToken;